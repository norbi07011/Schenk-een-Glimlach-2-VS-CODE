import React, { useState } from 'react';

interface AccordionItemProps {
  item: { title: string; content: string };
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, isOpen, onClick, index }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <h2>
        <button
          type="button"
          className="flex justify-between items-center w-full p-5 font-medium text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 focus-ring rounded-t-lg transition-colors duration-300"
          onClick={onClick}
          aria-expanded={isOpen}
          aria-controls={`accordion-content-${index}`}
          id={`accordion-title-${index}`}
        >
          <span>{item.title}</span>
          <svg
            className={`w-6 h-6 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </h2>
      <div
        id={`accordion-content-${index}`}
        role="region"
        aria-labelledby={`accordion-title-${index}`}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="p-5">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.content}</p>
        </div>
      </div>
    </div>
  );
};

interface AccordionProps {
  items: { title: string; content: string }[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open first item by default

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          index={index}
          item={item}
          isOpen={openIndex === index}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
