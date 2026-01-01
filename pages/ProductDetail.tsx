import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import { ShinyButton } from '../components/ui/ShinyButton';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id ? getProductById(id) : undefined;
  const { addToCart } = useCart();
  const { showToast } = useToast();

  if (!product) {
    return (
      <section className="min-h-screen bg-neutral-950 py-24 px-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Producto no encontrado</h2>
          <Link to="/shop" className="text-neo-accent hover:text-white transition-colors">
            Volver al catálogo
          </Link>
        </div>
      </section>
    );
  }

  const handleAddToCart = () => {
    if (!product.inStock) {
      showToast('Este producto está agotado', 'info');
      return;
    }
    addToCart(product, showToast);
  };

  return (
    <section className="min-h-screen bg-neutral-950 py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Imagen */}
          <div className="relative">
            <div className="aspect-square w-full overflow-hidden rounded-3xl bg-neutral-900 border border-white/5 relative shadow-2xl">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-md border border-white/10">
                {product.tag}
              </div>
              {!product.inStock && (
                <div className="absolute top-4 right-4 rounded-full bg-red-500/80 px-4 py-2 text-sm text-white backdrop-blur-md font-semibold">
                  Agotado
                </div>
              )}
              {product.originalPrice && (
                <div className="absolute bottom-4 right-4 rounded-full bg-neo-accent/90 px-4 py-2 text-sm text-black font-bold backdrop-blur-md">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Información */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-neo-accent">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-neutral-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Características</h3>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-neutral-300">
                    <Check className="h-5 w-5 text-neo-accent mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4">
              <ShinyButton
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                {product.inStock ? 'Añadir al Carrito' : 'Agotado'}
              </ShinyButton>
              <Link to="/cart" className="flex-1">
                <ShinyButton className="w-full" variant="secondary">
                  Ver Carrito
                </ShinyButton>
              </Link>
            </div>

            {!product.inStock && (
              <p className="mt-4 text-sm text-neutral-500">
                Este producto no está disponible actualmente. Te notificaremos cuando vuelva a estar en stock.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

