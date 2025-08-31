'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface TicketCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

export const TicketCard = ({ icon, title, description, onClick }: TicketCardProps) => {
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};
