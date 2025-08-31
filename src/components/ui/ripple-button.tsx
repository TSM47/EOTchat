'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RippleButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
}

export const RippleButton = ({ children, className, onClick, ...props }: RippleButtonProps) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newRipple = {
      id: Date.now(),
      x,
      y,
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Button
      className={cn(
        'relative overflow-hidden bg-white text-black hover:bg-gray-100 border border-gray-300 shadow-sm',
        'px-8 py-2 mr-3 mb-2 rounded-lg font-medium transition-colors',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-gray-400 rounded-full animate-ping opacity-30"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            animationDuration: '600ms',
          }}
        />
      ))}
    </Button>
  );
};
