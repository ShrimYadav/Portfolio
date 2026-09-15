import React from 'react';

interface SectionHeadingProps {
  category?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  category,
  title,
  description,
  align = 'left',
  className = ''
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-3xl'} ${className}`}>
      {category && (
        <div className="flex items-center gap-2 mb-3 text-xs font-mono font-medium tracking-wider text-[#28E58B] uppercase">
          <span className="w-2 h-2 rounded-full bg-[#28E58B]/80 animate-pulse" />
          <span>{category}</span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F5F7FA] leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-[#9CA8B5] leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  );
};
