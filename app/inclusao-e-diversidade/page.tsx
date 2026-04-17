import Image from 'next/image';
import { Heart, Users, ShieldCheck, AlertTriangle, BookOpen, CheckCircle2, Languages, GraduationCap } from 'lucide-react';
import CourseList from '../../components/CourseList';

export default function InclusaoDiversidadePage() {
  return (
    <div className="font-sans text-brown-dark overflow-x-hidden pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://picsum.photos/seed/inclusion-hero/1920/1080" 
            alt="Diversidade na equipe" 
            fill 
            className="object-cover"
            priority /* LCP image */
            referrerPolicy="no-referrer"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 mt-20">
          <h1 className="flex flex-col leading-none mb-6">
            <span className="font-serif text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-lg">Inclusão e</span>
            <span className="font-script text-7xl md:text-9xl text-wine-light -mt-6 md:-mt-10 drop-shadow-xl">Diversidade</span>
          </h1>
          <p className="text-white/90 text-lg md:text-2xl font-serif max-w-2xl mx-auto drop-shadow-md">
            Acreditamos que as diferenças nos tornam mais fortes e inovadores.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 pb-24 -mt-10 relative z-20">
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Intro & Política */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-10 lg:p-14 rounded-[2rem] shadow-xl border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-wine/5 rounded-bl-full -mr-5 -mt-5 transition-transform duration-700 group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-wine/10 rounded-xl"><Heart className="text-wine" size={28} /></div>
                  <h2 className="text-3xl font-serif font-bold text-brown-dark">Política Formal de Inclusão</h2>
                </div>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  A Bouche Nerveuse possui uma política formal de inclusão que garante igualdade de oportunidades para todos, independentemente de gênero, raça, orientação sexual, idade ou deficiência.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Nosso compromisso é criar um ambiente de trabalho seguro, acolhedor e livre de preconceitos, onde cada indivíduo possa expressar sua autenticidade e alcançar seu pleno potencial.
                </p>
              </div>
            </div>

            <div className="bg-brown-dark text-white p-10 lg:p-14 rounded-[2rem] shadow-xl relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-tl-full -mr-10 -mb-10 transition-transform duration-700 group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-white/10 rounded-xl"><Users className="text-wine-light" size={28} /></div>
                  <h2 className="text-3xl font-serif font-bold">Ações Voltadas à Diversidade</h2>
                </div>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <CheckCircle2 className="text-wine-light shrink-0 mt-1" size={20} />
                    <div>
                      <strong className="block text-lg mb-1">Recrutamento Inclusivo</strong>
                      <span className="text-white/70">Processos seletivos focados em habilidades e competências, sem vieses inconscientes.</span>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="text-wine-light shrink-0 mt-1" size={20} />
                    <div>
                      <strong className="block text-lg mb-1">Grupos de Afinidade</strong>
                      <span className="text-white/70">Espaços seguros para troca de experiências e proposição de melhorias.</span>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="text-wine-light shrink-0 mt-1" size={20} />
                    <div>
                      <strong className="block text-lg mb-1">Acessibilidade</strong>
                      <span className="text-white/70">Adaptação de espaços físicos e ferramentas digitais para pessoas com deficiência.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Ética, Denúncia e Treinamento */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow flex flex-col">
              <div className="w-14 h-14 bg-wine/10 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="text-wine" size={28} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-brown-dark mb-4">Código de Ética</h3>
              <p className="text-gray-600 leading-relaxed flex-1">
                Nosso Código de Ética e Conduta estabelece diretrizes claras sobre o comportamento esperado de todos os colaboradores, repudiando qualquer forma de discriminação, assédio ou desrespeito no ambiente de trabalho.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow flex flex-col">
              <div className="w-14 h-14 bg-wine/10 rounded-xl flex items-center justify-center mb-6">
                <AlertTriangle className="text-wine" size={28} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-brown-dark mb-4">Canal de Denúncia</h3>
              <p className="text-gray-600 leading-relaxed flex-1">
                Disponibilizamos um canal de denúncia anônimo, seguro e confidencial, gerido por uma empresa independente. Todas as denúncias são investigadas rigorosamente, garantindo a proteção do denunciante contra retaliações.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow flex flex-col">
              <div className="w-14 h-14 bg-wine/10 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="text-wine" size={28} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-brown-dark mb-4">Treinamento sobre Diversidade</h3>
              <p className="text-gray-600 leading-relaxed flex-1">
                Promovemos treinamentos regulares e workshops interativos para toda a liderança e equipe, abordando temas como vieses inconscientes, comunicação inclusiva e a importância da diversidade para a inovação.
              </p>
            </div>
          </section>

          {/* Treinamentos de Libras e Diversidade */}
          <section className="mt-20 mb-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-brown-dark mb-4">Capacitação e Inclusão na Prática</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Oferecemos diversos treinamentos para garantir que nossa equipe esteja preparada para acolher e atender a todos com excelência e empatia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Libras */}
              <div className="bg-wine/5 p-8 rounded-3xl border border-wine/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-wine/10 rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-wine text-white rounded-xl flex items-center justify-center shadow-md">
                      <Languages size={28} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-brown-dark">Treinamento em Libras</h3>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Capacitamos nossos colaboradores com o curso básico e intermediário de Língua Brasileira de Sinais (Libras), garantindo um atendimento acessível e humanizado para a comunidade surda em todas as nossas unidades.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-gray-700">
                      <CheckCircle2 className="text-wine shrink-0" size={18} />
                      <span>Módulos práticos de atendimento ao cliente</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                      <CheckCircle2 className="text-wine shrink-0" size={18} />
                      <span>Sinalização de produtos e cardápio</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                      <CheckCircle2 className="text-wine shrink-0" size={18} />
                      <span>Certificação interna para colaboradores</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Diversidade */}
              <div className="bg-brown-dark/5 p-8 rounded-3xl border border-brown-dark/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brown-dark/10 rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-brown-dark text-white rounded-xl flex items-center justify-center shadow-md">
                      <GraduationCap size={28} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-brown-dark">Workshops de Diversidade</h3>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Realizamos encontros mensais e workshops focados em letramento racial, equidade de gênero, inclusão LGBTQIAPN+ e combate ao capacitismo, promovendo um ambiente de respeito contínuo.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-gray-700">
                      <CheckCircle2 className="text-brown-dark shrink-0" size={18} />
                      <span>Palestras com especialistas convidados</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                      <CheckCircle2 className="text-brown-dark shrink-0" size={18} />
                      <span>Rodas de conversa e escuta ativa</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                      <CheckCircle2 className="text-brown-dark shrink-0" size={18} />
                      <span>Materiais de apoio e cartilhas educativas</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Plataforma de Cursos Extraída */}
          <CourseList />

        </div>
      </main>
    </div>
  );
}
