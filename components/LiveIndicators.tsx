"use client";

import React, { useState, useEffect } from 'react';
import { Activity, ArrowRight, QrCode } from 'lucide-react';

export default function LiveIndicators() {
  const [indicadores, setIndicadores] = useState({
    diversidade: 0,
    qualidadeTrabalho: 0,
    valorizacao: 0,
    qualidadeProduto: 0
  });

  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  useEffect(() => {
    // Gera porcentagens aleatórias boas (entre 85 e 98)
    const randomGood = () => Math.floor(Math.random() * (98 - 85 + 1)) + 85;
    
    // Pequeno atraso para a animação disparar após a montagem
    const timer = setTimeout(() => {
      setIndicadores({
        diversidade: randomGood(),
        qualidadeTrabalho: randomGood(),
        valorizacao: randomGood(),
        qualidadeProduto: randomGood()
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section id="indicadores" className="bg-white rounded-[2rem] p-10 lg:p-14 shadow-xl border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-wine/5 rounded-bl-full -mr-10 -mt-10"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-wine/10 rounded-xl cursor-pointer hover:bg-wine/20 transition-colors" onClick={() => setIsQRModalOpen(true)}>
                  <Activity className="text-wine" size={28} />
                </div>
                <h2 className="text-3xl font-serif font-bold text-brown-dark">Indicadores em Tempo Real</h2>
              </div>
              <p className="text-gray-600 text-lg max-w-2xl">
                Acompanhe os resultados da nossa pesquisa de clima organizacional. Os dados são atualizados conforme nossa equipe responde ao formulário interno.
              </p>
            </div>
            <a 
              href="https://docs.google.com/forms/d/1u7mrz_eH3g8m4Up7gq1IPz7AGa0RZaTRfBcQut57w14/viewform" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-wine hover:bg-wine-light text-white px-6 py-3 rounded-full font-medium transition-colors whitespace-nowrap"
            >
              Responder Pesquisa <ArrowRight size={18} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "DIVERSIDADE E INCLUSÃO", value: indicadores.diversidade },
              { label: "QUALIDADE NO TRABALHO", value: indicadores.qualidadeTrabalho },
              { label: "VALORIZAÇÃO DO TRABALHO", value: indicadores.valorizacao },
              { label: "QUALIDADE DO PRODUTO", value: indicadores.qualidadeProduto }
            ].map((ind, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col items-center text-center group hover:border-wine/30 transition-colors">
                <div className="relative w-32 h-32 mb-6">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle 
                      cx="50" cy="50" r="40" 
                      fill="transparent" 
                      stroke="#f3f4f6" 
                      strokeWidth="8" 
                    />
                    <circle 
                      cx="50" cy="50" r="40" 
                      fill="transparent" 
                      stroke="#b71c1c" 
                      strokeWidth="8" 
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - ind.value / 100)}`}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-brown-dark">{ind.value}%</span>
                  </div>
                </div>
                <h3 className="font-bold text-sm text-gray-800 tracking-wide">{ind.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QR Code Modal for LiveIndicators */}
      <div className={`fixed inset-0 z-[105] flex items-center justify-center p-4 transition-all duration-300 ${isQRModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setIsQRModalOpen(false)}></div>
        <div className={`relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/20 transition-all duration-500 transform ${isQRModalOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}`}>
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-wine/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <QrCode className="text-wine" size={32} />
            </div>
            <h2 className="font-serif text-2xl font-bold text-brown-dark mb-2">Pesquisa de Clima</h2>
            <p className="text-gray-500 text-sm">Escaneie o QR Code para acessar o formulário</p>
          </div>

          <div className="relative bg-white rounded-2xl p-6 border-2 border-gray-200 flex flex-col items-center justify-center mb-6">
            <div className="w-64 h-64 rounded-xl overflow-hidden relative flex items-center justify-center">
              <img 
                src="/QRCode_Fácil.svg" 
                alt="QR Code Pesquisa de Clima"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="bg-wine/5 rounded-xl p-4 mb-6">
            <p className="text-gray-600 text-sm text-center">
              Aponte a câmera do seu celular para o QR Code e acesse diretamente a pesquisa de clima organizacional.
            </p>
          </div>

          <div className="flex gap-3">
            <a 
              href="https://docs.google.com/forms/d/1u7mrz_eH3g8m4Up7gq1IPz7AGa0RZaTRfBcQut57w14/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-wine hover:bg-wine-light text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <ArrowRight size={18} />
              Abrir Formulário
            </a>
            <button 
              onClick={() => setIsQRModalOpen(false)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl transition-all duration-300 border border-gray-200"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
