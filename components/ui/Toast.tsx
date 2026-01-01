import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'info';
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'success', 
  duration = 3000,
  onClose 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-24 right-6 z-[100] animate-slide-in">
      <div className={`flex items-center gap-3 rounded-full px-6 py-4 shadow-2xl backdrop-blur-md border ${
        type === 'success' 
          ? 'bg-green-500/20 border-green-500/30 text-green-400' 
          : 'bg-blue-500/20 border-blue-500/30 text-blue-400'
      }`}>
        <CheckCircle className="h-5 w-5" />
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 rounded-full p-1 hover:bg-white/10 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

