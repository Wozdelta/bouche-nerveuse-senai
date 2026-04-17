"use client";

import Image from 'next/image';
import { Instagram, MessageCircle, ArrowRight, Menu, X, Target, Award, Users, Leaf, Heart, ShieldCheck, BarChart, Star, MessageSquare, Briefcase, TrendingUp, CheckCircle2, Headphones, Phone } from 'lucide-react';
import { useState } from 'react';
import DrawerMenu from '../../components/DrawerMenu';
import LoginButton from '../../components/LoginButton';

export default function HistoriaPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVagaAlertOpen, setIsVagaAlertOpen] = useState(false);

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
            <a href="/historia" className="hover:text-white transition-colors pb-1 text-white border-b-2 border-wine-light">Cultura</a>
            <a href="/clima-organizacional" className="hover:text-white transition-colors pb-1 text-white/80">Clima</a>
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

      {/* Hero Section with France Image */}
      <section className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020&auto=format&fit=crop" 
            alt="Paris, França" 
            fill 
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 mt-20">
          <h1 className="flex flex-col leading-none mb-6">
            <span className="font-serif text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-lg">Nossa</span>
            <span className="font-script text-7xl md:text-9xl text-wine-light -mt-6 md:-mt-10 drop-shadow-xl">História</span>
          </h1>
          <p className="text-white/90 text-lg md:text-2xl font-serif max-w-2xl mx-auto drop-shadow-md">
            De Marcelha para o Brasil: a tradição da alta confeitaria industrial.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 pb-24 -mt-20 relative z-20">
        <div className="max-w-6xl mx-auto space-y-24">
          
          {/* Origem Section */}
          <section className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
                <div className="w-12 h-1 bg-wine mb-8 rounded-full"></div>
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brown-dark mb-6 leading-tight">
                  O Início de um <span className="text-wine italic">Sonho</span>
                </h2>
                <div className="space-y-6 text-gray-600 text-base lg:text-lg leading-relaxed">
                  <p>
                    Criada em <strong className="text-brown-dark">27/07/1945</strong> na cidade de Marcelha na França, a Bouche Nerveuse nasceu do sonho de despertar experiências memoráveis por meio do sabor marcante e experiências irresistíveis na vida das pessoas por meio da confeitaria industrial.
                  </p>
                  <p>
                    Fundada por cinco empreendedores apaixonados pela alta gastronomia, a empresa iniciou suas atividades em uma pequena cozinha, produzindo bolos caseiros e tortas sob encomenda para amigos e familiares.
                  </p>
                  <p>
                    Com o crescimento da demanda e o reconhecimento pela qualidade e sabor diferenciados, a Bouche Nerveuse expandiu sua produção, investiu em equipamentos modernos e estruturou sua marca no mercado alimentício. Hoje, atua na fabricação de bolos e tortas industriais, combinando tradição, inovação e excelência no atendimento.
                  </p>
                  <p>
                    Seu auge começou em <strong className="text-brown-dark">1990</strong>. A venda de doces gourmet era apenas para a cidade de Marcelha, na França. A partir desse ano, começou a vender para o exterior e logo criou uma sede no Rio de Janeiro, onde o sucesso foi tão grande que, ao decorrer dos anos, foram criadas franquias em mais cidades brasileiras (São Paulo-SP, Matão-SP, Florianópolis-SC, Salvador-BA, Xique-Xique-BA, Brasília-DF e Curitiba-PR).
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 relative min-h-[400px] md:min-h-full">
                <Image 
                  src="/Sao paulo.png" 
                  alt="São Paulo" 
                  fill 
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </section>

          {/* Por Que Bouche Nerveuse Section */}
          <section className="bg-gradient-to-br from-wine/5 to-wine/10 rounded-[2rem] shadow-xl overflow-hidden border border-wine/20">
            <div className="flex flex-col md:flex-row-reverse">
              <div className="md:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
                <div className="w-12 h-1 bg-wine mb-8 rounded-full"></div>
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brown-dark mb-6 leading-tight">
                  Por Que <span className="text-wine italic">Bouche Nerveuse?</span>
                </h2>
                <div className="space-y-6 text-gray-600 text-base lg:text-lg leading-relaxed">
                  <p>
                    O nome <strong className="text-brown-dark">Bouche Nerveuse</strong> tem origem na língua francesa e pode ser interpretado como "boca nervosa" ou "boca inquieta", uma expressão associada à vontade constante de experimentar sabores marcantes e irresistíveis.
                  </p>
                  <p>
                    Os fundadores escolheram esse nome para representar a ideia de que os doces da marca despertam sensações intensas e inesquecíveis, estimulando o paladar e criando uma experiência única para quem prova seus produtos.
                  </p>
                  <p>
                    Assim, o nome simboliza <strong className="text-brown-dark">prazer, desejo e emoção</strong> ao degustar cada doce, reforçando a identidade da empresa no universo da confeitaria gourmet.
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 relative min-h-[400px] md:min-h-full bg-wine/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <span className="font-script text-8xl lg:text-9xl text-wine drop-shadow-lg">Bouche</span>
                    <span className="font-script text-6xl lg:text-7xl text-wine-light block -mt-4">Nerveuse</span>
                    <p className="mt-6 text-wine/80 font-serif text-lg italic">"A boca inquieta pelo sabor perfeito"</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Valores Organizacionais */}
          <section>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl lg:text-5xl text-brown-dark font-bold mb-4">Valores Organizacionais</h2>
              <p className="text-gray-500 text-lg">Os pilares que sustentam a Bouche Nerveuse</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Users, title: "Pessoas em primeiro lugar", desc: "Valorizamos colaboradores, clientes e parceiros, promovendo respeito, bem-estar e desenvolvimento." },
                { icon: Award, title: "Excelência na qualidade em nossos doces", desc: "Garantimos alto padrão de qualidade, utilizando bons ingredientes e seguindo normas de higiene e segurança." },
                { icon: Target, title: "Compromisso com os consumidores", desc: "Buscamos atender e superar as expectativas, oferecendo produtos de qualidade e bom atendimento." },
                { icon: Leaf, title: "Sustentabilidade e Responsabilidade Social", desc: "Adotamos práticas conscientes, reduzindo desperdícios e contribuindo com a comunidade." },
                { icon: Heart, title: "Paixão pelo que fazemos", desc: "Trabalhamos com dedicação e amor pela confeitaria, colocando cuidado em cada produto." },
                { icon: ShieldCheck, title: "Ética e Transparência", desc: "Agimos com honestidade e responsabilidade em todas as relações da empresa." }
              ].map((valor, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-gray-50 group">
                  <div className="w-14 h-14 bg-wine/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-wine transition-colors">
                    <valor.icon className="text-wine group-hover:text-white transition-colors" size={28} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-brown-dark mb-3">{valor.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{valor.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Liderança e Comportamentos */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Liderança */}
            <div className="bg-brown-dark text-white p-10 lg:p-14 rounded-[2rem] shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-full -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-white/10 rounded-xl"><Users className="text-wine-light" size={28} /></div>
                  <h3 className="text-3xl font-serif font-bold">Estilo de Liderança</h3>
                </div>
                <p className="text-white/80 mb-8 text-lg leading-relaxed">
                  Acreditamos em uma liderança inspiradora, participativa e próxima. Nossos líderes atuam como facilitadores do sucesso da equipe.
                </p>
                <ul className="space-y-5">
                  {[
                    "Desenvolvimento contínuo da equipe",
                    "Cultura de feedback construtivo",
                    "Ambiente de confiança e colaboração",
                    "Valorização de cada colaborador"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-wine/40 flex items-center justify-center shrink-0">
                        <Star className="text-wine-light" size={16} />
                      </div>
                      <span className="text-white/90 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Comportamentos */}
            <div className="bg-white p-10 lg:p-14 rounded-[2rem] shadow-xl border border-gray-100 relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-wine/5 rounded-tl-full -mr-5 -mb-5 transition-transform duration-700 group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-wine/10 rounded-xl"><ShieldCheck className="text-wine" size={28} /></div>
                  <h3 className="text-3xl font-serif font-bold text-brown-dark">Comportamentos Esperados</h3>
                </div>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  Nossa identidade é refletida nas atitudes diárias. Esperamos que todos atuem com ética, respeito e transparência.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Ética e Transparência",
                    "Excelência e Pontualidade",
                    "Higiene e Segurança",
                    "Espírito de Equipe",
                    "Paixão por Servir",
                    "Respeito Mútuo"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-wine/30 transition-colors">
                      <CheckCircle2 className="text-wine shrink-0" size={18} />
                      <span className="text-gray-800 font-medium text-sm">{item}</span>
                    </div>
                  ))}
                </div>
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

      {/* Vaga Alert Modal */}
      {isVagaAlertOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-300 text-center border border-gray-100">
            <div className="w-16 h-16 bg-wine-light/10 text-wine rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <h3 className="font-serif text-3xl font-bold text-brown-dark mb-2">Em breve</h3>
            <p className="text-gray-500 mb-6">Nossa página de vagas estará disponível em breve. Fique ligado!</p>
            <button 
              onClick={() => setIsVagaAlertOpen(false)}
              className="w-full bg-wine hover:bg-wine-light text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-md"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
