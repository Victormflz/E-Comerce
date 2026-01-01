import React from 'react';
import { SpotlightCard } from './ui/SpotlightCard';
import { Zap, Wifi, Shield, Sliders } from 'lucide-react';

const features = [
  {
    title: "Conexión Instantánea",
    description: "Sin configuraciones complejas. Saca de la caja, acerca tu teléfono, y listo.",
    icon: <Zap className="h-6 w-6 text-yellow-400" />,
    image: "https://picsum.photos/400/300?random=1"
  },
  {
    title: "Ecosistema Unificado",
    description: "Todos tus dispositivos hablan el mismo idioma. Control total desde una sola app minimalista.",
    icon: <Wifi className="h-6 w-6 text-neo-accent" />,
    image: "https://picsum.photos/400/300?random=2"
  },
  {
    title: "Privacidad Primero",
    description: "Tus datos se quedan en casa. Procesamiento local para máxima seguridad y rapidez.",
    icon: <Shield className="h-6 w-6 text-green-400" />,
    image: "https://picsum.photos/400/300?random=3"
  }
];

const products = [
    {
        name: "NeoHub Core",
        price: "$199",
        tag: "El Cerebro",
        img: "https://picsum.photos/600/600?random=10"
    },
    {
        name: "Lumina Beam",
        price: "$89",
        tag: "Iluminación",
        img: "https://picsum.photos/600/600?random=11"
    },
    {
        name: "Sentinel Eye",
        price: "$149",
        tag: "Seguridad",
        img: "https://picsum.photos/600/600?random=12"
    }
]

export const Features: React.FC = () => {
  return (
    <section id="products" className="py-24 bg-neutral-950 px-6">
      <div className="mx-auto max-w-7xl">
        
        {/* Detailed Value Prop (Grid) */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-32">
          {features.map((feature, idx) => (
            <SpotlightCard key={idx} className="h-full">
              <div className="p-8 flex flex-col h-full">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-800/50 ring-1 ring-white/10 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">{feature.title}</h3>
                <p className="text-neutral-400 leading-relaxed mb-6 flex-grow">{feature.description}</p>
                <div className="relative h-48 w-full overflow-hidden rounded-2xl shadow-lg">
                  <img src={feature.image} alt={feature.title} className="h-full w-full object-cover opacity-60 transition-opacity duration-500 hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neo-gray to-transparent"></div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Product Showcase - Horizontal Scroll ish */}
        <div className="space-y-12">
            <div className="flex items-end justify-between">
                <h2 className="text-3xl font-bold text-white">Favoritos del mes</h2>
                <a href="#" className="hidden text-sm font-medium text-neo-accent hover:text-white md:block">Ver todo el catálogo &rarr;</a>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, i) => (
                <div key={i} className="group relative cursor-pointer">
                  <div className="aspect-square w-full overflow-hidden rounded-3xl bg-neutral-900 border border-white/5 relative shadow-lg shadow-black/50 group-hover:shadow-xl group-hover:shadow-neo-accent/10 transition-all duration-300">
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                      <button className="rounded-full bg-white px-6 py-2 text-black font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-105">
                        Ver Detalles
                      </button>
                    </div>
                    
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    <div className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-md border border-white/10 shadow-md">
                      {product.tag}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <h3 className="text-lg font-medium text-white group-hover:text-neo-accent transition-colors">{product.name}</h3>
                    <p className="text-neo-accent font-semibold">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
        </div>

      </div>
    </section>
  );
};