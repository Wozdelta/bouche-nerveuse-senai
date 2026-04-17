"use client";

import Image from 'next/image';
import { Instagram, MessageCircle, ArrowRight, Utensils, Award, Headphones, GraduationCap, Megaphone, TrendingUp, Settings, MapPin, Calendar, Home, ChevronLeft, ChevronRight, Menu, X, ShoppingBag, Target, Eye, Heart, Users, MessageSquare, Phone, Leaf, BookOpen } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import DrawerMenu from '../components/DrawerMenu';
import LoginButton from '../components/LoginButton';

function AnimatedNumber({ value, prefix = "", suffix = "", isFloat = false }: { value: number, prefix?: string, suffix?: string, isFloat?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      let startTimestamp: number;
      const duration = 2000;
      
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const currentVal = easeProgress * value;
        
        if (isFloat) {
          setDisplayValue(currentVal.toFixed(1).replace('.', ','));
        } else {
          setDisplayValue(Math.round(currentVal).toString());
        }
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          if (isFloat) {
            setDisplayValue(value.toFixed(1).replace('.', ','));
          } else {
            setDisplayValue(value.toString());
          }
        }
      };
      
      window.requestAnimationFrame(step);
    }
  }, [isVisible, value, isFloat]);

  return <span ref={ref}>{prefix}{displayValue}{suffix}</span>;
}

export default function Page() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const sobreContainerRef = useRef<HTMLDivElement>(null);
  const sobreVideoRef = useRef<HTMLVideoElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVagaAlertOpen, setIsVagaAlertOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<{name: string, image: string, description: string} | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [isHovering, setIsHovering] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let rafId: number;
    let targetProgress = 0;
    let currentProgress = 0;

    const tick = () => {
      if (sobreContainerRef.current && sobreVideoRef.current) {
        // Lerp towards the target scroll progress
        currentProgress += (targetProgress - currentProgress) * 0.08;
        
        const video = sobreVideoRef.current;
        if (video.duration && !isNaN(video.duration)) {
          // Only update if there is a noticeable difference to save performance
          if (Math.abs(targetProgress - currentProgress) > 0.0005) {
            video.currentTime = currentProgress * video.duration;
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    
    rafId = requestAnimationFrame(tick);

    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (sobreContainerRef.current) {
        const container = sobreContainerRef.current;
        const rect = container.getBoundingClientRect();
        
        const maxScroll = rect.height - window.innerHeight;
        const currentScroll = -rect.top;
        
        let progress = currentScroll / maxScroll;
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;
        
        // Make the video finish playing at 80% of the scroll container
        const videoEndThreshold = 0.8;
        let videoProgress = progress / videoEndThreshold;
        if (videoProgress > 1) videoProgress = 1;
        
        targetProgress = videoProgress;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initialize on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isDragging || isHovering) return;
    
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        // If reached the end, scroll back to start
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: 404, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isDragging, isHovering]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    if (carouselRef.current) {
      carouselRef.current.style.scrollBehavior = 'auto';
      setStartX(e.pageX - carouselRef.current.offsetLeft);
      setScrollLeft(carouselRef.current.scrollLeft);
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovering(false);
    if (carouselRef.current) {
      carouselRef.current.style.scrollBehavior = 'smooth';
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (carouselRef.current) {
      carouselRef.current.style.scrollBehavior = 'smooth';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    if (carouselRef.current) {
      const x = e.pageX - carouselRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Recebido! Entraremos em contato em breve.");
  };

  return (
    <div className="min-h-screen bg-page font-sans text-brown-dark">
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
          <div className="flex flex-col leading-none text-white cursor-pointer">
            <span className="font-serif text-2xl tracking-wider">Bouche</span>
            <span className="font-script text-4xl text-wine-light -mt-3 ml-4">Nerveuse</span>
          </div>
          
          {/* Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm text-white/90 font-medium tracking-wide uppercase">
            <a href="/" className="hover:text-white transition-colors pb-1 text-white border-b-2 border-wine-light">Home</a>
            <a href="/historia" className="hover:text-white transition-colors pb-1 text-white/80">Cultura</a>
            <a href="/clima-organizacional" className="hover:text-white transition-colors pb-1 text-white/80">Clima</a>
            <a href="/inclusao-e-diversidade" className="hover:text-white transition-colors pb-1 text-white/80">Inclusão</a>
            <a href="/vagas" className="hover:text-white transition-colors pb-1 text-white/80 uppercase tracking-wide">Vagas</a>
            <a href="/bouche-news" className="hover:text-white transition-colors pb-1 text-white/80">Bouche News</a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            <LoginButton />
            <a href="/ouvidoria" className="btn-franquia-custom rounded-full">
              <span className="py-2.5 px-6 text-sm">Ouvidoria Digital <Phone size={16} /></span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="relative text-white min-h-[100vh] flex items-center overflow-hidden">
        {/* Parallax Background */}
        <div 
          className="absolute top-[-20%] left-0 w-full h-[140%] z-0"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=2000&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translate3d(0, ${scrollY * 0.35}px, 0)`,
            willChange: 'transform'
          }}
        />
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 z-0 bg-black/55"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-brown-dark/80 via-brown-dark/40 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full pt-40 pb-48">
          <div className="max-w-2xl space-y-8">
            <h1 className="flex flex-col leading-none">
              <span className="font-serif text-7xl lg:text-8xl font-bold tracking-tight">Bouche</span>
              <span className="font-script text-8xl lg:text-9xl text-wine-light -mt-8 ml-12 drop-shadow-lg">Nerveuse</span>
            </h1>
            <p className="text-2xl lg:text-3xl font-serif text-white/90 leading-snug drop-shadow-md">
              O sabor inconfundível da alta confeitaria.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a href="#produtos" className="relative overflow-hidden text-white rounded-full font-bold transition-all shadow-[0_0_20px_rgba(183,28,28,0.3)] hover:shadow-[0_0_30px_rgba(183,28,28,0.5)] active:scale-95 group flex items-center justify-center">
                <span className="absolute inset-0 flex items-center justify-center gap-2 bg-gradient-to-r from-[#d32f2f] to-[#b71c1c] translate-y-[100%] transition-transform duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0 z-10 pointer-events-none">
                  <ShoppingBag size={20} /> Peça já
                </span>
                <span className="absolute inset-0 flex items-center justify-center gap-2 bg-[#b71c1c] translate-y-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-[100%] z-0 pointer-events-none">
                  <Utensils size={20} /> Conhecer Produtos
                </span>
                <span className="invisible px-8 py-4 flex items-center gap-2">
                  <Utensils size={20} /> Conhecer Produtos
                </span>
              </a>
              <a href="#franquias" className="learn-more">
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">Abrir Franquia</span>
              </a>
            </div>
          </div>
        </div>

        {/* Wavy Divider */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-[1px] z-10">
          <svg viewBox="0 0 1440 120" className="w-full h-auto fill-page">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Products */}
      <section id="produtos" className="py-20 bg-page">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center font-serif text-4xl lg:text-5xl mb-16 text-brown-dark">
            Nossos Produtos em <span className="font-script text-6xl lg:text-7xl text-wine relative inline-block">Destaque<span className="absolute bottom-2 left-0 w-full h-1 bg-wine/30 rounded-full"></span></span>
          </h2>
          
          {/* Carousel */}
          <div className="relative group/carousel">
            <div 
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto pb-12 pt-4 hide-scrollbar cursor-grab active:cursor-grabbing scroll-smooth snap-x snap-mandatory"
              onMouseDown={handleMouseDown}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {/* Card 1 */}
              <div className="min-w-[320px] md:min-w-[380px] h-[450px] relative rounded-3xl overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 snap-start shrink-0">
                <Image src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop" alt="Bolo de Chocolate" fill className="object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/90 via-brown-dark/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="font-serif text-3xl font-bold mb-2">Bolo de Chocolate</h3>
                  <p className="text-white/80 font-light">Recheio cremoso & cobertura premium</p>
                </div>
              </div>
              {/* Card 2 */}
              <div className="min-w-[320px] md:min-w-[380px] h-[450px] relative rounded-3xl overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 snap-start shrink-0">
                <Image src="https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?q=80&w=600&auto=format&fit=crop" alt="Brigadeiro Gourmet" fill className="object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/90 via-brown-dark/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="font-serif text-3xl font-bold mb-2">Brigadeiro Gourmet</h3>
                  <p className="text-white/80 font-light">Feito na hora • 12 sabores</p>
                </div>
              </div>
              {/* Card 3 */}
              <div className="min-w-[320px] md:min-w-[380px] h-[450px] relative rounded-3xl overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 snap-start shrink-0">
                <Image src="https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=600&auto=format&fit=crop" alt="Cheesecake Morango" fill className="object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/90 via-brown-dark/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="font-serif text-3xl font-bold mb-2">Cheesecake Morango</h3>
                  <p className="text-white/80 font-light">Frutas frescas & calda artesanal</p>
                </div>
              </div>
              {/* Card 4 */}
              <div className="min-w-[320px] md:min-w-[380px] h-[450px] relative rounded-3xl overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 snap-start shrink-0">
                <Image src="https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600&auto=format&fit=crop" alt="Donuts" fill className="object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/90 via-brown-dark/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="font-serif text-3xl font-bold mb-2">Donuts</h3>
                  <p className="text-white/80 font-light">Massa fofinha & coberturas exclusivas</p>
                </div>
              </div>
              {/* Card 5 */}
              <div className="min-w-[320px] md:min-w-[380px] h-[450px] relative rounded-3xl overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 snap-start shrink-0">
                <Image src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop" alt="Brownie Especial" fill className="object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/90 via-brown-dark/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="font-serif text-3xl font-bold mb-2">Brownie Especial</h3>
                  <p className="text-white/80 font-light">Nozes & chocolate belga</p>
                </div>
              </div>
            </div>
            {/* Arrows */}
            <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center text-brown hover:bg-wine hover:text-white transition-colors z-10 opacity-0 group-hover/carousel:opacity-100 hidden md:flex">
              <ChevronLeft size={32} />
            </button>
            <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center text-brown hover:bg-wine hover:text-white transition-colors z-10 opacity-0 group-hover/carousel:opacity-100 hidden md:flex">
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      </section>

      {/* Why Boca Nervosa & Scroll Video */}
      <div ref={sobreContainerRef} className="relative h-[400vh]">
        <section id="sobre" className="sticky top-0 min-h-screen py-24 bg-white relative pointer-events-none">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
            <div className="absolute top-20 left-10 w-64 h-64 bg-wine/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-brown/5 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 flex flex-col gap-24 relative z-10 pointer-events-auto">
            {/* Why & Video Layout */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 w-full">
              {/* Left: Texts and Cards */}
              <div className="w-full lg:w-1/2 flex flex-col">
                <h2 className="font-serif text-5xl lg:text-[4rem] text-brown-dark leading-[1.1] text-left mb-10">
                  Por que a <br />
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#b71c1c] via-[#d32f2f] to-[#ff8a8a] drop-shadow-sm inline-block pb-2">
                    Bouche Nerveuse?
                  </span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 w-full">
                  {/* Card 1 */}
                  <div className="bg-white rounded-[2rem] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-[#f5f5f5] flex items-center gap-6 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300">
                    <div className="w-14 h-14 rounded-full bg-[#fff0f3] flex items-center justify-center shrink-0">
                      <Award size={26} className="text-[#d32f2f]" strokeWidth={1.5} />
                    </div>
                    <span className="font-sans font-bold text-gray-900 text-lg tracking-tight leading-tight">Qualidade Premium</span>
                  </div>
                  {/* Card 2 */}
                  <div className="bg-white rounded-[2rem] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-[#f5f5f5] flex items-center gap-6 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300">
                    <div className="w-14 h-14 rounded-full bg-[#fff0f3] flex items-center justify-center shrink-0">
                      <Headphones size={26} className="text-[#d32f2f]" strokeWidth={1.5} />
                    </div>
                    <span className="font-sans font-bold text-gray-900 text-lg tracking-tight leading-tight">Suporte Completo</span>
                  </div>
                  {/* Card 3 */}
                  <div className="bg-white rounded-[2rem] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-[#f5f5f5] flex items-center gap-6 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300">
                    <div className="w-14 h-14 rounded-full bg-[#fff0f3] flex items-center justify-center shrink-0">
                      <GraduationCap size={26} className="text-[#d32f2f]" strokeWidth={1.5} />
                    </div>
                    <span className="font-sans font-bold text-gray-900 text-lg tracking-tight leading-tight">Treinamento</span>
                  </div>
                  {/* Card 4 */}
                  <div className="bg-white rounded-[2rem] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-[#f5f5f5] flex items-center gap-6 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300">
                    <div className="w-14 h-14 rounded-full bg-[#fff0f3] flex items-center justify-center shrink-0">
                      <Megaphone size={26} className="text-[#d32f2f]" strokeWidth={1.5} />
                    </div>
                    <span className="font-sans font-bold text-gray-900 text-lg tracking-tight leading-tight">Marketing Forte</span>
                  </div>
                  {/* Card 5 */}
                  <div className="bg-white rounded-[2rem] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-[#f5f5f5] flex items-center gap-6 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300">
                    <div className="w-14 h-14 rounded-full bg-[#fff0f3] flex items-center justify-center shrink-0">
                      <TrendingUp size={26} className="text-[#d32f2f]" strokeWidth={1.5} />
                    </div>
                    <span className="font-sans font-bold text-gray-900 text-lg tracking-tight leading-tight">Retorno Rápido</span>
                  </div>
                  {/* Card 6 */}
                  <div className="bg-white rounded-[2rem] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-[#f5f5f5] flex items-center gap-6 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300">
                    <div className="w-14 h-14 rounded-full bg-[#fff0f3] flex items-center justify-center shrink-0">
                      <Settings size={26} className="text-[#d32f2f]" strokeWidth={1.5} />
                    </div>
                    <span className="font-sans font-bold text-gray-900 text-lg tracking-tight leading-tight">Operação Enxuta</span>
                  </div>
                </div>
              </div>

              {/* Right: Video */}
              <div className="w-full lg:w-1/2 flex justify-center items-center mix-blend-multiply">
                <div className="relative w-full max-w-2xl scale-[1.75] origin-top -translate-y-8">
                  <video 
                    ref={sobreVideoRef}
                    src="/Video_Bolo_KF.mp4?v=3" 
                    muted 
                    playsInline 
                    className="w-full h-auto object-contain brightness-[1.05] contrast-[1.15]"
                  />
                </div>
              </div>
            </div>

            {/* Numbers */}
            <div id="unidades" className="w-full pt-16 pb-12">
              <h2 className="font-serif text-[3rem] lg:text-[4.5rem] mb-20 text-center text-[#2a1411] tracking-tight">
                Números da <span className="text-[#b5122e] font-semibold">Marca</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-20 px-2 sm:px-4">
                
                {/* Card 1 */}
                <div className="bg-[#1c0e0c] rounded-[2rem] pt-12 pb-14 px-8 sm:px-12 shadow-2xl relative group hover:-translate-y-2 transition-all duration-500">
                  <div className="relative z-10 flex flex-col justify-center items-center text-center">
                    <h3 className="font-serif text-[4rem] sm:text-[5rem] font-bold text-white leading-none mb-3">
                      <AnimatedNumber value={120} prefix="+" />
                    </h3>
                    <p className="text-white/60 font-sans text-[0.7rem] sm:text-xs font-bold tracking-[0.2em] uppercase">Unidades</p>
                  </div>
                  <div className="absolute top-1/2 right-4 sm:right-10 -translate-y-1/2 pointer-events-none opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 group-hover:-translate-x-2 transition-all duration-700">
                    <Home size={180} strokeWidth={1.5} />
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-14 h-14 bg-[#b5122e] rounded-full flex items-center justify-center shadow-[0_12px_24px_rgba(181,18,46,0.4)] group-hover:scale-110 transition-transform duration-500">
                    <Home className="text-white" size={22} strokeWidth={2} />
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-[#1c0e0c] rounded-[2rem] pt-12 pb-14 px-8 sm:px-12 shadow-2xl relative group hover:-translate-y-2 transition-all duration-500">
                  <div className="relative z-10 flex flex-col justify-center items-center text-center">
                    <h3 className="font-serif text-[4rem] sm:text-[5rem] font-bold text-white leading-none mb-3">
                      <AnimatedNumber value={1.5} prefix="+" suffix="M" isFloat={true} />
                    </h3>
                    <p className="text-white/60 font-sans text-[0.7rem] sm:text-xs font-bold tracking-[0.2em] uppercase">Clientes Satisfeitos</p>
                  </div>
                  <div className="absolute top-1/2 right-4 sm:right-10 -translate-y-1/2 pointer-events-none opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 group-hover:-translate-x-2 transition-all duration-700">
                    <TrendingUp size={180} strokeWidth={1.5} />
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-14 h-14 bg-[#b5122e] rounded-full flex items-center justify-center shadow-[0_12px_24px_rgba(181,18,46,0.4)] group-hover:scale-110 transition-transform duration-500">
                    <TrendingUp className="text-white" size={22} strokeWidth={2} />
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-[#1c0e0c] rounded-[2rem] pt-12 pb-14 px-8 sm:px-12 shadow-2xl relative group hover:-translate-y-2 transition-all duration-500">
                  <div className="relative z-10 flex flex-col justify-center items-center text-center">
                    <h3 className="font-serif text-[4rem] sm:text-[5rem] font-bold text-white leading-none mb-3">
                      <AnimatedNumber value={8} prefix="+" />
                    </h3>
                    <p className="text-white/60 font-sans text-[0.7rem] sm:text-xs font-bold tracking-[0.2em] uppercase">Estados</p>
                  </div>
                  <div className="absolute top-1/2 right-4 sm:right-10 -translate-y-1/2 pointer-events-none opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 group-hover:-translate-x-2 transition-all duration-700">
                    <MapPin size={180} strokeWidth={1.5} />
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-14 h-14 bg-[#b5122e] rounded-full flex items-center justify-center shadow-[0_12px_24px_rgba(181,18,46,0.4)] group-hover:scale-110 transition-transform duration-500">
                    <MapPin className="text-white" size={22} strokeWidth={2} />
                  </div>
                </div>

                {/* Card 4 */}
                <div className="bg-[#1c0e0c] rounded-[2rem] pt-12 pb-14 px-8 sm:px-12 shadow-2xl relative group hover:-translate-y-2 transition-all duration-500">
                  <div className="relative z-10 flex flex-col justify-center items-center text-center">
                    <h3 className="font-serif text-[4rem] sm:text-[5rem] font-bold text-white leading-none mb-3">
                      <AnimatedNumber value={36} />
                    </h3>
                    <p className="text-white/60 font-sans text-[0.7rem] sm:text-xs font-bold tracking-[0.2em] uppercase">Anos de Sucesso</p>
                  </div>
                  <div className="absolute top-1/2 right-4 sm:right-10 -translate-y-1/2 pointer-events-none opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 group-hover:-translate-x-2 transition-all duration-700">
                    <Calendar size={180} strokeWidth={1.5} />
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-14 h-14 bg-[#b5122e] rounded-full flex items-center justify-center shadow-[0_12px_24px_rgba(181,18,46,0.4)] group-hover:scale-110 transition-transform duration-500">
                    <Award className="text-white" size={22} strokeWidth={2} />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Missão, Visão, Valores */}
      <section className="py-24 bg-page relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl text-brown-dark">
              Nosso <span className="font-bold text-wine relative inline-block">Propósito<span className="absolute bottom-2 left-0 w-full h-2 bg-wine/20 rounded-full"></span></span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Missão */}
            <div className="bg-white p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-wine/5 rounded-bl-full -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-wine/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-wine transition-colors duration-500 shadow-sm">
                  <Target className="text-wine group-hover:text-white transition-colors duration-500" size={32} />
                </div>
                <h3 className="font-serif text-3xl font-bold text-brown-dark mb-4">Missão</h3>
                <p className="text-brown/70 leading-relaxed font-medium">
                  Nossa missão é produzir doces de alta qualidade que despertam sensações intensas, sabor marcante e experiências irresistíveis na vida das pessoas ao comer nossas delícias.
                </p>
              </div>
            </div>

            {/* Visão */}
            <div className="bg-white p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-wine/5 rounded-bl-full -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-wine/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-wine transition-colors duration-500 shadow-sm">
                  <Eye className="text-wine group-hover:text-white transition-colors duration-500" size={32} />
                </div>
                <h3 className="font-serif text-3xl font-bold text-brown-dark mb-4">Visão</h3>
                <p className="text-brown/70 leading-relaxed font-medium">
                  Ser referência no segmento de doces industrializados, reconhecida pela excelência no sabor, inovação constante e compromisso com a qualidade, tornando a <strong className="text-brown-dark">Bouche Nerveuse</strong> uma marca desejada.
                </p>
              </div>
            </div>

            {/* Valores */}
            <div className="bg-white p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-wine/5 rounded-bl-full -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-wine/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-wine transition-colors duration-500 shadow-sm">
                  <Heart className="text-wine group-hover:text-white transition-colors duration-500" size={32} />
                </div>
                <h3 className="font-serif text-3xl font-bold text-brown-dark mb-4">Valores</h3>
                <ul className="text-brown/70 leading-relaxed font-medium space-y-2">
                  <li className="flex items-start gap-3"><span className="text-wine mt-1 text-lg leading-none">•</span> Pessoas em primeiro lugar</li>
                  <li className="flex items-start gap-3"><span className="text-wine mt-1 text-lg leading-none">•</span> Excelência na qualidade</li>
                  <li className="flex items-start gap-3"><span className="text-wine mt-1 text-lg leading-none">•</span> Compromisso com consumidores</li>
                  <li className="flex items-start gap-3"><span className="text-wine mt-1 text-lg leading-none">•</span> Sustentabilidade e Ética</li>
                  <li className="flex items-start gap-3"><span className="text-wine mt-1 text-lg leading-none">•</span> Paixão pelo que fazemos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Funcionários do Mês */}
      <section className="py-32 bg-[#1c0e0c] relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-wine rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#b5122e] rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <p className="text-white/60 font-sans tracking-[0.3em] uppercase text-sm mb-6">Equipe de Elite</p>
            <h2 className="font-serif text-[3.5rem] lg:text-[4.5rem] text-white leading-none">
              Funcionários Destaque do <span className="font-bold text-[#b5122e] italic">Mês</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Cariani */}
            <div className="relative bg-gradient-to-b from-white/10 to-transparent p-[1px] rounded-[2.5rem] overflow-hidden group">
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              <div className="bg-[#1b0f0d]/80 backdrop-blur-md rounded-[2.5rem] p-8 lg:p-12 flex flex-col sm:flex-row items-center sm:items-start gap-8 lg:gap-10 h-full border border-white/5">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#b5122e] to-wine rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <div className="w-full h-full rounded-full overflow-hidden border-[6px] border-[#2a1411] relative z-10 group-hover:scale-105 transition-transform duration-700 shadow-2xl">
                    <img src="/images/Funcionarios/Cariani.png" alt="Renato Cariani" className="w-full h-full object-cover" />
                  </div>
                  {/* Floating Badge */}
                  <div className="absolute -bottom-4 right-4 w-16 h-16 bg-[#b5122e] rounded-full flex items-center justify-center border-4 border-[#1b0f0d] shadow-xl z-20 group-hover:rotate-12 transition-transform duration-500">
                    <Award className="text-white" size={28} />
                  </div>
                </div>
                <div className="text-center sm:text-left flex-1 flex flex-col justify-center h-full pt-4 sm:pt-0">
                  <div className="inline-block px-4 py-1.5 rounded-full border border-[#b5122e]/30 bg-[#b5122e]/10 text-white/90 text-[0.65rem] sm:text-xs font-bold tracking-widest uppercase mb-6 w-max mx-auto sm:mx-0">6 Anos de Dedicação</div>
                  <h3 className="font-serif text-4xl lg:text-[2.75rem] font-bold text-white mb-3 leading-tight">Renato Cariani</h3>
                  <p className="text-[#b5122e] font-sans tracking-[0.15em] uppercase text-sm font-bold mb-6">Atendente Sênior</p>
                  <p className="text-white/60 font-light leading-relaxed text-sm sm:text-base">
                    Sempre recebendo nossos clientes com um grande sorriso no rosto e garantindo o melhor atendimento diário na loja.
                  </p>
                </div>
              </div>
            </div>

            {/* Balestrin */}
            <div className="relative bg-gradient-to-b from-white/10 to-transparent p-[1px] rounded-[2.5rem] overflow-hidden group">
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              <div className="bg-[#1b0f0d]/80 backdrop-blur-md rounded-[2.5rem] p-8 lg:p-12 flex flex-col sm:flex-row items-center sm:items-start gap-8 lg:gap-10 h-full border border-white/5">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#b5122e] to-wine rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <div className="w-full h-full rounded-full overflow-hidden border-[6px] border-[#2a1411] relative z-10 group-hover:scale-105 transition-transform duration-700 shadow-2xl">
                    <img src="/images/Funcionarios/Julio.png" alt="Júlio Balestrin" className="w-full h-full object-cover" />
                  </div>
                  {/* Floating Badge */}
                  <div className="absolute -bottom-4 right-4 w-16 h-16 bg-[#b5122e] rounded-full flex items-center justify-center border-4 border-[#1b0f0d] shadow-xl z-20 group-hover:rotate-12 transition-transform duration-500">
                    <Award className="text-white" size={28} />
                  </div>
                </div>
                <div className="text-center sm:text-left flex-1 flex flex-col justify-center h-full pt-4 sm:pt-0">
                  <div className="inline-block px-4 py-1.5 rounded-full border border-[#b5122e]/30 bg-[#b5122e]/10 text-white/90 text-[0.65rem] sm:text-xs font-bold tracking-widest uppercase mb-6 w-max mx-auto sm:mx-0">4 Anos de Dedicação</div>
                  <h3 className="font-serif text-4xl lg:text-[2.75rem] font-bold text-white mb-3 leading-tight">Júlio Balestrin</h3>
                  <p className="text-[#b5122e] font-sans tracking-[0.15em] uppercase text-sm font-bold mb-6">Auxiliar de Confeitaria</p>
                  <p className="text-white/60 font-light leading-relaxed text-sm sm:text-base">
                    Com dedicação total na montagem dos doces, garantindo que cada vitrine esteja sempre impecável e deliciosa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsabilidade Social */}
      <section className="py-24 bg-page relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            {/* Esquerda: Texto e Pilares */}
            <div className="w-full lg:w-1/2 flex flex-col gap-10">
              <div>
                <p className="text-wine/80 font-bold uppercase tracking-[0.2em] text-sm mb-4">Responsabilidade Social</p>
                <h2 className="font-serif text-4xl lg:text-5xl text-brown-dark leading-tight mb-6">
                  Nosso Compromisso Vai Além da <span className="font-bold text-wine relative inline-block">Produção<span className="absolute bottom-2 left-0 w-full h-2 bg-wine/20 rounded-full"></span></span>
                </h2>
                <p className="text-brown/70 leading-relaxed font-medium text-lg">
                  Na <strong className="text-brown-dark">Bouche Nerveuse</strong>, acreditamos que o sucesso de uma empresa se mede pelo impacto positivo que ela gera na sociedade e no meio ambiente. Nossa produção em Araraquara não foca apenas na eficiência, mas também no cuidado com as pessoas e com o planeta.
                </p>
              </div>

              <div className="flex flex-col gap-8">
                {/* Pilar 1 */}
                <div className="flex gap-5 items-start group">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center shrink-0 group-hover:bg-wine transition-colors duration-500">
                    <Leaf className="text-wine group-hover:text-white transition-colors duration-500" size={26} />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-brown-dark mb-2">Embalagens Sustentáveis</h3>
                    <p className="text-brown/70 leading-relaxed font-medium text-sm">
                      Temos orgulho de investir em tecnologia para reduzir nossa pegada ecológica. Nossas embalagens são biodegradáveis, garantindo que nossos produtos cheguem com qualidade sem comprometer o futuro. Cuidar da natureza é cuidar de todos nós.
                    </p>
                  </div>
                </div>

                {/* Pilar 2 */}
                <div className="flex gap-5 items-start group">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center shrink-0 group-hover:bg-wine transition-colors duration-500">
                    <Users className="text-wine group-hover:text-white transition-colors duration-500" size={26} />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-brown-dark mb-2">Inclusão e Diversidade</h3>
                    <p className="text-brown/70 leading-relaxed font-medium text-sm">
                      Valorizamos a pluralidade. Nosso ambiente é construído sobre respeito e valorização das diferenças, atraindo, desenvolvendo e retendo talentos de diferentes origens, perspectivas e vivências.
                    </p>
                  </div>
                </div>

                {/* Pilar 3 */}
                <div className="flex gap-5 items-start group">
                  <div className="w-14 h-14 rounded-2xl bg-[#b5122e] shadow-md flex items-center justify-center shrink-0 hover:scale-105 transition-transform duration-500">
                    <Heart className="text-white" size={26} />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-brown-dark mb-2">Bouche Solidaire</h3>
                    <p className="text-brown/70 leading-relaxed font-medium text-sm">
                      Páscoa é tempo de compartilhar alegria e esperança! Nossa campanha Bouche Solidaire doará ovos de chocolate artesanais para as crianças do Orfanato Esperança, levando doçura e carinho para quem mais precisa.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative group inline-flex items-center justify-center bg-white/70 backdrop-blur-xl border border-white/60 px-10 py-5 rounded-full mt-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(181,18,46,0.1)] transition-all duration-500 overflow-hidden w-max text-center">
                <div className="absolute inset-0 bg-gradient-to-r from-wine/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <span className="relative z-10 font-serif text-xl font-medium text-brown-dark leading-tight">
                  Produzindo com <span className="font-bold text-wine italic">propósito</span>, crescendo com <span className="font-bold text-wine italic">responsabilidade</span>.
                </span>
              </div>
            </div>

            {/* Direita: Imagem */}
            <div className="w-full lg:w-1/2 relative mt-10 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-wine/20 to-transparent rounded-[3rem] transform translate-x-4 lg:translate-x-8 translate-y-4 lg:translate-y-8"></div>
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-white group">
                <img src="/images/Treinamento/treinamento.jpg" alt="Treinamento Bouche Nerveuse" className="w-full h-[600px] lg:h-[750px] object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section id="franquias" className="py-24 px-4 bg-page">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-brown-dark to-[#2a1411] rounded-2xl p-10 lg:p-16 relative overflow-hidden shadow-2xl border border-white/10">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            {/* Left: Text, Form & WhatsApp */}
            <div className="flex-1 w-full lg:w-7/12 flex flex-col gap-10">
              <div className="text-center lg:text-left">
                <h2 className="text-4xl lg:text-5xl font-serif mb-4 text-white leading-tight">
                  Pronto para empreender com uma <span className="text-wine-light italic">marca de sucesso?</span>
                </h2>
                <p className="text-xl text-white/70 font-light">
                  Clique no botão abaixo e fale com nosso time de <strong className="text-white font-semibold">expansão</strong>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <a href="/franquia" className="cssbuttons-io-button shrink-0 w-max mx-auto lg:mx-0">
                  Obtenha sua franquia agora mesmo
                  <div className="icon">
                    <svg
                      height="24"
                      width="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </a>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shadow-2xl shrink-0 cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => setIsTeamModalOpen(true)}>
                    <Image src="/Equipe.jpeg" alt="Equipe" width={64} height={64} className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500" unoptimized />
                  </div>
                  <div className="text-left">
                    <span className="text-white/50 text-xs font-bold uppercase tracking-widest block mb-1">Atendimento Rápido</span>
                    <span className="text-white font-serif text-xl block leading-tight">Fale com a nossa<br/>equipe comercial</span>
                  </div>
                </div>
                <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="bg-transparent border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white px-8 py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-3 uppercase tracking-wider text-sm group sm:ml-auto">
                  <MessageCircle size={20} className="group-hover:scale-110 transition-transform" /> Falar no WhatsApp
                </a>
              </div>
            </div>

            {/* Right: Map */}
            <div className="w-full lg:w-5/12 flex justify-center lg:justify-end shrink-0">
              <div className="w-full max-w-[450px]">
                <div className="map-container">
                  <svg viewBox="0 0 500 500" className="map-background rounded-3xl overflow-hidden shadow-2xl border border-white/5">
                    <defs>
                      <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4ade80" />
                        <stop offset="100%" stopColor="#22c55e" />
                      </linearGradient>
                      <linearGradient id="seaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7dd3fc" />
                        <stop offset="100%" stopColor="#0ea5e9" />
                      </linearGradient>
                      <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                      </pattern>
                      <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feOffset dx="6" dy="6"/>
                        <feGaussianBlur stdDeviation="8" result="offset-blur"/>
                        <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
                        <feFlood floodColor="black" floodOpacity="0.3" result="color"/>
                        <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
                        <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
                      </filter>
                      <path id="wave" d="M 0 5 Q 5 0 10 5 T 20 5" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
                    </defs>
                    <rect fill="url(#landGradient)" width="500" height="500"></rect>
                    <rect fill="url(#gridPattern)" width="500" height="500"></rect>
                    
                    {/* Land Topo Lines */}
                    <path fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" d="M0,320c20-10,60-5,100-20c40-15,60-40,100-50c40-10,80,10,120,5c40-5,60-30,100-40c40-10,80,0,80,0"></path>
                    <path fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" d="M0,270c30-15,70-10,120-30c50-20,70-50,120-60c50-10,90,15,140,5c50-10,70-40,120-50"></path>
                    <path fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" d="M0,220c40-20,80-15,140-40c60-25,80-60,140-70c60-10,100,20,160,5c40-10,60-30,60-30"></path>

                    {/* Sea */}
                    <path
                      fill="url(#seaGradient)"
                      filter="url(#innerShadow)"
                      d="M0,367.82c5.83-4.39,14.42-10.16,25.59-15.34,4.52-2.09,43.19-19.51,79.55-11.93,36.1,7.52,35.75,32.55,78.41,60.23,46.34,30.06,109.47,41.21,123.32,22.1,11.95-16.49-22.61-41.92-13.66-84.6,4.85-23.1,22.33-50.71,47.73-58.52,42.42-13.05,78.83,39.45,102.84,23.86,15.81-10.26.01-32.87,22.73-74.43,5.8-10.62,11.65-21.15,11.93-36.93.28-15.69-5.63-26.64-7.95-32.39-6.66-16.45-6.21-45.15,28.84-98.55.23,146.23.46,292.46.69,438.69H0v-132.18Z"
                    ></path>
                    
                    {/* Coastline highlight */}
                    <path
                      fill="none"
                      stroke="rgba(255,255,255,0.5)"
                      strokeWidth="3"
                      d="M0,367.82c5.83-4.39,14.42-10.16,25.59-15.34,4.52-2.09,43.19-19.51,79.55-11.93,36.1,7.52,35.75,32.55,78.41,60.23,46.34,30.06,109.47,41.21,123.32,22.1,11.95-16.49-22.61-41.92-13.66-84.6,4.85-23.1,22.33-50.71,47.73-58.52,42.42-13.05,78.83,39.45,102.84,23.86,15.81-10.26.01-32.87,22.73-74.43,5.8-10.62,11.65-21.15,11.93-36.93.28-15.69-5.63-26.64-7.95-32.39-6.66-16.45-6.21-45.15,28.84-98.55"
                    ></path>
                    
                    {/* Sea waves */}
                    <path
                      fill="none"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="2"
                      d="M0,387.82c5.83-4.39,14.42-10.16,25.59-15.34,4.52-2.09,43.19-19.51,79.55-11.93,36.1,7.52,35.75,32.55,78.41,60.23,46.34,30.06,109.47,41.21,123.32,22.1,11.95-16.49-22.61-41.92-13.66-84.6,4.85-23.1,22.33-50.71,47.73-58.52,42.42-13.05,78.83,39.45,102.84,23.86,15.81-10.26.01-32.87,22.73-74.43,5.8-10.62,11.65-21.15,11.93-36.93.28-15.69-5.63-26.64-7.95-32.39-6.66-16.45-6.21-45.15,28.84-98.55"
                    ></path>
                    <path
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="2"
                      d="M0,407.82c5.83-4.39,14.42-10.16,25.59-15.34,4.52-2.09,43.19-19.51,79.55-11.93,36.1,7.52,35.75,32.55,78.41,60.23,46.34,30.06,109.47,41.21,123.32,22.1,11.95-16.49-22.61-41.92-13.66-84.6,4.85-23.1,22.33-50.71,47.73-58.52,42.42-13.05,78.83,39.45,102.84,23.86,15.81-10.26.01-32.87,22.73-74.43,5.8-10.62,11.65-21.15,11.93-36.93.28-15.69-5.63-26.64-7.95-32.39-6.66-16.45-6.21-45.15,28.84-98.55"
                    ></path>

                    {/* Little waves */}
                    <use href="#wave" x="50" y="420" />
                    <use href="#wave" x="150" y="450" />
                    <use href="#wave" x="250" y="460" />
                    <use href="#wave" x="350" y="450" />
                    <use href="#wave" x="400" y="380" />
                    <use href="#wave" x="450" y="460" />
                    <use href="#wave" x="300" y="480" />
                    <use href="#wave" x="100" y="480" />
                    <use href="#wave" x="200" y="460" />
                    <use href="#wave" x="420" y="320" />
                    <use href="#wave" x="470" y="280" />
                    <use href="#wave" x="460" y="380" />
                  </svg>
                  <div className="map-cities">
                    <div style={{ "--x": 5, "--y": 67 } as React.CSSProperties} className="map-city group cursor-pointer" onClick={() => { setSelectedCity({ name: 'Rio de Janeiro', image: '/Rio de janeiro.png', description: 'Nossa unidade no Rio de Janeiro está localizada em um dos principais centros comerciais da cidade, oferecendo nossa linha completa de bolos e tortas industriais para toda a região metropolitana.' }); setIsCityModalOpen(true); }}>
                      <div className="map-city__label">
                        <span data-icon="🏖️" className="map-city__sign">Rio de Janeiro</span>
                        <img src="/Rio%20de%20janeiro.png" alt="Rio de Janeiro" className="map-city__image" />
                      </div>
                    </div>
                    <div style={{ "--x": 32, "--y": 32 } as React.CSSProperties} className="map-city group cursor-pointer" onClick={() => { setSelectedCity({ name: 'São Paulo', image: '/Sao paulo.png', description: 'A unidade de São Paulo é a nossa matriz brasileira, com capacidade de produção industrial de alta escala, atendendo toda a demanda da região sudeste.' }); setIsCityModalOpen(true); }}>
                      <div className="map-city__label">
                        <span data-icon="🏢" className="map-city__sign anim anim-grow">São Paulo</span>
                        <img src="/Sao%20paulo.png" alt="São Paulo" className="map-city__image" />
                      </div>
                    </div>
                    <div style={{ "--x": 58, "--y": 83 } as React.CSSProperties} className="map-city group cursor-pointer" onClick={() => { setSelectedCity({ name: 'Salvador', image: '/Salvador.png', description: 'Localizada na capital baiana, nossa unidade de Salvador leva o sabor único dos nossos produtos para todo o Nordeste brasileiro.' }); setIsCityModalOpen(true); }}>
                      <div className="map-city__label">
                        <span data-icon="🌞" className="map-city__sign anim anim-slidein">Salvador</span>
                        <img src="/Salvador.png" alt="Salvador" className="map-city__image" />
                      </div>
                    </div>
                    <div style={{ "--x": 65, "--y": 22 } as React.CSSProperties} className="map-city group cursor-pointer" onClick={() => { setSelectedCity({ name: 'Brasília', image: '/Brasília.png', description: 'A unidade de Brasília atende o Distrito Federal e região centro-oeste com produtos de alta qualidade e logística eficiente.' }); setIsCityModalOpen(true); }}>
                      <div className="map-city__label">
                        <span data-icon="🏛️" className="map-city__sign">Brasília</span>
                        <img src="/Bras%C3%ADlia.png" alt="Brasília" className="map-city__image" />
                      </div>
                    </div>
                    <div style={{ "--x": 87, "--y": 58 } as React.CSSProperties} className="map-city group cursor-pointer" onClick={() => { setSelectedCity({ name: 'Curitiba', image: '/Curitiba.png', description: 'Nossa unidade em Curitiba representa a expansão no sul do país, trazendo nossa tradição francesa para a capital paranaense.' }); setIsCityModalOpen(true); }}>
                      <div className="map-city__label">
                        <span data-icon="🌲" className="map-city__sign">Curitiba</span>
                        <img src="/Curitiba.png" alt="Curitiba" className="map-city__image" />
                      </div>
                    </div>
                    <div style={{ "--x": 94, "--y": 38 } as React.CSSProperties} className="map-city group cursor-pointer" onClick={() => { setSelectedCity({ name: 'Florianópolis', image: '/Florianópolis.png', description: 'A unidade de Florianópolis combina tradição francesa com o charme da ilha, servindo toda a região catarinense.' }); setIsCityModalOpen(true); }}>
                      <div className="map-city__label">
                        <span data-icon="🌊" className="map-city__sign anim anim-slidein">Florianópolis</span>
                        <img src="/Florian%C3%B3polis.png" alt="Florianópolis" className="map-city__image" />
                      </div>
                    </div>
                    <div style={{ "--x": 45, "--y": 60 } as React.CSSProperties} className="map-city group cursor-pointer" onClick={() => { setSelectedCity({ name: 'Xique-Xique', image: '/Xique Xeque.png', description: 'Localizada no interior da Bahia, nossa unidade de Xique-Xique leva a tradição francesa para o sertão nordestino com muito orgulho.' }); setIsCityModalOpen(true); }}>
                      <div className="map-city__label">
                        <span data-icon="🌵" className="map-city__sign anim anim-grow">Xique-Xique</span>
                        <img src="/Xique%20Xeque.png" alt="Xique-Xique" className="map-city__image" />
                      </div>
                    </div>
                    <div style={{ "--x": 25, "--y": 45 } as React.CSSProperties} className="map-city group cursor-pointer" onClick={() => { setSelectedCity({ name: 'Matão', image: '/Matao.png', description: 'Muito mato e aldeias. Nossa unidade em Matão está situada no interior paulista, rodeada pela natureza exuberante e comunidades rurais tradicionais.' }); setIsCityModalOpen(true); }}>
                      <div className="map-city__label">
                        <span data-icon="🌳" className="map-city__sign anim anim-slidein">Matão</span>
                        <img src="/Matao.png" alt="Matão" className="map-city__image" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="bg-page py-10 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-8 flex-wrap justify-center">
            <span className="text-sm font-bold text-gray-500 tracking-widest">AS VISTAS EM:</span>
            {/* Logos placeholders */}
            <div className="flex items-center gap-8 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <span className="font-serif font-black text-2xl tracking-tighter">GLOBO</span>
              <span className="font-serif font-bold text-2xl tracking-widest">EXAME</span>
              <span className="font-serif font-bold text-2xl">PEGN</span>
              <span className="font-serif font-black text-2xl tracking-tight text-blue-600">SEBRAE</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-gray-400">
            <a href="/instagram" className="hover:text-wine hover:-translate-y-1 transition-all"><Instagram size={24} /></a>
            <a href="#" className="hover:text-wine hover:-translate-y-1 transition-all"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
            <a href="#" className="hover:text-wine hover:-translate-y-1 transition-all"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg></a>
          </div>
        </div>
        <div className="text-center text-sm text-gray-400 mt-10 font-medium flex flex-col items-center gap-2">
          <span>&copy; {new Date().getFullYear()} Bouche Nerveuse. Todos os direitos reservados.</span>
          <a href="/creditos" className="hover:text-wine transition-colors">Créditos</a>
        </div>
      </footer>

      {/* Vaga Alert Modal */}
      <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${isVagaAlertOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setIsVagaAlertOpen(false)}></div>
        <div className={`relative w-full max-w-sm text-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] transform ${isVagaAlertOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-[0.96] translate-y-6 opacity-0'}`}>
          <div className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl p-8 shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-white/30 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-wine/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brown/10 rounded-full blur-3xl"></div>

            <div className="relative">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-wine/10 text-wine flex items-center justify-center shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <h3 className="font-serif text-3xl font-bold text-brown-dark mb-2">Em breve</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Nossa página de vagas estará disponível em breve. Fique ligado!</p>
              <button 
                onClick={() => setIsVagaAlertOpen(false)}
                className="w-full bg-wine hover:bg-wine-light text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Team Modal */}
      <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${isTeamModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsTeamModalOpen(false)}></div>
        <div className={`relative bg-gradient-to-br from-brown-dark to-[#2a1411] rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-white/10 transition-all duration-500 transform ${isTeamModalOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}`}>
          {/* Modal Header */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => { setSelectedImage("/Equipe.jpeg"); setIsImageModalOpen(true); }}>
              <Image src="/Equipe.jpeg" alt="Equipe" width={96} height={96} className="object-cover w-full h-full hover:scale-110 transition-transform duration-500" unoptimized />
            </div>
            <h2 className="font-serif text-4xl font-bold text-white mb-3">Nossa Equipe Comercial</h2>
            <p className="text-white/70 text-lg">Especialistas em transformar seu sonho em realidade</p>
          </div>

          {/* Modal Content */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-wine-light rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="text-white" size={24} />
                </div>
                <h3 className="font-serif text-xl font-bold text-white">Atendimento Personalizado</h3>
              </div>
              <p className="text-white/70 leading-relaxed">
                Nossa equipe está preparada para oferecer o melhor atendimento, entendendo suas necessidades e apresentando a melhor solução para você.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-wine-light rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="text-white" size={24} />
                </div>
                <h3 className="font-serif text-xl font-bold text-white">Resposta Rápida</h3>
              </div>
              <p className="text-white/70 leading-relaxed">
                Agilidade no atendimento para que você tenha todas as informações que precisa para tomar a melhor decisão.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-wine-light rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="text-white" size={24} />
                </div>
                <h3 className="font-serif text-xl font-bold text-white">Múltiplos Canais</h3>
              </div>
              <p className="text-white/70 leading-relaxed">
                WhatsApp, telefone, e-mail ou presencial. Escolha o canal que for mais conveniente para você.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-wine-light rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="text-white" size={24} />
                </div>
                <h3 className="font-serif text-xl font-bold text-white">Foco no Sucesso</h3>
              </div>
              <p className="text-white/70 leading-relaxed">
                Nosso objetivo é garantir que sua jornada como franqueado seja um sucesso desde o primeiro dia.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="https://wa.me/5511999999999" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <MessageCircle size={20} />
              Falar no WhatsApp
            </a>
            <button 
              onClick={() => setIsTeamModalOpen(false)}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/30"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      <div className={`fixed inset-0 z-[101] flex items-center justify-center p-4 transition-all duration-300 ${isImageModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/90 backdrop-blur-lg" onClick={() => setIsImageModalOpen(false)}></div>
        <div className={`relative max-w-full max-h-full transition-all duration-500 transform ${isImageModalOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
          <button 
            onClick={() => setIsImageModalOpen(false)}
            className="absolute -top-12 right-0 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 group z-10"
          >
            <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
          {selectedImage && (
            <div className="relative">
              <img 
                src={selectedImage}
                alt="Fullscreen Image"
                className="rounded-lg shadow-2xl max-w-full max-h-[80vh] w-auto h-auto object-contain cursor-zoom-out"
                onClick={() => setIsImageModalOpen(false)}
              />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                Clique para fechar
              </div>
            </div>
          )}
        </div>
      </div>

      {/* City Details Modal */}
      <div className={`fixed inset-0 z-[102] flex items-center justify-center p-4 transition-all duration-300 ${isCityModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setIsCityModalOpen(false)}></div>
        <div className={`relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-0 max-w-lg w-full shadow-2xl border border-white/20 transition-all duration-500 transform ${isCityModalOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'} overflow-hidden`}>
          {selectedCity && (
            <>
              {/* City Image */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image 
                  src={selectedCity.image} 
                  alt={selectedCity.name} 
                  fill 
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <h2 className="font-serif text-3xl font-bold text-white mb-1">{selectedCity.name}</h2>
                  <span className="text-white/80 text-sm font-medium">Unidade Bouche Nerveuse</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-wine/10 rounded-full flex items-center justify-center">
                    <MapPin className="text-wine" size={24} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-brown-dark">Sobre a Unidade</h3>
                    <p className="text-gray-500 text-sm">Franquia oficial</p>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {selectedCity.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => setIsCityModalOpen(false)}
                    className="flex-1 bg-wine hover:bg-wine-light text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <MessageCircle size={18} />
                    Falar no WhatsApp
                  </button>
                  <button 
                    onClick={() => setIsCityModalOpen(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl transition-all duration-300 border border-gray-200"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

    </div>
  );
}
