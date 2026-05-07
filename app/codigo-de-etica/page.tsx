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
      title: "1. Introdução",
      content: (
        <>
          <p>O presente Código de Ética estabelece os princípios, valores e diretrizes que orientam as atividades e relações da nossa empresa de bolos e tortas. Nosso objetivo é garantir que todas as nossas ações sejam conduzidas com integridade, respeito, responsabilidade e compromisso com a qualidade.</p>
          <p>Este código orienta a conduta no relacionamento com clientes, colaboradores, fornecedores e parceiros, promovendo uma cultura baseada na confiança, na transparência e no profissionalismo.</p>
        </>
      )
    },
    {
      title: "2. Princípios e Valores",
      content: (
        <>
          <p>Nossa atuação é guiada pelos seguintes valores fundamentais:</p>
          <ul className="list-disc pl-8 space-y-1">
            <li><strong>Qualidade:</strong> Produzir bolos e tortas com excelência, sabor e cuidado.</li>
            <li><strong>Respeito:</strong> Tratar clientes, colaboradores e parceiros com dignidade e consideração.</li>
            <li><strong>Transparência:</strong> Comunicar informações claras e verdadeiras.</li>
            <li><strong>Responsabilidade:</strong> Cumprir compromissos assumidos.</li>
            <li><strong>Segurança alimentar:</strong> Garantir produtos seguros para consumo.</li>
            <li><strong>Ética:</strong> Agir sempre com honestidade e integridade.</li>
          </ul>
          <p>Esses princípios orientam todas as decisões e práticas da empresa.</p>
        </>
      )
    },
    {
      title: "3. Compromisso com a Qualidade dos Produtos",
      content: (
        <>
          <p>Todos os produtos oferecidos em nosso site são preparados com atenção aos detalhes, utilizando ingredientes de qualidade e seguindo padrões adequados de produção. Buscamos garantir:</p>
          <ul className="list-disc pl-8 space-y-1">
            <li>seleção cuidadosa de ingredientes;</li>
            <li>controle de qualidade durante a produção;</li>
            <li>apresentação adequada dos produtos;</li>
            <li>conservação correta até a entrega ao cliente.</li>
          </ul>
          <p>Nosso objetivo é proporcionar uma experiência positiva e satisfatória a cada cliente.</p>
        </>
      )
    },
    {
      title: "4. Segurança e Higiene Alimentar",
      content: (
        <>
          <p>A segurança alimentar é prioridade em todas as etapas da produção. Seguimos boas práticas de manipulação de alimentos, mantendo ambientes limpos, organizados e adequados para a preparação dos produtos. Além disso:</p>
          <ul className="list-disc pl-8 space-y-1">
            <li>mantemos cuidados rigorosos com higiene pessoal durante a produção;</li>
            <li>armazenamos ingredientes de forma adequada;</li>
            <li>informamos quando os produtos podem conter alergênicos como leite, ovos, glúten ou castanhas.</li>
          </ul>
          <p>Nosso compromisso é garantir alimentos seguros e confiáveis.</p>
        </>
      )
    },
    {
      title: "5. Atendimento ao Cliente",
      content: (
        <>
          <p>O relacionamento com nossos clientes deve ser baseado no respeito, na cordialidade e na transparência. Comprometemo-nos a:</p>
          <ul className="list-disc pl-8 space-y-1">
            <li>oferecer atendimento educado e atencioso;</li>
            <li>responder dúvidas e solicitações com clareza;</li>
            <li>informar corretamente sobre preços, ingredientes, tamanhos e prazos;</li>
            <li>buscar soluções justas em caso de problemas ou imprevistos.</li>
          </ul>
          <p>A satisfação do cliente é uma das nossas principais prioridades.</p>
        </>
      )
    },
    {
      title: "6. Transparência nas Informações",
      content: (
        <>
          <p>Todas as informações disponibilizadas em nosso site devem ser claras, verdadeiras e atualizadas. Isso inclui:</p>
          <ul className="list-disc pl-8 space-y-1">
            <li>descrição dos produtos;</li>
            <li>valores e condições de pagamento;</li>
            <li>prazos de produção e entrega;</li>
            <li>políticas de troca, cancelamento e reembolso.</li>
          </ul>
          <p>Não utilizamos práticas enganosas ou informações que possam induzir o cliente ao erro.</p>
        </>
      )
    },
    {
      title: "7. Compromisso com Prazos e Entregas",
      content: (
        <>
          <p>Respeitamos os prazos acordados com nossos clientes e buscamos garantir que todos os pedidos sejam produzidos e entregues conforme combinado.</p>
          <p>Caso ocorram situações imprevistas que possam afetar o prazo, o cliente será informado com antecedência e serão buscadas alternativas adequadas para solucionar a situação.</p>
        </>
      )
    },
    {
      title: "8. Relação com Fornecedores e Parceiros",
      content: (
        <>
          <p>A relação com fornecedores e parceiros deve ser baseada na ética, no respeito e na responsabilidade. Buscamos trabalhar com fornecedores que:</p>
          <ul className="list-disc pl-8 space-y-1">
            <li>ofereçam produtos de qualidade;</li>
            <li>sigam boas práticas de produção;</li>
            <li>atuem de forma responsável e ética.</li>
          </ul>
          <p>Valorizamos relações comerciais justas e transparentes.</p>
        </>
      )
    },
    {
      title: "9. Respeito e Ambiente de Trabalho",
      content: (
        <>
          <p>Promovemos um ambiente de trabalho saudável, respeitoso e colaborativo. Não são toleradas atitudes de:</p>
          <ul className="list-disc pl-8 space-y-1">
            <li>discriminação;</li>
            <li>assédio moral ou sexual;</li>
            <li>desrespeito ou comportamento abusivo.</li>
          </ul>
          <p>Valorizamos a diversidade, o respeito às diferenças e a cooperação entre todos.</p>
        </>
      )
    },
    {
      title: "10. Sustentabilidade e Responsabilidade Social",
      content: (
        <>
          <p>Sempre que possível, buscamos adotar práticas mais sustentáveis em nossas atividades, como:</p>
          <ul className="list-disc pl-8 space-y-1">
            <li>redução de desperdício de alimentos;</li>
            <li>uso consciente de recursos;</li>
            <li>escolha de embalagens adequadas;</li>
            <li>apoio a práticas responsáveis de produção.</li>
          </ul>
          <p>Reconhecemos que pequenas ações podem contribuir para um impacto positivo no meio ambiente e na sociedade.</p>
        </>
      )
    },
    {
      title: "11. Privacidade e Proteção de Dados",
      content: (
        <>
          <p>Respeitamos a privacidade dos nossos clientes e protegemos as informações pessoais coletadas através do site. Os dados fornecidos pelos clientes são utilizados apenas para:</p>
          <ul className="list-disc pl-8 space-y-1">
            <li>processamento de pedidos;</li>
            <li>comunicação relacionada ao atendimento;</li>
            <li>melhoria dos nossos serviços.</li>
          </ul>
          <p>Não compartilhamos informações pessoais sem autorização, exceto quando exigido por lei.</p>
        </>
      )
    },
    {
      title: "12. Integridade e Conduta Ética",
      content: (
        <>
          <p>Esperamos que todas as atividades relacionadas à empresa sejam conduzidas com honestidade e integridade. Não são permitidas práticas como:</p>
          <ul className="list-disc pl-8 space-y-1">
            <li>fraude;</li>
            <li>falsificação de informações;</li>
            <li>concorrência desleal;</li>
            <li>uso indevido da marca ou imagem da empresa.</li>
          </ul>
          <p>Todas as decisões devem considerar princípios éticos e o respeito às leis.</p>
        </>
      )
    },
    {
      title: "13. Melhoria Contínua",
      content: (
        <>
          <p>Buscamos constantemente aprimorar nossos produtos, processos e atendimento.</p>
          <p>Valorizamos feedbacks de clientes e parceiros como forma de melhorar nossos serviços e fortalecer nossa qualidade.</p>
        </>
      )
    },
    {
      title: "14. Disposições Finais",
      content: (
        <>
          <p>Este Código de Ética orienta a forma como conduzimos nossas atividades e relações profissionais.</p>
          <p>Nos comprometemos a manter esses princípios em todas as nossas ações, garantindo que nossa empresa seja reconhecida pela qualidade dos produtos, pelo respeito aos clientes e pela atuação responsável no mercado.</p>
        </>
      )
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Botão Voltar */}
        <div className="mb-6">
          <Link href="/inclusao-e-diversidade" className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2">
            &larr; Voltar
          </Link>
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
