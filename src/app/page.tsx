'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { faqData } from '@/lib/data';

export default function HomePage() {
  const [lastCategory, setLastCategory] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLastCategory(localStorage.getItem('last_category'));
    }
  }, []);

  return (
    <div className="min-h-screen py-12 px-4 md:py-20">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm border border-border p-6 md:p-12">
        <header className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide uppercase bg-primary/5 text-primary rounded-full">
            Help Center
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-foreground">How can we help you?</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Search our knowledge base or browse by category to find answers to common questions.
          </p>
          {lastCategory && (
            <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-700">
              <Link 
                href={`/faq?category=${lastCategory}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary bg-primary/5 px-4 py-2 rounded-full border border-primary/10 hover:bg-primary/10 transition-colors"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Continue where you left off: <span className="font-bold">{faqData.categories.find(c => c.id === lastCategory)?.title}</span> →
              </Link>
            </div>
          )}
        </header>

        <main className="categories-grid">
          {faqData.categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/faq?category=${category.id}`}
              className={`category-card group ${lastCategory === category.id ? 'ring-2 ring-primary ring-offset-4 ring-offset-white' : ''}`}
              aria-label={`Browse questions about ${category.title}`}
            >
              <div className="category-icon">
                {category.icon}
              </div>
              <div className="category-content">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-foreground tracking-tight">{category.title}</h3>
                  {lastCategory === category.id && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded">Last Visited</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{category.description}</p>
              </div>
              <div className="category-arrow">
                Explore Questions
                <svg 
                  className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </div>
            </Link>
          ))}
        </main>

        <footer className="mt-20 text-center py-10 border-t border-border/50">
          <p className="text-muted-foreground mb-4">Can't find what you're looking for?</p>
          <button className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:opacity-90 transition-opacity">
            Contact Support
          </button>
        </footer>
      </div>
    </div>
  );
}
