'use client';

import { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { recommendWigsFromDescription } from '@/ai/flows/recommend-wigs-from-description';
import { recommendWigsFromPhoto } from '@/ai/flows/recommend-wigs-from-photo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export default function RecommenderForm() {
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [stylePreference, setStylePreference] = useState('');
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhoto(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDescriptionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) return;
    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const result = await recommendWigsFromDescription({ description });
      setRecommendations(result.recommendations);
    } catch (err) {
      setError('An error occurred while getting recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo) return;
    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const result = await recommendWigsFromPhoto({ photoDataUri: photo, stylePreference });
      setRecommendations(result.recommendations);
    } catch (err) {
      setError('An error occurred while analyzing the photo. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="description">By Description</TabsTrigger>
            <TabsTrigger value="photo">By Photo</TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <form onSubmit={handleDescriptionSubmit} className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="description">Describe your ideal wig</Label>
                <Textarea
                  id="description"
                  placeholder="e.g., 'a long, wavy brunette wig for a round face' or 'something professional and chic'"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
                <p className="text-sm text-muted-foreground">
                  Include details like style, color, length, and your face shape if you know it.
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Get Recommendations
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="photo">
            <form onSubmit={handlePhotoSubmit} className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="photo">Upload a photo of yourself</Label>
                <Input id="photo" type="file" accept="image/*" onChange={handlePhotoUpload} />
                <p className="text-sm text-muted-foreground">
                  For best results, use a clear, front-facing photo in good lighting.
                </p>
              </div>
              {photo && <img src={photo} alt="Preview" className="w-32 h-32 object-cover rounded-lg mx-auto" />}
              <div className="space-y-2">
                <Label htmlFor="style">Style preferences (optional)</Label>
                <Input
                  id="style"
                  placeholder="e.g., 'I like bold colors' or 'something for everyday wear'"
                  value={stylePreference}
                  onChange={(e) => setStylePreference(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading || !photo}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Analyze Photo & Recommend
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        
        {isLoading && (
          <div className="text-center mt-8">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-muted-foreground">Our AI is working its magic...</p>
          </div>
        )}

        {error && (
            <Alert variant="destructive" className="mt-6">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {recommendations.length > 0 && !isLoading && (
          <div className="mt-8">
            <h3 className="text-2xl font-headline mb-4">Your AI Recommendations</h3>
            <div className="grid gap-4">
              {recommendations.map((rec, index) => (
                <Card key={index} className="bg-secondary/50">
                  <CardContent className="p-4">
                    <p className="font-medium">{rec}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
