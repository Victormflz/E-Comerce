import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShinyButton } from './ui/ShinyButton';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

export const Hero: React.FC = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleExploreProducts = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Primero intentar scroll suave si estamos en home
    const element = document.querySelector('#products');
    if (element && window.location.pathname === '/') {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      // Si no estamos en home, navegar a shop
      navigate('/shop');
    }
  };

  const handleWatchVideo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    showToast('Reproduciendo video concepto...', 'info');
  };

  return (
    <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20 text-center">
      
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-neo-purple/20 opacity-30 blur-[100px] rounded-full mix-blend-screen animate-blob filter pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-neo-accent/10 opacity-20 blur-[120px] rounded-full mix-blend-screen animate-float-delayed filter pointer-events-none"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl space-y-8">
        
        {/* Badge */}
        <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-neo-accent/20 bg-neo-accent/5 px-4 py-1.5 backdrop-blur-md">
          <Sparkles className="h-3 w-3 text-neo-accent" />
          <span className="text-xs font-semibold uppercase tracking-wider text-neo-accent">
            Nueva Colección 2024
          </span>
        </div>

        {/* Hook Headline */}
        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
          El hogar del <br />
          <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
            futuro, hoy.
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-neutral-400 sm:text-xl leading-relaxed">
          Diseñamos tecnología que se siente invisible pero hace que tu vida sea notablemente mejor. Minimalismo, potencia y elegancia.
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ShinyButton className="w-full sm:w-auto" onClick={handleExploreProducts}>
            Explorar Productos <ArrowRight className="ml-2 h-4 w-4" />
          </ShinyButton>
          <button 
            onClick={handleWatchVideo}
            className="group flex items-center gap-2 rounded-full px-8 py-3 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
          >
            Ver Video Concepto 
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-neutral-700 bg-neutral-800 transition-all group-hover:scale-110 group-hover:bg-white group-hover:text-black">
                <span className="ml-0.5 text-[10px]">▶</span>
            </div>
          </button>
        </div>

      </div>

      {/* Floating Elements (Parallax illusion) */}
      <div className="absolute left-10 top-1/3 hidden lg:block animate-float">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-neutral-800 to-black p-0.5 shadow-2xl shadow-neo-purple/20 ring-1 ring-white/10 backdrop-blur-md">
          <div className="h-full w-full rounded-2xl bg-black/40 flex items-center justify-center text-2xl">🏠</div>
        </div>
      </div>
      <div className="absolute right-20 bottom-1/3 hidden lg:block animate-float-delayed">
        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-neutral-800 to-black p-0.5 shadow-2xl shadow-neo-accent/20 ring-1 ring-white/10 backdrop-blur-md">
          <div className="h-full w-full rounded-full bg-black/40 flex items-center justify-center text-2xl">⚡</div>
        </div>
      </div>
    </section>
  );
};