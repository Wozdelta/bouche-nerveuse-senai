"use client";

import Image from 'next/image';
import {
  ArrowDown,
  ArrowRight,
  Check,
  CheckCircle2,
  Cherry,
  Clock3,
  Factory,
  Flower2,
  Home,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Snowflake,
  Sprout,
  Store,
  ThermometerSnowflake,
  Truck,
  Wheat,
} from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import styles from '@/app/cadeia-de-suprimentos/supply-chain.module.css';

const ingredients = [
  {
    icon: Sprout,
    title: 'Cacau fino selecionado',
    text: 'Amêndoas rastreadas, fermentadas e avaliadas por origem, aroma e intensidade.',
    code: 'CACAU • LOTE 028',
  },
  {
    icon: Cherry,
    title: 'Frutas vermelhas premium',
    text: 'Framboesa, amora e groselha escolhidas no ponto ideal de acidez e perfume.',
    code: 'FRUTAS • SAFRA 08',
  },
  {
    icon: Flower2,
    title: 'Flores comestíveis delicadas',
    text: 'Pétalas selecionadas à mão para o acabamento final, sem interferir no sabor.',
    code: 'FLORES • COLHEITA AM',
  },
];

const productionSteps = [
  ['01', 'Torra & moagem', 'O cacau ganha intensidade, notas aromáticas e textura sedosa.'],
  ['02', 'Cremeux', 'Moldagem precisa e controle de temperatura preservam a cremosidade.'],
  ['03', 'Forno', 'A massa red velvet assa por igual e mantém o centro úmido.'],
  ['04', 'Confeitaria', 'Mousse, gel e acabamento são finalizados manualmente.'],
];

const layerNotes = [
  ['Camada 01', 'Cremeux moldado com precisão', 'Textura lisa e temperatura controlada sustentam a decoração superior.'],
  ['Camada 02', 'Massa red velvet úmida', 'Estrutura macia, corte estável e profundidade de cacau.'],
  ['Camada 03', 'Mousse aerada de frutas silvestres', 'Leveza e acidez equilibram as notas intensas de chocolate.'],
];

export default function SupplyChainJourney() {
  const reduceMotion = useReducedMotion();
  const [cargoLoaded, setCargoLoaded] = useState(false);
  const [routeStarted, setRouteStarted] = useState(false);
  const [deliveryArrived, setDeliveryArrived] = useState(false);
  const bakeryRef = useRef<HTMLElement>(null);
  const cargoDropRef = useRef<HTMLDivElement>(null);
  const deliveryRef = useRef<HTMLElement>(null);

  const { scrollYProgress: pageProgress } = useScroll();
  const smoothPageProgress = useSpring(pageProgress, { stiffness: 90, damping: 25 });
  const { scrollYProgress: deliveryProgress } = useScroll({
    target: deliveryRef,
    offset: ['start 0.88', 'end 0.74'],
  });
  const deliveryTruckX = useTransform(deliveryProgress, [0.02, 0.48], ['0%', '68%']);
  const routeFill = useTransform(deliveryProgress, [0.02, 0.48], ['4%', '74%']);

  useMotionValueEvent(deliveryProgress, 'change', (latest) => {
    setDeliveryArrived(latest >= 0.45);
  });

  useEffect(() => {
    if (!cargoLoaded) return;
    const driveTimer = window.setTimeout(() => setRouteStarted(true), 850);
    const scrollTimer = window.setTimeout(() => {
      bakeryRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }, 3100);

    return () => {
      window.clearTimeout(driveTimer);
      window.clearTimeout(scrollTimer);
    };
  }, [cargoLoaded, reduceMotion]);

  const completeLoading = () => {
    if (!cargoLoaded) setCargoLoaded(true);
  };

  return (
    <main className={styles.page}>
      <motion.div className={styles.progressBar} style={{ scaleX: smoothPageProgress }} />

      <section className={styles.hero}>
        <video
          className={styles.heroVideo}
          src="/Video_Bolo_KF.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Bolo Bouche Nerveuse em sua apresentação final"
        />
        <div className={styles.heroVeil} />
        <div className={styles.heroGrid} />
        <div className={styles.heroContent}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className={styles.eyebrow}
          >
            Bouche Nerveuse · cadeia de suprimentos
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            Da origem ao <em>último detalhe.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className={styles.heroLead}
          >
            A jornada completa do Red Velvet Silvestre: ingredientes rastreados,
            produção artesanal, cadeia fria e uma entrega à altura da experiência.
          </motion.p>
          <div className={styles.heroMeta}>
            <span><Clock3 size={16} /> 06 etapas monitoradas</span>
            <span><ThermometerSnowflake size={16} /> −4°C em transporte</span>
            <span><ShieldCheck size={16} /> Lote BN 028</span>
          </div>
        </div>
        <a href="#origem" className={styles.scrollCue}>
          Explore a jornada <ArrowDown size={18} />
        </a>
      </section>

      <section id="origem" className={`${styles.section} ${styles.originSection}`}>
        <div className={styles.content}>
          <header className={styles.sectionHeader}>
            <span>01</span>
            <div>
              <p>Origem dos ingredientes</p>
              <h2>A excelência começa antes da receita.</h2>
              <small>
                Cada matéria-prima chega com procedência, inspeção sensorial e código de lote.
                Somente o que atende ao padrão BN segue para o ateliê.
              </small>
            </div>
          </header>

          <div className={styles.ingredientGrid}>
            {ingredients.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div><Icon size={22} /></div>
                  <p>{item.code}</p>
                  <h3>{item.title}</h3>
                  <span>{item.text}</span>
                </motion.article>
              );
            })}
          </div>

          <div className={styles.loadingExperience}>
            <div className={styles.loadingTopbar}>
              <div>

                <h3>{cargoLoaded ? 'Carga selada. Transporte liberado.' : 'Carregue o cacau para iniciar o transporte'}</h3>
              </div>
              <span className={cargoLoaded ? styles.statusReady : styles.statusWaiting}>
                {cargoLoaded ? <><CheckCircle2 size={15} /> carga rastreada</> : <><PackageCheck size={15} /> aguardando lote</>}
              </span>
            </div>

            <div className={styles.farmScene}>
              <div className={styles.sceneSky}><span /><i /><b /></div>
              <div className={styles.farmHorizon}>
                <span className={styles.treeOne} />
                <span className={styles.treeTwo} />
                <small>Fazenda 08 · origem certificada</small>
              </div>
              <div className={styles.road}><span /></div>

              <AnimatePresence>
                {!cargoLoaded && (
                  <motion.button
                    type="button"
                    className={styles.cacaoCase}
                    drag
                    dragSnapToOrigin
                    dragElastic={0.12}
                    whileDrag={{ scale: 1.04, rotate: -1, zIndex: 20 }}
                    onDragEnd={(_, info) => {
                      const zone = cargoDropRef.current?.getBoundingClientRect();
                      if (!zone) return;
                      if (
                        info.point.x >= zone.left && info.point.x <= zone.right &&
                        info.point.y >= zone.top && info.point.y <= zone.bottom
                      ) completeLoading();
                    }}
                    onClick={completeLoading}
                    exit={{ opacity: 0, scale: 0.82, x: 210, y: 10 }}
                    aria-label="Arraste o lote de cacau até o compartimento do caminhão"
                  >
                    <span className={styles.caseHandle} />
                    <span className={styles.caseWindow}>
                      <Wheat size={27} />
                    </span>
                    <span className={styles.caseCopy}>
                      <small>−4°C</small>
                      <strong>Lote 028</strong>
                      <em>Cacau fino · origem rastreada</em>
                    </span>
                    <b>BN</b>
                  </motion.button>
                )}
              </AnimatePresence>

              <motion.div
                className={styles.routeTruck}
                animate={routeStarted && !reduceMotion ? { x: ['0%', '8%', '135%'] } : { x: '0%' }}
                transition={{ duration: 2.35, times: [0, 0.12, 1], ease: [0.42, 0, 0.2, 1] }}
              >
                <div ref={cargoDropRef} className={`${styles.cargoHatch} ${cargoLoaded ? styles.cargoHatchClosed : ''}`}>
                  <span>{cargoLoaded ? <Check size={18} /> : 'SOLTE AQUI'}</span>
                  <i />
                </div>
                <img src="/images/supply-chain/premium-delivery-truck.png" alt="Caminhão frigorífico Bouche Nerveuse" />
                <div className={styles.truckShadow} />
              </motion.div>
            </div>
            <div className={styles.loadingFooter}>
              <span>Arraste a caixa até o compartimento lateral ou toque nela para carregar.</span>
              <b><Snowflake size={14} /> Temperatura monitorada: −4°C</b>
            </div>
          </div>
        </div>
      </section>

      <section ref={bakeryRef} id="producao" className={`${styles.section} ${styles.productionSection}`}>
        <div className={styles.content}>
          <header className={styles.sectionHeader}>
            <span>02</span>
            <div>
              <p>Produção artesanal</p>
              <h2>Uma padaria profissional. Um gesto artesanal.</h2>
              <small>
                O lote é recebido na doca urbana e segue por equipamentos reais de confeitaria,
                com parâmetros definidos e acabamento humano.
              </small>
            </div>
          </header>

          <div className={styles.productionPanorama}>
            <Image
              src="/images/supply-chain/premium-bakery-production-line.png"
              alt="Linha profissional de produção da padaria Bouche Nerveuse"
              fill
              sizes="(max-width: 900px) 100vw, 1200px"
              className={styles.productionImage}
            />
            <div className={styles.productionBadge}><Factory size={17} /> Ateliê BN · produção em fluxo</div>
          </div>

          <div className={styles.productionSteps}>
            {productionSteps.map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="camadas" className={`${styles.section} ${styles.layersSection}`}>
        <div className={styles.content}>
          <header className={`${styles.sectionHeader} ${styles.lightHeader}`}>
            <span>03</span>
            <div>
              <p>Montagem em camadas</p>
              <h2>Separadas, revelam a técnica. Juntas, criam a experiência.</h2>
              <small>Altura, densidade e temperatura são combinadas para um corte limpo e contrastes precisos.</small>
            </div>
          </header>

          <div className={styles.layerComposition}>
            <motion.div
              className={styles.cakePanel}
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
            >
              <Image
                src="/images/supply-chain/cake-layers-only-premium.png"
                alt="Bolo Red Velvet Silvestre separado em camadas"
                fill
                sizes="(max-width: 900px) 94vw, 570px"
                className={styles.cakeImage}
              />
              <span><Wheat size={14} /> Engenharia de sabor</span>
            </motion.div>
            <div className={styles.layerNotes}>
              {layerNotes.map(([label, title, text], index) => (
                <motion.article
                  key={label}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span>{label}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="conservacao" className={`${styles.section} ${styles.coldSection}`}>
        <div className={styles.content}>
          <header className={styles.sectionHeader}>
            <span>04</span>
            <div>
              <p>Conservação térmica</p>
              <h2>Textura preservada. Sabor no ponto exato.</h2>
              <small>O ultra congelamento estabiliza as camadas sem cristalização agressiva e prepara o bolo para uma rota segura.</small>
            </div>
          </header>
          <div className={styles.coldDashboard}>
            <div className={styles.coldGauge}>
              <Snowflake size={44} />
              <strong>−18°C</strong>
              <span>núcleo estabilizado</span>
            </div>
            <div className={styles.coldGraph}>
              <div><span>Ultra congelamento controlado</span><b style={{ width: '94%' }} /></div>
              <div><span>Preservação de textura e sabor</span><b style={{ width: '98%' }} /></div>
              <div><span>Cadeia fria monitorada</span><b style={{ width: '100%' }} /></div>
            </div>
            <div className={styles.coldSeal}>
              <ShieldCheck size={32} />
              <strong>Integridade térmica</strong>
              <span>Monitoramento contínuo do ateliê ao destino.</span>
            </div>
          </div>
        </div>
      </section>

      <section id="embalagem" className={`${styles.section} ${styles.packagingSection}`}>
        <div className={styles.content}>
          <header className={`${styles.sectionHeader} ${styles.lightHeader}`}>
            <span>05</span>
            <div>
              <p>Embalagem premium</p>
              <h2>Proteção precisa. Abertura memorável.</h2>
              <small>A mesma caixa rígida aveludada do produto envolve o bolo sem tocar sua decoração.</small>
            </div>
          </header>
          <div className={styles.packagingExperience}>
            <div className={styles.packagingVideoWrap}>
              <video src="/Video_Bolo_KF.mp4" autoPlay muted loop playsInline preload="metadata" />
              <span>Ateliê de embalagem BN</span>
              <b>Caixa original · Red Velvet Silvestre</b>
            </div>
            <div className={styles.packagingCopy}>
              <p>Caixa rígida aveludada</p>
              <h3>Beleza por fora.<br />Precisão por dentro.</h3>
              <span>Berço interno, base firme e tampa estruturada impedem deslocamentos sem tocar na decoração.</span>
              <ul>
                <li><Check size={15} /> Proteção durante o transporte</li>
                <li><Check size={15} /> Experiência de luxo</li>
                <li><Check size={15} /> Materiais resistentes</li>
              </ul>
              <a href="#entrega">Seguir para a entrega <ArrowRight size={17} /></a>
            </div>
          </div>
        </div>
      </section>

      <section ref={deliveryRef} id="entrega" className={`${styles.section} ${styles.deliverySection}`}>
        <div className={styles.content}>
          <header className={styles.sectionHeader}>
            <span>06</span>
            <div>
              <p>Entrega refrigerada</p>
              <h2>Lojas → Até sua casa.</h2>
              <small>
                O último trecho combina rota planejada, veículo refrigerado e conferência na entrega
                para preservar o produto até o momento de abrir a caixa.
              </small>
            </div>
          </header>

          <div className={styles.deliveryExperience}>
            <div className={styles.deliveryTopbar}>
              <span><i /> Último trecho em rota</span>
              <b><ThermometerSnowflake size={15} /> −4°C monitorado</b>
            </div>

            <div className={styles.cityStage}>
              <div className={styles.citySkyline} aria-hidden="true">
                <i /><i /><i /><i /><i /><i />
              </div>

              <article className={`${styles.destination} ${styles.storeDestination}`}>
                <div className={styles.storeBuilding}>
                  <span className={styles.storeAwning} />
                  <span className={styles.storeWindow} />
                  <span className={styles.storeDoor} />
                  <b>BN</b>
                </div>
                <div>
                  <small>PARTIDA CONFIRMADA</small>
                  <h3>Lojas</h3>
                  <p>Coleta conferida e reposição refrigerada.</p>
                </div>
              </article>

              <article className={`${styles.destination} ${styles.homeDestination} ${deliveryArrived ? styles.destinationReached : ''}`}>
                <div className={styles.homeBuilding}>
                  <span className={styles.homeRoof} />
                  <span className={styles.homeWindow} />
                  <span className={styles.homeDoor} />
                  <i />
                </div>
                <div>
                  <small>{deliveryArrived ? 'ENTREGA CONCLUÍDA' : 'DESTINO PROTEGIDO'}</small>
                  <h3>Até sua casa</h3>
                  <p>Apresentação, textura e temperatura preservadas.</p>
                </div>
              </article>

              <div className={styles.cityRoad}>
                <div className={styles.roadEdge} />
                <div className={styles.roadLane} />
                <motion.div className={styles.routeGlow} style={{ width: routeFill }} />
                <motion.div className={styles.deliveryTruckReal} style={{ left: deliveryTruckX }}>
                  <img src="/images/supply-chain/premium-delivery-truck.png" alt="Caminhão refrigerado seguindo das lojas até sua casa" />
                  <span className={styles.deliveryTruckShadow} />
                  <i className={styles.speedLineOne} />
                  <i className={styles.speedLineTwo} />
                </motion.div>
              </div>
            </div>

            <div className={styles.deliveryTelemetry}>
              <span><b>100%</b><small>Rastreabilidade</small></span>
              <span><b>−4°C</b><small>Temperatura de rota</small></span>
              <span><b>BN 028</b><small>Lote monitorado</small></span>
              <span><b>{deliveryArrived ? 'ENTREGUE' : 'EM ROTA'}</b><small>Status do pedido</small></span>
            </div>
          </div>

          <div className={styles.assurance}>
            <div><ThermometerSnowflake size={19} /><span><b>Transporte controlado</b><small>Temperatura registrada em toda a rota</small></span></div>
            <div><ShieldCheck size={19} /><span><b>Integridade preservada</b><small>Berço e caixa sem deslocamentos</small></span></div>
            <div><CheckCircle2 size={19} /><span><b>Qualidade garantida</b><small>Conferência no destino final</small></span></div>
          </div>
        </div>
      </section>

      <section className={styles.finalSection}>
        <div>
          <p>Da produção à sua casa</p>
          <h2>Bouche <em>Nerveuse</em></h2>
          <span>Cada etapa existe para que o último gesto seja simplesmente abrir a caixa.</span>
          <a href="#origem"><MapPin size={16} /> Rever a jornada</a>
        </div>
      </section>
    </main>
  );
}
