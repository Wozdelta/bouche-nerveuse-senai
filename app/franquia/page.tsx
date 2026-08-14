"use client";

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function FranquiaPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#1a0f0e] text-white selection:bg-wine-light selection:text-white flex flex-col">
      {/* Simple Header */}
      <header className="w-full p-6 flex items-center justify-between z-10 relative">
        <a href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
          <ArrowLeft size={20} />
          <span className="font-medium uppercase tracking-wider text-sm">Voltar para Home</span>
        </a>
        <div className="flex flex-col leading-none text-white cursor-pointer items-end">
          <span className="font-serif text-xl tracking-wider">Bouche</span>
          <span className="font-script text-3xl text-wine-light -mt-2 mr-2">Nerveuse</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-5xl bg-gradient-to-br from-brown-dark to-[#2a1411] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col lg:flex-row">
          
          {/* Left Side: Info */}
          <div className="w-full lg:w-5/12 p-10 lg:p-14 bg-black/20 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            
            <div className="relative z-10">
              <h1 className="text-4xl lg:text-5xl font-serif mb-6 leading-tight">
                Seja um <span className="text-wine-light italic">Franqueado</span>
              </h1>
              <p className="text-white/70 text-lg font-light mb-8">
                Junte-se à marca de doces mais sofisticada do mercado e leve a experiência Bouche Nerveuse para a sua região.
              </p>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <span className="text-white/50 text-xs font-bold uppercase tracking-widest block mb-2">Investimento Inicial</span>
                <div className="text-lg sm:text-xl xl:text-2xl font-serif text-wine-light mb-1 tracking-tight break-all">R$ 5.000.000.000.000,01</div>
                <p className="text-sm text-white/60 font-light mt-2">
                  (5 trilhões e 1 centavo)
                </p>
              </div>
            </div>

            <div className="relative z-10 mt-12">
              <div className="flex items-center gap-4 text-white/80 mb-4">
                <CheckCircle2 size={20} className="text-[#4ade80]" />
                <span className="font-light">Suporte completo de gestão</span>
              </div>
              <div className="flex items-center gap-4 text-white/80 mb-4">
                <CheckCircle2 size={20} className="text-[#4ade80]" />
                <span className="font-light">Treinamento de equipe</span>
              </div>
              <div className="flex items-center gap-4 text-white/80">
                <CheckCircle2 size={20} className="text-[#4ade80]" />
                <span className="font-light">Marketing nacional</span>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full lg:w-7/12 p-10 lg:p-14">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
                <div className="w-20 h-20 bg-[#4ade80]/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} className="text-[#4ade80]" />
                </div>
                <h3 className="text-3xl font-serif mb-4">Solicitação Recebida!</h3>
                <p className="text-white/70 text-lg font-light mb-8 max-w-md">
                  Nossa equipe de expansão analisará seu perfil e entrará em contato em breve para os próximos passos.
                </p>
                <a href="/" className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                  Voltar para o site
                </a>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-serif mb-8">Preencha seus dados</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-white/60 uppercase tracking-wider font-medium ml-1">Nome Completo</label>
                      <input type="text" required className="w-full bg-white/5 border border-white/10 px-5 py-3.5 rounded-xl outline-none text-white placeholder:text-white/30 focus:border-wine-light focus:bg-white/10 transition-colors" placeholder="Ex: João Silva" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-white/60 uppercase tracking-wider font-medium ml-1">E-mail</label>
                      <input type="email" required className="w-full bg-white/5 border border-white/10 px-5 py-3.5 rounded-xl outline-none text-white placeholder:text-white/30 focus:border-wine-light focus:bg-white/10 transition-colors" placeholder="joao@email.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-white/60 uppercase tracking-wider font-medium ml-1">Telefone / WhatsApp</label>
                      <input type="tel" required className="w-full bg-white/5 border border-white/10 px-5 py-3.5 rounded-xl outline-none text-white placeholder:text-white/30 focus:border-wine-light focus:bg-white/10 transition-colors" placeholder="(00) 00000-0000" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-white/60 uppercase tracking-wider font-medium ml-1">Capital Disponível</label>
                      <select required defaultValue="" className="w-full bg-white/5 border border-white/10 px-5 py-3.5 rounded-xl outline-none text-white focus:border-wine-light focus:bg-white/10 transition-colors appearance-none">
                        <option value="" disabled className="text-black">Selecione uma opção</option>
                        <option value="5t" className="text-black">Tenho os 5 Trilhões e 1 centavo</option>
                        <option value="more" className="text-black">Tenho mais que isso</option>
                        <option value="less" className="text-black">Ainda estou juntando</option>
                        <option value="rlx" className="text-black">RLX eu sou o Kaiky</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-white/60 uppercase tracking-wider font-medium ml-1">Cidade / Estado de Interesse</label>
                    <input type="text" required className="w-full bg-white/5 border border-white/10 px-5 py-3.5 rounded-xl outline-none text-white placeholder:text-white/30 focus:border-wine-light focus:bg-white/10 transition-colors" placeholder="Ex: São Paulo - SP" />
                  </div>

                  <div className="flex flex-col gap-2 mb-4">
                    <label className="text-sm text-white/60 uppercase tracking-wider font-medium ml-1">Por que você quer ser um franqueado?</label>
                    <textarea required rows={3} className="w-full bg-white/5 border border-white/10 px-5 py-3.5 rounded-xl outline-none text-white placeholder:text-white/30 focus:border-wine-light focus:bg-white/10 transition-colors resize-none" placeholder="Conte-nos um pouco sobre você..."></textarea>
                  </div>

                  <button type="submit" className="custom-btn-2">
                    <span>
                      ENVIAR SOLICITAÇÃO
                      <ArrowRight size={20} />
                    </span>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </main>
      
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image 
          src="https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=2000&auto=format&fit=crop"
          alt="Background"
          fill
          className="object-cover opacity-10"
          
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0e]/80 via-[#1a0f0e]/95 to-[#1a0f0e]"></div>
      </div>
    </div>
  );
}
