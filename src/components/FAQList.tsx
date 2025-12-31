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
  const [viewedIds, setViewedIds] = useState<string[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

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

  // Load state from localStorage on mount and when category changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedActiveId = localStorage.getItem(`active_question_${categoryId}`);
      const savedViewedIds = localStorage.getItem('viewed_questions');

      if (savedViewedIds) {
        setViewedIds(JSON.parse(savedViewedIds));
      }

      if (savedActiveId) {
        setActiveId(savedActiveId);
      } else if (questions.length > 0) {
        setActiveId(questions[0].id);
      }
      
      if (categoryId) {
        localStorage.setItem('last_category', categoryId);
      }
      setIsInitialLoad(false);
    }
  }, [categoryId]);

  // Handle search expansion - only if user is actively searching
  useEffect(() => {
    if (!isInitialLoad && searchQuery && filteredQuestions.length > 0) {
      setActiveId(filteredQuestions[0].id);
    }
  }, [searchQuery, filteredQuestions, isInitialLoad]);

  useEffect(() => {
    if (category) {
      document.title = `${category.title} FAQ | Help Center`;
    } else {
      document.title = 'FAQ | Help Center';
    }
  }, [category]);

  const toggleAccordion = (id: string) => {
    const newActiveId = activeId === id ? null : id;
    setActiveId(newActiveId);
    
    if (newActiveId) {
      localStorage.setItem(`active_question_${categoryId}`, newActiveId);
      if (!viewedIds.includes(newActiveId)) {
        const nextViewed = [...viewedIds, newActiveId];
        setViewedIds(nextViewed);
        localStorage.setItem('viewed_questions', JSON.stringify(nextViewed));
      }
    } else {
      localStorage.removeItem(`active_question_${categoryId}`);
    }
  };

  if (!categoryParam || !category) {
    return (
      <div className="min-h-screen py-12 px-4 md:py-20">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-border p-8 md:p-12 text-center">
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
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 md:py-20">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-border p-6 md:p-12">
        <Link href="/" className="back-link group">
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          Back to Categories
        </Link>

        <header className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-3">
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground">{category.title}</h1>
            <div className="text-sm font-medium text-muted-foreground bg-muted/50 px-3 py-1 rounded-full border border-border/50">
              Showing {filteredQuestions.length} of {questions.length} questions
            </div>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {category.description} Find everything you need to know about {category.title.toLowerCase()} in our knowledge base.
          </p>
        </header>

        {/* Search Input */}
        <div className="relative mb-12">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder={`Search ${category.title} questions...`}
            className="w-full pl-11 pr-4 py-4 bg-muted/20 border border-border/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all text-base placeholder:text-muted-foreground/40"
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
                className={`faq-item group/item ${activeId === q.id ? 'active' : ''} ${viewedIds.includes(q.id) && activeId !== q.id ? 'opacity-80' : ''}`}
              >
                <button 
                  className="faq-question"
                  onClick={() => toggleAccordion(q.id)}
                  aria-expanded={activeId === q.id}
                  aria-controls={`answer-${q.id}`}
                  id={`question-${q.id}`}
                >
                  <span className="flex items-center gap-3 flex-1 pr-4">
                    {viewedIds.includes(q.id) && (
                      <span className="text-primary/60 text-xs shrink-0" title="Recently viewed">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                    <span className="line-clamp-2">{q.question}</span>
                  </span>
                  <div className="icon-wrapper w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center transition-all group-hover/item:bg-primary/10 group-hover/item:text-primary">
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
                    <div className="faq-answer-content pl-11 pr-6 pb-6 text-muted-foreground/80 font-normal border-l-2 border-primary/5 ml-5 md:ml-6">
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
                  className="px-6 py-2.5 bg-primary text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
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
    </div>
  );
}
