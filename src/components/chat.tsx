import type { Message } from '@/lib/types';
import { ChatMessages } from './chat-messages';
import { ChatInput } from './chat-input';

interface ChatProps {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (content: string) => void;
}

export function Chat({ messages, isLoading, sendMessage }: ChatProps) {
  return (
    <div className="flex flex-col h-full">
      <ChatMessages messages={messages} isLoading={isLoading} />
      <div className="p-4 bg-background/80 backdrop-blur-sm">
        <ChatInput isLoading={isLoading} onSubmit={sendMessage} />
      </div>
    </div>
  );
}
