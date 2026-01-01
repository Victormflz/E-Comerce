import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-neutral-950 py-12 px-6">
      <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-neo-accent shadow-lg shadow-neo-accent/50"></div>
          <span className="text-lg font-bold text-white">NeoHogar</span>
        </div>
        
        <div className="flex gap-8 text-sm text-neutral-500">
          <a href="#" className="hover:text-neo-accent transition-colors">Términos</a>
          <a href="#" className="hover:text-neo-accent transition-colors">Privacidad</a>
          <a href="#" className="hover:text-neo-accent transition-colors">Soporte</a>
        </div>
        
        <p className="text-xs text-neutral-600">
          © 2024 NeoHogar Inc. Diseñado para el futuro.
        </p>
      </div>
    </footer>
  );
};