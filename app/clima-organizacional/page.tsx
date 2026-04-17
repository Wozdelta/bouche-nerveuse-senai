"use client";

import Image from 'next/image';
import { Instagram, MessageCircle, ArrowRight, Menu, X, BarChart, Star, MessageSquare, Briefcase, TrendingUp, CheckCircle2, Leaf, Headphones, Phone, Activity, QrCode } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import DrawerMenu from '../../components/DrawerMenu';
import LoginButton from '../../components/LoginButton';

export default function ClimaOrganizacionalPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVagaAlertOpen, setIsVagaAlertOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [indicadores, setIndicadores] = useState({
    diversidade: 0,
    qualidadeTrabalho: 0,
    valorizacao: 0,
    qualidadeProduto: 0
  });

  useEffect(() => {
    const fetchIndicadores = async () => {
      try {
        const res = await fetch('/api/clima-indicadores');
        const data = await res.json();
        setIndicadores({
          diversidade: data.diversidade || 0,
          qualidadeTrabalho: data.qualidadeTrabalho || 0,
          valorizacao: data.valorizacao || 0,
          qualidadeProduto: data.qualidadeProduto || 0
        });
      } catch (error) {
        console.error("Erro ao buscar indicadores", error);
      }
    };
    
    // Busca inicial
    fetchIndicadores();
    
    // Atualiza automaticamente a cada 5 segundos
    const interval = setInterval(fetchIndicadores, 5000);
    
    // Limpa o intervalo quando o componente desmontar
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#fdfbfb] font-sans text-brown-dark overflow-x-hidden">
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsMenuOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#b71c1c] hover:bg-[#d32f2f] text-white rounded-full shadow-[0_4px_20px_rgba(183,28,28,0.4)] hover:shadow-[0_6px_25px_rgba(183,28,28,0.6)] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Open Menu"
      >
        <div className="flex flex-col gap-[5px] items-center justify-center w-6">
          <span className="w-full h-[3px] bg-white rounded-full"></span>
          <span className="w-full h-[3px] bg-white rounded-full"></span>
          <span className="w-full h-[3px] bg-white rounded-full"></span>
        </div>
      </button>

      {/* Side Menu Drawer */}
      <DrawerMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brown-dark/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex flex-col leading-none text-white cursor-pointer">
            <span className="font-serif text-2xl tracking-wider">Bouche</span>
            <span className="font-script text-4xl text-wine-light -mt-3 ml-4">Nerveuse</span>
          </a>
          
          {/* Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm text-white/90 font-medium tracking-wide uppercase">
            <a href="/" className="hover:text-white transition-colors pb-1 text-white/80">Home</a>
            <a href="/historia" className="hover:text-white transition-colors pb-1 text-white/80">Cultura</a>
            <a href="/clima-organizacional" className="hover:text-white transition-colors pb-1 text-white border-b-2 border-wine-light">Clima</a>
            <a href="/inclusao-e-diversidade" className="hover:text-white transition-colors pb-1 text-white/80">Inclusão</a>
            <a href="/vagas" className="hover:text-white transition-colors pb-1 text-white/80 uppercase tracking-wide">Vagas</a>
            <a href="/bouche-news" className="hover:text-white transition-colors pb-1 text-white/80">Bouche News</a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            <LoginButton />
            <a href="/ouvidoria" className="hidden sm:flex bg-[#b71c1c] hover:bg-[#d32f2f] text-white px-6 py-2.5 rounded-full font-bold transition-all items-center gap-2 shadow-[0_0_15px_rgba(183,28,28,0.3)] hover:shadow-[0_0_20px_rgba(183,28,28,0.5)]">
              Ouvidoria Digital <Phone size={18} />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] w-full flex items-center justify-center overflow-hidden bg-[#1a1614] pt-20">
        <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-wine blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-600 blur-[120px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col"
          >
            <h1 className="text-6xl md:text-8xl font-serif font-light text-white leading-[0.9] tracking-tight mb-6">
              Clima <br />
              <span className="font-script text-wine-light text-7xl md:text-9xl block mt-2">Organizacional</span>
            </h1>
            
            <p className="text-white/60 text-lg md:text-xl font-light max-w-md leading-relaxed mb-10">
              Acreditamos que o bem-estar da nossa equipe é o ingrediente principal para criar experiências memoráveis.
            </p>
            

          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative h-[60vh] w-full hidden lg:block"
          >
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden border border-white/10">
              <Image 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop" 
                alt="Equipe trabalhando" 
                fill 
                className="object-cover"
                priority
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1614] via-transparent to-transparent opacity-60"></div>
            </div>
            
          </motion.div>
        </div>
        
      </section>

      {/* Main Content */}
      <main className="px-4 pb-24 -mt-10 relative z-20">
        <div className="max-w-6xl mx-auto space-y-24">

          {/* Indicadores em Tempo Real */}
          <section id="indicadores" className="bg-white rounded-[2rem] p-10 lg:p-14 shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-wine/5 rounded-bl-full -mr-10 -mt-10"></div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-wine/10 rounded-xl cursor-pointer hover:bg-wine/20 transition-colors" onClick={() => setIsQRModalOpen(true)}><Activity className="text-wine" size={28} /></div>
                    <h2 className="text-3xl font-serif font-bold text-brown-dark">Indicadores em Tempo Real</h2>
                  </div>
                  <p className="text-gray-600 text-lg max-w-2xl">
                    Acompanhe os resultados da nossa pesquisa de clima organizacional. Os dados são atualizados conforme nossa equipe responde ao formulário interno.
                  </p>
                </div>
                <a 
                  href="https://docs.google.com/forms/d/1u7mrz_eH3g8m4Up7gq1IPz7AGa0RZaTRfBcQut57w14/viewform" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-wine hover:bg-wine-light text-white px-6 py-3 rounded-full font-medium transition-colors whitespace-nowrap"
                >
                  Responder Pesquisa <ArrowRight size={18} />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { label: "DIVERSIDADE E INCLUSÃO", value: indicadores.diversidade },
                  { label: "QUALIDADE NO TRABALHO", value: indicadores.qualidadeTrabalho },
                  { label: "VALORIZAÇÃO DO TRABALHO", value: indicadores.valorizacao },
                  { label: "QUALIDADE DO PRODUTO", value: indicadores.qualidadeProduto }
                ].map((ind, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col items-center text-center group hover:border-wine/30 transition-colors">
                    <div className="relative w-32 h-32 mb-6">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle 
                          cx="50" cy="50" r="40" 
                          fill="transparent" 
                          stroke="#f3f4f6" 
                          strokeWidth="8" 
                        />
                        <circle 
                          cx="50" cy="50" r="40" 
                          fill="transparent" 
                          stroke="#b71c1c" 
                          strokeWidth="8" 
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - ind.value / 100)}`}
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-brown-dark">{ind.value}%</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-sm text-gray-800 tracking-wide">{ind.label}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Clima Organizacional & Estratégias */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Clima */}
            <div className="bg-brown-dark text-white p-10 lg:p-14 rounded-[2rem] shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-full -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-white/10 rounded-xl"><BarChart className="text-wine-light" size={28} /></div>
                  <h2 className="text-3xl font-serif font-bold">Como Medimos o Clima</h2>
                </div>
                <p className="text-white/80 mb-8 text-lg">A Bouche Nerveuse utiliza métodos formais e contínuos para avaliar o clima interno:</p>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <CheckCircle2 className="text-wine-light shrink-0 mt-1" size={20} />
                    <div>
                      <strong className="block text-lg mb-1">Pesquisa Anual (Anônima)</strong>
                      <span className="text-white/70">Avalia satisfação, liderança, comunicação, reconhecimento e condições de trabalho.</span>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="text-wine-light shrink-0 mt-1" size={20} />
                    <div>
                      <strong className="block text-lg mb-1">Pulse Surveys</strong>
                      <span className="text-white/70">Pesquisas rápidas trimestrais para acompanhar indicadores específicos.</span>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="text-wine-light shrink-0 mt-1" size={20} />
                    <div>
                      <strong className="block text-lg mb-1">Indicadores Internos</strong>
                      <span className="text-white/70">Monitoramento de rotatividade, absenteísmo, produtividade e engajamento.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Estratégias */}
            <div className="bg-white p-10 lg:p-14 rounded-[2rem] shadow-xl border border-gray-100 relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-wine/5 rounded-tl-full -mr-5 -mb-5 transition-transform duration-700 group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-wine/10 rounded-xl"><Star className="text-wine" size={28} /></div>
                  <h2 className="text-3xl font-serif font-bold text-brown-dark">Estratégias de Motivação</h2>
                </div>
                <p className="text-gray-600 mb-8 text-lg">Entendemos que colaboradores motivados produzem experiências memoráveis. Nossas principais estratégias:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Programa de reconhecimento por desempenho",
                    "Premiações por inovação em processos",
                    "Plano de desenvolvimento profissional",
                    "Cultura de feedback construtivo",
                    "Celebração de metas alcançadas",
                    "Incentivo ao trabalho em equipe"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-wine/30 transition-colors">
                      <TrendingUp className="text-wine shrink-0 mt-0.5" size={18} />
                      <span className="text-gray-800 font-medium text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Ações & Comunicação */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-wine/10 rounded-xl"><Leaf className="text-wine" size={24} /></div>
                <h3 className="text-2xl font-serif font-bold text-brown-dark">Melhoria do Ambiente</h3>
              </div>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-wine rounded-full"></div> Modernização constante de equipamentos</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-wine rounded-full"></div> Ambientes limpos, seguros e ergonômicos</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-wine rounded-full"></div> Espaços de convivência para integração</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-wine rounded-full"></div> Política de respeito, diversidade e inclusão</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-wine rounded-full"></div> Canal aberto para sugestões</li>
              </ul>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-wine/10 rounded-xl"><MessageSquare className="text-wine" size={24} /></div>
                <h3 className="text-2xl font-serif font-bold text-brown-dark">Comunicação Interna</h3>
              </div>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-wine rounded-full"></div> Reuniões periódicas de alinhamento</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-wine rounded-full"></div> Informativos internos digitais</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-wine rounded-full"></div> Murais informativos na produção</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-wine rounded-full"></div> Encontros entre lideranças e equipes</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-wine rounded-full"></div> Canal interno para dúvidas</li>
              </ul>
            </div>
          </section>

          {/* Qualidade de Vida */}
          <section className="bg-gradient-to-br from-wine to-brown-dark rounded-[2rem] p-10 lg:p-16 text-white shadow-2xl relative overflow-hidden text-center group">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-full -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-110"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-tr-full -ml-5 -mb-5 transition-transform duration-700 group-hover:scale-110"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <Briefcase className="mx-auto text-wine-light mb-6" size={48} />
              <h2 className="text-3xl lg:text-5xl font-serif font-bold mb-6">Qualidade de Vida no Trabalho</h2>
              <p className="text-white/80 text-lg mb-10">
                Acreditamos que o cuidado com as pessoas é essencial para a excelência dos produtos. Proporcionar qualidade de vida aos colaboradores impacta diretamente na satisfação dos clientes.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  "Jornada equilibrada",
                  "Pausas adequadas",
                  "Alimentação saudável",
                  "Saúde e segurança",
                  "Ergonomia",
                  "Apoio psicológico"
                ].map((item, idx) => (
                  <span key={idx} className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full text-sm font-medium hover:bg-white/20 transition-colors cursor-default">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>

        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-[#1b0f0d] text-white/60 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col leading-none text-white opacity-50">
            <span className="font-serif text-xl tracking-wider">Bouche</span>
            <span className="font-script text-2xl text-wine-light -mt-2 ml-4">Nerveuse</span>
          </div>
          <p className="text-sm">© 2026 Bouche Nerveuse. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="/creditos" className="hover:text-white transition-colors">Créditos</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
          </div>
        </div>
      </footer>

      {/* Vagas Alert Modal */}
      {isVagaAlertOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center relative shadow-2xl animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setIsVagaAlertOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 transition-colors"
            >
              <X size={18} />
            </button>
            <div className="w-16 h-16 bg-wine/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="text-wine" size={32} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-brown-dark mb-4">Nenhuma vaga no momento</h3>
            <p className="text-gray-600 mb-8">
              Atualmente não temos vagas abertas, mas estamos sempre em busca de talentos. Acompanhe nossas redes sociais para futuras oportunidades!
            </p>
            <button 
              onClick={() => setIsVagaAlertOpen(false)}
              className="w-full bg-wine hover:bg-wine-light text-white py-3 rounded-xl font-medium transition-colors"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
      {/* QR Code Modal */}
      <div className={`fixed inset-0 z-[105] flex items-center justify-center p-4 transition-all duration-300 ${isQRModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setIsQRModalOpen(false)}></div>
        <div className={`relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/20 transition-all duration-500 transform ${isQRModalOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}`}>
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-wine/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <QrCode className="text-wine" size={32} />
            </div>
            <h2 className="font-serif text-2xl font-bold text-brown-dark mb-2">Pesquisa de Clima</h2>
            <p className="text-gray-500 text-sm">Escaneie o QR Code para acessar o formulário</p>
          </div>

          {/* QR Code Image */}
          <div className="relative bg-white rounded-2xl p-6 border-2 border-gray-200 flex flex-col items-center justify-center mb-6">
            <div className="w-64 h-64 rounded-xl overflow-hidden relative flex items-center justify-center">
              <img 
                src="/QRCode_Fácil.svg" 
                alt="QR Code Pesquisa de Clima"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-wine/5 rounded-xl p-4 mb-6">
            <p className="text-gray-600 text-sm text-center">
              Aponte a câmera do seu celular para o QR Code e acesse diretamente a pesquisa de clima organizacional.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <a 
              href="https://docs.google.com/forms/d/1u7mrz_eH3g8m4Up7gq1IPz7AGa0RZaTRfBcQut57w14/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-wine hover:bg-wine-light text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <ArrowRight size={18} />
              Abrir Formulário
            </a>
            <button 
              onClick={() => setIsQRModalOpen(false)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl transition-all duration-300 border border-gray-200"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
