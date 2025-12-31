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
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Link href="/" className="back-link">
          ← Back to Categories
        </Link>

      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-3">{category.title} FAQ</h1>
        <p className="text-xl text-muted-foreground">{category.description}</p>
      </header>

      {/* Search Input */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search questions..."
          className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="faq-list">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => (
            <div 
              key={q.id} 
              className={`faq-item ${activeId === q.id ? 'active' : ''}`}
            >
                <button 
                  className="faq-question"
                  onClick={() => toggleAccordion(q.id)}
                  aria-expanded={activeId === q.id}
                  aria-controls={`answer-${q.id}`}
                  id={`question-${q.id}`}
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
                <div 
                  className="faq-answer"
                  id={`answer-${q.id}`}
                  role="region"
                  aria-labelledby={`question-${q.id}`}
                >
                  <div className="faq-answer-content">
                    {q.answer}
                  </div>
                </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-muted/10 rounded-2xl border border-dashed border-border">
            <div className="mb-4 text-4xl">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No matching questions</h3>
            <p className="text-muted-foreground">
              We couldn't find any questions matching "{searchQuery}".
              <br />
              Try adjusting your search terms or clearing the filter.
            </p>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-6 text-primary font-medium hover:underline px-4 py-2 rounded-lg bg-primary/10 transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
