// src/app/shop/[id]/page.tsx
import ProductView from './product-view';

// 1. This function runs at BUILD TIME on the server
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
    { id: '10' }
  ];
}

// 2. The Page component itself just renders your client view
export default async function Page() {
  // We don't need to pass params here because ProductView uses useParams() internally
  return <ProductView />;
}