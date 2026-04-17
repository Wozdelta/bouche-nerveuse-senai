"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { X, ArrowRight, MessageCircle, Instagram, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Cultura Organizacional', href: '/historia' },
  { label: 'Clima Organizacional', href: '/clima-organizacional' },
  { label: 'Inclusão e Diversidade', href: '/inclusao-e-diversidade' },
  { label: 'Ouvidoria', href: '/ouvidoria' },
  { label: 'Vagas', href: '/vagas' },
  { label: 'Créditos', href: '/creditos' },
  { label: 'Bouche News', href: '/bouche-news' },
];

export default function DrawerMenu({ isOpen, onClose }: DrawerMenuProps) {
  const currentPath = usePathname();

  // Travar o scroll do body quando o menu estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Fechar ao apertar ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay com blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="fixed top-0 right-0 h-full w-[90vw] sm:w-[400px] z-[70] flex flex-col rounded-l-2xl sm:rounded-l-3xl overflow-hidden shadow-2xl"
          >
            {/* Background com gradiente e ruído */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1210] via-[#2a1411] to-[#110a08] z-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]"></div>
            </div>

            {/* Conteúdo do Drawer */}
            <div className="relative z-10 flex flex-col h-full">
              
              {/* Topo */}
              <div className="px-6 py-6 flex items-center justify-between border-b border-white/5">
                <div className="flex flex-col leading-none text-white">
                  <span className="font-serif text-xl tracking-wider">Bouche</span>
                  <span className="font-script text-2xl text-wine-light -mt-2 ml-3">Nerveuse</span>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Fechar menu"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 hover:scale-95 transition-all active:scale-90"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Lista de Links */}
              <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-4 flex flex-col gap-2">
                {LINKS.map((link) => {
                  const isActive = currentPath === link.href;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      className={`group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-wine/10 text-white border-l-2 border-wine-light' 
                          : 'text-white/70 hover:bg-white/5 hover:text-white border-l-2 border-transparent hover:border-wine/50'
                      }`}
                    >
                      <span className={`font-serif text-lg ${isActive ? 'font-medium' : ''}`}>{link.label}</span>
                      <ChevronRight size={16} className={`transition-transform duration-300 ${isActive ? 'text-wine-light translate-x-1' : 'text-white/30 group-hover:text-white/60 group-hover:translate-x-1'}`} />
                    </a>
                  );
                })}
              </div>

              {/* Rodapé / CTA */}
              <div className="p-6 bg-black/20 border-t border-white/5 backdrop-blur-sm">
                <a
                  href="/franquia"
                  onClick={onClose}
                  className="group flex items-center justify-center gap-2 w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#b71c1c] to-[#d32f2f] text-white font-bold tracking-wide shadow-[0_4px_15px_rgba(183,28,28,0.3)] hover:shadow-[0_6px_20px_rgba(183,28,28,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Quero ser Franqueado
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </a>
                
                <div className="flex items-center justify-between mt-8">
                  <span className="text-xs text-white/40 font-medium tracking-wider uppercase">© Bouche Nerveuse</span>
                  <div className="flex items-center gap-3">
                    <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all">
                      <MessageCircle size={18} />
                    </a>
                    <a href="/instagram" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all">
                      <Instagram size={18} />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
