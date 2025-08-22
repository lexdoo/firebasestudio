import { ai } from '@/ai/genkit';
import type { Message } from '@/lib/types';

function formatMessages(messages: Message[]): string {
    return messages
      .map((message) => `${message.role}: ${message.content}`)
      .join('\n');
}

export async function POST(req: Request) {
  try {
    console.log('API Key present:', !!process.env.GOOGLE_GENAI_API_KEY);
    
    const { messages } = (await req.json()) as { messages: Message[] };

    const lastMessage = messages[messages.length - 1];

    if (lastMessage.role !== 'user') {
      return new Response('Expected the last message to be from the user.', { status: 400 });
    }

    const systemPrompt = `You are a helpful AI assistant named Lexdoo. Your goal is to provide accurate and helpful responses. When relevant, incorporate links, citations, and lists into your responses to enhance their quality and usefulness. Always format your responses using markdown.`;
    
    const fullPrompt = `${systemPrompt}\n\nuser: ${lastMessage.content}`;

    const { stream } = await ai.generateStream({
      prompt: fullPrompt,
    });

    const customStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of stream) {
            if (chunk.text) {
              controller.enqueue(encoder.encode(chunk.text));
            }
          }
        } catch (streamError) {
          console.error('Stream error:', streamError);
          controller.enqueue(encoder.encode('Error generating response'));
        }
        controller.close();
      },
    });

    return new Response(customStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('[CHAT_API_ERROR]', error);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
