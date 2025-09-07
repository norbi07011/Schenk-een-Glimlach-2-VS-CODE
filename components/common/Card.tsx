import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`aurora-border rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <div className="bg-dark/80 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default Card;