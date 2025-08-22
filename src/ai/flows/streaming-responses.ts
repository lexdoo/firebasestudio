// Streaming responses from Gemini.

'use server';

/**
 * @fileOverview A flow for streaming responses from Gemini.
 *
 * - streamContent - A function that streams content from Gemini.
 * - StreamContentInput - The input type for the streamContent function.
 * - StreamContentOutput - The return type for the streamContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StreamContentInputSchema = z.object({
  prompt: z.string().describe('The prompt to send to Gemini.'),
});

export type StreamContentInput = z.infer<typeof StreamContentInputSchema>;

const StreamContentOutputSchema = z.object({
  response: z.string().describe('The streaming response from Gemini.'),
});

export type StreamContentOutput = z.infer<typeof StreamContentOutputSchema>;

export async function streamContent(input: StreamContentInput) {
  return streamContentFlow(input);
}

const streamContentFlow = ai.defineFlow(
  {
    name: 'streamContentFlow',
    inputSchema: StreamContentInputSchema,
    outputSchema: StreamContentOutputSchema,
  },
  async input => {
    const {stream, response} = ai.generateStream({
      prompt: input.prompt,
    });

    let fullText = '';

    for await (const chunk of stream) {
      fullText += chunk.text;
    }

    await response;

    return {response: fullText};
  }
);
