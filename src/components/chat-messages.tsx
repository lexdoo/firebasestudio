"use client";

import { useEffect, useRef } from 'react';
import { Bot, User } from 'lucide-react';
import type { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Markdown } from './markdown';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);
  
  return (
    <div ref={scrollAreaRef} className="flex-1 overflow-y-auto p-4 space-y-6">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <Bot className="w-16 h-16 text-primary" />
          <h2 className="text-2xl font-semibold mt-4">Welcome to GeminiChats</h2>
          <p className="text-muted-foreground mt-2">Start a conversation by typing a message below.</p>
        </div>
      ) : (
        messages.map((message, index) => (
          <div key={message.id} className={cn('flex items-start gap-4', message.role === 'user' && 'justify-end')}>
            {message.role === 'assistant' && (
              <Avatar className="w-8 h-8">
                <AvatarFallback><Bot className="w-5 h-5" /></AvatarFallback>
              </Avatar>
            )}
            <div className={cn(
              'max-w-md p-3 rounded-lg shadow-sm',
              message.role === 'user' ? 'bg-primary/90 text-primary-foreground' : 'bg-card'
            )}>
              <Markdown content={message.content} />
              {isLoading && index === messages.length - 1 && message.role === 'assistant' && message.content === '' && (
                 <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-24 rounded-md" />
                 </div>
              )}
            </div>
            {message.role === 'user' && (
              <Avatar className="w-8 h-8">
                <AvatarFallback><User className="w-5 h-5" /></AvatarFallback>
              </Avatar>
            )}
          </div>
        ))
      )}
    </div>
  );
}
