"use client";

import { useState, useRef, type FormEvent } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  isLoading: boolean;
  onSubmit: (content: string) => void;
}

export function ChatInput({ isLoading, onSubmit }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSubmit(input);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="relative">
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Ask me anything..."
        rows={1}
        className="w-full pr-12 resize-none max-h-48 bg-card"
        disabled={isLoading}
      />
      <Button
        type="submit"
        size="icon"
        className={cn(
          "absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full",
          "bg-accent hover:bg-accent/90 text-accent-foreground"
        )}
        disabled={isLoading || !input.trim()}
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
    </form>
  );
}
