
import React from 'react';

interface PageTitleProps {
  title: string;
  subtitle: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-dark dark:text-light tracking-tight">{title}</h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>
    </div>
  );
};

export default PageTitle;