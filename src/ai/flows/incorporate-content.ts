'use server';

/**
 * @fileOverview A flow that uses Gemini to incorporate relevant links, citations, and lists into its responses.
 *
 * - incorporateContent - A function that handles the content incorporation process.
 * - IncorporateContentInput - The input type for the incorporateContent function.
 * - IncorporateContentOutput - The return type for the incorporateContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IncorporateContentInputSchema = z.object({
  query: z.string().describe('The user query to generate a response for.'),
});
export type IncorporateContentInput = z.infer<typeof IncorporateContentInputSchema>;

const IncorporateContentOutputSchema = z.object({
  response: z.string().describe('The response from Gemini, incorporating relevant links, citations, and lists.'),
});
export type IncorporateContentOutput = z.infer<typeof IncorporateContentOutputSchema>;

export async function incorporateContent(input: IncorporateContentInput): Promise<IncorporateContentOutput> {
  return incorporateContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'incorporateContentPrompt',
  input: {schema: IncorporateContentInputSchema},
  output: {schema: IncorporateContentOutputSchema},
  prompt: `You are an AI assistant that provides comprehensive and informative answers to user queries.

  When relevant, incorporate links, citations, and lists into your responses to enhance their quality and usefulness.

  User query: {{{query}}}`,
});

const incorporateContentFlow = ai.defineFlow(
  {
    name: 'incorporateContentFlow',
    inputSchema: IncorporateContentInputSchema,
    outputSchema: IncorporateContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
