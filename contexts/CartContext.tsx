import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../data/products';

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, showNotification?: (message: string, type?: 'success' | 'info') => void) => void;
  removeFromCart: (productId: string, showNotification?: (message: string, type?: 'success' | 'info') => void) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: (showNotification?: (message: string, type?: 'success' | 'info') => void) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, showNotification?: (message: string, type?: 'success' | 'info') => void) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Si ya existe, incrementar cantidad
        const updatedItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        if (showNotification) {
          showNotification(`${product.name} añadido (x${existingItem.quantity + 1})`, 'success');
        }
        return updatedItems;
      } else {
        // Si no existe, añadir nuevo item
        if (showNotification) {
          showNotification(`${product.name} añadido al carrito`, 'success');
        }
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string, showNotification?: (message: string, type?: 'success' | 'info') => void) => {
    setCartItems(prevItems => {
      const item = prevItems.find(i => i.id === productId);
      if (item && showNotification) {
        showNotification(`${item.name} eliminado del carrito`, 'info');
      }
      return prevItems.filter(item => item.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = (showNotification?: (message: string, type?: 'success' | 'info') => void) => {
    setCartItems([]);
    if (showNotification) {
      showNotification('Carrito vaciado', 'info');
    }
  };

  const getTotalItems = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = (): number => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

