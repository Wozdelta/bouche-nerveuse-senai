"use client";

import React from 'react';
import { usePathname } from 'next/navigation';

export default function SiteFooter() {
  const pathname = usePathname();

  if (pathname === '/instagram') return null;

  return (
    <footer className="bg-[#1b0f0d] text-white/60 py-12 border-t border-white/10 mt-auto">
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
  );
}
