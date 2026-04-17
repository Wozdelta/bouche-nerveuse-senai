"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Home, Search, Compass, PlaySquare, MessageCircle, Heart, PlusSquare, Menu, Settings, Bookmark, Grid, UserSquare, Plus, Instagram, Link as LinkIcon } from 'lucide-react';

export default function InstagramProfile() {
  return (
    <div className="min-h-screen bg-white text-black flex font-sans">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex flex-col w-[72px] hover:w-[244px] group h-screen border-r border-[#dbdbdb] fixed left-0 top-0 pt-8 px-2 bg-white z-20 transition-[width] duration-300 overflow-hidden">
        <div className="mb-10 px-3 pt-2">
          <Link href="/" className="hover:opacity-70 transition-opacity block cursor-pointer">
            <Instagram size={28} className="shrink-0" />
          </Link>
        </div>
        
        <nav className="flex-1 space-y-2">
          {[
            { icon: <Home size={26} fill="none" color="black" className="shrink-0" />, label: 'Página inicial' },
            { icon: <Search size={26} color="black" className="shrink-0" />, label: 'Pesquisa' },
            { icon: <Compass size={26} color="black" className="shrink-0" />, label: 'Explorar' },
            { icon: <PlaySquare size={26} color="black" className="shrink-0" />, label: 'Reels' },
            { icon: <MessageCircle size={26} color="black" className="shrink-0" />, label: 'Mensagens' },
            { icon: <Heart size={26} color="black" className="shrink-0" />, label: 'Notificações' },
            { icon: <PlusSquare size={26} color="black" className="shrink-0" />, label: 'Criar' },
            { icon: <div className="w-[26px] h-[26px] rounded-full bg-[#1a1210] shrink-0 flex items-center justify-center border border-gray-300 overflow-hidden"><span className="font-serif text-[12px] text-white leading-none">B</span><span className="font-script text-[10px] text-[#ef9a9a] -ml-[2px] mt-1 leading-none">N</span></div>, label: 'Perfil', active: true },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${item.active ? 'font-bold' : ''}`}>
              {item.icon}
              <span className="text-base font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">{item.label}</span>
            </div>
          ))}
        </nav>
        
        <div className="mt-auto mb-4">
          <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <Menu size={26} color="black" className="shrink-0" />
            <span className="text-base font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Mais</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-[72px] bg-white min-h-screen transition-all duration-300">
        <div className="max-w-[935px] mx-auto w-full pt-8 px-4 md:px-5">
          {/* Header Profile */}
          <header className="flex flex-col md:flex-row mb-11 gap-8 md:gap-0">
            <div className="md:w-1/3 flex justify-center md:justify-center shrink-0">
              <div className="w-[150px] h-[150px] rounded-full bg-[#1a1210] overflow-hidden border border-[#dbdbdb] flex flex-col items-center justify-center text-white p-4">
                <span className="font-serif text-5xl tracking-wider leading-none">B</span>
                <span className="font-script text-4xl text-[#ef9a9a] -mt-1 ml-4">N</span>
              </div>
            </div>
            
            <div className="md:w-2/3 flex flex-col pt-1">
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-5 mb-5">
                <div className="flex items-center text-xl font-normal">
                  bouchenerveuse 
                  <Settings size={20} className="text-gray-800 ml-4 cursor-pointer" />
                </div>
                <div className="flex gap-2">
                  <button className="bg-[#efefef] hover:bg-[#dbdbdb] text-black text-sm font-semibold py-1.5 px-4 rounded-lg transition-colors">
                    Editar perfil
                  </button>
                  <button className="bg-[#efefef] hover:bg-[#dbdbdb] text-black text-sm font-semibold py-1.5 px-4 rounded-lg transition-colors">
                    Ver Itens Arquivados
                  </button>
                </div>
              </div>

              <div className="flex gap-10 mb-5 text-base">
                <span><span className="font-semibold">8</span> posts</span>
                <span><span className="font-semibold">158 mil</span> seguidores</span>
                <span><span className="font-semibold">94</span> seguindo</span>
              </div>

              <div className="text-sm">
                <p className="font-semibold mb-0">Bouche Nerveuse</p>
                <p className="text-gray-500 mb-0">Loja de Doces e Chocolateria</p>
                <p className="mb-0">🍫 Sua essência na nossa receita.</p>
                <p className="mb-0">📍 +5 Cidades pelo Brasil</p>
                <p className="mb-0">💼 Venha fazer parte do nosso time!</p>
                <a href="/" className="text-[#00376b] font-semibold flex items-center gap-1.5 hover:underline mt-1">
                  <LinkIcon size={14} className="-rotate-45" strokeWidth={3} />
                  bouchenerveuse.com.br
                </a>
              </div>
            </div>
          </header>

          {/* Highlights */}
          <div className="flex gap-8 mb-11 px-0 md:px-5 overflow-x-auto no-scrollbar max-w-[800px]">
            {[
              { name: 'Nossas Lojas', color: 'bg-[#1a1210] relative overflow-hidden', inner: <div className="absolute inset-0 flex items-center justify-center"><Heart size={32} color="#fff" strokeWidth={1.5} /></div> },
              { name: 'Produtos', color: 'bg-[#b71c1c] relative overflow-hidden', inner: <div className="absolute inset-0 flex items-center justify-center"><Grid size={32} color="#fff" strokeWidth={1.5} /></div> },
              { name: 'Vagas', color: 'bg-[#dbbbae] relative overflow-hidden', inner: <div className="absolute inset-0 flex items-center justify-center"><UserSquare size={32} color="#1a1210" strokeWidth={1.5} /></div> },
            ].map((highlight, i) => (
              <div key={i} className="flex flex-col items-center gap-3 cursor-pointer">
                <div className="w-[85px] h-[85px] rounded-full border border-gray-300 p-[3px]">
                  <div className={`w-full h-full rounded-full ${highlight.color} overflow-hidden`}>
                     {highlight.inner}
                  </div>
                </div>
                <span className="text-xs font-semibold">{highlight.name}</span>
              </div>
            ))}
            
            <div className="flex flex-col items-center gap-3 cursor-pointer">
              <div className="w-[85px] h-[85px] rounded-full border border-gray-300 p-1 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gray-50 flex items-center justify-center">
                  <Plus size={40} className="text-gray-400 font-light" strokeWidth={1} />
                </div>
              </div>
              <span className="text-xs font-semibold">Novo</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-[#dbdbdb] flex justify-center gap-14 text-xs font-semibold tracking-widest text-[#737373]">
            <div className="flex items-center gap-1.5 py-4 border-t border-black text-black cursor-pointer -mt-[1px]">
              <Grid size={12} strokeWidth={2.5} /> PUBLICAÇÕES
            </div>
            <div className="flex items-center gap-1.5 py-4 cursor-pointer">
              <Bookmark size={12} strokeWidth={2.5} /> SALVOS
            </div>
            <div className="flex items-center gap-1.5 py-4 cursor-pointer">
              <UserSquare size={12} strokeWidth={2.5} /> MARCADOS
            </div>
          </div>

          {/* Grid View */}
          <div className="grid grid-cols-3 gap-1 md:gap-[10px] pb-20">
            {/* Post 1 (Imagem Ambiente) */}
            <div className="aspect-square bg-gray-100 relative group cursor-pointer overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center gap-6 text-white font-bold">
                    <div className="flex items-center gap-2"><Heart fill="white" size={24} /> 12.4k</div>
                    <div className="flex items-center gap-2"><MessageCircle fill="white" size={24} /> 340</div>
                </div>
                <Image src="/Equipe.jpeg" alt="Nossa Equipe" fill className="object-cover z-0" />
            </div>

            {/* Post 2 (SP City) */}
            <div className="aspect-square bg-gray-100 relative group cursor-pointer overflow-hidden flex flex-col items-center justify-end">
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center gap-6 text-white font-bold">
                    <div className="flex items-center gap-2"><Heart fill="white" size={24} /> 8.9k</div>
                    <div className="flex items-center gap-2"><MessageCircle fill="white" size={24} /> 120</div>
                </div>
                <Image src="/Sao paulo.png" alt="Loja São Paulo" fill className="object-cover z-0" />
            </div>

            {/* Post 3 (Vagas - Manter igual) */}
            <div className="aspect-square bg-[#b71c1c] relative group cursor-pointer overflow-hidden flex flex-col items-center justify-center p-8 text-center border-l border-white/5">
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center gap-6 text-white font-bold">
                    <div className="flex items-center gap-2"><Heart fill="white" size={24} /> 23.5k</div>
                    <div className="flex items-center gap-2"><MessageCircle fill="white" size={24} /> 1.2k</div>
                </div>
                <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] drop-shadow-lg relative z-10">
                    Estamos <br/><span className="font-script text-[#ef9a9a] font-normal tracking-wide inline-block -translate-y-1">contratando!</span>
                </h2>
                <div className="mt-4 px-4 py-2 bg-white text-[#b71c1c] font-bold rounded-full text-xs uppercase tracking-wider hidden md:block shadow-md relative z-10 border border-[#d32f2f]">
                  Vem pro time
                </div>
            </div>


            {/* Post 5 (Membro) */}
            <div className="aspect-square bg-gray-100 relative group cursor-pointer overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center gap-6 text-white font-bold">
                    <div className="flex items-center gap-2"><Heart fill="white" size={24} /> 14.1k</div>
                    <div className="flex items-center gap-2"><MessageCircle fill="white" size={24} /> 412</div>
                </div>
                <Image src="/Vieses Inconscientes na Contratação.png" alt="Vieses Inconscientes da Contratação" fill className="object-cover z-0" />
            </div>

            {/* Post 6 (Membro) */}
            <div className="aspect-square bg-gray-100 relative group cursor-pointer overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center gap-6 text-white font-bold">
                    <div className="flex items-center gap-2"><Heart fill="white" size={24} /> 9.3k</div>
                    <div className="flex items-center gap-2"><MessageCircle fill="white" size={24} /> 104</div>
                </div>
                <Image src="/Xique Xeque.png" alt="Xique Xeque" fill className="object-cover z-0" />
            </div>

            {/* Post 7 (Membro) */}
            <div className="aspect-square bg-gray-100 relative group cursor-pointer overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center gap-6 text-white font-bold">
                    <div className="flex items-center gap-2"><Heart fill="white" size={24} /> 11.2k</div>
                    <div className="flex items-center gap-2"><MessageCircle fill="white" size={24} /> 210</div>
                </div>
                <Image src="/Abiel.png" alt="Membro da Equipe" fill className="object-cover z-0" />
            </div>

            {/* Post 8 (Membro) */}
            <div className="aspect-square bg-gray-100 relative group cursor-pointer overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center gap-6 text-white font-bold">
                    <div className="flex items-center gap-2"><Heart fill="white" size={24} /> 28.4k</div>
                    <div className="flex items-center gap-2"><MessageCircle fill="white" size={24} /> 3.4k</div>
                </div>
                <Image src="/kaiky.png" alt="Membro da Equipe" fill className="object-cover z-0" />
            </div>

            {/* Post 9 (Segredo) */}
            <div className="aspect-square bg-gray-100 relative group cursor-pointer overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center gap-6 text-white font-bold">
                    <div className="flex items-center gap-2"><Heart fill="white" size={24} /> 6.8k</div>
                    <div className="flex items-center gap-2"><MessageCircle fill="white" size={24} /> 42</div>
                </div>
                <Image src="/Segredo.jpeg" alt="Segredo" fill className="object-cover z-0" />
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
}
