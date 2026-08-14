"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { MessageCircle, Users, MessageSquare, Phone, Target, X, MapPin } from 'lucide-react';

export default function FranchiseCtaSection() {
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<{name: string, image: string, description: string} | null>(null);

  // Note: O isVagaAlertOpen não deve estar aqui. Se houver vagas na home, mova para um componente menor.
  // Vou remover o `isVagaAlertOpen` daqui porque ele faz parte da NavBar (Header global já feito).

  return (
    <>
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
                    <Image src="/Equipe.webp" alt="Equipe" width={64} height={64} className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500"  />
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
                    <div style={{ "--x": 5, "--y": 67 } as React.CSSProperties} className="map-city group cursor-pointer" onClick={() => { setSelectedCity({ name: 'Rio de Janeiro', image: '/Rio de janeiro.webp', description: 'Nossa unidade no Rio de Janeiro está localizada em um dos principais centros comerciais da cidade, oferecendo nossa linha completa de bolos e tortas industriais para toda a região metropolitana.' }); setIsCityModalOpen(true); }}>
                      <div className="map-city__label">
                        <span data-icon="🏖️" className="map-city__sign">Rio de Janeiro</span>
                        <Image src="/Rio%20de%20janeiro.webp" alt="Rio de Janeiro" width={120} height={80} className="map-city__image" />
                      </div>
                    </div>
                    <div style={{ "--x": 32, "--y": 32 } as React.CSSProperties} className="map-city group cursor-pointer" onClick={() => { setSelectedCity({ name: 'São Paulo', image: '/Sao paulo.webp', description: 'A unidade de São Paulo é a nossa matriz brasileira, com capacidade de produção industrial de alta escala, atendendo toda a demanda da região sudeste.' }); setIsCityModalOpen(true); }}>
                      <div className="map-city__label">
                        <span data-icon="🏢" className="map-city__sign anim anim-grow">São Paulo</span>
                        <Image src="/Sao%20paulo.webp" alt="São Paulo" width={120} height={80} className="map-city__image" />
                      </div>
                    </div>
                    <div style={{ "--x": 58, "--y": 83 } as React.CSSProperties} className="map-city group cursor-pointer" onClick={() => { setSelectedCity({ name: 'Salvador', image: '/Salvador.webp', description: 'Localizada na capital baiana, nossa unidade de Salvador leva o sabor único dos nossos produtos para todo o Nordeste brasileiro.' }); setIsCityModalOpen(true); }}>
                      <div className="map-city__label">
                        <span data-icon="🌞" className="map-city__sign anim anim-slidein">Salvador</span>
                        <Image src="/Salvador.webp" alt="Salvador" width={120} height={80} className="map-city__image" />
                      </div>
                    </div>
                    <div style={{ "--x": 65, "--y": 22 } as React.CSSProperties} className="map-city group cursor-pointer" onClick={() => { setSelectedCity({ name: 'Brasília', image: '/Brasília.webp', description: 'A unidade de Brasília atende o Distrito Federal e região centro-oeste com produtos de alta qualidade e logística eficiente.' }); setIsCityModalOpen(true); }}>
                      <div className="map-city__label">
                        <span data-icon="🏛️" className="map-city__sign">Brasília</span>
                        <Image src="/Bras%C3%ADlia.webp" alt="Brasília" width={120} height={80} className="map-city__image" />
                      </div>
                    </div>
                    <div style={{ "--x": 87, "--y": 58 } as React.CSSProperties} className="map-city group cursor-pointer" onClick={() => { setSelectedCity({ name: 'Curitiba', image: '/Curitiba.webp', description: 'Nossa unidade em Curitiba representa a expansão no sul do país, trazendo nossa tradição francesa para a capital paranaense.' }); setIsCityModalOpen(true); }}>
                      <div className="map-city__label">
                        <span data-icon="🌲" className="map-city__sign">Curitiba</span>
                        <Image src="/Curitiba.webp" alt="Curitiba" width={120} height={80} className="map-city__image" />
                      </div>
                    </div>
                    <div style={{ "--x": 94, "--y": 38 } as React.CSSProperties} className="map-city group cursor-pointer" onClick={() => { setSelectedCity({ name: 'Florianópolis', image: '/Florianópolis.webp', description: 'A unidade de Florianópolis combina tradição francesa com o charme da ilha, servindo toda a região catarinense.' }); setIsCityModalOpen(true); }}>
                      <div className="map-city__label">
                        <span data-icon="🌊" className="map-city__sign anim anim-slidein">Florianópolis</span>
                        <Image src="/Florian%C3%B3polis.webp" alt="Florianópolis" width={120} height={80} className="map-city__image" />
                      </div>
                    </div>
                    <div style={{ "--x": 45, "--y": 60 } as React.CSSProperties} className="map-city group cursor-pointer" onClick={() => { setSelectedCity({ name: 'Xique-Xique', image: '/Xique Xeque.webp', description: 'Localizada no interior da Bahia, nossa unidade de Xique-Xique leva a tradição francesa para o sertão nordestino com muito orgulho.' }); setIsCityModalOpen(true); }}>
                      <div className="map-city__label">
                        <span data-icon="🌵" className="map-city__sign anim anim-grow">Xique-Xique</span>
                        <Image src="/Xique%20Xeque.webp" alt="Xique-Xique" width={120} height={80} className="map-city__image" />
                      </div>
                    </div>
                    <div style={{ "--x": 25, "--y": 45 } as React.CSSProperties} className="map-city group cursor-pointer" onClick={() => { setSelectedCity({ name: 'Matão', image: '/Matao.webp', description: 'Muito mato e aldeias. Nossa unidade em Matão está situada no interior paulista, rodeada pela natureza exuberante e comunidades rurais tradicionais.' }); setIsCityModalOpen(true); }}>
                      <div className="map-city__label">
                        <span data-icon="🌳" className="map-city__sign anim anim-slidein">Matão</span>
                        <Image src="/Matao.webp" alt="Matão" width={120} height={80} className="map-city__image" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Modal */}
      <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${isTeamModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsTeamModalOpen(false)}></div>
        <div className={`relative bg-gradient-to-br from-brown-dark to-[#2a1411] rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-white/10 transition-all duration-500 transform ${isTeamModalOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}`}>
          {/* Modal Header */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => { setSelectedImage("/Equipe.webp"); setIsImageModalOpen(true); }}>
              <Image src="/Equipe.webp" alt="Equipe" width={96} height={96} className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"  />
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
                  loading="lazy"
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
    </>
  );
}
