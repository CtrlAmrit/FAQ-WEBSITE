'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { faqData, type CategoryId } from '@/lib/data';
import { useSearchParams } from 'next/navigation';

export function FAQList() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const categoryId = categoryParam as CategoryId;
  const [activeId, setActiveId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const category = faqData.categories.find(c => c.id === categoryId);
  const questions = categoryId ? (faqData.questions[categoryId] || []) : [];

  const filteredQuestions = useMemo(() => {
    if (!searchQuery.trim()) return questions;
    const query = searchQuery.toLowerCase();
    return questions.filter(
      (q) =>
        q.question.toLowerCase().includes(query) ||
        q.answer.toLowerCase().includes(query)
    );
  }, [questions, searchQuery]);

  useEffect(() => {
    if (category) {
      document.title = `${category.title} FAQ | Help Center`;
    } else {
      document.title = 'FAQ | Help Center';
    }
  }, [category]);

  const toggleAccordion = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

    if (!categoryParam || !category) {
      return (
        <div className="container mx-auto px-4 py-20 text-center max-w-2xl">
          <Link href="/" className="back-link mb-8 inline-flex">
            ← Back to Categories
          </Link>
          <div className="bg-muted/30 rounded-2xl p-8 border border-dashed">
            <h2 className="text-3xl font-bold mb-4">Oops! Category Not Found</h2>
            <p className="text-xl text-muted-foreground mb-8">
              The FAQ category you're looking for doesn't exist or may have been moved.
            </p>
            <Link 
              href="/" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Browse All Categories
            </Link>
          </div>
        </div>
      );
    }
  
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Link href="/" className="back-link group">
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          Back to Categories
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-3 tracking-tight text-foreground">{category.title} FAQ</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {category.description} Find everything you need to know about {category.title.toLowerCase()}.
          </p>
        </header>

        {/* Search Input */}
        <div className="relative mb-10">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder={`Search ${category.title} questions...`}
            className="w-full pl-11 pr-4 py-3.5 bg-card border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/50 transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="faq-list">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q) => (
              <div 
                key={q.id} 
                className={`faq-item ${activeId === q.id ? 'active' : ''}`}
              >
                  <button 
                    className="faq-question group"
                    onClick={() => toggleAccordion(q.id)}
                    aria-expanded={activeId === q.id}
                    aria-controls={`answer-${q.id}`}
                    id={`question-${q.id}`}
                  >
                    <span className="flex-1">{q.question}</span>
                    <div className="icon-wrapper w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center transition-colors group-hover:bg-primary/10">
                      <svg 
                        className="icon w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2.5} 
                          d="M19 9l-7 7-7-7" 
                        />
                      </svg>
                    </div>
                  </button>
                  <div 
                    className="faq-answer"
                    id={`answer-${q.id}`}
                    role="region"
                    aria-labelledby={`question-${q.id}`}
                  >
                    <div className="faq-answer-inner">
                      <div className="faq-answer-content">
                        {q.answer}
                      </div>
                    </div>
                  </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-muted/5 rounded-3xl border border-dashed border-border/60">
              <div className="mb-5 text-5xl opacity-50">🔍</div>
              <h3 className="text-xl font-bold mb-2">No matching results</h3>
              <p className="text-muted-foreground max-w-xs mx-auto mb-8">
                We couldn't find any questions matching your search for "{searchQuery}".
              </p>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="px-6 py-2.5 bg-primary/10 text-primary font-semibold rounded-full hover:bg-primary/20 transition-colors"
                >
                  Clear search query
                </button>
              )}
            </div>
          )}
        </div>

        <div className="mt-16 pt-8 border-t border-border/50 text-center">
          <p className="text-muted-foreground text-sm">
            Still need help? <button className="text-primary font-semibold hover:underline">Contact our support team</button>
          </p>
        </div>
      </div>
    );
}
