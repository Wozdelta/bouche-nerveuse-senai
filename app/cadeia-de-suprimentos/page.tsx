import type { Metadata } from 'next';
import SupplyChainJourneyLegacy from '@/components/SupplyChainJourneyLegacy';

export const metadata: Metadata = {
  title: 'Cadeia de Suprimentos | Bouche Nerveuse',
  description:
    'Da origem dos ingredientes à entrega refrigerada: conheça a jornada do Red Velvet Silvestre Bouche Nerveuse.',
};

export default function SupplyChainPage() {
  return <SupplyChainJourneyLegacy />;
}
