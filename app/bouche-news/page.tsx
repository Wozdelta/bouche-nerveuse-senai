"use client";

import Image from 'next/image';
import { useState, useMemo } from 'react';
import { Search, ChevronDown, ArrowRight, PlayCircle, Trophy, Target, Award, TrendingUp, Calendar, Clock, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import LoginButton from '../../components/LoginButton';

const CATEGORIES = ['Todas', 'Notícias', 'Conquistas', 'Metas', 'Patrocínios', 'Vídeos'];

const NEWS_DATA = [
  {
    id: 1,
    category: 'Notícias',
    title: 'Bouche Nerveuse inaugura nova unidade conceito em São Paulo',
    summary: 'A nova loja traz uma experiência imersiva no mundo do chocolate, com degustações exclusivas e ambiente instagramável.',
    date: '15 Fev 2026',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=800&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 2,
    category: 'Conquistas',
    title: 'Prêmio de Melhor Confeitaria do Ano',
    summary: 'Pelo terceiro ano consecutivo, fomos reconhecidos pela excelência de nossos produtos e atendimento.',
    date: '10 Fev 2026',
    readTime: '3 min',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
    featured: false,
  },
  {
    id: 3,
    category: 'Metas',
    title: 'Crescimento de 45% no primeiro trimestre',
    summary: 'Superamos nossas expectativas de vendas graças à nova linha de sobremesas premium.',
    date: '05 Fev 2026',
    readTime: '2 min',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80',
    featured: false,
  },
  {
    id: 4,
    category: 'Patrocínios',
    title: 'Bouche Nerveuse patrocina evento de gastronomia beneficente',
    summary: 'Apoiamos a iniciativa local que visa arrecadar fundos para instituições de caridade através da alta gastronomia.',
    date: '28 Jan 2026',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80',
    featured: false,
  },
  {
    id: 5,
    category: 'Notícias',
    title: 'Nova linha de chocolates veganos chega às lojas',
    summary: 'Atendendo a pedidos, lançamos uma linha completa de chocolates 100% veganos com o mesmo sabor inconfundível.',
    date: '20 Jan 2026',
    readTime: '3 min',
    image: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=800&q=80',
    featured: false,
  },
  {
    id: 6,
    category: 'Metas',
    title: '100ª Franquia inaugurada no Brasil',
    summary: 'Alcançamos um marco histórico em nossa expansão nacional com a nova unidade em Curitiba.',
    date: '15 Jan 2026',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80',
    featured: false,
  },
  {
    id: 7,
    category: 'Vídeos',
    title: 'Anuncio',
    summary: 'Confira o novo anúncio da empresa Bouche Nerveuse, apresentando nossa marca e produtos de alta confeitaria.',
    date: '28 Fev 2026',
    readTime: '1 min',
    image: '/Video anuncio.mp4',
    featured: false,
    videoUrl: '/Video anuncio.mp4',
  },
  {
    id: 8,
    category: 'Conquistas',
    title: 'Kaiky finalmente conhece o dono da empresa',
    summary: 'Nosso Diretor de Inclusão Diversidade realizou o sonho de conhecer pessoalmente o fundador da Bouche Nerveuse. Momento emocionante marcado por muita alegria e inspiração para toda a equipe.',
    date: '05 Mar 2026',
    readTime: '2 min',
    image: '/kaiky conquista.png',
    featured: false,
  }
];

const ACHIEVEMENTS = [
  { icon: Trophy, title: 'Prêmio Top Quality', value: '2025', desc: 'Melhor Confeitaria' },
  { icon: Target, title: 'Meta de Vendas', value: '+45%', desc: 'Crescimento no Q1' },
  { icon: Award, title: 'Satisfação', value: '98%', desc: 'Avaliação de Clientes' },
  { icon: TrendingUp, title: 'Expansão', value: '100+', desc: 'Lojas no Brasil' },
];

const PARTNERS = [
  { name: 'Chef Master', logo: 'CM' },
  { name: 'Cacau Premium', logo: 'CP' },
  { name: 'Gourmet Fest', logo: 'GF' },
  { name: 'Doce Vida', logo: 'DV' },
  { name: 'Alta Gastronomia', logo: 'AG' },
];

export default function BoucheNewsPage() {
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const filteredNews = useMemo(() => {
    return NEWS_DATA.filter(news => {
      const matchesCategory = activeCategory === 'Todas' || news.category === activeCategory;
      const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            news.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const featuredNews = NEWS_DATA.find(n => n.featured) || NEWS_DATA[0];

  return (
    <div className="min-h-screen bg-[#faf9f8] font-sans text-gray-900">
      {/* Header Específico Bouche News */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="/" className="flex flex-col leading-none text-brown-dark cursor-pointer flex-shrink-0">
            <span className="font-serif text-xl tracking-wider">Bouche</span>
            <span className="font-script text-2xl text-wine -mt-2 ml-3">News</span>
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="/" className="hover:text-wine transition-colors">Home</a>
            <a href="/#produtos" className="hover:text-wine transition-colors">Produtos</a>
            <a href="/franquia" className="hover:text-wine transition-colors">Franquia</a>
            <a href="/bouche-news" className="text-wine border-b-2 border-wine pb-1">Bouche News</a>
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            <LoginButton />
            <div className="relative hidden sm:block max-w-xs w-full">
              <input 
                type="text" 
                placeholder="Buscar notícias..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-wine/20 focus:border-wine transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>

            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 bg-wine text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-wine-dark transition-colors shadow-sm"
              >
                Acesso Rápido <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                  >
                    <a href="#ultimas" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-wine transition-colors">Últimas Notícias</a>
                    <a href="#conquistas" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-wine transition-colors">Conquistas & Metas</a>
                    <a href="#patrocinios" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-wine transition-colors">Patrocínios</a>
                    <a href="#videos" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-wine transition-colors">Vídeos</a>
                    <a href="#galeria" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-wine transition-colors">Galeria</a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* 1) HERO */}
      <section className="relative pt-20 pb-24 lg:pt-28 lg:pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gray-50 via-white to-white z-0"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6 tracking-tight">Bouche News</h1>
            <p className="text-lg text-gray-500 font-medium">Atualizações, conquistas e movimentações da Bouche Nerveuse.</p>
          </div>

          {/* Featured News Card */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer bg-black">
            <div className="aspect-[21/9] md:aspect-[21/8] relative w-full">
              <Image 
                src={featuredNews.image} 
                alt={featuredNews.title} 
                fill 
                className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 lg:p-12 flex flex-col items-start">
              <span className="bg-wine text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full mb-4">
                {featuredNews.category}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 leading-tight max-w-4xl">
                {featuredNews.title}
              </h2>
              <div className="flex items-center gap-4 text-gray-300 text-sm mb-6">
                <span className="flex items-center gap-1"><Calendar size={14} /> {featuredNews.date}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {featuredNews.readTime}</span>
              </div>
              <button className="flex items-center gap-2 text-white font-medium hover:text-wine-light transition-colors group/btn">
                Ler agora <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2) ÚLTIMAS NOTÍCIAS */}
      <section id="ultimas" className="py-20 bg-[#faf9f8]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h3 className="text-3xl font-serif font-bold text-gray-900 mb-2">Últimas Notícias</h3>
              <p className="text-gray-500">Acompanhe as novidades da nossa marca.</p>
            </div>
            
            {/* Categories Filter */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat 
                      ? 'bg-gray-900 text-white shadow-md' 
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredNews.map((news) => (
                <motion.article 
                  key={news.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 group flex flex-col cursor-pointer"
                  onClick={() => news.videoUrl && setSelectedVideo(news.videoUrl)}
                >
                  <div className="relative h-56 w-full overflow-hidden bg-black">
                    {news.videoUrl ? (
                      <video 
                        src={news.videoUrl}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        preload="metadata"
                      />
                    ) : (
                      <Image 
                        src={news.image} 
                        alt={news.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                      {news.category}
                    </div>
                    {news.videoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                        <div className="w-16 h-16 bg-wine/90 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                          <PlayCircle size={32} className="ml-1" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-gray-400 text-xs mb-3">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {news.date}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {news.readTime}</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-wine transition-colors">{news.title}</h4>
                    <p className="text-gray-500 text-sm mb-6 line-clamp-3 flex-1">{news.summary}</p>
                    <button className="flex items-center gap-2 text-wine font-medium text-sm hover:text-wine-dark transition-colors mt-auto">
                      {news.videoUrl ? 'Assistir vídeo' : 'Ler mais'} <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
          
          {filteredNews.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              Nenhuma notícia encontrada para esta busca.
            </div>
          )}

          {filteredNews.length > 0 && (
            <div className="mt-12 text-center">
              <button className="bg-white border border-gray-200 text-gray-700 px-8 py-3 rounded-full font-medium hover:bg-gray-50 hover:shadow-sm transition-all">
                Carregar mais
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3) CONQUISTAS E METAS */}
      <section id="conquistas" className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">Conquistas & Metas</h3>
            <p className="text-gray-500 max-w-2xl mx-auto">Nossos números refletem o compromisso contínuo com a excelência e a satisfação de nossos clientes.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ACHIEVEMENTS.map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-wine/20 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-wine mb-6 group-hover:scale-110 transition-transform">
                  <item.icon size={24} />
                </div>
                <h4 className="text-gray-500 text-sm font-medium mb-1">{item.title}</h4>
                <div className="text-4xl font-bold text-gray-900 mb-2">{item.value}</div>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4) PATROCÍNIOS E PARCERIAS */}
      <section id="patrocinios" className="py-20 bg-[#faf9f8]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div>
              <h3 className="text-3xl font-serif font-bold text-gray-900 mb-2">Patrocínios & Parcerias</h3>
              <p className="text-gray-500">Marcas e eventos que caminham conosco.</p>
            </div>
          </div>

          {/* Logos */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16 opacity-60">
            {PARTNERS.map((partner, idx) => (
              <div key={idx} className="flex items-center gap-2 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">{partner.logo}</div>
                <span className="font-bold text-xl text-gray-400">{partner.name}</span>
              </div>
            ))}
          </div>

          {/* Cards de Ações */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex gap-6 items-start hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-wine/10 text-wine rounded-xl flex items-center justify-center flex-shrink-0">
                <Trophy size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">MasterChef Brasil 2026</h4>
                <p className="text-gray-500 text-sm mb-4">Patrocinadora oficial do maior reality de gastronomia do país, fornecendo chocolates premium para as provas.</p>
                <a href="#" className="text-wine text-sm font-medium hover:underline">Ver detalhes</a>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex gap-6 items-start hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-wine/10 text-wine rounded-xl flex items-center justify-center flex-shrink-0">
                <Target size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Instituto Cacau Sustentável</h4>
                <p className="text-gray-500 text-sm mb-4">Parceria para capacitação de pequenos produtores de cacau na Bahia, garantindo comércio justo e sustentabilidade.</p>
                <a href="#" className="text-wine text-sm font-medium hover:underline">Ver detalhes</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5) VÍDEOS EM DESTAQUE */}
      <section id="videos" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h3 className="text-3xl font-serif font-bold mb-2">Vídeos em Destaque</h3>
            <p className="text-gray-400">Bastidores, campanhas e entrevistas.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Video */}
            <div className="lg:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer aspect-video bg-black">
              <Image 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80" 
                alt="Video Principal" 
                fill 
                className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-wine/90 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(183,28,28,0.5)]">
                  <PlayCircle size={40} className="ml-1" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 to-transparent">
                <h4 className="text-2xl font-bold mb-2">A Arte da Chocolataria: Bastidores da Produção</h4>
                <p className="text-gray-300 text-sm">Documentário exclusivo sobre nosso processo artesanal.</p>
              </div>
            </div>

            {/* Smaller Videos */}
            <div className="flex flex-col gap-6">
              <div className="relative rounded-2xl overflow-hidden group cursor-pointer aspect-video bg-black flex-1">
                <Image 
                  src="https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80" 
                  alt="Video 2" 
                  fill 
                  className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <PlayCircle size={24} className="ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent">
                  <h4 className="text-sm font-bold">Campanha Dia das Mães 2026</h4>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden group cursor-pointer aspect-video bg-black flex-1">
                <Image 
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80" 
                  alt="Video 3" 
                  fill 
                  className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <PlayCircle size={24} className="ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent">
                  <h4 className="text-sm font-bold">Entrevista com o CEO</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6) GALERIA */}
      <section id="galeria" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-2">Galeria de Fotos</h3>
            <p className="text-gray-500">Momentos marcantes da nossa trajetória.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80',
              'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=600&q=80',
              'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80',
              'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80',
              'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80',
              'https://images.unsplash.com/photo-1612203985729-70726954388c?w=600&q=80',
              'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&q=80',
              'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80',
            ].map((src, idx) => (
              <div 
                key={idx} 
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => setSelectedImage(src)}
              >
                <Image 
                  src={src} 
                  alt={`Galeria ${idx + 1}`} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl w-full aspect-video rounded-xl overflow-hidden" onClick={e => e.stopPropagation()}>
              <Image src={selectedImage} alt="Imagem ampliada" fill className="object-contain" />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}

        {/* Video Modal */}
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div className="relative max-w-6xl w-full aspect-video rounded-xl overflow-hidden bg-black shadow-2xl" onClick={e => e.stopPropagation()}>
              <video 
                src={selectedVideo} 
                controls 
                autoPlay 
                poster="https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1200&q=80"
                className="w-full h-full object-contain"
              />
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors z-10"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7) NEWSLETTER */}
      <section className="py-24 bg-brown-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-wine/20 via-transparent to-transparent opacity-50"></div>
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <Mail size={48} className="mx-auto text-wine-light mb-6 opacity-80" />
          <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4">Assine nossa Newsletter</h3>
          <p className="text-white/70 mb-8 text-lg">Receba as principais notícias, lançamentos e atualizações da Bouche Nerveuse diretamente no seu e-mail.</p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto" onSubmit={e => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              required
              className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-wine-light focus:border-transparent transition-all"
            />
            <button type="submit" className="bg-wine hover:bg-wine-light text-white px-8 py-4 rounded-full font-bold transition-colors shadow-lg shadow-wine/20">
              Inscrever
            </button>
          </form>
          <p className="text-white/40 text-xs mt-4">Ao se inscrever, você concorda com nossa Política de Privacidade.</p>
        </div>
      </section>

      {/* Footer Simples */}
      <footer className="bg-[#1a1614] py-8 text-center text-white/40 text-sm flex flex-col items-center gap-2">
        <div className="max-w-7xl mx-auto px-4">
          &copy; {new Date().getFullYear()} Bouche Nerveuse. Todos os direitos reservados.
        </div>
        <a href="/creditos" className="hover:text-white transition-colors">Créditos</a>
      </footer>
    </div>
  );
}
