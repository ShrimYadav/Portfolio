import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'emerald' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#03151F] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none whitespace-nowrap cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5'
  };

  const variantStyles = {
    primary: 'bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 focus:ring-[#3B82F6]',
    emerald: 'bg-[#28E58B] hover:bg-[#22c55e] text-[#03151F] font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 focus:ring-[#28E58B]',
    secondary: 'bg-[#071E2B] hover:bg-[#0c2a3d] text-[#F5F7FA] border border-[#3B82F6]/20 hover:border-[#3B82F6]/40 focus:ring-[#3B82F6]',
    outline: 'bg-transparent hover:bg-white/5 text-[#F5F7FA] border border-white/15 hover:border-white/30 focus:ring-white/20',
    ghost: 'bg-transparent hover:bg-white/5 text-[#9CA8B5] hover:text-[#F5F7FA] focus:ring-white/10',
    danger: 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 focus:ring-red-500'
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
      ) : (
        icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
