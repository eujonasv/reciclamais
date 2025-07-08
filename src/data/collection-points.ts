
import { CollectionPoint } from '@/types/collection-point';

export const collectionPoints: CollectionPoint[] = [
  {
    id: "1",
    name: "Colégio Adventista de Araucária",
    openingHours: {
      monday: { enabled: true, openTime: '08:00', closeTime: '17:00' },
      tuesday: { enabled: true, openTime: '08:00', closeTime: '17:00' },
      wednesday: { enabled: true, openTime: '08:00', closeTime: '17:00' },
      thursday: { enabled: true, openTime: '08:00', closeTime: '17:00' },
      friday: { enabled: true, openTime: '08:00', closeTime: '17:00' },
      saturday: { enabled: false, openTime: '', closeTime: '' },
      sunday: { enabled: false, openTime: '', closeTime: '' },
    },
    latitude: -25.58580,
    longitude: -49.39766,
    address: "R. São Vicente de Paulo, 465, Araucária - PR",
    phone: "(41) 3028-5410",
    website: "https://www.educacaoadventista.org.br/",
    materials: ["Papel", "Plástico", "Metal", "Vidro"]
  },
  {
    id: "2",
    name: "Prefeitura Municipal de Araucária",
    openingHours: {
      monday: { enabled: true, openTime: '08:00', closeTime: '17:00' },
      tuesday: { enabled: true, openTime: '08:00', closeTime: '17:00' },
      wednesday: { enabled: true, openTime: '08:00', closeTime: '17:00' },
      thursday: { enabled: true, openTime: '08:00', closeTime: '17:00' },
      friday: { enabled: true, openTime: '08:00', closeTime: '17:00' },
      saturday: { enabled: false, openTime: '', closeTime: '' },
      sunday: { enabled: false, openTime: '', closeTime: '' },
    },
    latitude: -25.59005, 
    longitude: -49.39948,
    address: "R. Pedro Druszcz, 111, Araucária - PR",
    phone: "(41) 3614-1400",
    website: "https://araucaria.atende.net/",
    materials: ["Papel", "Plástico", "Metal", "Vidro", "Madeira"]
  },
  {
    id: "3",
    name: "Supermercado Condor Araucária",
    openingHours: {
      monday: { enabled: true, openTime: '08:00', closeTime: '22:00' },
      tuesday: { enabled: true, openTime: '08:00', closeTime: '22:00' },
      wednesday: { enabled: true, openTime: '08:00', closeTime: '22:00' },
      thursday: { enabled: true, openTime: '08:00', closeTime: '22:00' },
      friday: { enabled: true, openTime: '08:00', closeTime: '22:00' },
      saturday: { enabled: true, openTime: '08:00', closeTime: '20:00' },
      sunday: { enabled: true, openTime: '10:00', closeTime: '18:00' },
    },
    latitude: -25.60029, 
    longitude: -49.37911,
    address: "R. Capivari, 65, Araucária - PR",
    phone: "(11) 3333-6666",
    website: "https://www.condor.com.br/",
    materials: ["Baterias", "Lâmpadas"]
  }
];
