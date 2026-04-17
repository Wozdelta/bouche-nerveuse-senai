"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Eye, EyeOff, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';

export default function CadastroPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    confirmarSenha: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    alert(`Cadastro efetuado com sucesso!\n\nBem-vindo(a), ${formData.nome}!`);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex w-full font-sans text-brown-dark overflow-hidden">
      
      {/* Left side: Image showcase (inverted from login) */}
      <div className="hidden lg:block lg:w-1/2 relative bg-[#1c0e0c] overflow-hidden">
        {/* Parallax style image */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image 
            src="/Sao paulo.png" 
            alt="Bouche Nerveuse Patisserie - São Paulo" 
            fill 
            className="object-cover object-center opacity-80"
            unoptimized
            priority
          />
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0c0a]/90 via-[#1a0c0a]/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#1a0c0a]/60"></div>
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
              Faça parte da nossa <span className="text-[#ff8a8a] italic">história</span>.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed font-light">
              Cadastre-se agora para receber novidades em primeira mão, ofertas exclusivas e convites para degustações especiais.
            </p>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#b5122e]/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-1/2 right-0 w-96 h-96 bg-[#ff8a8a]/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
      </div>

      {/* Right side: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 relative z-10 bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.05)] overflow-y-auto min-h-screen py-10">
        
        {/* Back Button */}
        <Link 
          href="/" 
          className="absolute top-8 right-8 sm:top-12 sm:right-12 flex items-center gap-2 text-gray-500 hover:text-brown-dark transition-colors font-medium group z-20"
        >
          <span className="hidden sm:block">Voltar ao site</span>
          <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-gray-50 group-hover:border-gray-300 transition-all">
            <ArrowLeft size={18} className="rotate-180" />
          </div>
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md mx-auto pt-16 lg:pt-0"
        >
          {/* Header */}
          <div className="mb-10 text-center sm:text-left">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1a1a1a] mb-3 leading-tight">
              Crie sua conta
            </h1>
            <p className="text-gray-500 font-medium text-lg">
              Preencha os dados abaixo para se cadastrar.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-gray-700 ml-1">Nome Completo</label>
              <div className="relative">
                <input 
                  type="text" 
                  name="nome"
                  required
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-5 py-4 text-base focus:outline-none focus:bg-white focus:border-[#b5122e]/30 focus:ring-4 focus:ring-[#b5122e]/10 transition-all text-gray-900 placeholder-gray-400 font-medium"
                  placeholder="Seu nome"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-gray-700 ml-1">E-mail</label>
                <div className="relative">
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-5 py-4 text-base focus:outline-none focus:bg-white focus:border-[#b5122e]/30 focus:ring-4 focus:ring-[#b5122e]/10 transition-all text-gray-900 placeholder-gray-400 font-medium"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-gray-700 ml-1">Telefone</label>
                <div className="relative">
                  <input 
                    type="tel" 
                    name="telefone"
                    required
                    value={formData.telefone}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-5 py-4 text-base focus:outline-none focus:bg-white focus:border-[#b5122e]/30 focus:ring-4 focus:ring-[#b5122e]/10 transition-all text-gray-900 placeholder-gray-400 font-medium"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-gray-700 ml-1">Senha</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  name="senha"
                  required
                  value={formData.senha}
                  onChange={handleChange}
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

            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-gray-700 ml-1">Confirmar Senha</label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmarSenha"
                  required
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-5 py-4 text-base focus:outline-none focus:bg-white focus:border-[#b5122e]/30 focus:ring-4 focus:ring-[#b5122e]/10 transition-all text-gray-900 placeholder-gray-400 font-medium tracking-[0.2em]"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center outline-none bg-transparent"
                  aria-label={showConfirmPassword ? "Ocultar senha" : "Ver senha"}
                >
                  {showConfirmPassword ? <EyeOff size={22} strokeWidth={2} /> : <Eye size={22} strokeWidth={2} />}
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed pt-2">
              Ao se cadastrar, você concorda com nossos <Link href="/termos" className="text-[#b5122e] font-bold hover:underline">Termos de Serviço</Link> e <Link href="/privacidade" className="text-[#b5122e] font-bold hover:underline">Política de Privacidade</Link>.
            </p>

            <button 
              type="submit"
              className="w-full bg-[#2a1411] hover:bg-[#b5122e] text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-[0_8px_20px_rgba(42,20,17,0.2)] hover:shadow-[0_12px_25px_rgba(181,18,46,0.3)] hover:-translate-y-1 flex items-center justify-center gap-3 text-lg mt-6 group overflow-hidden relative"
            >
               <span className="relative z-10 flex items-center gap-2">
                 Cadastrar <UserPlus size={20} className="group-hover:scale-110 transition-transform" />
               </span>
            </button>

            <div className="text-center pt-6 border-t border-gray-100 mt-6">
              <p className="text-gray-500 font-medium">
                Já tem uma conta?{' '}
                <Link href="/login" className="text-[#b5122e] font-bold hover:underline underline-offset-4">
                  Faça login
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
