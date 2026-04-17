"use client";

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, MapPin, DollarSign, Clock, Briefcase, 
  CheckCircle2, AlertTriangle, Send, Building2, 
  GraduationCap, Users, Heart, Sparkles, ChevronRight,
  Phone, Star, Share2, Info, ArrowRight
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import DrawerMenu from '../../components/DrawerMenu';
import LoginButton from '../../components/LoginButton';
import ApplyModal from '../../components/ApplyModal';

const vagasData = {
  'assistente-administrativo': {
    titulo: 'Assistente Administrativo',
    empresa: 'Bouche Nerveuse',
    local: 'Matão - SP',
    salario: 'R$ 2.200 + bonificação',
    tipo: 'CLT (Efetivo)',
    horario: 'Segunda a Sexta, das 08:00 às 18:00',
    vagas: 2,
    descricao: 'Estamos em busca de um Assistente Administrativo organizado e proativo para integrar nossa equipe em Matão. Você será responsável por dar suporte nas rotinas administrativas, financeiras e de departamento pessoal, garantindo o bom funcionamento do escritório e o fluxo de informações entre os setores.',
    responsabilidades: [
      'Prestar suporte em rotinas administrativas e financeiras.',
      'Controlar contas a pagar e receber, emitir notas fiscais e boletos.',
      'Atender clientes e fornecedores via telefone, e-mail e presencialmente.',
      'Organizar e arquivar documentos físicos e digitais.',
      'Auxiliar na elaboração de relatórios e planilhas de controle.',
      'Apoiar o departamento de Recursos Humanos em rotinas básicas.'
    ],
    requisitos: [
      'Ensino Médio completo (Ensino Superior cursando em Administração ou áreas correlatas será um diferencial).',
      'Experiência prévia na área administrativa ou financeira.',
      'Conhecimento intermediário no Pacote Office (Excel, Word, PowerPoint).',
      'Boa comunicação verbal e escrita.',
      'Organização, atenção aos detalhes e proatividade.',
      'Facilidade para trabalhar em equipe.'
    ],
    diferenciais: [
      'Experiência com sistemas ERP.',
      'Cursos extracurriculares na área administrativa ou financeira.',
      'Disponibilidade para início imediato.'
    ]
  },
  'entregador': {
    titulo: 'Entregador (Logística)',
    empresa: 'Bouche Nerveuse',
    local: 'Florianópolis - SC',
    salario: 'R$ 2.000',
    tipo: 'CLT (Efetivo)',
    horario: 'Escala 6x1, horários flexíveis',
    vagas: 3,
    descricao: 'Buscamos um Entregador ágil e responsável para garantir que nossos produtos cheguem aos clientes com qualidade e no prazo. Você será a linha de frente da nossa logística em Florianópolis, representando a marca Bouche Nerveuse em cada entrega.',
    responsabilidades: [
      'Realizar entregas de produtos aos clientes na região de Florianópolis.',
      'Conferir as mercadorias antes da saída e no momento da entrega.',
      'Garantir a integridade dos produtos durante o transporte.',
      'Prestar um excelente atendimento ao cliente no momento da entrega.',
      'Zelar pela manutenção e limpeza do veículo utilizado.',
      'Utilizar aplicativos de roteirização e controle de entregas.'
    ],
    requisitos: [
      'Ensino Médio completo.',
      'CNH categoria A ou B (dependendo do veículo) ativa e regularizada.',
      'Experiência prévia como entregador ou motorista.',
      'Conhecimento das rotas e bairros de Florianópolis.',
      'Boa comunicação e cordialidade no trato com o cliente.',
      'Responsabilidade e pontualidade.'
    ],
    diferenciais: [
      'Veículo próprio (moto ou carro) com documentação em dia.',
      'Experiência com entregas de alimentos ou produtos frágeis.',
      'Conhecimento básico em mecânica de veículos.'
    ]
  },
  'embalador': {
    titulo: 'Embalador(a)',
    empresa: 'Bouche Nerveuse',
    local: 'Avenida Paulista - SP',
    salario: 'R$ 1.800,00 a R$ 2.200,00',
    tipo: 'CLT (Efetivo)',
    horario: 'Segunda a Sábado, das 09:00 às 18:00',
    vagas: 5,
    descricao: 'Procuramos um(a) Embalador(a) cuidadoso(a) e detalhista para nossa loja na Avenida Paulista. Você será responsável por embalar nossos produtos com o máximo de carinho e atenção, garantindo que a experiência do cliente seja perfeita desde o momento em que recebe a encomenda.',
    responsabilidades: [
      'Embalar os produtos de acordo com os padrões de qualidade da empresa.',
      'Verificar a integridade dos produtos antes de embalar.',
      'Organizar o setor de embalagens e manter o estoque de materiais.',
      'Auxiliar na montagem de kits e cestas de presentes.',
      'Etiquetar e identificar corretamente as embalagens.',
      'Manter o ambiente de trabalho limpo e organizado.'
    ],
    requisitos: [
      'Ensino Médio completo.',
      'Não é necessária experiência prévia (oferecemos treinamento).',
      'Atenção aos detalhes e capricho manual.',
      'Agilidade e capacidade de trabalhar sob pressão em momentos de alto fluxo.',
      'Boa comunicação e espírito de equipe.',
      'Disponibilidade para trabalhar aos sábados.'
    ],
    diferenciais: [
      'Experiência prévia em embalagem ou produção.',
      'Cursos de artesanato ou trabalhos manuais.',
      'Residir com fácil acesso à Avenida Paulista.'
    ]
  },
  'jovem-aprendiz': {
    titulo: 'Jovem Aprendiz',
    empresa: 'Bouche Nerveuse',
    local: 'Morro do Alemão - RJ',
    salario: 'R$ 1.200,00',
    tipo: 'Jovem Aprendiz',
    horario: 'Meio período (Manhã ou Tarde)',
    vagas: 4,
    descricao: 'Inicie sua carreira profissional na Bouche Nerveuse! Estamos com vagas abertas para Jovem Aprendiz no Morro do Alemão. Oferecemos um ambiente de aprendizado contínuo, onde você poderá desenvolver suas habilidades e dar os primeiros passos no mercado de trabalho com o apoio de profissionais experientes.',
    responsabilidades: [
      'Auxiliar nas rotinas administrativas e operacionais do setor.',
      'Apoiar o atendimento ao cliente e organização da loja.',
      'Participar de treinamentos e capacitações oferecidos pela empresa.',
      'Realizar controle de planilhas e documentos básicos.',
      'Auxiliar na reposição de produtos e organização do estoque.',
      'Cumprir com as atividades teóricas e práticas do programa de aprendizagem.'
    ],
    requisitos: [
      'Idade entre 14 e 24 anos (conforme legislação do programa).',
      'Estar cursando ou ter concluído o Ensino Médio.',
      'Não ter experiência profissional prévia registrada em carteira.',
      'Vontade de aprender e se desenvolver profissionalmente.',
      'Boa comunicação, proatividade e responsabilidade.',
      'Disponibilidade para cumprir a carga horária do programa (teórica e prática).'
    ],
    diferenciais: [
      'Conhecimento básico em informática (Pacote Office).',
      'Participação em projetos sociais ou voluntariado.',
      'Residir na comunidade ou em áreas próximas.'
    ]
  },
  'auxiliar-de-cozinha': {
    titulo: 'Auxiliar de Cozinha',
    empresa: 'Bouche Nerveuse',
    local: 'Xique Xique - BA',
    salario: 'R$ 2.800,00 + bonificação',
    tipo: 'CLT (Efetivo)',
    horario: 'Escala 6x1, incluindo finais de semana',
    vagas: 2,
    descricao: 'Apaixonado(a) por gastronomia? Venha fazer parte da nossa equipe em Xique Xique! Buscamos um Auxiliar de Cozinha dedicado para apoiar nossos chefs no preparo de pratos e sobremesas incríveis, mantendo sempre o alto padrão de qualidade e higiene da nossa cozinha.',
    responsabilidades: [
      'Auxiliar no pré-preparo (mise en place) de ingredientes e pratos.',
      'Apoiar os chefs e cozinheiros durante o serviço.',
      'Garantir a limpeza, organização e higienização da cozinha e dos utensílios.',
      'Controlar a validade e o armazenamento correto dos alimentos.',
      'Seguir rigorosamente as normas de vigilância sanitária e boas práticas de manipulação.',
      'Auxiliar na montagem e finalização de pratos e sobremesas.'
    ],
    requisitos: [
      'Ensino Fundamental completo (Ensino Médio será um diferencial).',
      'Experiência prévia como auxiliar de cozinha ou em áreas correlatas.',
      'Conhecimento básico em boas práticas de manipulação de alimentos.',
      'Agilidade, organização e atenção aos detalhes.',
      'Capacidade de trabalhar em equipe e sob pressão.',
      'Disponibilidade para trabalhar em escala 6x1, incluindo finais de semana e feriados.'
    ],
    diferenciais: [
      'Curso de Boas Práticas de Manipulação de Alimentos atualizado.',
      'Cursos profissionalizantes na área de gastronomia ou culinária.',
      'Experiência em confeitaria ou padaria.'
    ]
  }
};

const beneficiosFixos = [
  'Vale-transporte',
  'Vale-alimentação',
  'Vale-refeição',
  'Assistência médica',
  'Assistência odontológica',
  'Seguro de vida',
  'Premiação por desempenho',
  'Plano de carreira',
  'Treinamento e desenvolvimento',
  'Convênio com farmácia',
  'Descontos em parceiros',
  'Ambiente colaborativo',
  'Oportunidade de crescimento interno',
  'Programa de reconhecimento',
  'Uniforme',
  'Suporte da equipe de RH'
];

export default function VagaDetalhes() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const vaga = vagasData[slug as keyof typeof vagasData];

  if (!vaga) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfbfb] font-sans">
        <h1 className="text-3xl font-serif font-bold text-brown-dark mb-4">Vaga não encontrada</h1>
        <p className="text-gray-500 mb-8">A vaga que você está procurando não existe ou foi encerrada.</p>
        <button onClick={() => router.push('/vagas')} className="bg-wine hover:bg-wine-dark text-white px-8 py-3 rounded-full font-bold transition-colors flex items-center gap-2">
          <ArrowLeft size={20} /> Voltar para vagas
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbfb] font-sans text-brown-dark overflow-x-hidden pb-24 lg:pb-0">
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsMenuOpen(true)}
        className="fixed bottom-24 lg:bottom-8 right-4 lg:right-8 z-50 w-14 h-14 lg:w-16 lg:h-16 bg-[#b71c1c] hover:bg-[#d32f2f] text-white rounded-full shadow-[0_4px_20px_rgba(183,28,28,0.4)] hover:shadow-[0_6px_25px_rgba(183,28,28,0.6)] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Open Menu"
      >
        <div className="flex flex-col gap-[5px] items-center justify-center w-6">
          <span className="w-full h-[3px] bg-white rounded-full"></span>
          <span className="w-full h-[3px] bg-white rounded-full"></span>
          <span className="w-full h-[3px] bg-white rounded-full"></span>
        </div>
      </button>

      {/* Side Menu Drawer */}
      <DrawerMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-brown-dark/95 backdrop-blur-md border-b border-white/10 shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none text-white cursor-pointer">
            <span className="font-serif text-2xl tracking-wider">Bouche</span>
            <span className="font-script text-4xl text-wine-light -mt-3 ml-4">Nerveuse</span>
          </Link>
          
          {/* Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm text-white/90 font-medium tracking-wide uppercase">
            <Link href="/" className="hover:text-white transition-colors pb-1 text-white/80">Home</Link>
            <Link href="/historia" className="hover:text-white transition-colors pb-1 text-white/80">Cultura</Link>
            <Link href="/clima-organizacional" className="hover:text-white transition-colors pb-1 text-white/80">Clima</Link>
            <Link href="/inclusao-e-diversidade" className="hover:text-white transition-colors pb-1 text-white/80">Inclusão</Link>
            <Link href="/vagas" className="hover:text-white transition-colors pb-1 text-white border-b-2 border-wine-light uppercase tracking-wide">Vagas</Link>
            <Link href="/bouche-news" className="hover:text-white transition-colors pb-1 text-white/80">Bouche News</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 lg:gap-6">
            <Link href="/ouvidoria" className="hidden sm:flex bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-6 py-2.5 rounded-full font-bold transition-all items-center gap-2">
              Ouvidoria <Phone size={18} />
            </Link>
            <LoginButton />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-brown-dark text-white pt-32 pb-20 lg:pt-40 lg:pb-32 px-4 overflow-hidden">
        {/* Background pattern/image */}
        <Image 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1950&auto=format&fit=crop" 
          alt="Office" 
          fill 
          className="object-cover opacity-20 mix-blend-overlay"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brown-dark/50 via-brown-dark/80 to-brown-dark"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-wine/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/vagas" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 text-sm font-medium uppercase tracking-wider group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Voltar para vagas
            </Link>
            
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-wine/30 backdrop-blur-sm text-wine-light border border-wine/40 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
                {vaga.tipo}
              </span>
              <span className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
                {vaga.vagas} {vaga.vagas === 1 ? 'Vaga' : 'Vagas'}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold mb-8 leading-tight max-w-4xl">
              {vaga.titulo}
            </h1>

            <div className="flex flex-col sm:flex-row flex-wrap gap-6 text-white/80 text-base lg:text-lg max-w-3xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Building2 size={20} className="text-wine-light" />
                </div>
                <span>{vaga.empresa}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-wine-light" />
                </div>
                <span>{vaga.local}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <DollarSign size={20} className="text-wine-light" />
                </div>
                <span>{vaga.salario}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 py-12 relative z-20">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left Column - Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 w-full space-y-12"
          >
            {/* Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="text-amber-600" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-amber-900 text-lg mb-1">Aviso Importante</h4>
                <p className="text-amber-800 leading-relaxed">Leia atentamente todos os requisitos e responsabilidades antes de se candidatar a esta vaga. Certifique-se de que seu perfil está alinhado com o que buscamos.</p>
              </div>
            </div>

            {/* Descrição */}
            <section>
              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-brown-dark mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-wine/10 flex items-center justify-center shrink-0">
                  <Sparkles className="text-wine" size={20} />
                </div>
                Sobre a Oportunidade
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {vaga.descricao}
              </p>
            </section>

            {/* Responsabilidades */}
            <section>
              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-brown-dark mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-wine/10 flex items-center justify-center shrink-0">
                  <Briefcase className="text-wine" size={20} />
                </div>
                Responsabilidades do Cargo
              </h2>
              <ul className="space-y-4">
                {vaga.responsabilidades.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-gray-600 text-lg bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={22} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Requisitos */}
            <section>
              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-brown-dark mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-wine/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="text-wine" size={20} />
                </div>
                Requisitos da Vaga
              </h2>
              <ul className="space-y-4">
                {vaga.requisitos.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-gray-600 text-lg">
                    <div className="w-6 h-6 rounded-full bg-brown-light/20 flex items-center justify-center shrink-0 mt-1">
                      <ChevronRight className="text-brown-dark" size={14} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Diferenciais */}
            <section>
              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-brown-dark mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-wine/10 flex items-center justify-center shrink-0">
                  <Star className="text-wine" size={20} />
                </div>
                Diferenciais
              </h2>
              <ul className="space-y-4">
                {vaga.diferenciais.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-gray-600 text-lg">
                    <div className="w-6 h-6 rounded-full bg-wine/10 flex items-center justify-center shrink-0 mt-1">
                      <Star className="text-wine" size={14} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Benefícios */}
            <section>
              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-brown-dark mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-wine/10 flex items-center justify-center shrink-0">
                  <Heart className="text-wine" size={20} />
                </div>
                Benefícios
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {beneficiosFixos.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-wine/30 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-wine shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* About Company */}
            <section className="bg-brown-dark text-white rounded-3xl p-8 md:p-12 relative overflow-hidden mt-16">
              <div className="absolute top-0 right-0 w-64 h-64 bg-wine rounded-full blur-[100px] opacity-50 -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-serif font-bold mb-6">Por que a Bouche Nerveuse?</h2>
                <p className="text-white/80 text-lg leading-relaxed mb-8">
                  Somos mais do que uma empresa, somos uma família apaixonada por criar experiências inesquecíveis. Valorizamos a diversidade, a inovação e o crescimento contínuo dos nossos talentos. Aqui, você terá espaço para ser quem você é e construir uma carreira com propósito.
                </p>
                <Link href="/historia" className="inline-flex items-center gap-2 text-wine-light font-bold hover:text-white transition-colors">
                  Conheça nossa cultura <ArrowRight size={18} />
                </Link>
              </div>
            </section>

          </motion.div>

          {/* Right Column - Sticky Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full lg:w-[400px] shrink-0"
          >
            <div className="sticky top-28 bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <h3 className="text-2xl font-serif font-bold text-brown-dark mb-6">Resumo da Vaga</h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                    <MapPin className="text-wine" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Localização</p>
                    <p className="text-brown-dark font-bold">{vaga.local}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                    <DollarSign className="text-wine" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Salário</p>
                    <p className="text-brown-dark font-bold">{vaga.salario}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                    <Briefcase className="text-wine" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Contratação</p>
                    <p className="text-brown-dark font-bold">{vaga.tipo}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                    <Clock className="text-wine" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Horário</p>
                    <p className="text-brown-dark font-bold">{vaga.horario}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button onClick={() => setIsApplyModalOpen(true)} className="w-full bg-[#b71c1c] hover:bg-[#d32f2f] text-white font-bold py-4 px-6 rounded-xl transition-all shadow-[0_8px_20px_rgba(183,28,28,0.25)] hover:shadow-[0_12px_25px_rgba(183,28,28,0.4)] hover:-translate-y-1 flex items-center justify-center gap-2 group">
                  <Send className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                  Candidatar-se agora
                </button>
                <button className="w-full bg-white hover:bg-gray-50 text-brown-dark border border-gray-200 font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Share2 size={20} />
                  Compartilhar vaga
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </main>

      {/* Mobile Sticky Apply Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-40 flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-500 truncate">Vaga para</p>
          <p className="font-bold text-brown-dark truncate">{vaga.titulo}</p>
        </div>
        <button onClick={() => setIsApplyModalOpen(true)} className="bg-[#b71c1c] hover:bg-[#d32f2f] text-white font-bold py-3 px-6 rounded-xl transition-colors shrink-0">
          Candidatar-se
        </button>
      </div>

      <ApplyModal isOpen={isApplyModalOpen} onClose={() => setIsApplyModalOpen(false)} />

      {/* Footer */}
      <footer className="bg-[#1b0f0d] text-white/60 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col leading-none text-white opacity-50">
            <span className="font-serif text-xl tracking-wider">Bouche</span>
            <span className="font-script text-2xl text-wine-light -mt-2 ml-4">Nerveuse</span>
          </div>
          <p className="text-sm">© 2026 Bouche Nerveuse. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link href="/creditos" className="hover:text-white transition-colors">Créditos</Link>
            <Link href="#" className="hover:text-white transition-colors">Termos</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacidade</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
