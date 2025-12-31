import { Suspense } from 'react';
import { FAQList } from '@/components/FAQList';
import { faqData, type CategoryId } from '@/lib/data';
import { Metadata } from 'next';

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { category: categoryId } = await searchParams;
  const category = faqData.categories.find(c => c.id === categoryId);
  
  return {
    title: category ? `${category.title} FAQ | Help Center` : 'FAQ | Help Center',
    description: category ? category.description : 'Find answers to common questions.',
  };
}

export default function FAQPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-muted-foreground">Loading questions...</div>}>
      <FAQList />
    </Suspense>
  );
}
