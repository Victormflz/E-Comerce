import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className="mx-auto max-w-7xl px-6 transition-all duration-300">
        <div className={`flex items-center justify-between rounded-full border border-white/10 bg-black/50 px-6 py-3 backdrop-blur-md transition-all ${scrolled ? 'shadow-lg shadow-neo-accent/10' : 'shadow-md shadow-black/20'}`}>
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-neo-accent to-neo-purple animate-pulse-slow"></div>
            <span className="text-xl font-bold tracking-tight text-white">NeoHogar</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#hero" className="text-sm text-neutral-400 hover:text-white transition-colors">Inicio</a>
            <a href="#products" className="text-sm text-neutral-400 hover:text-white transition-colors">Colección</a>
            <a href="#about" className="text-sm text-neutral-400 hover:text-white transition-colors">Filosofía</a>
            <a href="#testimonials" className="text-sm text-neutral-400 hover:text-white transition-colors">Comunidad</a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="group relative rounded-full p-2 hover:bg-white/10 transition-colors">
              <ShoppingBag className="h-5 w-5 text-white group-hover:text-neo-accent transition-colors" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-neo-accent"></span>
            </button>
            <button 
              className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-24 left-4 right-4 rounded-3xl border border-white/10 bg-black/90 p-6 backdrop-blur-xl md:hidden shadow-2xl shadow-black/50">
          <div className="flex flex-col gap-4">
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="text-lg text-white hover:text-neo-accent transition-colors">Inicio</a>
            <a href="#products" onClick={() => setMobileMenuOpen(false)} className="text-lg text-white hover:text-neo-accent transition-colors">Colección</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-lg text-white hover:text-neo-accent transition-colors">Filosofía</a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="text-lg text-white hover:text-neo-accent transition-colors">Comunidad</a>
          </div>
        </div>
      )}
    </nav>
  );
};