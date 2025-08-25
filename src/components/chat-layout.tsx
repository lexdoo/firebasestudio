"use client";

import {
  Bot,
  Plus,
  Settings,
  User,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSeparator,
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar";
import { Chat } from "./chat";
import { useChat } from "@/lib/hooks/use-chat";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function ChatLayout() {
  const { messages, isLoading, sendMessage, resetChat } = useChat();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarFallback>
                <Bot />
              </AvatarFallback>
            </Avatar>
            <h1 className="font-semibold text-lg">GeminiChats</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={resetChat}
                tooltip="Start a new conversation"
              >
                <Plus />
                New Chat
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <Chat
          messages={messages}
          isLoading={isLoading}
          sendMessage={sendMessage}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
