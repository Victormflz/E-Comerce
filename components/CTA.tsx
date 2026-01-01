import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShinyButton } from './ui/ShinyButton';
import { useToast } from '../contexts/ToastContext';

export const CTA: React.FC = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleBuyNow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/shop');
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-neutral-950"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neo-purple/20 via-neutral-950 to-neutral-950"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neo-accent/5 rounded-full blur-3xl opacity-50"></div>
      
      <div className="relative mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
          ¿Listo para la actualización?
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-neutral-400">
          Únete a más de 10,000 hogares que ya viven en el futuro. Envío gratuito en todos los pedidos superiores a $150.
        </p>
        
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ShinyButton className="w-full sm:w-auto px-12 h-14 text-lg" onClick={handleBuyNow}>
                Comprar Ahora
            </ShinyButton>
        </div>
        
        <p className="mt-8 text-xs text-neutral-600">
            Garantía de devolución de 30 días. Sin preguntas.
        </p>
      </div>
    </section>
  );
};