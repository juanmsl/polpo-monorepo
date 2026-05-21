import React from 'react';

type SlideCardProps = {
  children: React.ReactNode;
  isOpen: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export const SlideCard = ({ children, isOpen, className = '', style = {} }: SlideCardProps) => {
  return (
    <section
      className={className}
      style={
        {
          overflow: 'hidden',
          height: isOpen ? 'auto' : 0,
          transition: 'height 300ms ease',
          interpolateSize: 'allow-keywords',
          ...style,
        } as React.CSSProperties
      }
    >
      {children}
    </section>
  );
};
