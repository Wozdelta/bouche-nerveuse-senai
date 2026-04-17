"use client";

import React, { useState } from 'react';
import DrawerMenu from './DrawerMenu';
import LoginButton from './LoginButton';
import { Phone, X, Briefcase } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVagaAlertOpen, setIsVagaAlertOpen] = useState(false);
  const pathname = usePathname();

  // Highlight navigation state helper
  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsMenuOpen(true)}
        className={`fixed bottom-8 right-8 z-[90] w-16 h-16 bg-[#b71c1c] text-white rounded-full shadow-[0_4px_20px_rgba(183,28,28,0.4)] flex items-center justify-center transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100 hover:bg-[#d32f2f] hover:-translate-y-1 hover:shadow-[0_6px_25px_rgba(183,28,28,0.6)] active:scale-95'}`}
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
        onClose={() => setIsMenuOpen(false)} 
      />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brown-dark/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex flex-col leading-none text-white cursor-pointer">
            <span className="font-serif text-2xl tracking-wider">Bouche</span>
            <span className="font-script text-4xl text-wine-light -mt-3 ml-4">Nerveuse</span>
          </a>
          
          {/* Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide">
            <a href="/" className={`hover:text-white transition-colors pb-1 uppercase ${isActive('/') ? 'text-white border-b-2 border-wine-light' : 'text-white/80'}`}>Home</a>
            <a href="/historia" className={`hover:text-white transition-colors pb-1 uppercase ${isActive('/historia') ? 'text-white border-b-2 border-wine-light' : 'text-white/80'}`}>Cultura</a>
            <a href="/clima-organizacional" className={`hover:text-white transition-colors pb-1 uppercase ${isActive('/clima-organizacional') ? 'text-white border-b-2 border-wine-light' : 'text-white/80'}`}>Clima</a>
            <a href="/inclusao-e-diversidade" className={`hover:text-white transition-colors pb-1 uppercase ${isActive('/inclusao-e-diversidade') ? 'text-white border-b-2 border-wine-light' : 'text-white/80'}`}>Inclusão</a>
            <a href="/vagas" className={`hover:text-white transition-colors pb-1 uppercase tracking-wide ${isActive('/vagas') ? 'text-white border-b-2 border-wine-light' : 'text-white/80'}`}>Vagas</a>
            <a href="/bouche-news" className={`hover:text-white transition-colors pb-1 uppercase ${isActive('/bouche-news') ? 'text-white border-b-2 border-wine-light' : 'text-white/80'}`}>Bouche News</a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            <LoginButton />
            <a href="/ouvidoria" className="hidden sm:flex bg-[#b71c1c] hover:bg-[#d32f2f] text-white px-6 py-2.5 rounded-full font-bold transition-all items-center gap-2 shadow-[0_0_15px_rgba(183,28,28,0.3)] hover:shadow-[0_0_20px_rgba(183,28,28,0.5)] text-sm uppercase">
              Ouvidoria Digital <Phone size={16} />
            </a>
          </div>
        </div>
      </nav>
      
      {/* Vaga Alert Modal (Global fallback via header if needed, but keeping it isolated saves on re-renders) */}
      {isVagaAlertOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-300 text-center border border-gray-100">
            <button 
              onClick={() => setIsVagaAlertOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 transition-colors"
            >
              <X size={18} />
            </button>
            <div className="w-16 h-16 bg-wine-light/10 text-wine rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase size={32} />
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
    </>
  );
}
