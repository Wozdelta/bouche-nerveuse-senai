"use client";

import Image from 'next/image';
import { Instagram, MessageCircle, ArrowRight, Menu, X, ShieldCheck, Lock, Send, FileText, AlertCircle, CheckCircle2, Phone, Briefcase } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import DrawerMenu from '../../components/DrawerMenu';
import LoginButton from '../../components/LoginButton';

export default function OuvidoriaPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVagaAlertOpen, setIsVagaAlertOpen] = useState(false);
  const [chapa, setChapa] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getEmployeeInfo = () => {
    if (chapa === "123456") return { name: "Jonathan Rios", initials: "JR" };
    if (chapa === "654321") return { name: "João Abiel", initials: "JA" };
    return null;
  };

  const employeeInfo = getEmployeeInfo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setChapa("");
    }, 5000);
  };

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
            <a href="/clima-organizacional" className="hover:text-white transition-colors pb-1 text-white/80">Clima</a>
            <a href="/inclusao-e-diversidade" className="hover:text-white transition-colors pb-1 text-white/80">Inclusão</a>
            <a href="/ouvidoria" className="hover:text-white transition-colors pb-1 text-white">Ouvidoria</a>
            <a href="/vagas" className="hover:text-white transition-colors pb-1 text-white/80 uppercase tracking-wide">Vagas</a>
            <a href="/bouche-news" className="hover:text-white transition-colors pb-1 text-white/80">Bouche News</a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            <LoginButton />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 w-full flex items-center justify-center overflow-hidden bg-brown-dark">
        {/* Subtle background pattern or gradient */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-wine/30 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-black/60 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium tracking-wide uppercase mb-8"
          >
            <ShieldCheck size={16} className="text-wine-light" />
            Canal de Comunicação Seguro
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight mb-6"
          >
            Ouvidoria <span className="text-wine-light italic font-light">Digital</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Um espaço independente, confidencial e seguro para você relatar preocupações, sugerir melhorias ou esclarecer dúvidas éticas.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 pb-24 -mt-12 relative z-20">
        <div className="max-w-5xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Info Sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="lg:col-span-1 space-y-6"
            >
              <div className="bg-white p-8 rounded-3xl shadow-xl shadow-black/5 border border-gray-100/50 hover:border-wine/20 transition-colors">
                <div className="w-12 h-12 bg-wine/5 rounded-2xl flex items-center justify-center mb-6 text-wine">
                  <Lock size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-serif font-bold text-brown-dark mb-3">100% Confidencial</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Garantimos o sigilo absoluto da sua identidade e das informações relatadas. Você pode optar por fazer um relato anônimo.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-xl shadow-black/5 border border-gray-100/50 hover:border-wine/20 transition-colors">
                <div className="w-12 h-12 bg-wine/5 rounded-2xl flex items-center justify-center mb-6 text-wine">
                  <ShieldCheck size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-serif font-bold text-brown-dark mb-3">Sem Retaliação</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  A Bouche Nerveuse não tolera qualquer tipo de retaliação contra quem relata uma preocupação de boa-fé.
                </p>
              </div>

              <div className="bg-brown-dark text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-10 -mt-10"></div>
                <h3 className="text-xl font-serif font-bold mb-6 relative z-10">O que relatar?</h3>
                <ul className="space-y-4 text-sm text-white/70 relative z-10">
                  <li className="flex gap-3 items-start"><CheckCircle2 className="text-wine-light shrink-0 mt-0.5" size={16} /> <span>Assédio moral ou sexual</span></li>
                  <li className="flex gap-3 items-start"><CheckCircle2 className="text-wine-light shrink-0 mt-0.5" size={16} /> <span>Discriminação</span></li>
                  <li className="flex gap-3 items-start"><CheckCircle2 className="text-wine-light shrink-0 mt-0.5" size={16} /> <span>Fraudes ou corrupção</span></li>
                  <li className="flex gap-3 items-start"><CheckCircle2 className="text-wine-light shrink-0 mt-0.5" size={16} /> <span>Violação de normas de segurança</span></li>
                  <li className="flex gap-3 items-start"><CheckCircle2 className="text-wine-light shrink-0 mt-0.5" size={16} /> <span>Sugestões de melhoria</span></li>
                </ul>
              </div>
            </motion.div>

            {/* Form Area */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-wine/5 rounded-bl-full -mr-5 -mt-5"></div>
                
                <div className="relative z-10">
                  <h2 className="text-3xl font-serif font-bold text-brown-dark mb-2">Faça seu relato</h2>
                  <p className="text-gray-500 mb-8">Preencha os campos abaixo com o máximo de detalhes possível.</p>

                  {isSubmitted ? (
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-500">
                      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 size={32} />
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-green-800 mb-2">Relato Enviado!</h3>
                      <p className="text-green-700">
                        Agradecemos a sua contribuição. Seu relato foi registrado com sucesso e será analisado com total confidencialidade.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      
                      {/* Chapa */}
                      <div>
                        <label htmlFor="chapa" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                          Chapa do Colaborador
                        </label>
                        <input 
                          type="text" 
                          id="chapa"
                          value={chapa}
                          onChange={(e) => setChapa(e.target.value)}
                          placeholder="Ex: 123456"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-wine/50 focus:border-wine transition-all"
                        />
                      </div>

                      {/* Personalized Greeting */}
                      <AnimatePresence>
                        {employeeInfo && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: "auto" }}
                            exit={{ opacity: 0, y: -10, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-wine/10 border border-wine/20 rounded-xl p-6 mb-2">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                                  <span className="text-wine font-bold text-lg">{employeeInfo.initials}</span>
                                </div>
                                <div>
                                  <h3 className="text-xl font-serif font-bold text-brown-dark mb-1">
                                    Olá {employeeInfo.name}, como posso te ajudar?
                                  </h3>
                                  <p className="text-gray-600 text-sm">
                                    Estamos aqui para te ouvir. Por favor, detalhe a situação abaixo.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Anônimo Toggle */}
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <input 
                          type="checkbox" 
                          id="anonymous"
                          checked={isAnonymous}
                          onChange={(e) => setIsAnonymous(e.target.checked)}
                          className="w-5 h-5 text-wine border-gray-300 rounded focus:ring-wine"
                        />
                        <label htmlFor="anonymous" className="text-gray-700 font-medium cursor-pointer select-none">
                          Desejo fazer este relato de forma anônima
                        </label>
                      </div>

                      {/* Nome e Email (Hidden if anonymous) */}
                      {!isAnonymous && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
                          <div>
                            <label htmlFor="nome" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                              Nome Completo
                            </label>
                            <input 
                              type="text" 
                              id="nome"
                              defaultValue={employeeInfo ? employeeInfo.name : ""}
                              placeholder="Seu nome"
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-wine/50 focus:border-wine transition-all"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                              E-mail para contato
                            </label>
                            <input 
                              type="email" 
                              id="email"
                              placeholder="seu@email.com"
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-wine/50 focus:border-wine transition-all"
                            />
                          </div>
                        </div>
                      )}

                      {/* Tipo de Relato */}
                      <div>
                        <label htmlFor="tipo" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                          Tipo de Manifestação *
                        </label>
                        <select 
                          id="tipo"
                          required
                          defaultValue=""
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-wine/50 focus:border-wine transition-all appearance-none"
                        >
                          <option value="" disabled>Selecione uma opção</option>
                          <option value="denuncia">Denúncia</option>
                          <option value="reclamacao">Reclamação</option>
                          <option value="sugestao">Sugestão de Melhoria</option>
                          <option value="elogio">Elogio</option>
                          <option value="duvida">Dúvida Ética</option>
                        </select>
                      </div>

                      {/* Mensagem */}
                      <div>
                        <label htmlFor="mensagem" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                          Descrição do Relato *
                        </label>
                        <textarea 
                          id="mensagem"
                          required
                          rows={6}
                          placeholder="Descreva a situação com o máximo de detalhes (o que aconteceu, quando, onde, quem está envolvido)..."
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-wine/50 focus:border-wine transition-all resize-y"
                        ></textarea>
                      </div>

                      {/* Submit Button */}
                      <button 
                        type="submit"
                        className="w-full bg-wine hover:bg-wine-light text-white py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(183,28,28,0.3)] hover:shadow-[0_6px_20px_rgba(183,28,28,0.4)]"
                      >
                        <Send size={20} /> Enviar Relato de Forma Segura
                      </button>
                      
                      <p className="text-xs text-gray-400 text-center mt-4 flex items-center justify-center gap-1">
                        <Lock size={12} /> Seus dados são criptografados e protegidos.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

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
    </div>
  );
}
