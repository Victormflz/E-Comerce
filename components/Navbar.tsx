import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const cartItemsCount = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para smooth scroll (solo en Home)
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (!isHomePage) {
      navigate('/');
      // Esperar a que la página se cargue antes de hacer scroll
      setTimeout(() => {
        const element = document.querySelector(targetId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const element = document.querySelector(targetId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className="mx-auto max-w-7xl px-6 transition-all duration-300">
        <div className={`flex items-center justify-between rounded-full border border-white/10 bg-black/50 px-6 py-3 backdrop-blur-md transition-all ${scrolled ? 'shadow-lg shadow-neo-accent/10' : 'shadow-md shadow-black/20'}`}>
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-neo-accent to-neo-purple animate-pulse-slow"></div>
            <span className="text-xl font-bold tracking-tight text-white">NeoHogar</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm text-neutral-400 hover:text-white transition-colors">Inicio</Link>
            <Link to="/shop" className="text-sm text-neutral-400 hover:text-white transition-colors">Tienda</Link>
            {isHomePage && (
              <>
                <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')} className="text-sm text-neutral-400 hover:text-white transition-colors">Filosofía</a>
                <a href="#testimonials" onClick={(e) => handleSmoothScroll(e, '#testimonials')} className="text-sm text-neutral-400 hover:text-white transition-colors">Comunidad</a>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="group relative rounded-full p-2 hover:bg-white/10 transition-colors"
            >
              <ShoppingBag className="h-5 w-5 text-white group-hover:text-neo-accent transition-colors" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-neo-accent text-xs font-bold text-black">
                  {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </span>
              )}
            </Link>
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
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-lg text-white hover:text-neo-accent transition-colors">Inicio</Link>
            <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="text-lg text-white hover:text-neo-accent transition-colors">Tienda</Link>
            {isHomePage && (
              <>
                <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')} className="text-lg text-white hover:text-neo-accent transition-colors">Filosofía</a>
                <a href="#testimonials" onClick={(e) => handleSmoothScroll(e, '#testimonials')} className="text-lg text-white hover:text-neo-accent transition-colors">Comunidad</a>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};