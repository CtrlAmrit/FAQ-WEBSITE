'use client';

import { useState } from 'react';
import Link from 'next/link';
import { faqData, type CategoryId } from '@/lib/data';
import { useSearchParams } from 'next/navigation';

export function FAQList() {
  const searchParams = useSearchParams();
  const categoryId = (searchParams.get('category') as CategoryId) || 'general';
  const [activeId, setActiveId] = useState<string | null>(null);

  const category = faqData.categories.find(c => c.id === categoryId);
  const questions = faqData.questions[categoryId] || [];

  const toggleAccordion = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  if (!category) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Category not found</h2>
        <Link href="/" className="text-primary hover:underline">Return to categories</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <Link href="/" className="back-link">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.8333 10H4.16667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 15.8333L4.16667 10L10 4.16663" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to Categories
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-3">{category.title} FAQ</h1>
        <p className="text-xl text-muted-foreground">{category.description}</p>
      </header>

      <div className="faq-list">
        {questions.length > 0 ? (
          questions.map((q) => (
            <div 
              key={q.id} 
              className={`faq-item ${activeId === q.id ? 'active' : ''}`}
            >
              <button 
                className="faq-question"
                onClick={() => toggleAccordion(q.id)}
                aria-expanded={activeId === q.id}
              >
                <span>{q.question}</span>
                <svg 
                  className="icon w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 9l-7 7-7-7" 
                  />
                </svg>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-content">
                  {q.answer}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-10 text-muted-foreground">No questions found for this category.</p>
        )}
      </div>
    </div>
  );
}
