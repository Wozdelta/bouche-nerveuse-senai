"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Award, Headphones, GraduationCap, Megaphone, TrendingUp, Settings, Home, MapPin, Calendar } from 'lucide-react';
import AnimatedNumber from './AnimatedNumber';

export default function WhyChooseUs() {
  const sobreContainerRef = useRef<HTMLDivElement>(null);
  const sobreVideoRef = useRef<HTMLVideoElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let rafId: number;
    let targetProgress = 0;
    let currentProgress = 0;

    const tick = () => {
      if (sobreContainerRef.current && sobreVideoRef.current) {
        // Reduzido fator de aceleração de 0.08 para 0.06 para deixar mais orgânico
        currentProgress += (targetProgress - currentProgress) * 0.06;
        
        const video = sobreVideoRef.current;
        // Só tenta mover se já tiver os dados carregados (readyState >= 2)
        if (video.duration && video.readyState >= 2) {
          const targetTime = currentProgress * video.duration;
          // Threshold frame-limiter: Evita sobrecarregar o decoder de celular
          // Atualiza apenas se a diferença for maior que 1/30 th de quadro (0.04s)
          if (Math.abs(video.currentTime - targetTime) > 0.04) {
             video.currentTime = targetTime;
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
        
        const videoEndThreshold = 0.8;
        let videoProgress = progress / videoEndThreshold;
        if (videoProgress > 1) videoProgress = 1;
        
        targetProgress = videoProgress;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={sobreContainerRef} className="relative h-[400vh]">
        <section id="sobre" className="sticky top-0 h-screen py-20 bg-white pointer-events-none overflow-hidden flex flex-col justify-center">
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
                  preload="auto"
                  muted 
                  playsInline 
                  className="w-full h-auto object-contain brightness-[1.05] contrast-[1.15]"
                />
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>

    {/* Numbers (movido para fora para rolar naturalmente após o sticky e o vídeo terminarem) */}
    <div id="unidades" className="w-full pt-16 pb-12 bg-white">
      <h2 className="font-serif text-[3rem] lg:text-[4.5rem] mb-20 text-center text-[#2a1411] tracking-tight">
        Números da <span className="text-[#b5122e] font-semibold">Marca</span>
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-20 px-2 sm:px-4">
        
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
  </>
  );
}
