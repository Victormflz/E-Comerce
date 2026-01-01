import React from 'react';

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = "relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-neo-accent focus:ring-offset-2 focus:ring-offset-neutral-950 transition-transform active:scale-95 shadow-lg hover:shadow-xl hover:shadow-neo-accent/20";
  
  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      {/* Animated Gradient Border */}
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      
      {/* Inner Button Content */}
      <span className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full px-8 py-1 text-sm font-medium backdrop-blur-3xl transition-colors 
        ${variant === 'primary' 
          ? 'bg-neutral-950 text-white hover:bg-neutral-900' 
          : 'bg-white text-black hover:bg-neutral-200'
        }`}>
        {children}
      </span>
    </button>
  );
};