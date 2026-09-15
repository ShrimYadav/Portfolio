import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'blue' | 'purple' | 'neutral' | 'outline' | 'warning';
  size?: 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
  icon
}) => {
  const base = 'inline-flex items-center font-medium rounded-full whitespace-nowrap transition-colors';
  const sizes = {
    sm: 'text-[11px] px-2.5 py-0.5 gap-1',
    md: 'text-xs px-3 py-1 gap-1.5'
  };

  const variants = {
    emerald: 'bg-[#28E58B]/10 text-[#28E58B] border border-[#28E58B]/25',
    blue: 'bg-[#3B82F6]/10 text-[#60A5FA] border border-[#3B82F6]/25',
    purple: 'bg-[#7B35FF]/10 text-[#C084FC] border border-[#7B35FF]/25',
    neutral: 'bg-white/5 text-[#9CA8B5] border border-white/10',
    outline: 'bg-transparent text-[#9CA8B5] border border-white/15',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/25'
  };

  return (
    <span className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
