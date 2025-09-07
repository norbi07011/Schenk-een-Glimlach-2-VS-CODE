import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
  const baseClasses = 'font-bold text-white py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 hover:brightness-110 focus-ring';
  
  const variantClasses = {
    primary: 'bg-gradient-to-br from-primary to-cyan-500 glow-shadow-primary',
    secondary: 'bg-gradient-to-br from-secondary to-sky-600 glow-shadow-secondary',
    accent: 'bg-gradient-to-br from-accent to-fuchsia-500 glow-shadow-accent',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;