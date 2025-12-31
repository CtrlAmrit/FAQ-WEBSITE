import Link from 'next/link';
import { faqData } from '@/lib/data';

export default function HomePage() {
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
        </header>

        <main className="categories-grid">
          {faqData.categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/faq?category=${category.id}`}
              className="category-card group"
              aria-label={`Browse questions about ${category.title}`}
            >
              <div className="category-icon">
                {category.icon}
              </div>
              <div className="category-content">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
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
