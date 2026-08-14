import Image from 'next/image';
import { BarChart, Star, MessageSquare, Briefcase, TrendingUp, CheckCircle2, Leaf } from 'lucide-react';
import LiveIndicators from '../../components/LiveIndicators';

export default function ClimaOrganizacionalPage() {
  return (
    <div className="font-sans text-brown-dark overflow-x-hidden pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] w-full flex items-center justify-center overflow-hidden bg-[#1a1614] pt-20">
        <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-wine blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-600 blur-[120px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col">
            <h1 className="text-6xl md:text-8xl font-serif font-light text-white leading-[0.9] tracking-tight mb-6">
              Clima <br />
              <span className="font-script text-wine-light text-7xl md:text-9xl block mt-2">Organizacional</span>
            </h1>
            
            <p className="text-white/60 text-lg md:text-xl font-light max-w-md leading-relaxed mb-10">
              Acreditamos que o bem-estar da nossa equipe é o ingrediente principal para criar experiências memoráveis.
            </p>
          </div>
          
          <div className="relative h-[60vh] w-full hidden lg:block">
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden border border-white/10">
              <Image 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop" 
                alt="Equipe trabalhando" 
                fill 
                className="object-cover"
                priority
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1614] via-transparent to-transparent opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 pb-24 -mt-10 relative z-20">
        <div className="max-w-6xl mx-auto space-y-24">

          {/* Indicadores em Tempo Real - Componente Cliente Extraído */}
          <LiveIndicators />

          {/* Clima Organizacional & Estratégias */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Clima */}
            <div className="bg-brown-dark text-white p-10 lg:p-14 rounded-[2rem] shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-full -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-white/10 rounded-xl"><BarChart className="text-wine-light" size={28} /></div>
                  <h2 className="text-3xl font-serif font-bold">Como Medimos o Clima</h2>
                </div>
                <p className="text-white/80 mb-8 text-lg">A Bouche Nerveuse utiliza métodos formais e contínuos para avaliar o clima interno:</p>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <CheckCircle2 className="text-wine-light shrink-0 mt-1" size={20} />
                    <div>
                      <strong className="block text-lg mb-1">Pesquisa Anual (Anônima)</strong>
                      <span className="text-white/70">Avalia satisfação, liderança, comunicação, reconhecimento e condições de trabalho.</span>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="text-wine-light shrink-0 mt-1" size={20} />
                    <div>
                      <strong className="block text-lg mb-1">Pulse Surveys</strong>
                      <span className="text-white/70">Pesquisas rápidas trimestrais para acompanhar indicadores específicos.</span>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="text-wine-light shrink-0 mt-1" size={20} />
                    <div>
                      <strong className="block text-lg mb-1">Indicadores Internos</strong>
                      <span className="text-white/70">Monitoramento de rotatividade, absenteísmo, produtividade e engajamento.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Estratégias */}
            <div className="bg-white p-10 lg:p-14 rounded-[2rem] shadow-xl border border-gray-100 relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-wine/5 rounded-tl-full -mr-5 -mb-5 transition-transform duration-700 group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-wine/10 rounded-xl"><Star className="text-wine" size={28} /></div>
                  <h2 className="text-3xl font-serif font-bold text-brown-dark">Estratégias de Motivação</h2>
                </div>
                <p className="text-gray-600 mb-8 text-lg">Entendemos que colaboradores motivados produzem experiências memoráveis. Nossas principais estratégias:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Programa de reconhecimento por desempenho",
                    "Premiações por inovação em processos",
                    "Plano de desenvolvimento profissional",
                    "Cultura de feedback construtivo",
                    "Celebração de metas alcançadas",
                    "Incentivo ao trabalho em equipe"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-wine/30 transition-colors">
                      <TrendingUp className="text-wine shrink-0 mt-0.5" size={18} />
                      <span className="text-gray-800 font-medium text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Ações & Comunicação */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-wine/10 rounded-xl"><Leaf className="text-wine" size={24} /></div>
                <h3 className="text-2xl font-serif font-bold text-brown-dark">Melhoria do Ambiente</h3>
              </div>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-wine rounded-full"></div> Modernização constante de equipamentos</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-wine rounded-full"></div> Ambientes limpos, seguros e ergonômicos</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-wine rounded-full"></div> Espaços de convivência para integração</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-wine rounded-full"></div> Política de respeito, diversidade e inclusão</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-wine rounded-full"></div> Canal aberto para sugestões</li>
              </ul>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-wine/10 rounded-xl"><MessageSquare className="text-wine" size={24} /></div>
                <h3 className="text-2xl font-serif font-bold text-brown-dark">Comunicação Interna</h3>
              </div>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-wine rounded-full"></div> Reuniões periódicas de alinhamento</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-wine rounded-full"></div> Informativos internos digitais</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-wine rounded-full"></div> Murais informativos na produção</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-wine rounded-full"></div> Encontros entre lideranças e equipes</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-wine rounded-full"></div> Canal interno para dúvidas</li>
              </ul>
            </div>
          </section>

          {/* Qualidade de Vida */}
          <section className="bg-gradient-to-br from-wine to-brown-dark rounded-[2rem] p-10 lg:p-16 text-white shadow-2xl relative overflow-hidden text-center group">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-full -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-110"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-tr-full -ml-5 -mb-5 transition-transform duration-700 group-hover:scale-110"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <Briefcase className="mx-auto text-wine-light mb-6" size={48} />
              <h2 className="text-3xl lg:text-5xl font-serif font-bold mb-6">Qualidade de Vida no Trabalho</h2>
              <p className="text-white/80 text-lg mb-10">
                Acreditamos que o cuidado com as pessoas é essencial para a excelência dos produtos. Proporcionar qualidade de vida aos colaboradores impacta diretamente na satisfação dos clientes.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  "Jornada equilibrada",
                  "Pausas adequadas",
                  "Alimentação saudável",
                  "Saúde e segurança",
                  "Ergonomia",
                  "Apoio psicológico"
                ].map((item, idx) => (
                  <span key={idx} className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full text-sm font-medium hover:bg-white/20 transition-colors cursor-default">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
