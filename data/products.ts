export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  tag: string;
  features: string[];
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'NeoHub Core',
    price: 199,
    originalPrice: 249,
    image: 'https://picsum.photos/600/600?random=10',
    description: 'El cerebro central de tu hogar inteligente. Conecta y controla todos tus dispositivos NeoHogar desde una sola plataforma. Procesamiento local para máxima privacidad y velocidad.',
    tag: 'El Cerebro',
    features: [
      'Procesamiento local de datos',
      'Compatible con 100+ dispositivos',
      'Interfaz minimalista',
      'Actualizaciones automáticas'
    ],
    inStock: true
  },
  {
    id: '2',
    name: 'Lumina Beam',
    price: 89,
    originalPrice: 119,
    image: 'https://picsum.photos/600/600?random=11',
    description: 'Iluminación inteligente que se adapta a tu ritmo circadiano. Controla el color, intensidad y temperatura desde la app o con comandos de voz.',
    tag: 'Iluminación',
    features: [
      '16 millones de colores',
      'Ajuste automático de temperatura',
      'Sincronización con rutinas',
      'Diseño minimalista'
    ],
    inStock: true
  },
  {
    id: '3',
    name: 'Sentinel Eye',
    price: 149,
    originalPrice: 179,
    image: 'https://picsum.photos/600/600?random=12',
    description: 'Sistema de seguridad inteligente con reconocimiento facial y detección de movimiento. Todo procesado localmente, sin enviar datos a la nube.',
    tag: 'Seguridad',
    features: [
      'Reconocimiento facial IA',
      'Almacenamiento local',
      'Alertas en tiempo real',
      'Visión nocturna 4K'
    ],
    inStock: true
  },
  {
    id: '4',
    name: 'Climate Control Pro',
    price: 299,
    image: 'https://picsum.photos/600/600?random=13',
    description: 'Termostato inteligente que aprende tus preferencias y optimiza el consumo energético. Ahorra hasta un 30% en tu factura.',
    tag: 'Climatización',
    features: [
      'Aprendizaje automático',
      'Ahorro energético',
      'Control por zonas',
      'Integración con NeoHub'
    ],
    inStock: true
  },
  {
    id: '5',
    name: 'SoundSphere 360',
    price: 249,
    originalPrice: 299,
    image: 'https://picsum.photos/600/600?random=14',
    description: 'Altavoz inteligente con sonido envolvente 360°. Audio de alta fidelidad con asistente de voz integrado.',
    tag: 'Audio',
    features: [
      'Sonido 360°',
      'Asistente de voz',
      'Compatible con streaming',
      'Diseño elegante'
    ],
    inStock: true
  },
  {
    id: '6',
    name: 'Smart Lock Neo',
    price: 179,
    image: 'https://picsum.photos/600/600?random=15',
    description: 'Cerradura inteligente con apertura por huella, código o app. Notificaciones en tiempo real y acceso temporal para invitados.',
    tag: 'Seguridad',
    features: [
      'Apertura por huella',
      'Códigos temporales',
      'Notificaciones push',
      'Batería de larga duración'
    ],
    inStock: false
  },
  {
    id: '7',
    name: 'Garden Sense',
    price: 129,
    image: 'https://picsum.photos/600/600?random=16',
    description: 'Sistema de riego inteligente que monitorea la humedad del suelo y optimiza el consumo de agua según las necesidades de tus plantas.',
    tag: 'Exterior',
    features: [
      'Monitoreo de humedad',
      'Riego automático',
      'App de control',
      'Resistente a la intemperie'
    ],
    inStock: true
  },
  {
    id: '8',
    name: 'Energy Monitor',
    price: 99,
    image: 'https://picsum.photos/600/600?random=17',
    description: 'Monitorea el consumo energético de tu hogar en tiempo real. Identifica los dispositivos que más consumen y optimiza tu factura.',
    tag: 'Energía',
    features: [
      'Monitoreo en tiempo real',
      'Análisis de consumo',
      'Alertas de sobreconsumo',
      'Historial detallado'
    ],
    inStock: true
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

