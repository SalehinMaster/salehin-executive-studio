FAQAccordion.tsx
"use client";

import React, { useState } from 'react';
import { GlassCard } from './glass-card';

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 w-full">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <GlassCard key={index} className="overflow-hidden transition-all duration-300">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left p-5 flex justify-between items-center gap-4 font-medium text-lg text-white hover:text-purple-300 transition-colors"
            >
              <span>{item.question}</span>
              <span className={`transform transition-transform duration-300 text-purple-400 font-bold text-xl ${isOpen ? 'rotate-180' : ''}`}>
                ↓
              </span>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? 'max-h-[500px] border-t border-white/10' : 'max-h-0'
              }`}
            >
              <div className="p-5 text-gray-300 leading-relaxed text-base">
                {item.answer}
              </div>
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}