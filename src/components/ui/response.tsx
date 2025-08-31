'use client';

import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

export type ResponseProps = ComponentProps<'div'>;

export const Response = ({ className, children, ...props }: ResponseProps) => {
  return (
    <div
      className={cn(
        'prose prose-sm max-w-none dark:prose-invert',
        'prose-headings:font-semibold prose-headings:text-foreground',
        'prose-p:text-foreground prose-p:leading-relaxed',
        'prose-pre:bg-muted prose-pre:border prose-pre:border-border',
        'prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none',
        'prose-strong:text-foreground prose-strong:font-semibold',
        'prose-ul:text-foreground prose-ol:text-foreground',
        'prose-li:text-foreground prose-li:marker:text-muted-foreground',
        'prose-blockquote:text-muted-foreground prose-blockquote:border-l-border',
        'prose-hr:border-border',
        'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
