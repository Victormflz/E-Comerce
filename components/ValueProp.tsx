import React from 'react';

export const ValueProp: React.FC = () => {
  return (
    <section id="about" className="relative bg-neutral-950 py-24 sm:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-neo-accent uppercase tracking-wider">La Promesa NeoHogar</h2>
          <p className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Tecnología que se adapta a ti, <br/>no al revés.
          </p>
          <p className="mt-6 text-lg leading-8 text-neutral-400">
            Creemos que un hogar inteligente no debería sentirse "techie". Debería sentirse mágico. 
            Eliminamos la fricción entre tú y tu entorno con dispositivos que anticipan tus necesidades.
          </p>
        </div>
      </div>
    </section>
  );
};