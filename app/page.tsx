import Image from 'next/image';
import { ShoppingBag, Utensils, Target, Eye, Heart, Leaf, Users, Award } from 'lucide-react';
import ProductCarousel from '../components/ProductCarousel';
import WhyChooseUs from '../components/WhyChooseUs';
import FranchiseCtaSection from '../components/FranchiseCtaSection';

export default function Page() {
  return (
    <div className="min-h-screen bg-page font-sans text-brown-dark">
      
      {/* Hero */}
      <section id="home" className="relative text-white min-h-[100vh] flex items-center overflow-hidden">
        {/* Static Background optimized for Server Component and LCP */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=2000&auto=format&fit=crop"
            alt="Alta confeitaria"
            fill
            priority
            className="object-cover"
          />
        </div>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 z-0 bg-black/55"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-brown-dark/80 via-brown-dark/40 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full pt-40 pb-48">
          <div className="max-w-2xl space-y-8">
            <h1 className="flex flex-col leading-none">
              <span className="font-serif text-7xl lg:text-8xl font-bold tracking-tight">Bouche</span>
              <span className="font-script text-8xl lg:text-9xl text-wine-light -mt-8 ml-12 drop-shadow-lg">Nerveuse</span>
            </h1>
            <p className="text-2xl lg:text-3xl font-serif text-white/90 leading-snug drop-shadow-md">
              O sabor inconfundível da alta confeitaria.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a href="#produtos" className="relative overflow-hidden text-white rounded-full font-bold transition-all shadow-[0_0_20px_rgba(183,28,28,0.3)] hover:shadow-[0_0_30px_rgba(183,28,28,0.5)] active:scale-95 group flex items-center justify-center">
                <span className="absolute inset-0 flex items-center justify-center gap-2 bg-gradient-to-r from-[#d32f2f] to-[#b71c1c] translate-y-[100%] transition-transform duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0 z-10 pointer-events-none">
                  <ShoppingBag size={20} /> Peça já
                </span>
                <span className="absolute inset-0 flex items-center justify-center gap-2 bg-[#b71c1c] translate-y-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-[100%] z-0 pointer-events-none">
                  <Utensils size={20} /> Conhecer Produtos
                </span>
                <span className="invisible px-8 py-4 flex items-center gap-2">
                  <Utensils size={20} /> Conhecer Produtos
                </span>
              </a>
              <a href="#franquias" className="learn-more">
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">Abrir Franquia</span>
              </a>
            </div>
          </div>
        </div>

        {/* Wavy Divider */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-[1px] z-10">
          <svg viewBox="0 0 1440 120" className="w-full h-auto fill-page">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Products Section */}
      <section id="produtos" className="py-20 bg-page">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center font-serif text-4xl lg:text-5xl mb-16 text-brown-dark">
            Nossos Produtos em <span className="font-script text-6xl lg:text-7xl text-wine relative inline-block">Destaque<span className="absolute bottom-2 left-0 w-full h-1 bg-wine/30 rounded-full"></span></span>
          </h2>
          <ProductCarousel />
        </div>
      </section>

      {/* Why & Numbers (Client Component with scroll logic) */}
      <WhyChooseUs />

      {/* Missão, Visão, Valores */}
      <section className="py-24 bg-page relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl text-brown-dark">
              Nosso <span className="font-bold text-wine relative inline-block">Propósito<span className="absolute bottom-2 left-0 w-full h-2 bg-wine/20 rounded-full"></span></span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Missão */}
            <div className="bg-white p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-wine/5 rounded-bl-full -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-wine/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-wine transition-colors duration-500 shadow-sm">
                  <Target className="text-wine group-hover:text-white transition-colors duration-500" size={32} />
                </div>
                <h3 className="font-serif text-3xl font-bold text-brown-dark mb-4">Missão</h3>
                <p className="text-brown/70 leading-relaxed font-medium">
                  Nossa missão é produzir doces de alta qualidade que despertam sensações intensas, sabor marcante e experiências irresistíveis na vida das pessoas ao comer nossas delícias.
                </p>
              </div>
            </div>

            {/* Visão */}
            <div className="bg-white p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-wine/5 rounded-bl-full -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-wine/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-wine transition-colors duration-500 shadow-sm">
                  <Eye className="text-wine group-hover:text-white transition-colors duration-500" size={32} />
                </div>
                <h3 className="font-serif text-3xl font-bold text-brown-dark mb-4">Visão</h3>
                <p className="text-brown/70 leading-relaxed font-medium">
                  Ser referência no segmento de doces industrializados, reconhecida pela excelência no sabor, inovação constante e compromisso com a qualidade, tornando a <strong className="text-brown-dark">Bouche Nerveuse</strong> uma marca desejada.
                </p>
              </div>
            </div>

            {/* Valores */}
            <div className="bg-white p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-wine/5 rounded-bl-full -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-wine/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-wine transition-colors duration-500 shadow-sm">
                  <Heart className="text-wine group-hover:text-white transition-colors duration-500" size={32} />
                </div>
                <h3 className="font-serif text-3xl font-bold text-brown-dark mb-4">Valores</h3>
                <ul className="text-brown/70 leading-relaxed font-medium space-y-2">
                  <li className="flex items-start gap-3"><span className="text-wine mt-1 text-lg leading-none">•</span> Pessoas em primeiro lugar</li>
                  <li className="flex items-start gap-3"><span className="text-wine mt-1 text-lg leading-none">•</span> Excelência na qualidade</li>
                  <li className="flex items-start gap-3"><span className="text-wine mt-1 text-lg leading-none">•</span> Compromisso com consumidores</li>
                  <li className="flex items-start gap-3"><span className="text-wine mt-1 text-lg leading-none">•</span> Sustentabilidade e Ética</li>
                  <li className="flex items-start gap-3"><span className="text-wine mt-1 text-lg leading-none">•</span> Paixão pelo que fazemos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Funcionários do Mês */}
      <section className="py-32 bg-[#1c0e0c] relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-wine rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#b5122e] rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <p className="text-white/60 font-sans tracking-[0.3em] uppercase text-sm mb-6">Equipe de Elite</p>
            <h2 className="font-serif text-[3.5rem] lg:text-[4.5rem] text-white leading-none">
              Funcionários Destaque do <span className="font-bold text-[#b5122e] italic">Mês</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Cariani */}
            <div className="relative bg-gradient-to-b from-white/10 to-transparent p-[1px] rounded-[2.5rem] overflow-hidden group">
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              <div className="bg-[#1b0f0d]/80 backdrop-blur-md rounded-[2.5rem] p-8 lg:p-12 flex flex-col sm:flex-row items-center sm:items-start gap-8 lg:gap-10 h-full border border-white/5">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#b5122e] to-wine rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <div className="w-full h-full rounded-full overflow-hidden border-[6px] border-[#2a1411] relative z-10 group-hover:scale-105 transition-transform duration-700 shadow-2xl">
                    <Image fill sizes="(max-width: 768px) 10vw, 15vw" loading="lazy" src="/images/Funcionarios/Cariani.png" alt="Renato Cariani" className="object-cover" />
                  </div>
                  {/* Floating Badge */}
                  <div className="absolute -bottom-4 right-4 w-16 h-16 bg-[#b5122e] rounded-full flex items-center justify-center border-4 border-[#1b0f0d] shadow-xl z-20 group-hover:rotate-12 transition-transform duration-500">
                    <Award className="text-white" size={28} />
                  </div>
                </div>
                <div className="text-center sm:text-left flex-1 flex flex-col justify-center h-full pt-4 sm:pt-0">
                  <div className="inline-block px-4 py-1.5 rounded-full border border-[#b5122e]/30 bg-[#b5122e]/10 text-white/90 text-[0.65rem] sm:text-xs font-bold tracking-widest uppercase mb-6 w-max mx-auto sm:mx-0">6 Anos de Dedicação</div>
                  <h3 className="font-serif text-4xl lg:text-[2.75rem] font-bold text-white mb-3 leading-tight">Renato Cariani</h3>
                  <p className="text-[#b5122e] font-sans tracking-[0.15em] uppercase text-sm font-bold mb-6">Atendente Sênior</p>
                  <p className="text-white/60 font-light leading-relaxed text-sm sm:text-base">
                    Sempre recebendo nossos clientes com um grande sorriso no rosto e garantindo o melhor atendimento diário na loja.
                  </p>
                </div>
              </div>
            </div>

            {/* Balestrin */}
            <div className="relative bg-gradient-to-b from-white/10 to-transparent p-[1px] rounded-[2.5rem] overflow-hidden group">
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              <div className="bg-[#1b0f0d]/80 backdrop-blur-md rounded-[2.5rem] p-8 lg:p-12 flex flex-col sm:flex-row items-center sm:items-start gap-8 lg:gap-10 h-full border border-white/5">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#b5122e] to-wine rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <div className="w-full h-full rounded-full overflow-hidden border-[6px] border-[#2a1411] relative z-10 group-hover:scale-105 transition-transform duration-700 shadow-2xl">
                    <Image fill sizes="(max-width: 768px) 10vw, 15vw" loading="lazy" src="/images/Funcionarios/Julio.png" alt="Júlio Balestrin" className="object-cover" />
                  </div>
                  {/* Floating Badge */}
                  <div className="absolute -bottom-4 right-4 w-16 h-16 bg-[#b5122e] rounded-full flex items-center justify-center border-4 border-[#1b0f0d] shadow-xl z-20 group-hover:rotate-12 transition-transform duration-500">
                    <Award className="text-white" size={28} />
                  </div>
                </div>
                <div className="text-center sm:text-left flex-1 flex flex-col justify-center h-full pt-4 sm:pt-0">
                  <div className="inline-block px-4 py-1.5 rounded-full border border-[#b5122e]/30 bg-[#b5122e]/10 text-white/90 text-[0.65rem] sm:text-xs font-bold tracking-widest uppercase mb-6 w-max mx-auto sm:mx-0">4 Anos de Dedicação</div>
                  <h3 className="font-serif text-4xl lg:text-[2.75rem] font-bold text-white mb-3 leading-tight">Júlio Balestrin</h3>
                  <p className="text-[#b5122e] font-sans tracking-[0.15em] uppercase text-sm font-bold mb-6">Auxiliar de Confeitaria</p>
                  <p className="text-white/60 font-light leading-relaxed text-sm sm:text-base">
                    Com dedicação total na montagem dos doces, garantindo que cada vitrine esteja sempre impecável e deliciosa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsabilidade Social */}
      <section className="py-24 bg-page relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            {/* Esquerda: Texto e Pilares */}
            <div className="w-full lg:w-1/2 flex flex-col gap-10">
              <div>
                <p className="text-wine/80 font-bold uppercase tracking-[0.2em] text-sm mb-4">Responsabilidade Social</p>
                <h2 className="font-serif text-4xl lg:text-5xl text-brown-dark leading-tight mb-6">
                  Nosso Compromisso Vai Além da <span className="font-bold text-wine relative inline-block">Produção<span className="absolute bottom-2 left-0 w-full h-2 bg-wine/20 rounded-full"></span></span>
                </h2>
                <p className="text-brown/70 leading-relaxed font-medium text-lg">
                  Na <strong className="text-brown-dark">Bouche Nerveuse</strong>, acreditamos que o sucesso de uma empresa se mede pelo impacto positivo que ela gera na sociedade e no meio ambiente. Nossa produção foca na eficiência, cuidado com as pessoas e planeta.
                </p>
              </div>

              <div className="flex flex-col gap-8">
                {/* Pilar 1 */}
                <div className="flex gap-5 items-start group">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center shrink-0 group-hover:bg-wine transition-colors duration-500">
                    <Leaf className="text-wine group-hover:text-white transition-colors duration-500" size={26} />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-brown-dark mb-2">Embalagens Sustentáveis</h3>
                    <p className="text-brown/70 leading-relaxed font-medium text-sm">
                      Temos orgulho de investir em tecnologia para reduzir nossa pegada ecológica. Nossas embalagens são biodegradáveis.
                    </p>
                  </div>
                </div>

                {/* Pilar 2 */}
                <div className="flex gap-5 items-start group">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center shrink-0 group-hover:bg-wine transition-colors duration-500">
                    <Users className="text-wine group-hover:text-white transition-colors duration-500" size={26} />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-brown-dark mb-2">Inclusão e Diversidade</h3>
                    <p className="text-brown/70 leading-relaxed font-medium text-sm">
                      Valorizamos a pluralidade. Nosso ambiente é construído sobre respeito e valorização das diferenças, atraindo grandes talentos.
                    </p>
                  </div>
                </div>

                {/* Pilar 3 */}
                <div className="flex gap-5 items-start group">
                  <div className="w-14 h-14 rounded-2xl bg-[#b5122e] shadow-md flex items-center justify-center shrink-0 hover:scale-105 transition-transform duration-500">
                    <Heart className="text-white" size={26} />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-brown-dark mb-2">Bouche Solidaire</h3>
                    <p className="text-brown/70 leading-relaxed font-medium text-sm">
                      Páscoa é tempo de compartilhar alegria e esperança! Nossa campanha Bouche Solidaire doará ovos de chocolate artesanais.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative group inline-flex items-center justify-center bg-white/70 backdrop-blur-xl border border-white/60 px-10 py-5 rounded-full mt-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(181,18,46,0.1)] transition-all duration-500 overflow-hidden w-max text-center">
                <div className="absolute inset-0 bg-gradient-to-r from-wine/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <span className="relative z-10 font-serif text-xl font-medium text-brown-dark leading-tight">
                  Produzindo com <span className="font-bold text-wine italic">propósito</span>, crescendo com <span className="font-bold text-wine italic">responsabilidade</span>.
                </span>
              </div>
            </div>

            {/* Direita: Imagem */}
            <div className="w-full lg:w-1/2 relative mt-10 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-wine/20 to-transparent rounded-[3rem] transform translate-x-4 lg:translate-x-8 translate-y-4 lg:translate-y-8"></div>
              <div className="relative w-full h-[600px] lg:h-[750px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-white group">
                <Image fill loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" src="/images/Treinamento/treinamento.jpg" alt="Treinamento Bouche Nerveuse" className="object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA final Franquias */}
      <FranchiseCtaSection />

    </div>
  );
}
