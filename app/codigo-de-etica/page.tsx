'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function CodigoEticaPage() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Se o elemento estiver visível na tela, mostra o botão
        setShowTopBtn(entry.isIntersecting);
      },
      { rootMargin: '0px', threshold: 0.1 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const sections = [
    {
      title: "Introdução",
      content: (
        <>
          <p>Este Código de Ética e Conduta estabelece os princípios, valores e diretrizes que orientam o comportamento e as decisões de todos os colaboradores da Bouche Nerveuse.</p>
          <p>Seu objetivo é garantir que todas as atividades da empresa sejam realizadas com ética, respeito, responsabilidade e transparência, fortalecendo a confiança entre colaboradores, clientes, parceiros e a sociedade.</p>
          <p>Todos os colaboradores devem conhecer, respeitar e aplicar este código em suas atividades diárias, contribuindo para um ambiente de trabalho saudável, inclusivo e produtivo.</p>
        </>
      )
    },
    {
      title: "1. Identidade da Empresa",
      content: (
        <>
          <h3 className="font-bold mb-2">1.1 Origem do Nome</h3>
          <p>O nome Bouche Nerveuse tem origem na língua francesa e pode ser interpretado como &quot;boca nervosa&quot; ou &quot;boca inquieta&quot;, uma expressão associada ao desejo constante de experimentar sabores marcantes e irresistíveis.</p>
          <p>Os fundadores escolheram esse nome para representar a ideia de que os doces da marca despertam sensações intensas e inesquecíveis, estimulando o paladar e criando uma experiência única para quem prova seus produtos.</p>
          <p>Assim, o nome simboliza prazer, desejo e emoção, reforçando a identidade da empresa no universo da confeitaria gourmet.</p>
          <blockquote className="border-l-4 border-black pl-4 my-4 italic">
            &quot;A boca inquieta pelo sabor perfeito.&quot;
          </blockquote>
        </>
      )
    },
    {
      title: "2. Missão, Visão e Valores",
      content: (
        <>
          <h3 className="font-bold mb-1 mt-4">Missão</h3>
          <p>Produzir doces e produtos de confeitaria com qualidade, criatividade e excelência, proporcionando experiências únicas e memoráveis aos consumidores.</p>

          <h3 className="font-bold mb-1 mt-4">Visão</h3>
          <p>Ser reconhecida como uma referência em confeitaria gourmet, inspirando paixão tanto em quem produz quanto em quem consome nossos produtos.</p>

          <h3 className="font-bold mb-2 mt-4">Valores Organizacionais</h3>
          <ul className="list-disc pl-8 space-y-2">
            <li><strong>Pessoas em primeiro lugar:</strong> Valorizamos colaboradores, clientes e parceiros, promovendo respeito, bem-estar e desenvolvimento contínuo.</li>
            <li><strong>Excelência na qualidade:</strong> Garantimos alto padrão em nossos doces, utilizando ingredientes de qualidade e seguindo rigorosamente as normas de higiene e segurança alimentar.</li>
            <li><strong>Compromisso com os consumidores:</strong> Buscamos atender e superar expectativas, oferecendo produtos de qualidade e atendimento acolhedor.</li>
            <li><strong>Sustentabilidade e responsabilidade social:</strong> Adotamos práticas conscientes, reduzindo desperdícios e contribuindo com a comunidade.</li>
            <li><strong>Paixão pelo que fazemos:</strong> Trabalhamos com dedicação e amor pela confeitaria, colocando cuidado em cada produto.</li>
            <li><strong>Ética e transparência:</strong> Agimos com honestidade e responsabilidade em todas as relações da empresa.</li>
          </ul>
        </>
      )
    },
    {
      title: "3. Estilo de Liderança",
      content: (
        <>
          <p>A Bouche Nerveuse acredita em uma liderança inspiradora, participativa e próxima da equipe. Os líderes atuam como facilitadores do sucesso coletivo, incentivando o desenvolvimento profissional e o fortalecimento do trabalho em equipe.</p>
          <p>Entre os princípios da liderança da empresa destacam-se:</p>
          <ul className="list-disc pl-8 space-y-1 mt-2">
            <li>Desenvolvimento contínuo da equipe</li>
            <li>Cultura de feedback construtivo</li>
            <li>Ambiente de confiança e colaboração</li>
            <li>Valorização de cada colaborador</li>
          </ul>
        </>
      )
    },
    {
      title: "4. Comportamentos Esperados",
      content: (
        <>
          <p>A identidade da Bouche Nerveuse é refletida nas atitudes diárias de todos os colaboradores. Esperamos que cada integrante da equipe atue com:</p>
          <ul className="list-disc pl-8 space-y-1 mt-2">
            <li>Ética e transparência</li>
            <li>Excelência e pontualidade</li>
            <li>Higiene e segurança alimentar</li>
            <li>Espírito de equipe</li>
            <li>Paixão por servir</li>
            <li>Respeito mútuo</li>
          </ul>
          <p className="mt-4">Estes comportamentos contribuem para um ambiente de trabalho positivo e para a qualidade dos produtos oferecidos aos clientes.</p>
        </>
      )
    },
    {
      title: "5. Clima Organizacional",
      content: (
        <>
          <p>A Bouche Nerveuse valoriza um ambiente de trabalho saudável e busca constantemente compreender o nível de satisfação de seus colaboradores.</p>
          <h3 className="font-bold mb-2 mt-4">Como medimos o clima organizacional:</h3>
          <ul className="list-disc pl-8 space-y-2">
            <li><strong>Pesquisa anual (anônima):</strong> Avalia aspectos como satisfação, liderança, comunicação, reconhecimento e condições de trabalho.</li>
            <li><strong>Pulse Surveys:</strong> Pesquisas rápidas realizadas trimestralmente para acompanhar indicadores específicos do ambiente organizacional.</li>
            <li>
              <strong>Indicadores internos:</strong> Monitoramento de:
              <ul className="list-disc pl-6 mt-1 space-y-1">
                <li>Rotatividade de colaboradores</li>
                <li>Absenteísmo</li>
                <li>Produtividade</li>
                <li>Engajamento da equipe</li>
              </ul>
            </li>
          </ul>
        </>
      )
    },
    {
      title: "6. Estratégias de Motivação",
      content: (
        <>
          <p>A empresa acredita que colaboradores motivados proporcionam experiências memoráveis aos clientes. Entre as principais estratégias adotadas estão:</p>
          <ul className="list-disc pl-8 space-y-1 mt-2">
            <li>Programa de reconhecimento por desempenho</li>
            <li>Premiações por inovação em processos</li>
            <li>Plano de desenvolvimento profissional</li>
            <li>Cultura de feedback construtivo</li>
            <li>Celebração de metas alcançadas</li>
            <li>Incentivo ao trabalho em equipe</li>
          </ul>
        </>
      )
    },
    {
      title: "7. Melhoria do Ambiente de Trabalho",
      content: (
        <>
          <p>A Bouche Nerveuse investe continuamente em melhorias que promovam segurança, conforto e integração entre os colaboradores. Entre as iniciativas adotadas estão:</p>
          <ul className="list-disc pl-8 space-y-1 mt-2">
            <li>Modernização constante de equipamentos</li>
            <li>Ambientes limpos, seguros e ergonômicos</li>
            <li>Espaços de convivência para integração</li>
            <li>Política de respeito, diversidade e inclusão</li>
            <li>Canal aberto para sugestões</li>
          </ul>
        </>
      )
    },
    {
      title: "8. Comunicação Interna",
      content: (
        <>
          <p>A comunicação clara e transparente fortalece o alinhamento entre equipes e liderança. Os principais canais utilizados são:</p>
          <ul className="list-disc pl-8 space-y-1 mt-2">
            <li>Reuniões periódicas de alinhamento</li>
            <li>Informativos internos digitais</li>
            <li>Murais informativos na área de produção</li>
            <li>Encontros entre lideranças e equipes</li>
            <li>Canal interno para dúvidas</li>
          </ul>
        </>
      )
    },
    {
      title: "9. Qualidade de Vida no Trabalho",
      content: (
        <>
          <p>A Bouche Nerveuse acredita que o cuidado com as pessoas é essencial para a excelência dos produtos. Entre as práticas adotadas estão:</p>
          <ul className="list-disc pl-8 space-y-1 mt-2">
            <li>Jornada de trabalho equilibrada</li>
            <li>Pausas adequadas durante o expediente</li>
            <li>Incentivo à alimentação saudável</li>
            <li>Programas de saúde e segurança</li>
            <li>Ergonomia no ambiente de trabalho</li>
            <li>Apoio psicológico aos colaboradores</li>
          </ul>
        </>
      )
    },
    {
      title: "10. Inclusão e Diversidade",
      content: (
        <>
          <p>A Bouche Nerveuse acredita que as diferenças tornam a empresa mais forte, criativa e inovadora.</p>
          <h3 className="font-bold mb-2 mt-4">Política de Inclusão</h3>
          <p>A empresa garante igualdade de oportunidades, independentemente de gênero, raça, orientação sexual, idade, religião ou deficiência.</p>
          <p className="mt-2">Nosso compromisso é manter um ambiente seguro, acolhedor e livre de preconceitos.</p>
        </>
      )
    },
    {
      title: "11. Ações Voltadas à Diversidade",
      content: (
        <>
          <ul className="list-disc pl-8 space-y-3">
            <li><strong>Recrutamento inclusivo:</strong> Processos seletivos focados em habilidades e competências, evitando vieses inconscientes.</li>
            <li><strong>Grupos de afinidade:</strong> Espaços seguros para troca de experiências e sugestões de melhorias.</li>
            <li><strong>Acessibilidade:</strong> Adaptação de espaços físicos e ferramentas digitais para pessoas com deficiência.</li>
          </ul>
        </>
      )
    },
    {
      title: "12. Código de Ética",
      content: (
        <>
          <p>O Código de Ética da Bouche Nerveuse estabelece diretrizes claras sobre o comportamento esperado de todos os colaboradores.</p>
          <p className="mt-2">A empresa não tolera qualquer forma de:</p>
          <ul className="list-disc pl-8 space-y-1 my-2">
            <li>discriminação</li>
            <li>assédio moral ou sexual</li>
            <li>desrespeito</li>
            <li>violência no ambiente de trabalho</li>
          </ul>
          <p>Todos os colaboradores devem contribuir para manter um ambiente baseado em respeito, dignidade e cooperação.</p>
        </>
      )
    },
    {
      title: "13. Canal de Denúncia",
      content: (
        <>
          <p>A Bouche Nerveuse disponibiliza um canal de denúncia anônimo, seguro e confidencial para relatar situações que violem os princípios da empresa.</p>
          
          <h3 className="font-bold mb-2 mt-4">Princípios do canal:</h3>
          <ul className="list-disc pl-8 space-y-2">
            <li><strong>Confidencialidade:</strong> Garantia de sigilo absoluto das informações.</li>
            <li><strong>Não retaliação:</strong> Nenhum colaborador sofrerá punições por realizar denúncias de boa-fé.</li>
            <li><strong>Investigação responsável:</strong> Todas as denúncias são analisadas com seriedade e imparcialidade.</li>
          </ul>

          <h3 className="font-bold mb-2 mt-4">Situações que podem ser relatadas:</h3>
          <ul className="list-disc pl-8 space-y-1">
            <li>Assédio moral ou sexual</li>
            <li>Discriminação</li>
            <li>Fraudes ou corrupção</li>
            <li>Violação de normas de segurança</li>
            <li>Sugestões de melhoria</li>
          </ul>
        </>
      )
    },
    {
      title: "14. Capacitação e Treinamentos",
      content: (
        <>
          <p>A Bouche Nerveuse investe no desenvolvimento contínuo da equipe por meio de treinamentos e programas de capacitação. Entre eles:</p>
          
          <ul className="list-disc pl-8 space-y-3 mt-4">
            <li>
              <strong>Treinamento em Libras:</strong> Capacitação básica e intermediária para atendimento acessível à comunidade surda.
            </li>
            <li>
              <strong>Workshops de diversidade:</strong> Encontros voltados para temas como letramento racial, equidade de gênero, inclusão LGBTQIAPN+ e combate ao capacitismo.
            </li>
            <li>
              <strong>Plataforma de cursos:</strong> Treinamentos online voltados para Libras, diversidade, liderança e comunicação inclusiva.
            </li>
          </ul>
        </>
      )
    },
    {
      title: "15. Compromisso Final",
      content: (
        <>
          <p>A reputação da Bouche Nerveuse é construída diariamente pelas atitudes de cada colaborador.</p>
          <p className="mt-2">O cumprimento deste Código de Ética e Conduta garante:</p>
          <ul className="list-disc pl-8 space-y-1 my-2">
            <li>relações de trabalho saudáveis</li>
            <li>respeito entre as pessoas</li>
            <li>qualidade nos produtos</li>
            <li>confiança dos clientes e parceiros</li>
          </ul>
          <p>Todos são responsáveis por praticar e fortalecer esses princípios em suas atividades diárias.</p>
        </>
      )
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Ações do Topo */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link href="/inclusao-e-diversidade" className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2">
            &larr; Voltar
          </Link>
          
          <div className="flex flex-wrap items-center gap-3">
            <a 
              href="https://docs.google.com/document/d/16hAsh7AJu0wkSNLTJs7-gG19HkPDCKCebA2ADAFnxrE/edit?usp=drivesdk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-semibold text-gray-600 hover:text-black border border-gray-300 hover:border-black px-4 py-2 rounded-md transition-all flex items-center gap-2 bg-white"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              Ver no Docs
            </a>
            <a 
              href="https://docs.google.com/document/d/16hAsh7AJu0wkSNLTJs7-gG19HkPDCKCebA2ADAFnxrE/export?format=pdf" 
              download="Codigo_de_Etica_Bouche_Nerveuse.pdf"
              className="text-sm font-semibold text-white bg-black hover:bg-gray-800 px-4 py-2 rounded-md transition-all shadow-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Baixar PDF
            </a>
          </div>
        </div>

        {/* Documento Estilo Papel Timbrado */}
        <div className="bg-white p-8 sm:p-12 md:p-16 shadow-md border border-gray-300 rounded-none relative">
          
          {/* Marca d'água discreta (opcional) */}
          <div className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-[0.02] overflow-hidden">
            <span className="font-serif text-[15rem] font-bold rotate-[-45deg] select-none whitespace-nowrap">BOUCHE NERVEUSE</span>
          </div>

          <div className="relative z-10">
            {/* Cabeçalho do Documento */}
            <div className="border-b-2 border-black pb-6 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-black uppercase tracking-wider">
                  Código de Ética e Conduta
                </h1>
                <p className="mt-3 text-sm text-black font-bold uppercase tracking-[0.2em]">
                  Bouche Nerveuse
                </p>
              </div>
              <div className="text-left md:text-right font-sans">
                <p className="text-xs text-black font-bold uppercase tracking-wider">Documento Oficial</p>
                <p className="text-xs text-gray-600 mt-1">Revisão: 01/2026</p>
                <p className="text-xs text-gray-600">Uso Interno e Externo</p>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="space-y-10 font-serif text-gray-900">
              {sections.map((section, index) => (
                <section key={index} className="text-justify leading-loose">
                  <h2 className="text-lg font-bold text-black mb-4 tracking-wide">
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>

            {/* Assinatura / Rodapé do Documento */}
            <div className="mt-20 pt-8 border-t border-gray-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                <div className="text-sm text-gray-600 font-serif">
                  <p>Documento aprovado pela Diretoria.</p>
                  <p className="mt-1">Bouche Nerveuse &copy; {new Date().getFullYear()} - Todos os direitos reservados.</p>
                </div>
                <div className="text-center md:text-right">
                  <div className="inline-block border-t border-black pt-2 px-8">
                    <p className="text-sm font-bold uppercase tracking-widest text-black">Diretoria Executiva</p>
                    <p className="text-xs text-gray-600">Bouche Nerveuse</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Elemento invisível para detectar o final da página com precisão */}
      <div ref={bottomRef} className="h-2 w-full mt-8"></div>

      {/* Botão Voltar ao Topo */}
      <button
        onClick={goToTop}
        className={`fixed bottom-12 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-black text-white shadow-2xl hover:bg-gray-800 transition-all duration-500 z-50 flex items-center gap-2 ${
          showTopBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Voltar ao topo"
      >
        <span className="font-semibold text-sm uppercase tracking-wider">Voltar ao Topo</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}
