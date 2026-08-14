"use client";

import Image from 'next/image';
import {
  ArrowDown,
  ArrowRight,
  Check,
  CheckCircle2,
  CakeSlice,
  Cherry,
  Factory,
  Flame,
  Flower2,
  MapPin,
  PackageCheck,
  PackageOpen,
  Play,
  ShieldCheck,
  Snowflake,
  Sprout,
  Store,
  ThermometerSnowflake,
  Timer,
  Truck,
  Wheat,
} from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import styles from '@/app/cadeia-de-suprimentos/legacy.module.css';

const ingredients = [
  { icon: Sprout, number: '01', title: 'Cacau fino selecionado', text: 'Amêndoas de origem rastreada, avaliadas por aroma, fermentação e intensidade.' },
  { icon: Cherry, number: '02', title: 'Frutas vermelhas premium', text: 'Framboesa, amora e groselha selecionadas no ponto ideal de acidez.' },
  { icon: Flower2, number: '03', title: 'Flores comestíveis delicadas', text: 'Pétalas colhidas e separadas à mão para o acabamento superior.' },
];

const production = [
  { number: '01', title: 'Torra & moagem', eyebrow: 'Intensidade do cacau', text: 'As amêndoas são torradas em curva controlada e moídas ainda mornas. O processo libera os aromas profundos e produz uma textura fina, pronta para o cremeux.', metric: '118°C', metricLabel: 'Curva de torra', icon: Flame, focus: '10%' },
  { number: '02', title: 'Cremeux de cacau', eyebrow: 'Precisão e textura', text: 'O cacau encontra o creme em uma emulsão lenta. Temperatura e movimento são monitorados até alcançar brilho, estabilidade e uma cremosidade absolutamente uniforme.', metric: '32°C', metricLabel: 'Emulsão estável', icon: ThermometerSnowflake, focus: '39%' },
  { number: '03', title: 'Massa red velvet', eyebrow: 'Cocção uniforme', text: 'A massa é aerada, porcionada e levada ao forno profissional. Tempo e calor preservam a umidade interna, enquanto a estrutura ganha firmeza para a montagem.', metric: '28 min', metricLabel: 'Forno a 165°C', icon: Timer, focus: '66%' },
  { number: '04', title: 'Alta confeitaria', eyebrow: 'Acabamento manual', text: 'Camadas, mousse e frutas silvestres são finalizadas à mão. Cada detalhe é conferido antes de o bolo seguir para conservação térmica e embalagem.', metric: '18°C', metricLabel: 'Finalização', icon: CakeSlice, focus: '94%' },
];

const layers = [
  { label: 'Camada 01', title: 'Cremeux moldado com precisão', eyebrow: 'Estrutura superior', text: 'Textura lisa e temperatura controlada sustentam a decoração sem comprometer o corte.', metric: '32°C', metricLabel: 'Moldagem', position: '25.5%', tone: '#dda29e' },
  { label: 'Camada 02', title: 'Massa red velvet úmida', eyebrow: 'Corpo e maciez', text: 'Miolo aerado, corte estável e sabor profundo de cacau criam a base da experiência.', metric: '28 min', metricLabel: 'Cocção', position: '36.2%', tone: '#9d1728' },
  { label: 'Camada 03', title: 'Mousse aerada de frutas silvestres', eyebrow: 'Leveza e acidez', text: 'A mousse equilibra as notas intensas do chocolate e prolonga a sensação de frescor.', metric: '18°C', metricLabel: 'Montagem', position: '47.7%', tone: '#b57a9f' },
];

type TransitPhase = 'idle' | 'closing' | 'moving' | 'arrived';

export default function SupplyChainJourneyLegacy() {
  const reduceMotion = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [phase, setPhase] = useState<TransitPhase>('idle');
  const [lotDelivered, setLotDelivered] = useState(false);
  const [lotDragging, setLotDragging] = useState(false);
  const [productionStage, setProductionStage] = useState(0);
  const [productionPaused, setProductionPaused] = useState(false);
  const [layerStage, setLayerStage] = useState(0);
  const [layerPaused, setLayerPaused] = useState(false);
  const [packagingState, setPackagingState] = useState<'ready' | 'closing' | 'sealed'>('ready');
  const [deliveryDone, setDeliveryDone] = useState(false);
  const dockRef = useRef<HTMLElement>(null);
  const dockSceneRef = useRef<HTMLDivElement>(null);
  const dockDropRef = useRef<HTMLDivElement>(null);
  const dockLotRef = useRef<HTMLButtonElement>(null);
  const productionRef = useRef<HTMLElement>(null);
  const transportSceneRef = useRef<HTMLDivElement>(null);
  const truckDropRef = useRef<HTMLDivElement>(null);
  const deliveryRef = useRef<HTMLElement>(null);
  const packagingVideoRef = useRef<HTMLVideoElement>(null);
  const deliveryVisible = useInView(deliveryRef, { once: true, amount: 0.24 });
  const [deliveryActive, setDeliveryActive] = useState(false);

  const loadTruck = () => {
    if (loaded) return;
    setLoaded(true);
    setPhase('closing');
  };

  useEffect(() => {
    if (!loaded) return;
    const move = window.setTimeout(() => setPhase('moving'), 760);
    const arrive = window.setTimeout(() => setPhase('arrived'), reduceMotion ? 900 : 2950);
    const next = window.setTimeout(() => {
      dockRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }, reduceMotion ? 1050 : 3500);
    return () => {
      window.clearTimeout(move);
      window.clearTimeout(arrive);
      window.clearTimeout(next);
    };
  }, [loaded, reduceMotion]);

  useEffect(() => {
    if (!deliveryVisible) return;
    const start = window.setTimeout(() => setDeliveryActive(true), reduceMotion ? 0 : 320);
    const complete = window.setTimeout(() => setDeliveryDone(true), reduceMotion ? 80 : 3920);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(complete);
    };
  }, [deliveryVisible, reduceMotion]);

  useEffect(() => {
    if (productionPaused || reduceMotion) return;
    const advance = window.setInterval(() => {
      setProductionStage((current) => (current + 1) % production.length);
    }, 5200);
    return () => window.clearInterval(advance);
  }, [productionPaused, reduceMotion]);

  useEffect(() => {
    if (layerPaused || reduceMotion) return;
    const advance = window.setInterval(() => {
      setLayerStage((current) => (current + 1) % layers.length);
    }, 4800);
    return () => window.clearInterval(advance);
  }, [layerPaused, reduceMotion]);

  const releaseLot = () => {
    if (lotDelivered) return;
    setLotDelivered(true);
    window.setTimeout(() => {
      productionRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }, 750);
  };

  const startPackaging = async () => {
    if (packagingState !== 'ready') return;
    const video = packagingVideoRef.current;
    setPackagingState('closing');
    if (!video || reduceMotion) {
      setPackagingState('sealed');
      window.setTimeout(() => document.querySelector('#entrega')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }), 420);
      return;
    }
    video.currentTime = 0;
    try {
      await video.play();
    } catch {
      setPackagingState('sealed');
      window.setTimeout(() => document.querySelector('#entrega')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 420);
    }
  };

  const finishPackaging = () => {
    setPackagingState('sealed');
    window.setTimeout(() => document.querySelector('#entrega')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }), reduceMotion ? 100 : 650);
  };

  const activeProduction = production[productionStage];
  const ActiveProductionIcon = activeProduction.icon;
  const activeLayer = layers[layerStage];

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p>Bouche Nerveuse · rastreabilidade de excelência</p>
          <h1>Da origem<br />à sua casa.</h1>
          <span>
            Acompanhe o Red Velvet Silvestre em uma jornada de precisão — da seleção dos ingredientes
            à entrega refrigerada.
          </span>
          <a href="#origem">Iniciar jornada <ArrowDown size={16} /></a>
        </div>
        <div className={styles.heroFilm}>
          <video src="/Video_Bolo_KF.mp4" autoPlay muted loop playsInline preload="metadata" />
          <div><b>BN · Red Velvet Silvestre</b><small>06 etapas monitoradas</small></div>
        </div>
        <div className={styles.heroRail}>
          {['Origem', 'Transporte', 'Padaria', 'Camadas', 'Embalagem', 'Entrega'].map((item, index) => (
            <span key={item}><i>{String(index + 1).padStart(2, '0')}</i>{item}</span>
          ))}
        </div>
      </section>

      <section id="origem" className={styles.creamSection}>
        <div className={styles.wrap}>
          <header className={styles.editorialHeader}>
            <span>01</span>
            <div><p>Origem dos ingredientes</p><h2>A qualidade nasce na escolha.</h2><small>Cada ingrediente recebe procedência, inspeção e um código de lote antes de seguir para o ateliê.</small></div>
          </header>

          <div className={styles.ingredientCards}>
            {ingredients.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.number}>
                  <div><Icon size={20} /></div><small>{item.number}</small><h3>{item.title}</h3><p>{item.text}</p>
                </article>
              );
            })}
          </div>

          <div className={styles.transportCard}>
            <div className={styles.transportHeader}>
              <div><small><i /> Etapa interativa</small><h3>{loaded ? 'Carga selada. Transporte iniciado.' : 'Carregue o cacau para iniciar o transporte'}</h3></div>
              <span className={loaded ? styles.ready : ''}>{loaded ? <><CheckCircle2 size={14} /> Carga rastreada</> : <><PackageCheck size={14} /> Aguardando lote</>}</span>
            </div>

            <div ref={transportSceneRef} className={`${styles.transportScene} ${phase === 'moving' || phase === 'arrived' ? styles.cityMode : ''}`}>
              <div className={styles.sun} />
              <div className={styles.farmLand}><i /><i /></div>
              <div className={styles.cityBlocks}><i /><i /><i /><i /><i /></div>
              <div className={styles.bakeryFacade}>
                <img src="/images/supply-chain/bouche-bakery-facade.png" alt="Padaria e confeitaria central Bouche Nerveuse" />
                <div><b>Bouche Nerveuse</b><small>Padaria & confeitaria central</small></div>
              </div>
              <div className={styles.journeyPill}><b>Origem</b><span /><b>Em trânsito</b><span /><b>Padaria</b></div>
              <div className={styles.transportRoad}><i /></div>

              <AnimatePresence>
                {!loaded && (
                  <motion.button
                    ref={dockLotRef}
                    type="button"
                    className={styles.cacaoLoad}
                    drag
                    dragConstraints={transportSceneRef}
                    dragSnapToOrigin
                    dragElastic={0.08}
                    dragMomentum={false}
                    whileHover={{ y: -3 }}
                    whileDrag={{ scale: 1.07, zIndex: 20, rotate: -1.5 }}
                    onClick={loadTruck}
                    onTap={loadTruck}
                    onDragEnd={(_, info) => {
                      const target = truckDropRef.current?.getBoundingClientRect();
                      if (!target) return;
                      const pickupRadius = 80;
                      const insideTruck = info.point.x >= target.left - pickupRadius
                        && info.point.x <= target.right + pickupRadius
                        && info.point.y >= target.top - pickupRadius
                        && info.point.y <= target.bottom + pickupRadius;
                      if (insideTruck) loadTruck();
                    }}
                    exit={{ opacity: 0, scale: 0.62, x: 245, y: -28 }}
                    aria-label="Arraste o cacau até o caminhão"
                  >
                    <span className={styles.cacaoVisual}>
                      <img src="/images/supply-chain/cacao-beans-clean-v2.png" alt="Grãos de cacau fino selecionado" draggable={false} />
                    </span>
                    <span className={styles.cacaoLabel}>
                      <b>Cacau fino · Lote 028</b>
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>

              <motion.div
                ref={truckDropRef}
                className={styles.transitTruck}
                animate={{
                  x: phase === 'moving' || phase === 'arrived' ? '105%' : '0%',
                  opacity: phase === 'arrived' ? 0 : 1,
                }}
                transition={{ x: { duration: reduceMotion ? 0 : 2.05, ease: [0.45, 0, 0.18, 1] }, opacity: { duration: 0.35 } }}
              >
                <div className={`${styles.cargoDoor} ${loaded ? styles.doorClosed : ''}`}>
                  <small>{loaded ? 'CARGA SELADA' : 'ÁREA DE CARGA'}</small>
                  <div className={styles.doorFrame}>
                    <div className={styles.doorInterior}><Snowflake size={15} /><span>Câmara −4°C</span></div>
                    <div className={styles.doorPanel}><i /><i /><i /></div>
                  </div>
                  <span className={styles.liftGate} />
                </div>
                <div className={styles.singleBrand}><b>Bouche</b><span>Nerveuse</span><small>logística refrigerada</small></div>
                <img src="/images/supply-chain/premium-delivery-truck.png" alt="Caminhão refrigerado Bouche Nerveuse" />
              </motion.div>
            </div>
            <div className={styles.transportFooter}><span>Acompanhe o transporte refrigerado até a padaria central.</span><b><Snowflake size={13} /> Temperatura −4°C</b></div>
          </div>
        </div>
      </section>

      <section ref={dockRef} className={styles.dockSection}>
        <div className={styles.wrap}>
          <header className={styles.editorialHeader}>
            <span>02</span>
            <div><p>Chegada à padaria</p><h2>Recebimento controlado.</h2><small>O lote só aparece na doca depois que o transporte anterior é concluído.</small></div>
          </header>
          <div className={styles.dockCard}>
            <div ref={dockSceneRef} className={styles.dockScene}>
              <div className={styles.dockBuilding}>
                <div className={styles.dockBrandCopy}>
                  <small>Maison de pâtisserie</small>
                  <b>Bouche Nerveuse</b>
                  <i />
                  <em>Padaria & confeitaria central</em>
                </div>
                <span className={styles.dockBay}><i /> Doca 02 · recebimento</span>
              </div>
              <div className={styles.dockGuide}><i /><span>Zona de descarga refrigerada</span></div>
              {phase === 'arrived' && !lotDelivered && (
                <div ref={dockDropRef} className={`${styles.dockDropZone} ${lotDragging ? styles.dockDropActive : ''}`}>
                  <PackageCheck size={16} />
                  <span><b>Recebimento</b><small>Solte a caixa aqui</small></span>
                </div>
              )}
              <div className={styles.dockRoad}><i /></div>
              <AnimatePresence>
                {phase === 'arrived' && (
                  <motion.div className={styles.dockTruck} initial={{ x: '-45%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
                    <img src="/images/supply-chain/premium-delivery-truck.png" alt="Caminhão chegando à doca da padaria" />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {phase === 'arrived' && !lotDelivered && (
                  <motion.button
                    ref={dockLotRef}
                    type="button"
                    className={styles.dockLot}
                    onClick={(event) => {
                      if (event.detail === 0) releaseLot();
                    }}
                    drag
                    dragConstraints={dockSceneRef}
                    dragSnapToOrigin
                    dragElastic={0.07}
                    dragMomentum={false}
                    onDragStart={() => setLotDragging(true)}
                    onDragEnd={(_, info) => {
                      setLotDragging(false);
                      const target = dockDropRef.current?.getBoundingClientRect();
                      const lot = dockLotRef.current?.getBoundingClientRect();
                      if (!target || !lot) return;
                      const tolerance = 58;
                      const pointerInsideDock = info.point.x >= target.left - tolerance
                        && info.point.x <= target.right + tolerance
                        && info.point.y >= target.top - tolerance
                        && info.point.y <= target.bottom + tolerance;
                      const lotOverlapsDock = lot.right >= target.left - 22
                        && lot.left <= target.right + 22
                        && lot.bottom >= target.top - 22
                        && lot.top <= target.bottom + 22;
                      if (pointerInsideDock || lotOverlapsDock) releaseLot();
                    }}
                    whileDrag={{ scale: 1.04, rotate: -1.2, zIndex: 30 }}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.68, x: -135, y: -120 }}
                    aria-label="Arraste a caixa do lote 028 até a doca de recebimento"
                  >
                    <span className={styles.dockLotCase}>
                      <img src="/images/supply-chain/cacao-cold-chain-crate-v4.png" alt="Caixa refrigerada profissional com cacau fino do lote 028" draggable={false} />
                      <span className={styles.lotCasePlate}>
                        <span className={styles.lotCaseIdentity}>
                          <small>Bouche Nerveuse</small>
                          <b>Cacau fino · Lote 028</b>
                          <em>Origem 08 · Cadeia fria</em>
                        </span>
                        <i>−4°C</i>
                      </span>
                    </span>
                    <span className={styles.dockLotAction}><b>Levar lote à doca 02</b><ArrowRight size={10} /></span>
                  </motion.button>
                )}
              </AnimatePresence>
              {phase === 'arrived' ? (
                <div className={styles.dockStatus}>
                  <Truck size={13} />
                  <b>Caminhão na doca</b>
                  <i />
                  <span>Temperatura −4°C</span>
                </div>
              ) : (
                <div className={styles.waitingTransport}><Truck size={16} /> Aguardando transporte</div>
              )}
            </div>
            <div className={styles.orderBar}>
              <span><small>Ordem da padaria</small><b>BN · Red Velvet Silvestre</b></span>
              <i><small>Origem certificada</small><b>Fazenda 08</b></i>
              <i><small>Conservação</small><b>−4°C monitorados</b></i>
              <em>{lotDelivered ? 'LOTE RECEBIDO' : 'AGUARDANDO LOTE'}</em>
            </div>
          </div>
        </div>
      </section>

      <section ref={productionRef} className={styles.productionSection}>
        <div className={styles.wrap}>
          <header className={styles.productionHeader}>
            <div className={styles.productionEyebrow}><span>03</span><i /><small>Produção artesanal</small></div>
            <div className={styles.productionHeading}>
              <h2>O rigor da técnica.<br /><em>A delicadeza do gesto.</em></h2>
              <p>Em nosso ateliê, cada receita percorre quatro estações conduzidas com precisão — da torra do cacau ao acabamento final.</p>
            </div>
            <div className={styles.productionSeal}><Factory size={17} /><span><small>Ateliê central</small><b>Lote 028 · Em produção</b></span></div>
          </header>
          <div className={styles.productionAtelier}>
            <div className={styles.productionExperience}>
              <div className={styles.productionVisual}>
                <Image
                  src="/images/supply-chain/premium-bakery-production-line.png"
                  alt={`Estação ${production[productionStage].number}: ${production[productionStage].title}`}
                  fill
                  sizes="(max-width: 900px) 100vw, 900px"
                  priority={false}
                  style={{ objectPosition: `${activeProduction.focus} center` }}
                />
                <div className={styles.productionShade} />
                <div className={styles.productionTopbar}>
                  <span><i /> Processo em andamento</span>
                  <b>{activeProduction.number} / 04</b>
                </div>
                <div className={styles.productionMachineTag}>
                  <span><ActiveProductionIcon size={17} /></span>
                  <small>Máquina em operação</small>
                  <b>{activeProduction.title}</b>
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={productionStage}
                  className={styles.productionNarrative}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.38 }}
                >
                  <div className={styles.productionNarrativeIndex}><span>{activeProduction.number}</span><small>Etapa atual</small></div>
                  <small>{activeProduction.eyebrow}</small>
                  <h3>{activeProduction.title}</h3>
                  <p>{activeProduction.text}</p>
                  <div className={styles.productionReading}><span><small>{activeProduction.metricLabel}</small><b>{activeProduction.metric}</b></span><em>Parâmetro monitorado</em></div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className={styles.productionTimeline} role="tablist" aria-label="Etapas da produção">
              {production.map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <button type="button" key={stage.number} onClick={() => { setProductionStage(index); setProductionPaused(true); }} className={productionStage === index ? styles.productionCardActive : ''} role="tab" aria-selected={productionStage === index}>
                    <span className={styles.productionStepIcon}><Icon size={16} /></span>
                    <span className={styles.productionStepCopy}><small>Etapa {stage.number}</small><b>{stage.title}</b></span>
                    <i className={styles.productionStepState}>{productionStage > index ? <Check size={13} /> : productionStage === index ? 'Agora' : ''}</i>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.layerSection}>
        <div className={styles.wrap}>
          <header className={styles.layerHeader}>
            <div className={styles.layerChapter}><span>03</span><i /><small>Montagem em camadas</small></div>
            <div className={styles.layerHeading}><h2>A arquitetura<br /><em>de uma experiência.</em></h2><p>Cada elemento é preparado separadamente e montado em uma sequência precisa para equilibrar cremosidade, acidez e textura.</p></div>
            <div className={styles.layerSignature}><small>Red Velvet Silvestre</small><b>Construído à mão,<br />camada por camada.</b></div>
          </header>
          <div className={styles.layerCanvas}>
            <div className={styles.layerCanvasHead}>
              <span><i /> Composição técnica</span>
              <b>BOUCHE NERVEUSE · ATELIÊ CENTRAL</b>
            </div>
            <div className={styles.layerComposition}>
              <div className={styles.layerImage}>
                <Image src="/images/supply-chain/cake-layers-only-premium.png" alt="Bolo Red Velvet Silvestre separado em camadas" fill sizes="(max-width: 800px) 92vw, 650px" />
              </div>
              <motion.div className={styles.layerCalloutAnchor} animate={{ top: activeLayer.position }} transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}>
                <span className={styles.layerCalloutPoint} style={{ background: activeLayer.tone }} />
                <i className={styles.layerCalloutLine} />
                <AnimatePresence mode="wait">
                  <motion.article key={layerStage} className={styles.layerCallout} initial={reduceMotion ? false : { opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -10 }} transition={{ duration: 0.3 }}>
                    <div className={styles.layerCalloutLabel}><span style={{ background: activeLayer.tone }} /><small>{activeLayer.label} · {activeLayer.eyebrow}</small></div>
                    <h3>{activeLayer.title}</h3>
                    <p>{activeLayer.text}</p>
                    <footer><span><small>{activeLayer.metricLabel}</small><b>{activeLayer.metric}</b></span><em><CheckCircle2 size={13} /> Padrão aprovado</em></footer>
                  </motion.article>
                </AnimatePresence>
              </motion.div>
              <div className={styles.layerCompositionStamp}><Wheat size={14} /><span><small>Engenharia de sabor</small><b>7 elementos · 3 texturas</b></span></div>
            </div>
            <div className={styles.layerTabs} role="tablist" aria-label="Camadas do bolo">
              {layers.map((layer, index) => (
                <button type="button" role="tab" aria-selected={layerStage === index} className={layerStage === index ? styles.layerTabActive : ''} key={layer.label} onClick={() => { setLayerStage(index); setLayerPaused(true); }}>
                  <span>{layer.label}</span><b>{layer.title}</b><i>{layerStage === index ? 'Em destaque' : <ArrowRight size={13} />}</i>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.coldSection}>
        <div className={styles.wrap}>
          <header className={styles.coldHeader}>
            <div className={styles.coldChapter}><span>04</span><i /><small>Conservação térmica</small></div>
            <div className={styles.coldHeading}><h2>O sabor permanece.<br /><em>O tempo desacelera.</em></h2><p>O ultra-congelamento reduz rapidamente a temperatura do núcleo, preservando a estrutura delicada de cada camada até o momento da entrega.</p></div>
            <div className={styles.coldCertification}><ShieldCheck size={17} /><span><small>Protocolo BN Cold</small><b>Cadeia íntegra · Lote 028</b></span></div>
          </header>
          <div className={styles.coldStation}>
            <div className={styles.coldStationTop}><span><i /> Câmara térmica 02 · Em operação</span><b><ThermometerSnowflake size={13} /> Monitoramento contínuo</b></div>
            <div className={styles.coldDashboard}>
              <article className={styles.coldCore}>
                <div className={styles.coldCoreIcon}><Snowflake size={27} /></div>
                <small>Temperatura do núcleo</small>
                <strong>−18<sup>°C</sup></strong>
                <p>Faixa ideal atingida e estabilizada sem formação de grandes cristais de gelo.</p>
                <div className={styles.coldStability}><span><i /><b>Estável</b></span><em>Variação máxima ±0,4°C</em></div>
                <div className={styles.coldGauge}>
                  <span><small>+22°</small><i /></span>
                  <span><small>+4°</small><i /></span>
                  <span className={styles.coldGaugeActive}><small>−18°</small><i /></span>
                </div>
              </article>
              <div className={styles.coldFlow}>
                <div className={styles.coldCurveHead}><span><small>Curva térmica controlada</small><b>Da finalização à estabilidade em 90 minutos</b></span><em>LEITURA EM TEMPO REAL</em></div>
                <div className={styles.coldCurve} aria-label="Curva de resfriamento de 22°C a −18°C">
                  <div className={styles.coldCurveGrid} />
                  <motion.div className={styles.coldCurveLine} initial={reduceMotion ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.55 }} transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}>
                    <i /><i /><i />
                  </motion.div>
                  <span className={styles.coldCurveStart}><b>22°C</b><small>Entrada</small></span>
                  <span className={styles.coldCurveMiddle}><b>4°C</b><small>Resfriamento</small></span>
                  <span className={styles.coldCurveEnd}><b>−18°C</b><small>Estável</small></span>
                </div>
                <div className={styles.coldSteps}>
                  <article><span><Timer size={17} /></span><small>01 · Descida rápida</small><h3>Ultra-congelamento</h3><p>A temperatura cai rapidamente para preservar a microestrutura do bolo.</p><b>90 min</b></article>
                  <article><span><Snowflake size={17} /></span><small>02 · Núcleo protegido</small><h3>Estabilização</h3><p>Camadas, mousse e cremeux atingem equilíbrio térmico uniforme.</p><b>−18°C</b></article>
                  <article><span><ShieldCheck size={17} /></span><small>03 · Integridade</small><h3>Cadeia fria</h3><p>Sensores acompanham cada variação até a liberação para transporte.</p><b>24 / 7</b></article>
                </div>
              </div>
            </div>
            <div className={styles.coldStationFoot}><span><CheckCircle2 size={13} /> Textura preservada</span><span><CheckCircle2 size={13} /> Sabor protegido</span><span><CheckCircle2 size={13} /> Rastreabilidade térmica</span></div>
          </div>
        </div>
      </section>

      <section className={styles.packagingSection}>
        <div className={styles.wrap}>
          <header className={styles.packagingHeader}>
            <div className={styles.packagingChapter}><span>05</span><i /><small>Embalagem premium</small></div>
            <div><h2>O último gesto<br /><em>antes da entrega.</em></h2><p>O bolo finalizado repousa no berço da caixa aveludada. Um fechamento preciso protege cada camada e transforma a embalagem em parte da experiência.</p></div>
            <aside><PackageCheck size={20} /><span><small>Proteção certificada</small><b>Caixa rígida · Lote BN 028</b></span></aside>
          </header>
          <div className={`${styles.packagingExperience} ${styles[`packaging${packagingState[0].toUpperCase()}${packagingState.slice(1)}`]}`}>
            <div className={styles.packagingFilm}>
              <video ref={packagingVideoRef} src="/Video_Bolo_KF_Closing.mp4" muted playsInline preload="auto" poster="/images/supply-chain/packaging-open-poster.jpg" onEnded={finishPackaging} />
              <div className={styles.packagingFilmShade} />
              <div className={styles.packagingFilmTop}><span><i /> Ateliê de embalagem BN</span><b>{packagingState === 'ready' ? 'Caixa aberta' : packagingState === 'closing' ? 'Fechamento em curso' : 'Caixa selada'}</b></div>
              {packagingState === 'ready' && <button type="button" className={styles.packagingPlay} onClick={startPackaging} aria-label="Embalar o bolo"><Play size={19} fill="currentColor" /><span><b>Iniciar fechamento</b><small>Assista à caixa sendo selada</small></span></button>}
              {packagingState === 'closing' && <div className={styles.packagingProgress}><span>Selando a experiência</span><i><b /></i></div>}
              {packagingState === 'sealed' && <div className={styles.packagingSealedNotice}><CheckCircle2 size={21} /><span><b>Embalagem concluída</b><small>Produto liberado para entrega</small></span></div>}
              <div className={styles.packagingFilmFoot}><span>Red Velvet Silvestre</span><i /><small>Caixa original Bouche Nerveuse</small></div>
            </div>
            <div className={styles.packagingPanel}>
              <div className={styles.packagingPanelIndex}><PackageOpen size={18} /><span><small>Estação 05 · Acabamento</small><b>{packagingState === 'sealed' ? 'Proteção confirmada' : 'Pronta para embalar'}</b></span></div>
              <p>Caixa rígida aveludada</p>
              <h3>Beleza por fora.<br /><em>Precisão por dentro.</em></h3>
              <span>Berço interno, base firme e tampa estruturada impedem qualquer deslocamento sem tocar na decoração.</span>
              <div className={styles.packagingSpecs}><span><Check size={13} /><b>Berço moldado</b><small>Encaixe milimétrico</small></span><span><Check size={13} /><b>Tampa selada</b><small>Proteção estrutural</small></span><span><Check size={13} /><b>Lacre rastreável</b><small>Lote BN 028</small></span></div>
              <button type="button" className={styles.packagingAction} onClick={startPackaging} disabled={packagingState !== 'ready'}>
                <span>{packagingState === 'ready' ? 'Embalar bolo' : packagingState === 'closing' ? 'Fechando caixa…' : 'Embalagem concluída'}</span>
                {packagingState === 'sealed' ? <CheckCircle2 size={16} /> : <ArrowRight size={16} />}
              </button>
              <small className={styles.packagingHint}>{packagingState === 'ready' ? 'Ao clicar, o fechamento será exibido e a jornada continuará automaticamente.' : packagingState === 'closing' ? 'Aguarde o fechamento completo da caixa.' : 'Avançando para a entrega refrigerada.'}</small>
            </div>
          </div>
        </div>
      </section>

      <section ref={deliveryRef} id="entrega" className={styles.deliverySection}>
        <div className={styles.wrap}>
          <header className={styles.deliveryHeader}>
            <div className={styles.deliveryChapter}><span>06</span><i /><small>Entrega refrigerada</small></div>
            <div className={styles.deliveryHeading}><h2>Das lojas<br /><em>até sua casa.</em></h2><p>O último trecho acontece sob refrigeração constante, com lacre rastreado e conferência no destino — para que cada detalhe chegue como saiu do ateliê.</p></div>
            <aside className={styles.deliveryManifest}><Truck size={20} /><span><small>Manifesto de rota</small><b>BN 028 · Entrega premium</b></span></aside>
          </header>
          <div className={`${styles.deliveryCard} ${deliveryDone ? styles.deliveryCardComplete : ''}`}>
            <div className={`${styles.deliveryTop} ${deliveryDone ? styles.deliveryComplete : ''}`}>
              <span><i /> Central logística BN <em>·</em> {deliveryDone ? 'Entrega confirmada' : 'Acompanhamento em tempo real'}</span>
              <div><b><PackageCheck size={13} /> Lote 028 lacrado</b><b>{deliveryDone ? <><CheckCircle2 size={14} /> Recebimento confirmado</> : <><ThermometerSnowflake size={14} /> −4°C monitorado</>}</b></div>
            </div>
            <div className={styles.deliveryScene}>
              <div className={styles.deliveryCity} />
              <div className={styles.deliveryGrid} />
              <div className={styles.routeSummary}><span>Rota BN · 028</span><b>{deliveryDone ? 'Destino alcançado com integridade' : 'Distribuição urbana refrigerada'}</b><small>{deliveryDone ? 'Entrega concluída às 18:42' : '28 km · 47 min estimados'}</small></div>

              <article className={styles.storeStop}>
                <div className={styles.stopNumber}>01</div>
                <div className={styles.stopIcon}><Store size={20} /></div>
                <div className={styles.stopCopy}><small>Ponto de partida</small><h3>Lojas</h3><p>Retirada conferida, caixa selada e lote liberado para a rota.</p></div>
                <span><CheckCircle2 size={12} /> Coleta concluída <i>18:01</i></span>
              </article>

              <article className={`${styles.homeStop} ${deliveryDone ? styles.completed : ''}`}>
                <div className={styles.stopNumber}>02</div>
                <div className={styles.stopIcon}><MapPin size={20} /></div>
                <div className={styles.stopCopy}><small>{deliveryDone ? 'Destino alcançado' : 'Destino protegido'}</small><h3>Até sua casa</h3><p>Apresentação, textura e temperatura preservadas até a abertura.</p></div>
                <span><ShieldCheck size={12} /> {deliveryDone ? 'Recebimento confirmado' : 'Destino monitorado'} <i>{deliveryDone ? '18:42' : 'ETA 18:42'}</i></span>
              </article>

              <div className={`${styles.routeAxis} ${deliveryActive && !deliveryDone ? styles.routeMoving : ''}`}>
                <div className={styles.routeRoadGlow} />
                <i className={styles.routeBase} />
                <motion.i
                  className={styles.routeFill}
                  initial={false}
                  animate={{ width: deliveryActive ? '86%' : '3%' }}
                  transition={{ duration: reduceMotion ? 0 : 3.5, ease: [0.4, 0, 0.18, 1] }}
                />
                <i className={styles.routeStart}><Store size={9} /></i>
                <i className={`${styles.routeEnd} ${deliveryDone ? styles.routeEndDone : ''}`}><MapPin size={9} /></i>
                <motion.div
                  className={styles.finalTruck}
                  initial={false}
                  animate={{ left: deliveryActive ? '73%' : '4%' }}
                  transition={{ duration: reduceMotion ? 0 : 3.5, ease: [0.4, 0, 0.18, 1] }}
                >
                  <span className={styles.finalBrand}><b>Bouche</b><em>Nerveuse</em></span>
                  <img src="/images/supply-chain/premium-delivery-truck.png" alt="Caminhão refrigerado das lojas até sua casa" />
                </motion.div>
              </div>

              <div className={styles.routeFacts}>
                <span><Snowflake size={16} /><small>Temperatura da carga</small><b>−4,0°C</b><em>Estável</em></span>
                <span><Timer size={16} /><small>Tempo de trajeto</small><b>{deliveryDone ? '41 min' : 'Em curso'}</b><em>{deliveryDone ? 'Dentro do prazo' : 'ETA 18:42'}</em></span>
                <span><ShieldCheck size={16} /><small>Integridade do lote</small><b>100%</b><em>Sem ocorrências</em></span>
              </div>
            </div>
            <div className={styles.telemetry}><span><small>Rastreabilidade</small><b>100%</b><em>Origem ao destino</em></span><span><small>Temperatura</small><b>−4°C</b><em>Variação ±0,2°C</em></span><span><small>Lacre</small><b>BN 028</b><em>Sem violação</em></span><span className={styles.telemetryStatus}><small>Status final</small><b>{deliveryDone ? 'ENTREGUE' : 'EM ROTA'}</b><em>{deliveryDone ? 'Qualidade confirmada' : 'Monitoramento ativo'}</em></span></div>
          </div>
          <div className={styles.assurance}><span><ThermometerSnowflake size={18} /><b>Transporte controlado</b><small>Sensores durante toda a rota</small></span><span><ShieldCheck size={18} /><b>Integridade preservada</b><small>Lacre e caixa monitorados</small></span><span><CheckCircle2 size={18} /><b>Qualidade garantida</b><small>Conferência no recebimento</small></span></div>
        </div>
      </section>

      <section className={styles.finalSection}><p>Da produção à sua casa</p><h2>Bouche Nerveuse</h2><span>Cada etapa existe para que o último gesto seja simplesmente abrir a caixa.</span><a href="#origem"><MapPin size={14} /> Rever a jornada</a></section>
    </main>
  );
}
