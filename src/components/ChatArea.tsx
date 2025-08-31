'use client';

import React from 'react';
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
  PromptInputButton,
} from '@/components/ui/prompt-input';
import { RippleButton } from '@/components/ui/ripple-button';
import { TicketCard } from '@/components/TicketCard';
import { IconBadge } from '@/components/IconBadge';
import { 
  WarningIcon, 
  TagIcon, 
  MoonIcon, 
  ClockIcon, 
  SendIcon,
  ClipboardIcon,
  ImageIcon,
  CopyIcon,
  SearchIcon
} from '@/components/ui/icons';
import { Skeleton } from '@/components/ui/skeleton';
import { TicketCategory } from '@/types';
import LightRays from '@/components/LightRays';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const ChatArea = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  
  const ticketCards = [
    {
      icon: <MoonIcon />,
      title: "Zgłoszenia Popołudniowe",
      description: "Zgłoszenia do realizacji na nocnych i popołudniowych zmianach",
      category: TicketCategory.AFTERNOON
    },
    {
      icon: <ClockIcon />,
      title: "Zgłoszenia Długofalowe", 
      description: "Zgłoszenia wymagające dłuższego czasu realizacji ze względu na złożoność lub oczekiwanie",
      category: TicketCategory.LONG_TERM
    },
    {
      icon: <WarningIcon />,
      title: "Zgłoszenia Zaległe",
      description: "Zgłoszenia zalegające w systemie lub wymagające weryfikacji",
      category: TicketCategory.OVERDUE
    }
  ];

  const handleCardClick = (category: TicketCategory) => {
    console.log(`Clicked on category: ${category}`);
    // TODO: Implement category filtering
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-background h-full relative">
      <LightRays
        raysOrigin="top-center"
        raysColor="#ffffff"
        raysSpeed={1.5}
        lightSpread={1.2}
        rayLength={2.5}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
        className="absolute inset-0 pointer-events-none"
      />
                  {/* Top Right Buttons */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              {/* Info Button */}
              <button 
                className="w-12 h-10 text-sm text-white rounded-md transition-colors cursor-pointer flex items-center justify-center hover:brightness-110" 
                style={{backgroundColor: '#181818', borderColor: '#2E2E2E', borderWidth: '1px', borderStyle: 'solid'}}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              
              {/* Login Button */}
              <button className="px-4 py-2 text-sm font-bold bg-orange-600 hover:bg-orange-700 text-white rounded-md border border-orange-500 transition-colors cursor-pointer flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.16l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.16l2.44 7.51 1.22 3.78a.84.84 0 0 1-.3.94z"/>
                </svg>
                Zaloguj się
              </button>
            </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 relative z-10">
        {/* Greeting */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <IconBadge 
              icon={<WarningIcon className="w-4 h-4 mr-1" />}
              text="Projekt w trakcie budowy"
              variant="outline"
            />
            <IconBadge 
              icon={<TagIcon className="w-4 h-4 mr-1" />}
              text="demo-preview"
              variant="secondary"
              className="bg-yellow-900 text-yellow-100 border-yellow-700"
            />
          </div>
          <h1 className="text-4xl font-bold mb-2">Asystent AI zgłoszeń firmy EOT</h1>
          <p className="text-xl text-muted-foreground">Asystent do pomocy przy rozwiązywaniu zgłoszeń.</p>
        </div>

        {/* Suggestion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-8">
          {isLoading ? (
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[80%]" />
                </div>
              </div>
            ))
          ) : (
            ticketCards.map((card, index) => (
              <TicketCard
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
                onClick={() => handleCardClick(card.category)}
              />
            ))
          )}
        </div>

        {/* Accordion Section */}
        <div className="max-w-4xl w-full -mt-2">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="common-problems">
              <AccordionTrigger className="text-left hover:no-underline">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-medium">Zestawienie często występujących problemów</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                                <div className="pt-4 space-y-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="w-full text-left p-3 border-l-4 border-l-blue-500 bg-card hover:bg-accent transition-colors cursor-pointer">
                        <span className="text-sm">Problem z nie działającymi drukarkami w karetce</span>
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Problem z nie działającymi drukarkami w karetce</DialogTitle>
                        <DialogDescription>
                          Szczegółowe informacje o rozwiązywaniu problemów z drukarkami w karatkach...
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="w-full text-left p-3 border-l-4 border-l-green-500 bg-card hover:bg-accent transition-colors cursor-pointer">
                        <span className="text-sm">Problem z systemem nawigującym w automapie</span>
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Problem z systemem nawigującym w automapie</DialogTitle>
                        <DialogDescription>
                          Instrukcje dotyczące rozwiązywania problemów z nawigacją w automapie...
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="w-full text-left p-3 border-l-4 border-l-yellow-500 bg-card hover:bg-accent transition-colors cursor-pointer">
                        <span className="text-sm">Problem z uruchomieniem aplikacji Analityk</span>
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Problem z uruchomieniem aplikacji Analityk</DialogTitle>
                        <DialogDescription>
                          Kroki rozwiązywania problemów z uruchamianiem aplikacji Analityk...
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="w-full text-left p-3 border-l-4 border-l-red-500 bg-card hover:bg-accent transition-colors cursor-pointer">
                        <span className="text-sm">Problem wysyłania danych z defibrylatora EKG</span>
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Problem wysyłania danych z defibrylatora EKG</DialogTitle>
                        <DialogDescription>
                          Rozwiązywanie problemów z transmisją danych z defibrylatora EKG...
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="w-full text-left p-3 border-l-4 border-l-purple-500 bg-card hover:bg-accent transition-colors cursor-pointer">
                        <span className="text-sm">Problem z łącznością internetową w SWD PRM</span>
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Problem z łącznością internetową w SWD PRM</DialogTitle>
                        <DialogDescription>
                          Instrukcje diagnozowania i naprawy problemów z łącznością internetową...
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Email Methodology Section */}
        <div className="max-w-4xl w-full mt-1">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="email-methodology">
              <AccordionTrigger className="text-left hover:no-underline">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">Metodyka reagowania i odpowiadania na poszczególne maile</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Szczegółowe wytyczne dotyczące właściwego reagowania na różne typy wiadomości email...
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>


        {/* Systems Explanation Section */}
        <div className="max-w-4xl w-full mt-1">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="systems-explanation">
              <AccordionTrigger className="text-left hover:no-underline">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">Objaśnienie poszczególnych zdalnych pulpitów, systemów, aplikacji i innych</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Kompleksowy przewodnik po wszystkich systemach, aplikacjach i narzędziach używanych w organizacji...
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>


      </div>

      {/* Input Area */}
      <div className="p-4 pb-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <PromptInput>
            <PromptInputTextarea placeholder="Opisz problem zgłoszenia z którym masz trudności..." />
            <PromptInputToolbar>
              <PromptInputTools>
                <PromptInputButton className="cursor-pointer">
                  <ClipboardIcon className="w-4 h-4 mr-2" />
                  Rodzaj zgłoszenia
                </PromptInputButton>
                <PromptInputButton className="cursor-pointer">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Załącz zrzut ekranu
                </PromptInputButton>
                <PromptInputButton className="cursor-pointer">
                  <CopyIcon className="w-4 h-4 mr-2" />
                  Podobne zgłoszenia
                </PromptInputButton>
                <PromptInputButton className="cursor-pointer">
                  <SearchIcon className="w-4 h-4 mr-2" />
                  Szukaj w sieci
                </PromptInputButton>
              </PromptInputTools>
              <RippleButton type="submit" className="px-3">
                <SendIcon />
              </RippleButton>
            </PromptInputToolbar>
          </PromptInput>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
