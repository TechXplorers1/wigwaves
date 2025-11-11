'use server';
/**
 * @fileOverview A wig recommendation AI agent based on user description.
 *
 * - recommendWigsFromDescription - A function that handles the wig recommendation process.
 * - RecommendWigsFromDescriptionInput - The input type for the recommendWigsFromDescription function.
 * - RecommendWigsFromDescriptionOutput - The return type for the recommendWigsFromDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendWigsFromDescriptionInputSchema = z.object({
  description: z
    .string()
    .describe("A description of the desired wig style, color, and length."),
});
export type RecommendWigsFromDescriptionInput = z.infer<
  typeof RecommendWigsFromDescriptionInputSchema
>;

const RecommendWigsFromDescriptionOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of recommended wigs based on the description.'),
});
export type RecommendWigsFromDescriptionOutput = z.infer<
  typeof RecommendWigsFromDescriptionOutputSchema
>;

export async function recommendWigsFromDescription(
  input: RecommendWigsFromDescriptionInput
): Promise<RecommendWigsFromDescriptionOutput> {
  return recommendWigsFromDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendWigsFromDescriptionPrompt',
  input: {schema: RecommendWigsFromDescriptionInputSchema},
  output: {schema: RecommendWigsFromDescriptionOutputSchema},
  prompt: `You are an expert wig stylist. A user is describing their desired wig. Recommend a list of wigs that would be suitable for them, considering their desired style, color, and length. Return a list of wig names that match the description.

Description: {{{description}}}`,
});

const recommendWigsFromDescriptionFlow = ai.defineFlow(
  {
    name: 'recommendWigsFromDescriptionFlow',
    inputSchema: RecommendWigsFromDescriptionInputSchema,
    outputSchema: RecommendWigsFromDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
