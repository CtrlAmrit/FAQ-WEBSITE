import { Suspense } from 'react';
import { FAQList } from '@/components/FAQList';

export default function FAQPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-muted-foreground">Loading questions...</div>}>
      <FAQList />
    </Suspense>
  );
}
