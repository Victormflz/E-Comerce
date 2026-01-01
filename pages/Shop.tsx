import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import { ShoppingCart } from 'lucide-react';

export const Shop: React.FC = () => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (product: typeof products[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, showToast);
  };

  return (
    <section className="min-h-screen bg-neutral-950 py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl mb-4">
            Catálogo Completo
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Descubre toda nuestra colección de dispositivos inteligentes para el hogar
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group relative cursor-pointer"
            >
              <div className="aspect-square w-full overflow-hidden rounded-3xl bg-neutral-900 border border-white/5 relative shadow-lg shadow-black/50 group-hover:shadow-xl group-hover:shadow-neo-accent/10 transition-all duration-300">
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    className="rounded-full bg-white px-6 py-2 text-black font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Añadir al Carrito
                  </button>
                </div>

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-md border border-white/10 shadow-md">
                  {product.tag}
                </div>

                {!product.inStock && (
                  <div className="absolute top-4 right-4 rounded-full bg-red-500/80 px-3 py-1 text-xs text-white backdrop-blur-md">
                    Agotado
                  </div>
                )}

                {product.originalPrice && (
                  <div className="absolute bottom-4 right-4 rounded-full bg-neo-accent/90 px-3 py-1 text-xs text-black font-bold backdrop-blur-md">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </div>
                )}
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-medium text-white group-hover:text-neo-accent transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-neo-accent font-semibold text-xl">${product.price}</p>
                  {product.originalPrice && (
                    <p className="text-neutral-500 line-through text-sm">${product.originalPrice}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

