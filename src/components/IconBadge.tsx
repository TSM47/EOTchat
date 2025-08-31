'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface IconBadgeProps {
  icon: React.ReactNode;
  text: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
}

export const IconBadge = ({ icon, text, variant = "outline", className }: IconBadgeProps) => {
  return (
    <Badge variant={variant} className={cn(className)}>
      {icon}
      {text}
    </Badge>
  );
};
