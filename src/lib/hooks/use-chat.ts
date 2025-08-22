"use client";

import { useState } from 'react';
import type { Message } from '@/lib/types';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = { id: crypto.randomUUID(), role: 'user', content };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: currentMessages }),
      });

      if (!response.body) {
        throw new Error('The response body is empty.');
      }
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantResponse = '';
      const assistantMessageId = crypto.randomUUID();

      setMessages(prev => [...prev, { id: assistantMessageId, role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantResponse += decoder.decode(value, { stream: true });
        setMessages(prev => prev.map(msg => 
          msg.id === assistantMessageId ? { ...msg, content: assistantResponse } : msg
        ));
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: "Sorry, I encountered an error. Please try again."
      };
      setMessages(prev => [...prev.slice(0, -1), errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([]);
  };

  return { messages, isLoading, sendMessage, resetChat };
}
