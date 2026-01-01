import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import { ShinyButton } from '../components/ui/ShinyButton';
import { ArrowLeft, CreditCard, MapPin, User } from 'lucide-react';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'El nombre es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    if (!formData.phone.trim()) newErrors.phone = 'El teléfono es requerido';
    if (!formData.address.trim()) newErrors.address = 'La dirección es requerida';
    if (!formData.city.trim()) newErrors.city = 'La ciudad es requerida';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'El código postal es requerido';
    if (!formData.country.trim()) newErrors.country = 'El país es requerido';
    
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'El número de tarjeta es requerido';
    } else if (formData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'El número de tarjeta debe tener 16 dígitos';
    }
    if (!formData.cardName.trim()) newErrors.cardName = 'El nombre en la tarjeta es requerido';
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'La fecha de expiración es requerida';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Formato: MM/AA';
    }
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'El CVV es requerido';
    } else if (formData.cvv.length < 3) {
      newErrors.cvv = 'El CVV debe tener 3 dígitos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast('Por favor, completa todos los campos correctamente', 'info');
      return;
    }

    if (cartItems.length === 0) {
      showToast('Tu carrito está vacío', 'info');
      navigate('/shop');
      return;
    }

    // Simular procesamiento de pago
    showToast('Procesando pago...', 'info');
    
    // Vaciar carrito y redirigir a success
    setTimeout(() => {
      clearCart();
      navigate('/success');
    }, 1000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ').substring(0, 19);
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({ ...prev, cardNumber: formatted }));
    if (errors.cardNumber) {
      setErrors(prev => ({ ...prev, cardNumber: '' }));
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setFormData(prev => ({ ...prev, expiryDate: value }));
    if (errors.expiryDate) {
      setErrors(prev => ({ ...prev, expiryDate: '' }));
    }
  };

  const total = getTotalPrice();
  const shipping = total > 150 ? 0 : 15;
  const finalTotal = total + shipping;

  if (cartItems.length === 0) {
    return (
      <section className="min-h-screen bg-neutral-950 py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center py-24">
            <h2 className="text-3xl font-bold text-white mb-4">Tu carrito está vacío</h2>
            <p className="text-neutral-400 mb-8">No hay productos para procesar el pago</p>
            <button
              onClick={() => navigate('/shop')}
              className="text-neo-accent hover:text-white transition-colors"
            >
              Volver a la tienda
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-neutral-950 py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <button
          onClick={() => navigate('/cart')}
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al carrito
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-white mb-8">Información de Pago</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Información de Contacto */}
              <div className="rounded-2xl bg-neutral-900/50 border border-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <User className="h-5 w-5 text-neo-accent" />
                  <h2 className="text-xl font-semibold text-white">Información de Contacto</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl bg-neutral-800 border ${
                        errors.fullName ? 'border-red-500' : 'border-white/10'
                      } text-white focus:outline-none focus:ring-2 focus:ring-neo-accent transition-all`}
                      placeholder="Juan Pérez"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl bg-neutral-800 border ${
                        errors.email ? 'border-red-500' : 'border-white/10'
                      } text-white focus:outline-none focus:ring-2 focus:ring-neo-accent transition-all`}
                      placeholder="juan@ejemplo.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl bg-neutral-800 border ${
                        errors.phone ? 'border-red-500' : 'border-white/10'
                      } text-white focus:outline-none focus:ring-2 focus:ring-neo-accent transition-all`}
                      placeholder="+34 600 000 000"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Dirección de Envío */}
              <div className="rounded-2xl bg-neutral-900/50 border border-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="h-5 w-5 text-neo-accent" />
                  <h2 className="text-xl font-semibold text-white">Dirección de Envío</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Dirección *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl bg-neutral-800 border ${
                        errors.address ? 'border-red-500' : 'border-white/10'
                      } text-white focus:outline-none focus:ring-2 focus:ring-neo-accent transition-all`}
                      placeholder="Calle Principal 123"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-400">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        Ciudad *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl bg-neutral-800 border ${
                          errors.city ? 'border-red-500' : 'border-white/10'
                        } text-white focus:outline-none focus:ring-2 focus:ring-neo-accent transition-all`}
                        placeholder="Madrid"
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-400">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        Código Postal *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl bg-neutral-800 border ${
                          errors.zipCode ? 'border-red-500' : 'border-white/10'
                        } text-white focus:outline-none focus:ring-2 focus:ring-neo-accent transition-all`}
                        placeholder="28001"
                      />
                      {errors.zipCode && (
                        <p className="mt-1 text-sm text-red-400">{errors.zipCode}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        País *
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl bg-neutral-800 border ${
                          errors.country ? 'border-red-500' : 'border-white/10'
                        } text-white focus:outline-none focus:ring-2 focus:ring-neo-accent transition-all`}
                        placeholder="España"
                      />
                      {errors.country && (
                        <p className="mt-1 text-sm text-red-400">{errors.country}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Información de Pago */}
              <div className="rounded-2xl bg-neutral-900/50 border border-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="h-5 w-5 text-neo-accent" />
                  <h2 className="text-xl font-semibold text-white">Información de Pago</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Número de Tarjeta *
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength={19}
                      className={`w-full px-4 py-3 rounded-xl bg-neutral-800 border ${
                        errors.cardNumber ? 'border-red-500' : 'border-white/10'
                      } text-white focus:outline-none focus:ring-2 focus:ring-neo-accent transition-all`}
                      placeholder="1234 5678 9012 3456"
                    />
                    {errors.cardNumber && (
                      <p className="mt-1 text-sm text-red-400">{errors.cardNumber}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Nombre en la Tarjeta *
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl bg-neutral-800 border ${
                        errors.cardName ? 'border-red-500' : 'border-white/10'
                      } text-white focus:outline-none focus:ring-2 focus:ring-neo-accent transition-all`}
                      placeholder="JUAN PEREZ"
                    />
                    {errors.cardName && (
                      <p className="mt-1 text-sm text-red-400">{errors.cardName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        Fecha de Expiración *
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleExpiryChange}
                        maxLength={5}
                        className={`w-full px-4 py-3 rounded-xl bg-neutral-800 border ${
                          errors.expiryDate ? 'border-red-500' : 'border-white/10'
                        } text-white focus:outline-none focus:ring-2 focus:ring-neo-accent transition-all`}
                        placeholder="MM/AA"
                      />
                      {errors.expiryDate && (
                        <p className="mt-1 text-sm text-red-400">{errors.expiryDate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        maxLength={3}
                        className={`w-full px-4 py-3 rounded-xl bg-neutral-800 border ${
                          errors.cvv ? 'border-red-500' : 'border-white/10'
                        } text-white focus:outline-none focus:ring-2 focus:ring-neo-accent transition-all`}
                        placeholder="123"
                      />
                      {errors.cvv && (
                        <p className="mt-1 text-sm text-red-400">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <ShinyButton
                type="submit"
                className="w-full py-4 text-lg"
              >
                Pagar y Finalizar Compra
              </ShinyButton>
            </form>
          </div>

          {/* Resumen del Pedido */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-2xl bg-neutral-900/50 border border-white/5 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-6">Resumen del Pedido</h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 pb-4 border-b border-white/10">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{item.name}</p>
                      <p className="text-xs text-neutral-400">Cantidad: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-neo-accent">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10">
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
                <div className="flex justify-between text-xl font-bold text-white pt-3 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-neo-accent">${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

