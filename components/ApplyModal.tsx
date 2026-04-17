"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, UploadCloud, FileText, CheckCircle2, ChevronRight, ChevronLeft, Bot, Send } from 'lucide-react';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = [
  "Pessoais", "Objetivo", "Escolaridade", "Experiência",
  "Competências", "Cursos", "Idiomas", "Perguntas", "Confirmação"
];

export default function ApplyModal({ isOpen, onClose }: ApplyModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState({
    // Step 1: Pessoais
    nome: '', email: '', telefone: '', cidade: '', dataNasc: '', linkedin: '', portfolio: '',
    // Step 2: Objetivo
    cargoInteresse: '', areaInteresse: '', pretensaoSalarial: '', tipoTrabalho: 'Híbrido', disponibilidade: 'Integral',
    // Step 3: Escolaridade
    nivelEscolaridade: 'Ensino Superior Completo', curso: '', instituicao: '', dataInicioEscola: '', dataFimEscola: '',
    // Step 4: Experiência
    empresa: '', cargoXP: '', inicioXP: '', fimXP: '', atualXP: false, atividadesXP: '', resultadosXP: '',
    // Step 5: Competências
    habTecnicas: '', habComportamentais: '', nivelHab: 'Intermediário',
    // Step 6: Cursos Extras
    cursoExtra: '', instituicaoExtra: '', cargaExtra: '', anoExtra: '',
    // Step 7: Idiomas
    idioma: 'Inglês', nivelLeitura: 'Avançado', nivelEscrita: 'Intermediário', nivelConversacao: 'Básico',
    // Step 8: Perguntas
    pqEmpresa: '', pqVaga: '', sobreVc: '', expArea: '', expVaga: '', dispHorario: '', facilAcesso: '', qndComecar: '',
    // Step 9: Confirmações
    aceiteTermos: false, aceitePrivacidade: false, aceiteBanco: false
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setFormData(prev => ({ ...prev, [target.name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      simulateAIParse();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      simulateAIParse();
    }
  };

  const simulateAIParse = () => {
    setIsScanning(true);
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        nome: 'Lucas Henrique Almeida',
        email: 'lucas.almeida.ti@email.com',
        telefone: '(16) 99888-7766',
        cidade: 'Araraquara - SP',
        dataNasc: '1995-10-15',
        linkedin: 'https://linkedin.com/in/lucashenriquealmeida',
        cargoInteresse: 'Analista de Sistemas / Automação',
        areaInteresse: 'Tecnologia / TI',
        pretensaoSalarial: 'R$ 4.500',
        curso: 'Engenharia da Computação',
        instituicao: 'Universidade Paulista do Interior',
        empresa: 'Grupo Horizonte Logística',
        cargoXP: 'Analista de Processos e Automação',
        atividadesXP: 'Desenvolvimento de fluxos no Power Automate, painéis no Excel/SharePoint, levantamento de requisitos operacionais.',
        habTecnicas: 'Power Automate, Power Query, SQL, SharePoint, Excel Avançado',
        habComportamentais: 'Perfil analítico, proativo, organizado, comunicação e liderança em projetos.',
        pqEmpresa: 'Sempre admirei a missão da empresa e acompanho o crescimento tecnológico do setor.',
        pqVaga: 'Possuo mais de 7 anos de experiência e os requisitos da vaga se alinham com meu foco em processos e automação.',
        sobreVc: 'Sou analítico, orientado a resultados e focado em gerar valor através da tecnologia e eficiência operacional.'
      }));
      setIsScanning(false);
      setCurrentStep(1); // take them to step 1 to review
    }, 2500);
  };

  const resetForm = () => {
    setFile(null);
    setCurrentStep(1);
    setFormData({
      nome: '', email: '', telefone: '', cidade: '', dataNasc: '', linkedin: '', portfolio: '',
      cargoInteresse: '', areaInteresse: '', pretensaoSalarial: '', tipoTrabalho: 'Híbrido', disponibilidade: 'Integral',
      nivelEscolaridade: 'Ensino Superior Completo', curso: '', instituicao: '', dataInicioEscola: '', dataFimEscola: '',
      empresa: '', cargoXP: '', inicioXP: '', fimXP: '', atualXP: false, atividadesXP: '', resultadosXP: '',
      habTecnicas: '', habComportamentais: '', nivelHab: 'Intermediário',
      cursoExtra: '', instituicaoExtra: '', cargaExtra: '', anoExtra: '',
      idioma: 'Inglês', nivelLeitura: 'Avançado', nivelEscrita: 'Intermediário', nivelConversacao: 'Básico',
      pqEmpresa: '', pqVaga: '', sobreVc: '', expArea: '', expVaga: '', dispHorario: '', facilAcesso: '', qndComecar: '',
      aceiteTermos: false, aceitePrivacidade: false, aceiteBanco: false
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 9) {
      setCurrentStep(c => c + 1);
      return;
    }
    // Form is completely finished!
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      resetForm();
      onClose();
    }, 4000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pb-20 lg:pb-6">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
        />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-4xl bg-[#fdfbfb] rounded-[2rem] shadow-2xl flex flex-col max-h-[92vh] md:max-h-[85vh] overflow-hidden border border-white"
        >
          {/* Main header block */}
          <div className="pt-10 px-6 sm:px-10 pb-6 border-b border-[#f0ebe1] flex items-start justify-between relative shrink-0 bg-[#f9f8f6]">
             <div className="relative z-10 w-full max-w-2xl">
                <h2 className="text-3xl sm:text-[2.5rem] leading-tight font-serif font-extrabold text-[#2d1b19] tracking-tight mb-2">
                  Trabalhe Conosco
                </h2>
                <p className="text-[#64748b] text-[16px] font-medium leading-relaxed">
                  Conte sobre sua trajetória profissional e anexe seu currículo para fazer parte da nossa equipe.
                </p>
             </div>
             <button onClick={onClose} className="absolute top-8 right-6 sm:right-10 z-20 w-11 h-11 bg-white border border-gray-200 text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 rounded-full flex items-center justify-center transition-all shadow-sm hover:shadow-md">
               <X size={22} strokeWidth={2.5} />
             </button>
          </div>

          <div className="flex-1 overflow-auto custom-scrollbar relative flex flex-col md:flex-row">
            
            {/* Smart Sidebar Upload Area (Only visible when form not submitted and on Desktop, or at step 1) */}
            {!isSuccess && (
              <div className="md:w-72 bg-gray-50/50 border-b md:border-b-0 md:border-r border-gray-100 p-6 flex flex-col shrink-0">
                <div className="bg-indigo-50 border border-indigo-100/50 p-5 rounded-2xl mb-6 shadow-sm relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 opacity-10 text-indigo-900 pointer-events-none">
                    <Bot size={80} />
                  </div>
                  <h3 className="font-bold text-indigo-900 flex items-center gap-2 mb-2 text-sm relative z-10">
                    <Bot size={18} /> Leitura com IA
                  </h3>
                  <p className="text-[13px] text-indigo-800/70 font-medium relative z-10">
                    Ao invés de preencher 9 etapas à mão, envie seu PDF e nós auto-preenchemos tudo para você revisar!
                  </p>
                </div>

                <div 
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => !isScanning && fileInputRef.current?.click()}
                  className={`flex-1 min-h-[160px] md:min-h-0 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all group
                    ${file ? 'border-green-300 bg-green-50 shadow-inner' : isScanning ? 'border-indigo-300 bg-indigo-50/50' : 'border-gray-200 hover:border-indigo-300 hover:bg-white bg-white/50 shadow-sm hover:shadow-md'}`}
                >
                  <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                  
                  {isScanning ? (
                    <div className="flex flex-col items-center">
                       <Bot size={32} className="text-indigo-500 animate-bounce mb-3" />
                       <div className="w-8 h-1 bg-indigo-200 rounded-full overflow-hidden mb-2">
                         <div className="w-full h-full bg-indigo-500 origin-left animate-pulse" />
                       </div>
                       <span className="text-xs font-bold text-indigo-700">Extraindo dados...</span>
                    </div>
                  ) : file ? (
                    <div className="flex flex-col items-center">
                       <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
                         <FileText size={24} />
                       </div>
                       <p className="text-xs font-bold text-green-800 break-words line-clamp-2 max-w-full">{file.name}</p>
                       <span className="text-[10px] bg-green-200 text-green-800 px-2 py-0.5 rounded-full font-bold mt-2">PREENCHIDO!</span>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-gray-50 text-gray-400 group-hover:text-indigo-500 group-hover:bg-indigo-50 rounded-full flex items-center justify-center mb-3 transition-colors">
                        <UploadCloud size={24} />
                      </div>
                      <p className="text-[13px] font-bold text-gray-700">Anexar Currículo</p>
                      <p className="text-[11px] text-gray-400 mt-1 font-medium">.PDF ou .DOCX</p>
                    </>
                  )}
                </div>

                {/* Progress bar visual for steps on the sidebar */}
                <div className="hidden md:block mt-8">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Progresso ({currentStep}/9)</p>
                  <div className="space-y-2 relative before:absolute before:inset-y-0 before:left-1.5 before:w-0.5 before:bg-gray-100">
                    {STEPS.map((step, idx) => {
                      const isActive = currentStep === idx + 1;
                      const isPast = currentStep > idx + 1;
                      return (
                        <div key={step} className={`flex items-center gap-3 relative z-10 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                          <div className={`w-3.5 h-3.5 rounded-full border-2 transition-colors ${isActive ? 'bg-[#b71c1c] border-[#b71c1c]' : isPast ? 'bg-[#b71c1c] border-[#b71c1c]' : 'bg-white border-gray-300'}`} />
                          <span className={`text-[13px] font-bold ${isActive ? 'text-[#b71c1c]' : 'text-gray-600'}`}>{step}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Form Area Content */}
            <div className="flex-1 p-6 md:p-8 bg-white relative">
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mb-6 ring-8 ring-green-50/50">
                    <CheckCircle2 size={48} className="text-green-500" />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-[#2d1b19] mb-3">Tudo Certo!</h3>
                  <p className="text-gray-500 text-[15px] max-w-sm mb-8 leading-relaxed">
                    Seu currículo e as respostas foram cadastradas no banco de talentos com sucesso.
                  </p>
                  <p className="text-xs text-gray-400 font-medium">Esta janela se fechará sozinha.</p>
                </div>
              ) : (
                <form id="apply-form" onSubmit={handleSubmit} className="flex flex-col h-full min-h-[400px]">
                  
                  <div className="mb-6 border-b border-gray-100 pb-4 flex items-center gap-4">
                    <span className="text-xl font-light text-gray-300 font-sans tracking-widest border-r border-gray-200 pr-4 select-none">
                      <span className="text-[#b71c1c] font-medium">0{currentStep}</span>
                      <span className="text-sm opacity-50 ml-1">/ 0{STEPS.length}</span>
                    </span> 
                    <h3 className="font-serif font-bold text-2xl text-[#b71c1c]">
                      {STEPS[currentStep - 1]}
                    </h3>
                  </div>

                  <div className="flex-1 space-y-5 animate-in slide-in-from-right-4 fade-in duration-300 fill-mode-both" key={currentStep}>
                     
                     {/* STEP 1: Pessoais */}
                     {currentStep === 1 && (
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                         <div className="sm:col-span-2">
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Nome Completo</label>
                           <input type="text" name="nome" required value={formData.nome} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium" />
                         </div>
                         <div>
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">E-mail</label>
                           <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium" />
                         </div>
                         <div>
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Telefone / WhatsApp</label>
                           <input type="tel" name="telefone" required value={formData.telefone} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium" />
                         </div>
                         <div>
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Cidade e Estado</label>
                           <input type="text" name="cidade" required value={formData.cidade} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium" />
                         </div>
                         <div>
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Data de Nasc.</label>
                           <input type="date" name="dataNasc" required value={formData.dataNasc} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium" />
                         </div>
                         <div>
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">LinkedIn (Opcional)</label>
                           <input type="url" name="linkedin" value={formData.linkedin} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium" />
                         </div>
                       </div>
                     )}

                     {/* STEP 2: Objetivo Profissional */}
                     {currentStep === 2 && (
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                         <div className="sm:col-span-2">
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Cargo de Interesse</label>
                           <input type="text" name="cargoInteresse" required value={formData.cargoInteresse} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium" />
                         </div>
                         <div>
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Área</label>
                           <input type="text" name="areaInteresse" required value={formData.areaInteresse} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium" />
                         </div>
                         <div>
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Pretensão Salarial</label>
                           <input type="text" name="pretensaoSalarial" required value={formData.pretensaoSalarial} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium" />
                         </div>
                         <div>
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Modelo de Trabalho</label>
                           <select name="tipoTrabalho" value={formData.tipoTrabalho} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium">
                             <option>Presencial</option><option>Híbrido</option><option>Remoto</option>
                           </select>
                         </div>
                         <div>
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Disponibilidade</label>
                           <select name="disponibilidade" value={formData.disponibilidade} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium">
                             <option>Integral</option><option>Meio Período</option><option>Noturno</option><option>Finais de Semana</option>
                           </select>
                         </div>
                       </div>
                     )}

                     {/* STEP 3: Escolaridade */}
                     {currentStep === 3 && (
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                         <div className="sm:col-span-2">
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Nível de Escolaridade</label>
                           <select name="nivelEscolaridade" value={formData.nivelEscolaridade} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium">
                             <option>Ensino Médio</option><option>Ensino Técnico</option><option>Ensino Superior Cursando</option><option>Ensino Superior Completo</option><option>Pós-graduação / Especialização</option>
                           </select>
                         </div>
                         <div className="sm:col-span-2">
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Curso</label>
                           <input type="text" name="curso" value={formData.curso} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium" />
                         </div>
                         <div className="sm:col-span-2">
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Instituição</label>
                           <input type="text" name="instituicao" value={formData.instituicao} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium" />
                         </div>
                         <div>
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Início</label>
                           <input type="month" name="dataInicioEscola" value={formData.dataInicioEscola} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium" />
                         </div>
                         <div>
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Conclusão (ou "Cursando")</label>
                           <input type="text" placeholder="Ex: Dez/2026 ou Cursando" name="dataFimEscola" value={formData.dataFimEscola} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium" />
                         </div>
                       </div>
                     )}

                     {/* STEP 4: Experiência */}
                     {currentStep === 4 && (
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                         <div className="sm:col-span-2">
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Nome da empresa</label>
                           <input type="text" name="empresa" value={formData.empresa} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium" />
                         </div>
                         <div className="sm:col-span-2 flex items-center gap-4">
                           <div className="flex-1">
                             <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Cargo</label>
                             <input type="text" name="cargoXP" value={formData.cargoXP} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium" />
                           </div>
                           <label className="flex items-center gap-2 mt-6 cursor-pointer bg-gray-50 px-4 py-3.5 rounded-xl border border-gray-200">
                             <input type="checkbox" name="atualXP" checked={formData.atualXP} onChange={handleInputChange} className="w-4 h-4 accent-[#b71c1c]" />
                             <span className="text-sm font-bold text-gray-700">Atuo Hoje</span>
                           </label>
                         </div>
                         <div>
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Data de Início</label>
                           <input type="month" name="inicioXP" value={formData.inicioXP} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium" />
                         </div>
                         <div>
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Data Final</label>
                           <input type="month" name="fimXP" disabled={formData.atualXP} value={formData.fimXP} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium disabled:opacity-50" />
                         </div>
                         <div className="sm:col-span-2">
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Principais Atividades</label>
                           <textarea name="atividadesXP" rows={3} value={formData.atividadesXP} onChange={handleInputChange} className="w-full resize-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium"></textarea>
                         </div>
                       </div>
                     )}

                     {/* STEP 5: Competências */}
                     {currentStep === 5 && (
                       <div className="space-y-5">
                         <div>
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Habilidades Técnicas</label>
                           <p className="text-xs text-gray-400 mb-2">Ex: Photoshop, React, Excel Avançado, Finanças Corporativas</p>
                           <textarea name="habTecnicas" rows={2} value={formData.habTecnicas} onChange={handleInputChange} className="w-full resize-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium"></textarea>
                         </div>
                         <div>
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Habilidades Comportamentais (Soft Skills)</label>
                           <p className="text-xs text-gray-400 mb-2">Ex: Liderança, Comunicação, Organização</p>
                           <textarea name="habComportamentais" rows={2} value={formData.habComportamentais} onChange={handleInputChange} className="w-full resize-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium"></textarea>
                         </div>
                         <div>
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Nível Geral</label>
                           <select name="nivelHab" value={formData.nivelHab} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium">
                             <option>Básico</option><option>Intermediário</option><option>Avançado</option><option>Fluente</option>
                           </select>
                         </div>
                       </div>
                     )}

                     {/* STEP 6: Cursos */}
                     {currentStep === 6 && (
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                         <div className="sm:col-span-2">
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Nome do curso</label>
                           <input type="text" name="cursoExtra" value={formData.cursoExtra} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium" />
                         </div>
                         <div className="sm:col-span-2">
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Instituição</label>
                           <input type="text" name="instituicaoExtra" value={formData.instituicaoExtra} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium" />
                         </div>
                         <div>
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Carga Horária / Tempo</label>
                           <input type="text" placeholder="Ex: 40 horas" name="cargaExtra" value={formData.cargaExtra} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium" />
                         </div>
                         <div>
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Ano Conclusão</label>
                           <input type="text" placeholder="Ex: 2023" name="anoExtra" value={formData.anoExtra} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium" />
                         </div>
                         <div className="sm:col-span-2">
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Anexar Certificado (Opcional)</label>
                           <input type="file" accept=".pdf,.png,.jpg" className="w-full bg-gray-50 border border-dashed border-gray-300 rounded-xl px-4 py-4 text-[13px] focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer" />
                         </div>
                       </div>
                     )}

                     {/* STEP 7: Idiomas */}
                     {currentStep === 7 && (
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                         <div className="sm:col-span-2">
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Idioma Principal / Adicional</label>
                           <select name="idioma" value={formData.idioma} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium">
                             <option>Inglês</option><option>Espanhol</option><option>Alemão</option><option>Francês</option><option>Outro</option>
                           </select>
                         </div>
                         <div>
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Nível de Leitura</label>
                           <select name="nivelLeitura" value={formData.nivelLeitura} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium">
                             <option>Básico</option><option>Intermediário</option><option>Avançado</option><option>Fluente</option>
                           </select>
                         </div>
                         <div>
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Nível de Escrita</label>
                           <select name="nivelEscrita" value={formData.nivelEscrita} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium">
                             <option>Básico</option><option>Intermediário</option><option>Avançado</option><option>Fluente</option>
                           </select>
                         </div>
                         <div className="sm:col-span-2">
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Nível de Conversação</label>
                           <select name="nivelConversacao" value={formData.nivelConversacao} onChange={handleInputChange} className="w-full md:w-1/2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium">
                             <option>Básico</option><option>Intermediário</option><option>Avançado</option><option>Fluente</option>
                           </select>
                         </div>
                       </div>
                     )}

                     {/* STEP 8: Perguntas Iniciais */}
                     {currentStep === 8 && (
                       <div className="space-y-5">
                         <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 mb-4">
                           <span className="text-amber-600 text-xl font-bold">!</span>
                           <p className="text-[13px] text-amber-900 font-medium">Estas perguntas substituem a entrevista inicial de triagem. Responda com sinceridade!</p>
                         </div>
                         <div>
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Por que quer trabalhar na empresa?</label>
                           <input type="text" name="pqEmpresa" value={formData.pqEmpresa} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium" />
                         </div>
                         <div>
                           <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Por que quer essa vaga e Fale sobre você</label>
                           <textarea name="sobreVc" rows={3} value={formData.sobreVc} onChange={handleInputChange} className="w-full resize-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium"></textarea>
                         </div>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           <div>
                             <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Tem experiência prévia aqui?</label>
                             <select name="expArea" value={formData.expArea} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium">
                               <option>Sim</option><option>Não, busco 1º emprego</option><option>Não, sou de outra área</option>
                             </select>
                           </div>
                           <div>
                             <label className="block text-[13px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Quando poderia começar?</label>
                             <input type="text" name="qndComecar" placeholder="Ex: Imediato, 15 dias..." value={formData.qndComecar} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#b71c1c]/20 outline-none text-gray-900 font-medium" />
                           </div>
                         </div>
                       </div>
                     )}

                     {/* STEP 9: Confirmações */}
                     {currentStep === 9 && (
                       <div className="space-y-4">
                         <div className="bg-red-50 text-[#b71c1c] p-6 rounded-2xl border border-red-100 mb-6">
                           <h4 className="font-serif font-bold text-xl mb-2">Quase lá!</h4>
                           <p className="text-[14px] font-medium opacity-90">Ao enviar sua candidatura, seu perfil será avaliado pelos nossos RHs. Leia e aceite os termos para concluir.</p>
                         </div>

                         <label className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                           <input type="checkbox" name="aceiteTermos" checked={formData.aceiteTermos} onChange={handleInputChange} required className="w-5 h-5 shrink-0 accent-[#b71c1c] mt-0.5" />
                           <span className="text-sm font-medium text-gray-700">Declaro que as informações preenchidas nestas 8 etapas são rigorosamente verdadeiras e possuo documentação para comprovação.</span>
                         </label>
                         
                         <label className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                           <input type="checkbox" name="aceitePrivacidade" checked={formData.aceitePrivacidade} onChange={handleInputChange} required className="w-5 h-5 shrink-0 accent-[#b71c1c] mt-0.5" />
                           <span className="text-sm font-medium text-gray-700">Li e aceito a <b>Política de Privacidade</b> da Bouche Nerveuse.</span>
                         </label>

                         <label className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                           <input type="checkbox" name="aceiteBanco" checked={formData.aceiteBanco} onChange={handleInputChange} required className="w-5 h-5 shrink-0 accent-[#b71c1c] mt-0.5" />
                           <span className="text-sm font-medium text-gray-700">Autorizo o armazenamento dos meus dados no Banco de Talentos para eventuais contatos em vagas futuras caso não selecionado no processo atual.</span>
                         </label>
                       </div>
                     )}

                  </div>

                  {/* Actions Footer */}
                  <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <button 
                      type="button"
                      onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                      disabled={currentStep === 1}
                      className="px-5 py-3 rounded-full font-bold text-gray-500 hover:text-[#b71c1c] hover:bg-red-50 transition-colors disabled:opacity-30 flex items-center gap-2"
                    >
                      <ChevronLeft size={18} /> Anterior
                    </button>
                    
                    <button 
                      type="submit"
                      disabled={isScanning}
                      className="px-8 py-3.5 bg-[#b71c1c] hover:bg-red-700 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 flex items-center gap-2"
                    >
                      {currentStep === 9 ? 'Finalizar Envio' : 'Próxima Etapa'} 
                      {currentStep === 9 ? <Send size={18} /> : <ChevronRight size={18} />}
                    </button>
                  </div>
                  
                </form>
              )}
            </div>
            
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
