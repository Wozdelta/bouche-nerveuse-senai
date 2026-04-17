"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Eye, EyeOff, LogIn } from 'lucide-react';
import { motion } from 'motion/react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Login efetuado!\n\nEmail: ${email}\nLembrar: ${rememberMe ? 'Sim' : 'Não'}`);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex w-full font-sans text-brown-dark overflow-hidden">
      {/* Left side: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 relative z-10 bg-white shadow-[20px_0_50px_rgba(0,0,0,0.05)]">
        
        {/* Back Button */}
        <Link 
          href="/" 
          className="absolute top-8 left-8 sm:top-12 sm:left-12 flex items-center gap-2 text-gray-500 hover:text-brown-dark transition-colors font-medium group"
        >
          <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-gray-50 group-hover:border-gray-300 transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="hidden sm:block">Voltar ao site</span>
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md mx-auto pt-20"
        >
          {/* Header */}
          <div className="mb-10 text-center sm:text-left">
            <div className="flex flex-col leading-none mb-6 items-center sm:items-start cursor-default select-none">
              <span className="font-serif text-3xl font-bold tracking-tight text-[#2d1b19]">Bouche</span>
              <span className="font-script text-5xl text-[#b5122e] -mt-4 ml-6 drop-shadow-sm">Nerveuse</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1a1a1a] mb-3 leading-tight">
              Bem-vindo<br /> de volta
            </h1>
            <p className="text-gray-500 font-medium text-lg">
              Insira seus dados para acessar sua conta exclusiva.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-gray-700 ml-1">E-mail</label>
              <div className="relative">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-5 py-4 text-base focus:outline-none focus:bg-white focus:border-[#b5122e]/30 focus:ring-4 focus:ring-[#b5122e]/10 transition-all text-gray-900 placeholder-gray-400 font-medium"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-gray-700 ml-1">Senha</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-5 py-4 text-base focus:outline-none focus:bg-white focus:border-[#b5122e]/30 focus:ring-4 focus:ring-[#b5122e]/10 transition-all text-gray-900 placeholder-gray-400 font-medium tracking-[0.2em]"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center outline-none bg-transparent"
                  aria-label={showPassword ? "Ocultar senha" : "Ver senha"}
                >
                  {showPassword ? <EyeOff size={22} strokeWidth={2} /> : <Eye size={22} strokeWidth={2} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5">
                  <input 
                    type="checkbox" 
                    className="peer sr-only"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded-[6px] peer-checked:bg-[#b5122e] peer-checked:border-[#b5122e] transition-all flex items-center justify-center shadow-sm">
                    <svg className={`w-3.5 h-3.5 text-white transition-opacity ${rememberMe ? 'opacity-100' : 'opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-600 group-hover:text-gray-900 transition-colors select-none">Lembrar de mim</span>
              </label>
              
              <Link href="/esqueci-senha" className="text-sm font-bold text-[#b5122e] hover:text-[#8e0e24] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#8e0e24] after:transition-all after:duration-300">
                Esqueceu a senha?
              </Link>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#2a1411] hover:bg-[#b5122e] text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-[0_8px_20px_rgba(42,20,17,0.2)] hover:shadow-[0_12px_25px_rgba(181,18,46,0.3)] hover:-translate-y-1 flex items-center justify-center gap-3 text-lg mt-6 group overflow-hidden relative"
            >
               <span className="relative z-10 flex items-center gap-2">
                 Entrar <LogIn size={20} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
               </span>
            </button>

            <div className="text-center pt-8 border-t border-gray-100 mt-8">
              <p className="text-gray-500 font-medium">
                Ainda não tem uma conta?{' '}
                <Link href="/cadastro" className="text-[#b5122e] font-bold hover:underline underline-offset-4">
                  Cadastre-se grátis
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Right side: Image showcase */}
      <div className="hidden lg:block lg:w-1/2 relative bg-[#1c0e0c] overflow-hidden">
        {/* Parallax style image */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image 
            src="https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1600&auto=format&fit=crop" 
            alt="Bouche Nerveuse Desserts" 
            fill 
            className="object-cover object-center opacity-80"
            
            priority
          />
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0c0a]/90 via-[#1a0c0a]/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#1a0c0a]/60"></div>
        </motion.div>

        {/* Floating elements & Text */}
        <div className="absolute inset-0 p-16 flex flex-col justify-end">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-xl"
          >

            <h2 className="font-serif text-5xl font-bold text-white mb-6 leading-tight">
              O sabor inconfundível da <span className="text-[#ff8a8a] italic">experiência premium</span>.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed font-light">
              Descubra um mundo de texturas e sabores em cada mordida.
              Acesse sua conta para fazer pedidos exclusivos e acompanhar suas recompensas.
            </p>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#b5122e]/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-1/2 left-0 w-96 h-96 bg-[#ff8a8a]/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
      </div>
    </div>
  );
}
