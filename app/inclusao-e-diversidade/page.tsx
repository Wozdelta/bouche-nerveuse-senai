"use client";

import Image from 'next/image';
import { Instagram, MessageCircle, ArrowRight, Menu, X, Heart, Users, ShieldCheck, AlertTriangle, BookOpen, CheckCircle2, Phone, Briefcase, Video, Ear, GraduationCap, Languages, PlayCircle, Clock, Filter } from 'lucide-react';
import { useState } from 'react';
import DrawerMenu from '../../components/DrawerMenu';
import LoginButton from '../../components/LoginButton';

export default function InclusaoDiversidadePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVagaAlertOpen, setIsVagaAlertOpen] = useState(false);
  const [cursoFiltro, setCursoFiltro] = useState('Todos');

  const cursos = [
    {
      id: 1,
      titulo: 'Libras Básico para Atendimento',
      categoria: 'Libras',
      duracao: '4h 30m',
      instrutor: 'Kaiky Silva Leão',
      imagem: '/Libras Básico para Atendimento.png',
      modulos: 12
    },
    {
      id: 2,
      titulo: 'Comunicação Inclusiva no Trabalho',
      categoria: 'Diversidade',
      duracao: '2h 15m',
      instrutor: 'Kaiky Silva Leão',
      imagem: '/Comunicação Inclusiva no Trabalho.png',
      modulos: 6
    },
    {
      id: 3,
      titulo: 'Liderança e Equidade de Gênero',
      categoria: 'Liderança',
      duracao: '3h 45m',
      instrutor: 'Kaiky Silva Leão',
      imagem: '/Liderança e Equidade de Gênero.png',
      modulos: 8
    },
    {
      id: 4,
      titulo: 'Combate ao Capacitismo',
      categoria: 'Diversidade',
      duracao: '1h 50m',
      instrutor: 'Kaiky Silva Leão',
      imagem: '/Combate ao Capacitismo.png',
      modulos: 5
    },
    {
      id: 5,
      titulo: 'Libras Intermediário: Contexto Gastronômico',
      categoria: 'Libras',
      duracao: '5h 20m',
      instrutor: 'Kaiky Silva Leão',
      imagem: '/Libras Intermediário Contexto Gastronômico.png',
      modulos: 15
    },
    {
      id: 6,
      titulo: 'Vieses Inconscientes na Contratação',
      categoria: 'Liderança',
      duracao: '2h 30m',
      instrutor: 'Kaiky Silva Leão',
      imagem: '/Vieses Inconscientes na Contratação.png',
      modulos: 7
    }
  ];

  const categorias = ['Todos', 'Libras', 'Diversidade', 'Liderança'];

  const cursosFiltrados = cursoFiltro === 'Todos' 
    ? cursos 
    : cursos.filter(curso => curso.categoria === cursoFiltro);

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
            <a href="/inclusao-e-diversidade" className="hover:text-white transition-colors pb-1 text-white border-b-2 border-wine-light">Inclusão</a>
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
      <section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://picsum.photos/seed/inclusion-hero/1920/1080" 
            alt="Diversidade na equipe" 
            fill 
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 mt-20">
          <h1 className="flex flex-col leading-none mb-6">
            <span className="font-serif text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-lg">Inclusão e</span>
            <span className="font-script text-7xl md:text-9xl text-wine-light -mt-6 md:-mt-10 drop-shadow-xl">Diversidade</span>
          </h1>
          <p className="text-white/90 text-lg md:text-2xl font-serif max-w-2xl mx-auto drop-shadow-md">
            Acreditamos que as diferenças nos tornam mais fortes e inovadores.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 pb-24 -mt-10 relative z-20">
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Intro & Política */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-10 lg:p-14 rounded-[2rem] shadow-xl border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-wine/5 rounded-bl-full -mr-5 -mt-5 transition-transform duration-700 group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-wine/10 rounded-xl"><Heart className="text-wine" size={28} /></div>
                  <h2 className="text-3xl font-serif font-bold text-brown-dark">Política Formal de Inclusão</h2>
                </div>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  A Bouche Nerveuse possui uma política formal de inclusão que garante igualdade de oportunidades para todos, independentemente de gênero, raça, orientação sexual, idade ou deficiência.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Nosso compromisso é criar um ambiente de trabalho seguro, acolhedor e livre de preconceitos, onde cada indivíduo possa expressar sua autenticidade e alcançar seu pleno potencial.
                </p>
              </div>
            </div>

            <div className="bg-brown-dark text-white p-10 lg:p-14 rounded-[2rem] shadow-xl relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-tl-full -mr-10 -mb-10 transition-transform duration-700 group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-white/10 rounded-xl"><Users className="text-wine-light" size={28} /></div>
                  <h2 className="text-3xl font-serif font-bold">Ações Voltadas à Diversidade</h2>
                </div>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <CheckCircle2 className="text-wine-light shrink-0 mt-1" size={20} />
                    <div>
                      <strong className="block text-lg mb-1">Recrutamento Inclusivo</strong>
                      <span className="text-white/70">Processos seletivos focados em habilidades e competências, sem vieses inconscientes.</span>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="text-wine-light shrink-0 mt-1" size={20} />
                    <div>
                      <strong className="block text-lg mb-1">Grupos de Afinidade</strong>
                      <span className="text-white/70">Espaços seguros para troca de experiências e proposição de melhorias.</span>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="text-wine-light shrink-0 mt-1" size={20} />
                    <div>
                      <strong className="block text-lg mb-1">Acessibilidade</strong>
                      <span className="text-white/70">Adaptação de espaços físicos e ferramentas digitais para pessoas com deficiência.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Ética, Denúncia e Treinamento */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow flex flex-col">
              <div className="w-14 h-14 bg-wine/10 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="text-wine" size={28} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-brown-dark mb-4">Código de Ética</h3>
              <p className="text-gray-600 leading-relaxed flex-1">
                Nosso Código de Ética e Conduta estabelece diretrizes claras sobre o comportamento esperado de todos os colaboradores, repudiando qualquer forma de discriminação, assédio ou desrespeito no ambiente de trabalho.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow flex flex-col">
              <div className="w-14 h-14 bg-wine/10 rounded-xl flex items-center justify-center mb-6">
                <AlertTriangle className="text-wine" size={28} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-brown-dark mb-4">Canal de Denúncia</h3>
              <p className="text-gray-600 leading-relaxed flex-1">
                Disponibilizamos um canal de denúncia anônimo, seguro e confidencial, gerido por uma empresa independente. Todas as denúncias são investigadas rigorosamente, garantindo a proteção do denunciante contra retaliações.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow flex flex-col">
              <div className="w-14 h-14 bg-wine/10 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="text-wine" size={28} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-brown-dark mb-4">Treinamento sobre Diversidade</h3>
              <p className="text-gray-600 leading-relaxed flex-1">
                Promovemos treinamentos regulares e workshops interativos para toda a liderança e equipe, abordando temas como vieses inconscientes, comunicação inclusiva e a importância da diversidade para a inovação.
              </p>
            </div>
          </section>

          {/* Treinamentos de Libras e Diversidade */}
          <section className="mt-20 mb-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-brown-dark mb-4">Capacitação e Inclusão na Prática</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Oferecemos diversos treinamentos para garantir que nossa equipe esteja preparada para acolher e atender a todos com excelência e empatia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Libras */}
              <div className="bg-wine/5 p-8 rounded-3xl border border-wine/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-wine/10 rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-wine text-white rounded-xl flex items-center justify-center shadow-md">
                      <Languages size={28} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-brown-dark">Treinamento em Libras</h3>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Capacitamos nossos colaboradores com o curso básico e intermediário de Língua Brasileira de Sinais (Libras), garantindo um atendimento acessível e humanizado para a comunidade surda em todas as nossas unidades.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-gray-700">
                      <CheckCircle2 className="text-wine shrink-0" size={18} />
                      <span>Módulos práticos de atendimento ao cliente</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                      <CheckCircle2 className="text-wine shrink-0" size={18} />
                      <span>Sinalização de produtos e cardápio</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                      <CheckCircle2 className="text-wine shrink-0" size={18} />
                      <span>Certificação interna para colaboradores</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Diversidade */}
              <div className="bg-brown-dark/5 p-8 rounded-3xl border border-brown-dark/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brown-dark/10 rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-brown-dark text-white rounded-xl flex items-center justify-center shadow-md">
                      <GraduationCap size={28} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-brown-dark">Workshops de Diversidade</h3>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Realizamos encontros mensais e workshops focados em letramento racial, equidade de gênero, inclusão LGBTQIAPN+ e combate ao capacitismo, promovendo um ambiente de respeito contínuo.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-gray-700">
                      <CheckCircle2 className="text-brown-dark shrink-0" size={18} />
                      <span>Palestras com especialistas convidados</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                      <CheckCircle2 className="text-brown-dark shrink-0" size={18} />
                      <span>Rodas de conversa e escuta ativa</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                      <CheckCircle2 className="text-brown-dark shrink-0" size={18} />
                      <span>Materiais de apoio e cartilhas educativas</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Plataforma de Cursos */}
          <section className="mt-24 mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <h2 className="text-4xl font-serif font-bold text-brown-dark mb-4">Plataforma de Cursos</h2>
                <p className="text-gray-600 max-w-2xl text-lg">
                  Explore nossos treinamentos online disponíveis para todos os colaboradores.
                </p>
              </div>
              
              {/* Filtros */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <Filter size={20} className="text-gray-400 mr-2 shrink-0" />
                {categorias.map(categoria => (
                  <button
                    key={categoria}
                    onClick={() => setCursoFiltro(categoria)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      cursoFiltro === categoria 
                        ? 'bg-wine text-white shadow-md' 
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-wine/50 hover:text-wine'
                    }`}
                  >
                    {categoria}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid de Cursos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cursosFiltrados.map(curso => (
                <div key={curso.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* Thumbnail */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image 
                      src={curso.imagem} 
                      alt={curso.titulo}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <PlayCircle size={48} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100" />
                    </div>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-wine uppercase tracking-wider">
                      {curso.categoria}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-brown-dark mb-2 line-clamp-2">
                      {curso.titulo}
                    </h3>
                    <p className="text-gray-500 text-sm mb-6">
                      Com {curso.instrutor}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <Clock size={16} className="text-wine/70" />
                          <span>{curso.duracao}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <BookOpen size={16} className="text-wine/70" />
                          <span>{curso.modulos} mód.</span>
                        </div>
                      </div>
                      <button className="text-wine hover:text-wine-light font-medium text-sm flex items-center gap-1 transition-colors">
                        Acessar <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {cursosFiltrados.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-3xl border border-gray-100">
                <p className="text-gray-500 text-lg">Nenhum curso encontrado para esta categoria.</p>
              </div>
            )}
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
    </div>
  );
}
