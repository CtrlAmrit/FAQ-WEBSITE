import Link from 'next/link';
import { faqData } from '@/lib/data';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">Help & FAQs</h1>
        <p className="text-xl text-muted-foreground">Select a category to find the answers you need.</p>
      </header>

      <main className="categories-grid">
        {faqData.categories.map((category) => (
          <Link 
            key={category.id} 
            href={`/faq?category=${category.id}`}
            className="category-card group"
          >
            <div className="category-icon group-hover:bg-primary/10 transition-colors">
              {category.icon}
            </div>
            <div className="category-content">
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </div>
            <div className="category-arrow group-hover:translate-x-1">
              View Questions 
              <svg 
                className="ml-2 w-4 h-4" 
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
    </div>
  );
}
