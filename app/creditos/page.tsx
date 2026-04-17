"use client";

import Image from 'next/image';
import { Instagram, MessageCircle, ArrowRight, Menu, X } from 'lucide-react';
import { useState, useRef } from 'react';

export default function CreditosPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVagaAlertOpen, setIsVagaAlertOpen] = useState(false);
  const [isLutoModalOpen, setIsLutoModalOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const team = [
    { name: "Jonathan Rios", role: "Diretor Comercial", initials: "JR", badge: "Research", image: "/Jonathan.png" },
    { name: "Gustavo Santana", role: "Diretor do Clima Organizacional", initials: "GS", badge: "TPM", image: "/gustavo.png" },
    { name: "João Abiel", role: "Diretor de Marketing", initials: "JA", badge: "Data", image: "/Abiel.png", isLuto: true },
    { name: "Kaiky Leão", role: "Diretor de Inclusão Diversidade", initials: "KL", badge: "Data", image: "/kaiky.png" },
    { name: "José Milton", role: "Diretor de Tecnologia", initials: "JM", badge: "Eng", image: "/Jose.png" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans text-brown-dark overflow-x-hidden flex flex-col">
      {/* Side Menu Drawer */}
      {/* Main Content */}
      <main className="flex-1 pt-40 pb-24 px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="flex flex-col leading-none mb-6">
              <span className="font-serif text-5xl md:text-6xl font-bold text-brown-dark tracking-tight">Nossa</span>
              <span className="font-script text-6xl md:text-8xl text-wine-light -mt-6 md:-mt-8 drop-shadow-sm">Equipe</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl font-serif max-w-2xl mx-auto">
              Os talentos por trás do projeto Bouche Nerveuse.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {team.map((member, idx) => (
              <div 
                key={idx} 
                onClick={member.isLuto ? () => {
                  setIsLutoModalOpen(true);
                  if (audioRef.current) {
                    audioRef.current.currentTime = 0;
                    audioRef.current.play();
                  }
                } : undefined}
                className={`rounded-[2rem] p-8 shadow-lg transition-all duration-500 border flex flex-col items-center text-center group hover:-translate-y-2 relative overflow-hidden md:col-span-2 lg:col-span-2 ${
                  member.isLuto ? 'bg-gradient-to-b from-[#111111] to-[#050505] border-white/5 hover:shadow-[0_15px_40px_rgba(30,0,0,0.6)] cursor-pointer' : 'bg-white hover:shadow-2xl border-gray-100'
                } ${
                  idx === 3 ? 'lg:col-start-2' : ''
                } ${
                  idx === 4 ? 'md:col-start-2 lg:col-start-4' : ''
                }`}
              >
                <div className={`absolute top-0 left-0 w-full h-2 transition-opacity duration-500 ${
                  member.isLuto ? 'bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 opacity-60' : 'bg-gradient-to-r from-wine-light to-wine opacity-0 group-hover:opacity-100'
                }`}></div>
                
                {member.isLuto && (
                  <div className="absolute top-6 right-[-35px] font-serif font-bold text-[10px] uppercase tracking-widest text-[#a0a0a0] rotate-45 border-y border-white/10 bg-black/80 py-1.5 w-32 shadow-2xl z-20 flex justify-center">
                    LUTO
                  </div>
                )}
                <div className={`w-24 h-24 rounded-full overflow-hidden shrink-0 shadow-xl mb-6 group-hover:scale-110 transition-transform duration-500 border-4 ${
                  member.isLuto ? 'border-gray-800/80 grayscale contrast-125' : 'border-white'
                }`}>
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    width={96} 
                    height={96} 
                    className={`object-cover w-full h-full hover:scale-105 transition-transform duration-300 ${member.isLuto ? 'grayscale opacity-60 mix-blend-luminosity' : ''}`}
                     
                  />
                </div>
                
                <div className="flex-1 flex flex-col justify-center relative z-10 w-full">
                  <h3 className={`text-2xl font-serif font-bold mb-2 transition-colors duration-300 ${
                    member.isLuto ? 'text-gray-300 group-hover:text-white' : 'text-brown-dark group-hover:text-wine'
                  }`}>{member.name}</h3>
                  <div className={`w-8 h-0.5 mx-auto mb-3 group-hover:w-16 transition-all duration-500 ${
                    member.isLuto ? 'bg-gray-600 group-hover:bg-red-900/50' : 'bg-wine/20 group-hover:bg-wine'
                  }`}></div>
                  <p className={`font-bold text-xs uppercase tracking-[0.2em] ${
                    member.isLuto ? 'text-gray-500' : 'text-wine/80'
                  }`}>{member.role}</p>

                  {member.isLuto && (
                    <div className="mt-8 -mx-8 -mb-8 py-3.5 bg-gradient-to-r from-[#000] via-[#111] to-[#000] border-t border-white/5 relative overflow-hidden flex justify-center items-center group-hover:via-[#1a1212] transition-colors duration-500">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,0,0,0.05)_0%,_transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      <span className="relative z-10 font-sans font-bold text-[0.65rem] uppercase tracking-[0.3em] text-[#555] group-hover:text-[#aaa] transition-colors duration-500 flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-800 group-hover:bg-red-900/40 transition-colors duration-500"></span>
                        Saiu da Embraer
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-800 group-hover:bg-red-900/40 transition-colors duration-500"></span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group relative flex items-center justify-center gap-4 px-8 py-4 text-white uppercase cursor-pointer border-[3px] border-black tracking-[2px] font-bold text-2xl bg-[hsl(49,98%,60%)] rounded-[50px] overflow-hidden transition-all duration-500 ease-in-out active:scale-90 active:duration-100 min-w-[240px]" 
              style={{ textShadow: "3px 3px rgb(116, 116, 116)" }}
            >
              <svg
                className="z-10 transition-all duration-500 ease-in-out group-hover:scale-[3] group-hover:translate-x-[50%]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="48px"
                height="48px"
              >
                <path fill="#e53935" d="M38.67,42H11.52C11.27,40.62,11,38.57,11,36c0-5,0-11,0-11s1.44-7.39,3.22-9.59 c1.67-2.06,2.76-3.48,6.78-4.41c3-0.7,7.13-0.23,9,1c2.15,1.42,3.37,6.67,3.81,11.29c1.49-0.3,5.21,0.2,5.5,1.28 C40.89,30.29,39.48,38.31,38.67,42z"></path>
                <path fill="#b71c1c" d="M39.02,42H11.99c-0.22-2.67-0.48-7.05-0.49-12.72c0.83,4.18,1.63,9.59,6.98,9.79 c3.48,0.12,8.27,0.55,9.83-2.45c1.57-3,3.72-8.95,3.51-15.62c-0.19-5.84-1.75-8.2-2.13-8.7c0.59,0.66,3.74,4.49,4.01,11.7 c0.03,0.83,0.06,1.72,0.08,2.66c4.21-0.15,5.93,1.5,6.07,2.35C40.68,33.85,39.8,38.9,39.02,42z"></path>
                <path fill="#212121" d="M35,27.17c0,3.67-0.28,11.2-0.42,14.83h-2C32.72,38.42,33,30.83,33,27.17 c0-5.54-1.46-12.65-3.55-14.02c-1.65-1.08-5.49-1.48-8.23-0.85c-3.62,0.83-4.57,1.99-6.14,3.92L15,16.32 c-1.31,1.6-2.59,6.92-3,8.96v10.8c0,2.58,0.28,4.61,0.54,5.92H10.5c-0.25-1.41-0.5-3.42-0.5-5.92l0.02-11.09 c0.15-0.77,1.55-7.63,3.43-9.94l0.08-0.09c1.65-2.03,2.96-3.63,7.25-4.61c3.28-0.76,7.67-0.25,9.77,1.13 C33.79,13.6,35,22.23,35,27.17z"></path>
                <path fill="#01579b" d="M17.165,17.283c5.217-0.055,9.391,0.283,9,6.011c-0.391,5.728-8.478,5.533-9.391,5.337 c-0.913-0.196-7.826-0.043-7.696-5.337C9.209,18,13.645,17.32,17.165,17.283z"></path>
                <path fill="#212121" d="M40.739,37.38c-0.28,1.99-0.69,3.53-1.22,4.62h-2.43c0.25-0.19,1.13-1.11,1.67-4.9 c0.57-4-0.23-11.79-0.93-12.78c-0.4-0.4-2.63-0.8-4.37-0.89l0.1-1.99c1.04,0.05,4.53,0.31,5.71,1.49 C40.689,24.36,41.289,33.53,40.739,37.38z"></path>
                <path fill="#81d4fa" d="M10.154,20.201c0.261,2.059-0.196,3.351,2.543,3.546s8.076,1.022,9.402-0.554 c1.326-1.576,1.75-4.365-0.891-5.267C19.336,17.287,12.959,16.251,10.154,20.201z"></path>
                <path fill="#212121" d="M17.615,29.677c-0.502,0-0.873-0.03-1.052-0.069c-0.086-0.019-0.236-0.035-0.434-0.06 c-5.344-0.679-8.053-2.784-8.052-6.255c0.001-2.698,1.17-7.238,8.986-7.32l0.181-0.002c3.444-0.038,6.414-0.068,8.272,1.818 c1.173,1.191,1.712,3,1.647,5.53c-0.044,1.688-0.785,3.147-2.144,4.217C22.785,29.296,19.388,29.677,17.615,29.677z M17.086,17.973 c-7.006,0.074-7.008,4.023-7.008,5.321c-0.001,3.109,3.598,3.926,6.305,4.27c0.273,0.035,0.48,0.063,0.601,0.089 c0.563,0.101,4.68,0.035,6.855-1.732c0.865-0.702,1.299-1.57,1.326-2.653c0.051-1.958-0.301-3.291-1.073-4.075 c-1.262-1.281-3.834-1.255-6.825-1.222L17.086,17.973z"></path>
                <path fill="#e1f5fe" d="M15.078,19.043c1.957-0.326,5.122-0.529,4.435,1.304c-0.489,1.304-7.185,2.185-7.185,0.652 C12.328,19.467,15.078,19.043,15.078,19.043z"></path>
              </svg>
              <span className="absolute left-0 -translate-x-full transition-all duration-500 ease-in-out z-10 group-hover:translate-x-[20px] group-hover:delay-300">MALUCO</span>
              <span className="transition-all duration-500 ease-in-out delay-300 group-hover:translate-x-[200%] group-hover:delay-300">TA</span>
            </button>
          </div>
        </div>
      </main>
      
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all duration-300">
          <div className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-[2rem] p-0 max-w-lg w-full shadow-2xl border border-white/20 transition-all duration-500 transform scale-100 animate-in fade-in zoom-in duration-300 overflow-hidden">
            {/* Decorative top gradient */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-wine/10 to-transparent"></div>
            
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center text-gray-500 hover:text-wine transition-all duration-200 z-20 group"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
            
            {/* Content */}
            <div className="relative z-10 p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brown-dark mb-2">kaiky nas horas vagas</h2>
                <p className="text-gray-500 text-sm">O lado secreto do nosso querido Kaiky</p>
              </div>
              
              {/* Image container with frame effect */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-white p-3 shadow-inner">
                <div className="relative rounded-xl overflow-hidden bg-white shadow-lg">
                  <img 
                    src="/Segredo.jpeg" 
                    alt="kaiky nas horas vagas" 
                    className="w-full h-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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

      {/* Luto Alert Modal Estilizado */}
      {isLutoModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-8 bg-[#030303]/95 backdrop-blur-3xl transition-opacity duration-700">
          <div className="relative w-full max-w-xl group animate-in fade-in zoom-in duration-700 ease-out">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-transparent to-transparent blur-[100px] pointer-events-none"></div>

            {/* Main Modal Container */}
            <div className="relative bg-[#0a0a0a] rounded-[2.5rem] shadow-[0_0_80px_rgba(40,0,0,0.5)] border border-white/5 overflow-hidden flex flex-col items-center">
              
              {/* Close Button */}
              <button 
                onClick={() => {
                  setIsLutoModalOpen(false);
                  if (audioRef.current) {
                    audioRef.current.pause();
                  }
                }}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-xl shadow-lg flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 z-30 hover:scale-105 active:scale-95 group/close"
              >
                <X size={20} className="group-hover/close:rotate-90 transition-transform duration-300" />
              </button>

              {/* Top Banner inside Modal */}
              <div className="w-full pt-10 pb-6 flex flex-col items-center relative z-10 bg-gradient-to-b from-black via-[#0a0a0a] to-transparent">
                <span className="font-serif italic text-white/40 text-sm mb-2 tracking-widest">Em Memória</span>
                <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-red-900/50 to-transparent mb-3"></div>
                <h3 className="font-serif text-4xl font-bold text-white/90 drop-shadow-2xl">João Abiel</h3>
              </div>

              {/* The Image inside a museum frame */}
              <div className="relative w-full px-6 pb-4">
                <div className="relative rounded-[1.5rem] overflow-hidden border border-white/5 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex justify-center">
                  <div className="absolute inset-0 border border-white/10 rounded-[1.5rem] z-10 pointer-events-none mix-blend-overlay"></div>
                  
                  <img 
                    src="/images/AbielLuto/Modern Aesthetic Wedding Photo Collage Instagram Post.png" 
                    alt="Homenagem Abiel" 
                    className="w-full h-auto max-h-[60vh] object-contain opacity-90 sepia-[0.1] contrast-[1.05]"
                  />
                </div>
              </div>

              {/* Footer Quote */}
              <div className="w-full pb-10 pt-2 flex flex-col items-center px-8 text-center relative z-10">
                <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#666] mb-4">
                  Eterno Diretor de Marketing
                </p>
                <p className="font-serif italic text-white/30 text-sm sm:text-base leading-relaxed max-w-[320px]">
                  &quot;Não vai fazer falta&quot;
                </p>
              </div>

              <audio 
                ref={audioRef}
                src="/images/AbielLuto/- Vai na paz irmao fica com Deus 😢 - Cr divulga (youtube).mp3"
                loop
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
