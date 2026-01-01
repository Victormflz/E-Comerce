import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShinyButton } from '../components/ui/ShinyButton';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';

export const Success: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-neutral-950 py-24 px-6 flex items-center justify-center">
      <div className="mx-auto max-w-2xl text-center">
        {/* Icono de éxito animado */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-neo-accent/20 rounded-full animate-ping"></div>
            <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-2xl shadow-green-500/50">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>

        {/* Mensaje principal */}
        <h1 className="text-5xl font-bold text-white mb-4">
          ¡Compra Realizada con Éxito!
        </h1>
        
        <p className="text-xl text-neutral-400 mb-8 leading-relaxed">
          Gracias por tu compra. Tu pedido ha sido procesado correctamente y recibirás un email de confirmación en breve.
        </p>

        {/* Información adicional */}
        <div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6 mb-8 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ShoppingBag className="h-5 w-5 text-neo-accent" />
            <h2 className="text-lg font-semibold text-white">¿Qué sigue?</h2>
          </div>
          <ul className="text-left space-y-2 text-neutral-300">
            <li className="flex items-start gap-2">
              <span className="text-neo-accent mt-1">✓</span>
              <span>Recibirás un email de confirmación con los detalles de tu pedido</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neo-accent mt-1">✓</span>
              <span>Te notificaremos cuando tu pedido sea enviado</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neo-accent mt-1">✓</span>
              <span>El tiempo de entrega estimado es de 3-5 días hábiles</span>
            </li>
          </ul>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <ShinyButton
            onClick={() => navigate('/shop')}
            className="flex items-center gap-2"
          >
            Volver a la Tienda
            <ArrowRight className="h-4 w-4" />
          </ShinyButton>
          
          <Link to="/">
            <button className="px-6 py-3 rounded-full text-sm font-medium text-neutral-400 hover:text-white transition-colors border border-white/10 hover:border-white/20">
              Ir al Inicio
            </button>
          </Link>
        </div>

        {/* Número de orden simulado */}
        <p className="mt-8 text-sm text-neutral-600">
          Número de orden: <span className="text-neutral-400">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
        </p>
      </div>
    </section>
  );
};

