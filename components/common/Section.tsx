

import React, { ReactNode, forwardRef } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

// FIX: Update the Section component to forward refs.
// This allows attaching a ref to the Section component, which is needed in SponsorsPage.tsx to scroll to the form.
const Section = forwardRef<HTMLElement, SectionProps>(({ children, className = '', id }, ref) => {
  return (
    <section ref={ref} id={id} className={`py-16 sm:py-20 lg:py-24 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
});

Section.displayName = 'Section';

export default Section;
