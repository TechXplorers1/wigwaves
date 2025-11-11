'use server';
/**
 * @fileOverview An AI agent that recommends wigs based on a user-uploaded photo.
 *
 * - recommendWigsFromPhoto - A function that handles the wig recommendation process.
 * - RecommendWigsFromPhotoInput - The input type for the recommendWigsFromPhoto function.
 * - RecommendWigsFromPhotoOutput - The return type for the recommendWigsFromPhoto function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendWigsFromPhotoInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the user, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  stylePreference: z
    .string()
    .optional()
    .describe('Optional style preferences of the user.'),
});
export type RecommendWigsFromPhotoInput = z.infer<typeof RecommendWigsFromPhotoInputSchema>;

const RecommendWigsFromPhotoOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('An array of wig recommendations based on the user photo.'),
});
export type RecommendWigsFromPhotoOutput = z.infer<typeof RecommendWigsFromPhotoOutputSchema>;

export async function recommendWigsFromPhoto(
  input: RecommendWigsFromPhotoInput
): Promise<RecommendWigsFromPhotoOutput> {
  return recommendWigsFromPhotoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendWigsFromPhotoPrompt',
  input: {schema: RecommendWigsFromPhotoInputSchema},
  output: {schema: RecommendWigsFromPhotoOutputSchema},
  prompt: `You are a personal stylist specializing in wig recommendations.

  Based on the user's photo, determine their face shape, skin tone, and current hairstyle.
  Consider any style preferences they provide. Recommend wigs that would complement their features.

  Photo: {{media url=photoDataUri}}
  Style Preference: {{{stylePreference}}}

  Recommendations:`,
});

const recommendWigsFromPhotoFlow = ai.defineFlow(
  {
    name: 'recommendWigsFromPhotoFlow',
    inputSchema: RecommendWigsFromPhotoInputSchema,
    outputSchema: RecommendWigsFromPhotoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
