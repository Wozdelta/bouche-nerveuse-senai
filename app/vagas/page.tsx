"use client";

import Image from 'next/image';
import Link from 'next/link';
import {
  Briefcase, MapPin, Phone, Heart,
  ChevronLeft, ChevronRight, Mail, Star,
  ArrowRight, Sparkles, Users, Zap, ExternalLink
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import DrawerMenu from '../../components/DrawerMenu';
import LoginButton from '../../components/LoginButton';
import ApplyModal from '../../components/ApplyModal';

const selectArrow = `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23555%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`;

export default function VagasPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filtroArea, setFiltroArea] = useState('Todas as áreas');
  const [filtroCidade, setFiltroCidade] = useState('Todas as cidades');
  const [isHovered, setIsHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const banners = [
    { src: "/images/Banneer/Assistente%20Administrativo.png", slug: "assistente-administrativo" },
    { src: "/images/Banneer/Entregador.png", slug: "entregador" },
    { src: "/images/Banneer/Embalador.png", slug: "embalador" },
    { src: "/images/Banneer/Jovem%20Aprendiz.png", slug: "jovem-aprendiz" },
    { src: "/images/Banneer/Auxiliar%20de%20Cozinha.png", slug: "auxiliar-de-cozinha" }
  ];

  const nextSlide = () => setCurrentSlide(p => (p + 1) % banners.length);
  const prevSlide = () => setCurrentSlide(p => (p - 1 + banners.length) % banners.length);

  useEffect(() => {
    if (!isHovered) {
      const t = setInterval(nextSlide, 6000);
      return () => clearInterval(t);
    }
  }, [isHovered]);

  const vagas = [
    { id: 1, slug: 'assistente-administrativo', titulo: 'Assistente Administrativo', local: 'Matão - SP', area: 'Administrativo', tipo: 'CLT Efetivo', emoji: '📋' },
    { id: 2, slug: 'entregador', titulo: 'Entregador (Logística)', local: 'Florianópolis - SC', area: 'Logística', tipo: 'CLT Efetivo', emoji: '🚚' },
    { id: 3, slug: 'embalador', titulo: 'Embalador(a)', local: 'Avenida Paulista - SP', area: 'Produção', tipo: 'CLT Efetivo', emoji: '📦' },
    { id: 4, slug: 'jovem-aprendiz', titulo: 'Jovem Aprendiz', local: 'Morro do Alemão - RJ', area: 'Administrativo', tipo: 'Jovem Aprendiz', emoji: '🎓' },
    { id: 5, slug: 'auxiliar-de-cozinha', titulo: 'Auxiliar de Cozinha', local: 'Xique Xique - BA', area: 'Produção', tipo: 'CLT Efetivo', emoji: '👨‍🍳' },
    { id: 6, slug: 'aux-de-producao-junior', titulo: 'Auxiliar de Produção Júnior', local: 'Araraquara - SP', area: 'Produção', tipo: 'CLT Efetivo', emoji: '⚙️' },
  ];

  const areas = ['Todas as áreas', ...Array.from(new Set(vagas.map(v => v.area)))];
  const cidades = ['Todas as cidades', ...Array.from(new Set(vagas.map(v => v.local)))];

  const vagasFiltradas = vagas.filter(v =>
    (filtroArea === 'Todas as áreas' || v.area === filtroArea) &&
    (filtroCidade === 'Todas as cidades' || v.local === filtroCidade)
  );

  return (
    <div className="min-h-screen bg-[#faf9f8] font-sans text-[#2d211e] overflow-x-hidden selection:bg-[#b71c1c] selection:text-white">

      {/* FAB - Menu */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        onClick={() => setIsMenuOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#b71c1c] hover:bg-[#c62828] text-white rounded-full shadow-[0_8px_30px_rgba(183,28,28,0.4)] flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        aria-label="Abrir Menu"
      >
        <div className="flex flex-col gap-[5px] w-5">
          <span className="w-full h-[2.5px] bg-white rounded-full" />
          <span className="w-full h-[2.5px] bg-white rounded-full" />
          <span className="w-full h-[2.5px] bg-white rounded-full" />
        </div>
      </motion.button>

      <DrawerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Navbar with smooth transition */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#1b0f0d]/95 backdrop-blur-md border-b border-white/10 shadow-lg' : 'bg-gradient-to-b from-[#1b0f0d]/90 to-transparent pt-2'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex flex-col leading-none text-white group">
            <span className="font-serif text-2xl tracking-wider group-hover:text-white/90 transition-colors">Bouche</span>
            <span className="font-script text-4xl text-[#ef9a9a] -mt-3 ml-4 drop-shadow-sm group-hover:text-[#ffbaba] transition-colors">Nerveuse</span>
          </Link>
          <div className="hidden lg:flex items-center gap-8 text-xs text-white/80 font-semibold tracking-widest uppercase">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/historia" className="hover:text-white transition-colors">Cultura</Link>
            <Link href="/clima-organizacional" className="hover:text-white transition-colors">Clima</Link>
            <Link href="/inclusao-e-diversidade" className="hover:text-white transition-colors">Inclusão</Link>
            <span className="text-white border-b-2 border-[#ef9a9a] pb-0.5 relative after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-[#ef9a9a] after:shadow-[0_0_8px_rgba(239,154,154,0.6)]">Vagas</span>
            <Link href="/bouche-news" className="hover:text-white transition-colors">Bouche News</Link>
          </div>
          <div className="flex items-center gap-4 lg:gap-6">
            <LoginButton />
            <Link href="/ouvidoria" className="hidden sm:flex bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all items-center gap-2">
              Ouvidoria <Phone size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO CAROUSEL MODERN ── */}
      <div 
        className="w-full bg-[#110a09] relative pt-20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <section className="relative w-full aspect-[21/9] md:aspect-[4/1] min-h-[400px] overflow-hidden group">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image 
                src={banners[currentSlide].src} 
                alt="Banner de Oportunidades" 
                fill 
                className="object-cover" 
                priority={currentSlide === 0} 
                referrerPolicy="no-referrer" 
              />
            </motion.div>
          </AnimatePresence>

          {/* Deep gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1b0f0d]/40 via-transparent to-[#1b0f0d]/30 z-10 pointer-events-none" />

          {/* Hero Content omitted as per user request */}

          {/* nav arrows */}
          {[{ fn: prevSlide, icon: <ChevronLeft size={24} />, side: 'left-4 md:left-8' }, { fn: nextSlide, icon: <ChevronRight size={24} />, side: 'right-4 md:right-8' }].map(({ fn, icon, side }, i) => (
            <button key={i} onClick={fn}
              className={`absolute ${side} top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 border border-white/20 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center hover:scale-105 active:scale-95`}>
              {icon}
            </button>
          ))}

          {/* dots */}
          <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center gap-2.5">
            {banners.map((_, i) => (
              <button key={i} onClick={() => setCurrentSlide(i)}
                className={`rounded-full transition-all duration-500 ease-out ${i === currentSlide ? 'w-10 h-2 bg-[#ef9a9a]' : 'w-2 h-2 bg-white/40 hover:bg-white/80'}`} 
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </section>
      </div>

      {/* ── FLOATING STATS STRIP MODERN ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-30 -mt-8 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-2xl py-6 px-8 flex flex-wrap justify-around sm:justify-between items-center gap-6"
        >
          {[
            { icon: <Briefcase size={26} strokeWidth={1.5} />, val: `${vagas.length}`, label: 'Vagas abertas' },
            { icon: <MapPin size={26} strokeWidth={1.5} />, val: '5', label: 'Cidades no Brasil' },
            { icon: <Users size={26} strokeWidth={1.5} />, val: '3', label: 'Áreas de atuação' },
          ].map(({ icon, val, label }, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-red-50 text-[#b71c1c] flex items-center justify-center group-hover:bg-[#b71c1c] group-hover:text-white transition-colors duration-300">
                {icon}
              </div>
              <div className="text-left">
                <p className="font-bold text-2xl text-[#2d211e] leading-none mb-1">{val}</p>
                <p className="text-gray-500 text-sm font-medium">{label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-5xl mx-auto px-4 lg:px-6 pb-24 space-y-20">

        {/* Section header + filters + vagas table card */}
        <section className="bg-white rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100/80 p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
            <div>
              <h2 className="text-4xl font-serif font-bold text-[#2d211e] leading-none">Vagas em aberto</h2>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {[
                { value: filtroCidade, onChange: (v: string) => setFiltroCidade(v), options: cidades },
                { value: filtroArea, onChange: (v: string) => setFiltroArea(v), options: areas },
              ].map(({ value, onChange, options }, i) => (
                <select key={i} value={value} onChange={e => onChange(e.target.value)}
                  className="bg-gray-50/50 border border-gray-200 text-gray-700 text-sm py-2.5 pl-4 pr-9 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b71c1c]/30 appearance-none cursor-pointer font-medium"
                  style={{ backgroundImage: selectArrow, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.875rem top 50%', backgroundSize: '0.6rem' }}
                >
                  {options.map(o => <option key={o}>{o}</option>)}
                </select>
              ))}
            </div>
          </div>

          <div className="divide-y divide-gray-100 border-t border-gray-100">
            {vagasFiltradas.map(vaga => (
              <Link href={`/vagas/${vaga.slug}`} key={vaga.id}
                className="py-7 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors px-2 md:-mx-4 md:px-4 rounded-xl cursor-pointer group block">
                <div className="md:w-[45%]">
                  <h3 className="text-base font-bold text-[#004b87] group-hover:underline tracking-tight">{vaga.titulo}</h3>
                </div>
                <div className="md:w-[35%] flex items-center gap-2">
                  <MapPin size={18} className="text-[#b71c1c] shrink-0" strokeWidth={2.5} />
                  <span className="font-bold text-gray-800 text-sm">{vaga.local}</span>
                </div>
                <div className="md:w-[20%] md:text-right">
                  <span className="text-[#7d8892] text-sm font-medium">{vaga.tipo}</span>
                </div>
              </Link>
            ))}

            {vagasFiltradas.length === 0 && (
              <div className="py-12 text-center text-gray-500">
                Nenhuma vaga encontrada com os filtros selecionados.
              </div>
            )}
          </div>
        </section>

        {/* ── TALENT POOL SECTION MODERN ── */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="overflow-hidden rounded-[2.5rem] flex flex-col md:flex-row shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] bg-white mx-auto relative group"
        >
          {/* subtle pattern bg */}
          <div className="absolute inset-0 bg-[#fff9f9] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Photo side */}
          <div className="md:w-[45%] relative min-h-[400px] md:min-h-full overflow-hidden shrink-0">
            <Image
              src="/Sao%20paulo.png"
              alt="São Paulo - Banco de Talentos"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            {/* Elegant overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b0f0d]/90 via-[#1b0f0d]/40 to-transparent/10" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 z-10">
              <h3 className="font-serif text-3xl lg:text-4xl font-bold text-white leading-[1.1] mb-2 drop-shadow-lg">
                Sua essência <br/> na nossa <span className="font-script text-[#ef9a9a] font-normal text-[1.4em] translate-y-1 inline-block drop-shadow-sm pr-2">receita</span>.
              </h3>
            </div>
          </div>

          {/* Content side */}
          <div className="md:w-[55%] p-10 lg:p-14 flex flex-col justify-center relative z-10 border-l border-gray-100 bg-white group-hover:bg-transparent transition-colors duration-700">
            <h2 className="text-3xl lg:text-4xl leading-tight font-serif font-bold text-[#1a1210] mb-4">
              Não encontrou a <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b71c1c] to-[#ef5350]">vaga ideal?</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">
              Estamos sempre em busca de pessoas apaixonadas e criativas. Cadastre-se na nossa rede e seja o primeiro a saber das novas oportunidades.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-red-50/80 rounded-2xl flex items-center justify-center shrink-0 text-[#b71c1c] shadow-inner group-hover:bg-[#b71c1c] group-hover:text-white transition-colors duration-500">
                  <Zap size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1">Oportunidades Ágeis</h4>
                  <p className="text-gray-500 text-sm md:text-base leading-relaxed">Avaliamos seu perfil sempre que uma nova vaga for aprovada internamente.</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-red-50/80 rounded-2xl flex items-center justify-center shrink-0 text-[#b71c1c] shadow-inner group-hover:bg-[#b71c1c] group-hover:text-white transition-colors duration-500">
                  <Heart size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1">Cultura Acolhedora</h4>
                  <p className="text-gray-500 text-sm md:text-base leading-relaxed">Valorizamos a diversidade, criatividade e o bem-estar de cada indivíduo.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex">
              <button 
                onClick={() => setIsApplyModalOpen(true)}
                className="bg-[#1a1210] hover:bg-[#b71c1c] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 flex items-center gap-3 text-base shadow-lg hover:shadow-xl hover:-translate-y-1 group/btn"
              >
                Cadastrar Currículo
                <ExternalLink size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.section>

      </main>

      <ApplyModal isOpen={isApplyModalOpen} onClose={() => setIsApplyModalOpen(false)} />

      {/* Footer Restyled gently */}
      <footer className="bg-[#110a09] text-white/50 py-12 border-t border-white/10 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-sm">
          <div className="flex flex-col leading-none opacity-60 hover:opacity-100 transition-opacity">
            <span className="font-serif text-xl tracking-wider text-white">Bouche</span>
            <span className="font-script text-3xl text-[#ef9a9a] -mt-2 ml-4">Nerveuse</span>
          </div>
          <p className="font-medium tracking-wide">© {new Date().getFullYear()} Bouche Nerveuse. Criando emoções.</p>
          <div className="flex gap-6 font-semibold uppercase tracking-wider text-xs">
            <Link href="/creditos" className="hover:text-white transition-colors">Créditos</Link>
            <Link href="#" className="hover:text-white transition-colors">Termos</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacidade</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
