'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Response } from '@/components/ui/response';
import { Reasoning, ReasoningTrigger, ReasoningContent } from '@/components/ui/reasoning';
import { UserIcon, BotIcon } from 'lucide-react';

export interface MessageProps {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  isStreaming?: boolean;
  reasoning?: string;
  sources?: Array<{
    ticketId: string;
    relevanceScore: number;
    matchedContent: string;
  }>;
}

export const Message = ({ 
  content, 
  isUser, 
  timestamp, 
  isStreaming = false,
  reasoning,
  sources 
}: MessageProps) => {
  return (
    <div className={cn(
      'flex gap-3 mb-6',
      isUser ? 'flex-row-reverse' : 'flex-row'
    )}>
      {/* Avatar */}
      <Avatar className="w-8 h-8 shrink-0">
        <AvatarFallback className={cn(
          isUser 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-muted text-muted-foreground'
        )}>
          {isUser ? <UserIcon className="w-4 h-4" /> : <BotIcon className="w-4 h-4" />}
        </AvatarFallback>
      </Avatar>

      {/* Message Content */}
      <div className={cn(
        'flex-1 max-w-[80%]',
        isUser ? 'text-right' : 'text-left'
      )}>
        {/* Message Bubble */}
        <div className={cn(
          'rounded-lg px-4 py-3 text-sm',
          isUser 
            ? 'bg-primary text-primary-foreground ml-auto' 
            : 'bg-muted text-foreground'
        )}>
          {isUser ? (
            <p className="whitespace-pre-wrap">{content}</p>
          ) : (
            <>
              {/* AI Reasoning (if available) */}
              {reasoning && (
                <Reasoning isStreaming={isStreaming} className="mb-3">
                  <ReasoningTrigger />
                  <ReasoningContent>{reasoning}</ReasoningContent>
                </Reasoning>
              )}
              
              {/* AI Response */}
              <Response>
                <div className="whitespace-pre-wrap">{content}</div>
              </Response>

              {/* Sources (if available) */}
              {sources && sources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border/50">
                  <p className="text-xs text-muted-foreground mb-2">Źródła:</p>
                  <div className="space-y-1">
                    {sources.map((source, index) => (
                      <div key={index} className="text-xs text-muted-foreground">
                        <span className="font-medium">Zgłoszenie {source.ticketId}</span>
                        <span className="ml-2">({Math.round(source.relevanceScore * 100)}% dopasowania)</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Timestamp */}
        <p className={cn(
          'text-xs text-muted-foreground mt-1',
          isUser ? 'text-right' : 'text-left'
        )}>
          {timestamp.toLocaleTimeString('pl-PL', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>
    </div>
  );
};
