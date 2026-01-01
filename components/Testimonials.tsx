import React from 'react';

const testimonials = [
  {
    quote: "NeoHogar transformó mi apartamento. La iluminación automatizada no es solo conveniente, cambia completamente mi estado de ánimo.",
    author: "Elena R.",
    role: "Arquitecta de Interiores",
    avatar: "https://picsum.photos/100/100?random=20"
  },
  {
    quote: "Por fin tecnología que no interrumpe. El diseño es tan sutil que olvidas que está ahí hasta que lo necesitas.",
    author: "Marcos T.",
    role: "Desarrollador Full Stack",
    avatar: "https://picsum.photos/100/100?random=21"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-neutral-950 py-24">
      {/* Abstract Shapes for background interest */}
      <div className="absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-neo-purple/5 blur-3xl"></div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="mb-16 text-center text-3xl font-bold text-white">Lo que dicen los creadores</h2>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {testimonials.map((item, idx) => (
            <figure key={idx} className="relative rounded-3xl bg-neutral-900/50 p-10 border border-white/5 backdrop-blur-sm transition-all hover:bg-neutral-900/80 hover:shadow-xl hover:shadow-neo-purple/10 hover:-translate-y-1">
              <svg className="absolute top-8 left-8 h-10 w-10 text-neutral-700" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <blockquote className="relative mt-8">
                <p className="text-xl font-medium leading-relaxed text-neutral-300">
                  "{item.quote}"
                </p>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-white/10 pt-8">
                <img
                  className="h-12 w-12 rounded-full object-cover bg-neutral-800"
                  src={item.avatar}
                  alt={item.author}
                />
                <div>
                  <div className="font-semibold text-white">{item.author}</div>
                  <div className="text-sm text-neutral-500">{item.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};