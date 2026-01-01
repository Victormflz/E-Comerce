import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import { ShinyButton } from '../components/ui/ShinyButton';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';

export const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleRemove = (productId: string, productName: string) => {
    removeFromCart(productId, showToast);
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleClearCart = () => {
    clearCart(showToast);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showToast('Tu carrito está vacío', 'info');
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <section className="min-h-screen bg-neutral-950 py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <button
            onClick={() => navigate('/shop')}
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Continuar comprando
          </button>

          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-neutral-900 border border-white/10 mb-6">
              <ShoppingBag className="h-12 w-12 text-neutral-600" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Tu carrito está vacío</h2>
            <p className="text-neutral-400 mb-8">Explora nuestros productos y añade algo especial</p>
            <Link to="/shop">
              <ShinyButton>Explorar Productos</ShinyButton>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const total = getTotalPrice();
  const shipping = total > 150 ? 0 : 15;
  const finalTotal = total + shipping;

  return (
    <section className="min-h-screen bg-neutral-950 py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white">Carrito de Compras</h1>
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="text-sm text-neutral-400 hover:text-red-400 transition-colors"
            >
              Vaciar carrito
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-4 p-6 rounded-2xl bg-neutral-900/50 border border-white/5 backdrop-blur-sm"
              >
                <Link to={`/product/${item.id}`} className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-xl"
                  />
                </Link>

                <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="text-xl font-semibold text-white hover:text-neo-accent transition-colors mb-2">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-neo-accent font-bold text-lg">${item.price}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Controles de cantidad */}
                    <div className="flex items-center gap-3 bg-neutral-800 rounded-full px-4 py-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Disminuir cantidad"
                      >
                        <Minus className="h-4 w-4 text-white" />
                      </button>
                      <span className="text-white font-medium min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="h-4 w-4 text-white" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-white font-bold text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => handleRemove(item.id, item.name)}
                      className="p-2 hover:bg-red-500/20 rounded-full transition-colors text-red-400 hover:text-red-300"
                      aria-label="Eliminar producto"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-2xl bg-neutral-900/50 border border-white/5 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-6">Resumen</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="text-white">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Envío</span>
                  <span className="text-white">
                    {shipping === 0 ? (
                      <span className="text-green-400">Gratis</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                {total < 150 && (
                  <p className="text-sm text-neutral-500">
                    Añade ${(150 - total).toFixed(2)} más para envío gratis
                  </p>
                )}
                <div className="border-t border-white/10 pt-4 flex justify-between text-xl font-bold text-white">
                  <span>Total</span>
                  <span className="text-neo-accent">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <ShinyButton
                onClick={handleCheckout}
                className="w-full mb-4"
              >
                Proceder al Checkout
              </ShinyButton>

              <Link to="/shop">
                <button className="w-full text-center text-sm text-neutral-400 hover:text-white transition-colors">
                  Continuar comprando
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

