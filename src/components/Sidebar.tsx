'use client';

import React from 'react';
// import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const Sidebar = () => {
  return (
    <Card className="w-full h-full border-none rounded-none bg-card overflow-hidden">
      <CardContent className="p-0 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="-mt-3.5">
          <div className="flex items-center justify-center">
            <img
              src="/img/eot-logo.png"
              alt="EOT Logo"
              width={120}
              height={40}
              className="object-contain"
            />
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Przeszukaj czat"
              className="pr-12"
            />
            <Badge variant="secondary" className="absolute right-2 top-1/2 -translate-y-1/2 text-xs">
              ⌘K
            </Badge>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <nav className="px-4">
            <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start cursor-pointer">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Strona Główna
            </Button>
            
            <Button variant="ghost" className="w-full justify-start cursor-pointer">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Baza Wiedzy
            </Button>
            
            <Button variant="ghost" className="w-full justify-start cursor-pointer">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Szukaj
            </Button>
            
            <Button variant="ghost" className="w-full justify-start cursor-pointer">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Historia
            </Button>

                               <Collapsible>
                     <CollapsibleTrigger asChild>
                       <Button variant="ghost" className="w-full justify-between cursor-pointer">
                         <div className="flex items-center">
                           <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                           </svg>
                           Poczta
                         </div>
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                         </svg>
                       </Button>
                     </CollapsibleTrigger>
                     <CollapsibleContent className="pl-6">
                       <div className="space-y-1">
                         <Button variant="ghost" size="sm" className="w-full justify-start cursor-pointer">
                           Helpdesk
                         </Button>
                         <Button variant="ghost" size="sm" className="w-full justify-start cursor-pointer">
                           Pogotowie
                         </Button>
                       </div>
                     </CollapsibleContent>
                   </Collapsible>
          </div>
          
          <Separator className="my-4" />
          
          {/* Links Section */}
          <div className="space-y-1 max-h-64 overflow-y-auto">
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between cursor-pointer">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Odnośniki WSPR
                  </div>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>
              </CollapsibleTrigger>
                                   <CollapsibleContent className="pl-6">
                       <div className="space-y-1">
                         <Button variant="ghost" size="sm" className="w-full justify-start cursor-pointer">
                           Chmura KCMRM
                         </Button>
                         <Button variant="ghost" size="sm" className="w-full justify-start cursor-pointer">
                           System ITSM
                         </Button>
                         <Button variant="ghost" size="sm" className="w-full justify-start cursor-pointer">
                           Raportowanie
                         </Button>
                         <Button variant="ghost" size="sm" className="w-full justify-start cursor-pointer">
                           phpMyAdmin
                         </Button>
                         <Button variant="ghost" size="sm" className="w-full justify-start cursor-pointer">
                           Helpdesk KCMRM
                         </Button>
                       </div>
                     </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between cursor-pointer">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Odnośniki EOT
                  </div>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>
              </CollapsibleTrigger>
                                   <CollapsibleContent className="pl-6">
                       <div className="space-y-1">
                         <Button variant="ghost" size="sm" className="w-full justify-start cursor-pointer">
                           System GLPI
                         </Button>
                         <Button variant="ghost" size="sm" className="w-full justify-start cursor-pointer">
                           Zabbix
                         </Button>
                         <Button variant="ghost" size="sm" className="w-full justify-start cursor-pointer">
                           PassDB
                         </Button>
                         <Button variant="ghost" size="sm" className="w-full justify-start cursor-pointer">
                           Wazuh EOT
                         </Button>
                         <Button variant="ghost" size="sm" className="w-full justify-start cursor-pointer">
                           3CX Admin
                         </Button>
                         <Button variant="ghost" size="sm" className="w-full justify-start cursor-pointer">
                           Microsoft Admin
                         </Button>
                         <Button variant="ghost" size="sm" className="w-full justify-start cursor-pointer">
                           Programy
                         </Button>
                       </div>
                     </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between cursor-pointer">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Odnośniki MP
                  </div>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-6">
                <div className="space-y-1">
                  <Button variant="ghost" size="sm" className="w-full justify-start cursor-pointer">
                    Serwer drukowania
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start cursor-pointer">
                    Programy
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start cursor-pointer">
                    Inne
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start cursor-pointer">
                    Microsoft Admin
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between cursor-pointer">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Odnośniki L2
                  </div>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-6">
                <div className="space-y-1">
                  <Button variant="ghost" size="sm" className="w-full justify-start cursor-pointer">
                    Wazuh EOT
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start cursor-pointer">
                    Zabbix
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start cursor-pointer">
                    Atlas
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start cursor-pointer">
                    Emaile
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start cursor-pointer">
                    AlertingEOT
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start cursor-pointer">
                    AlertingWSPR
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start cursor-pointer">
                    MacierzeWSPR
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>
            </div>
          </nav>
        </div>

        {/* System Button */}
        <div className="px-4 pb-4">
          <Button variant="outline" className="w-full text-sm cursor-pointer" size="sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            System ticketowania
          </Button>
        </div>

        {/* Create Report Button */}
        <div className="px-4 pb-2">
          <Button 
            className="w-full cursor-pointer" 
            size="lg"
            onClick={() => toast.success("Nowe zgłoszenie zostało utworzone!", {
              description: "Możesz teraz opisać swój problem w głównym oknie czatu."
            })}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Utwórz zgłoszenie
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Sidebar;
