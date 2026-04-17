import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// Mapeamento de perguntas para indicadores
const QUESTION_MAPPINGS = {
  // DIVERSIDADE E INCLUSÃO
  diversidade: [
    'O ambiente de trabalho na confeitaria é respeitoso e acolhedor?',
    'Você já presenciou algum tipo de desrespeito ou discriminação no ambiente de trabalho?',
    'Você acredita que há igualdade de oportunidades para todos na empresa?',
    'Você sente que sua equipe trabalha em união e colaboração?'
  ],
  // QUALIDADE NO TRABALHO
  qualidadeTrabalho: [
    'Como você avalia sua carga de trabalho?',
    'Você sente que sua equipe trabalha em união e colaboração?'
  ],
  // VALORIZAÇÃO DO TRABALHO
  valorizacao: [
    'Como você se sente trabalhando na Bouche Nerveuse?',
    'Você se sente valorizado(a) pelo seu trabalho na produção e atendimento?',
    'Você se sente motivado(a) a crescer junto com a Bouche Nerveuse?',
    'Você recomendaria a Bouche Nerveuse como um bom lugar para trabalhar?'
  ],
  // QUALIDADE DO PRODUTO
  qualidadeProduto: [
    'Você se sente à vontade para dar sugestões sobre melhorias (receitas, atendimento, organização)?'
  ]
};

// Sistema de pontuação para respostas
const SCORE_MAP: Record<string, number> = {
  // Escala positiva (5 opções) - Quanto maior, melhor
  'Muito feliz e realizado(a)': 100,
  'Feliz': 75,
  'Neutro(a)': 50,
  'Insatisfeito(a)': 25,
  'Muito insatisfeito(a)': 0,
  
  'Sempre': 100,
  'Na maioria das vezes': 75,
  'Às vezes': 50,
  'Raramente': 25,
  'Nunca': 0,
  
  'Totalmente': 100,
  'Na maior parte do tempo': 75,
  'Pouco': 25,
  'Não é acolhedor': 0,
  
  'Frequentemente': 75,
  
  'Sim, totalmente': 100,
  'Sim, parcialmente': 60,
  'Sim, em grande parte': 80,
  'Parcialmente': 40,
  'Não me sinto à vontade': 20,
  'Nunca dei sugestão': 30,
  
  'Muito motivado(a)': 100,
  'Motivado(a)': 75,
  'Pouco motivado(a)': 40,
  'Desmotivado(a)': 20,
  'Muito desmotivado(a)': 0,
  
  'Sim, com certeza': 100,
  'Provavelmente sim': 75,
  'Talvez': 50,
  'Provavelmente não': 25,
  
  'Muito equilibrada': 100,
  'Equilibrada': 75,
  'Um pouco pesada': 50,
  'Muito pesada': 25,
  'Excessiva': 0,
  
  // Pergunta sobre discriminação (invertida - Não é bom)
  'Sim': 0,  // Presenciou discriminação = ruim
  'Prefiro não responder': 50
};

export async function GET() {
  try {
    // Verifica credenciais com mais detalhes
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    
    console.log('=== DEBUG ENV ===');
    console.log('Client Email exists:', !!clientEmail);
    console.log('Client Email value:', clientEmail?.substring(0, 30) + '...');
    console.log('Private Key exists:', !!privateKey);
    console.log('Private Key length:', privateKey?.length);
    console.log('Private Key starts with:', privateKey?.substring(0, 50));
    
    const hasCredentials = clientEmail && privateKey;
    console.log('Has credentials:', hasCredentials);
    
    if (!hasCredentials) {
      console.log('Retornando 0% - credenciais não encontradas');
      return NextResponse.json({
        diversidade: 0,
        qualidadeTrabalho: 0,
        valorizacao: 0,
        qualidadeProduto: 0,
        source: 'no_credentials'
      });
    }

    // Process private key - handle various formatting issues
    let formattedKey = privateKey?.trim() || '';
    
    console.log('Original key length:', formattedKey.length);
    console.log('Original key starts with:', formattedKey.substring(0, 40));
    
    // Try to decode if it's base64 encoded (without headers)
    try {
      if (!formattedKey.includes('BEGIN PRIVATE KEY')) {
        const decoded = Buffer.from(formattedKey, 'base64').toString('utf8');
        if (decoded.includes('BEGIN PRIVATE KEY')) {
          formattedKey = decoded;
          console.log('Decoded key from base64');
        }
      }
    } catch (e) {
      // Not base64, continue with original
    }
    
    // If key contains literal \n strings (common in env vars), replace them
    if (formattedKey.includes('\\n')) {
      formattedKey = formattedKey.replace(/\\n/g, '\n');
      console.log('Replaced literal \\n with actual newlines');
    }
    
    // If key is one long string without newlines, reconstruct it
    if (!formattedKey.includes('\n')) {
      const begin = '-----BEGIN PRIVATE KEY-----';
      const end = '-----END PRIVATE KEY-----';
      
      if (formattedKey.includes(begin) && formattedKey.includes(end)) {
        // Extract the key content between markers
        const keyBody = formattedKey
          .replace(begin, '')
          .replace(end, '');
        
        // Split into 64-char lines (standard PEM format)
        const lines = [];
        for (let i = 0; i < keyBody.length; i += 64) {
          lines.push(keyBody.substring(i, i + 64));
        }
        
        formattedKey = begin + '\n' + lines.join('\n') + '\n' + end;
        console.log('Reconstructed key with 64-char line breaks');
      }
    }
    
    // Ensure proper PEM format
    if (!formattedKey.endsWith('\n')) {
      formattedKey += '\n';
    }
    
    console.log('Final key length:', formattedKey.length);
    console.log('Final key preview:', formattedKey.substring(0, 60) + '...');

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: formattedKey,
      },
      scopes: [
        'https://www.googleapis.com/auth/forms.responses.readonly',
        'https://www.googleapis.com/auth/forms'  // Para ler estrutura do formulário
      ],
    });

    const forms = google.forms({
      version: 'v1',
      auth: auth,
    });

    const formId = '1u7mrz_eH3g8m4Up7gq1IPz7AGa0RZaTRfBcQut57w14';

    const response = await forms.forms.responses.list({
      formId: formId,
    });

    const formResponses = response.data.responses || [];
    const totalResponses = formResponses.length;

    console.log('Total de respostas:', totalResponses);

    // Se não houver respostas, retorna 0%
    if (totalResponses === 0) {
      return NextResponse.json({
        diversidade: 0,
        qualidadeTrabalho: 0,
        valorizacao: 0,
        qualidadeProduto: 0,
        message: 'Nenhuma resposta no formulário ainda'
      });
    }

    // Process actual response values with weighted indicators
    // Each answer affects different indicators based on keywords
    const scores = {
      diversidade: { total: 0, count: 0 },
      qualidadeTrabalho: { total: 0, count: 0 },
      valorizacao: { total: 0, count: 0 },
      qualidadeProduto: { total: 0, count: 0 }
    };

    formResponses.forEach((formResponse: any, formIndex: number) => {
      const answers = formResponse.answers || {};
      
      Object.values(answers).forEach((answerData: any, answerIndex: number) => {
        const answerValue = answerData.textAnswers?.answers?.[0]?.value?.trim() || '';
        
        if (answerValue && SCORE_MAP[answerValue] !== undefined) {
          const score = SCORE_MAP[answerValue];
          
          // Determine which indicators this answer affects based on position and value
          // Question 1-2: Diversidade e Inclusão
          if (answerIndex === 0 || answerIndex === 1) {
            scores.diversidade.total += score;
            scores.diversidade.count += 1;
          }
          // Question 3-4: Qualidade no Trabalho
          else if (answerIndex === 2 || answerIndex === 3) {
            scores.qualidadeTrabalho.total += score;
            scores.qualidadeTrabalho.count += 1;
          }
          // Question 5-8: Valorização do Trabalho
          else if (answerIndex >= 4 && answerIndex <= 7) {
            scores.valorizacao.total += score;
            scores.valorizacao.count += 1;
          }
          // Question 9+: Qualidade do Produto
          else {
            scores.qualidadeProduto.total += score;
            scores.qualidadeProduto.count += 1;
          }
          
          // Additional cross-impact based on answer content
          // Positive answers boost all indicators slightly
          if (score >= 80) {
            scores.diversidade.total += score * 0.1;
            scores.qualidadeTrabalho.total += score * 0.1;
            scores.valorizacao.total += score * 0.1;
            scores.qualidadeProduto.total += score * 0.1;
          }
          
          console.log(`Resposta ${answerIndex}: "${answerValue}" = ${score} pontos`);
        }
      });
    });

    // Calculate averages for each indicator
    const diversidade = scores.diversidade.count > 0 
      ? Math.min(100, Math.round(scores.diversidade.total / scores.diversidade.count)) 
      : 0;
    const qualidadeTrabalho = scores.qualidadeTrabalho.count > 0 
      ? Math.min(100, Math.round(scores.qualidadeTrabalho.total / scores.qualidadeTrabalho.count)) 
      : 0;
    const valorizacao = scores.valorizacao.count > 0 
      ? Math.min(100, Math.round(scores.valorizacao.total / scores.valorizacao.count)) 
      : 0;
    const qualidadeProduto = scores.qualidadeProduto.count > 0 
      ? Math.min(100, Math.round(scores.qualidadeProduto.total / scores.qualidadeProduto.count)) 
      : 0;

    console.log('Scores calculados (simplified):', { diversidade, qualidadeTrabalho, valorizacao, qualidadeProduto });

    return NextResponse.json({
      diversidade,
      qualidadeTrabalho,
      valorizacao,
      qualidadeProduto,
      totalResponses,
      source: 'calculated'
    });

  } catch (error) {
    console.error('Erro:', error);
    // Em caso de erro, retorna 0%
    return NextResponse.json({
      diversidade: 0,
      qualidadeTrabalho: 0,
      valorizacao: 0,
      qualidadeProduto: 0,
      source: 'error'
    });
  }
}
