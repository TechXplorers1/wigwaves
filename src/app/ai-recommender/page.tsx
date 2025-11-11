import RecommenderForm from '@/components/ai/recommender-form';

export default function AiRecommenderPage() {
  return (
    <div className="container max-w-3xl py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-6xl font-headline tracking-tight">AI Wig Recommender</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Let our advanced AI help you find the perfect wig. Get personalized recommendations based on your unique features or desired style.
        </p>
      </div>
      <RecommenderForm />
    </div>
  );
}
