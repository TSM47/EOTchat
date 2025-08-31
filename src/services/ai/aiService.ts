import { AIQuery, AIResponse, Ticket, TicketSource } from '@/types';
import { GeminiService } from './geminiService';

export class AIService {
  private static instance: AIService;
  private apiEndpoint: string;
  private geminiService: GeminiService;

  private constructor() {
    this.apiEndpoint = process.env.NEXT_PUBLIC_AI_API_ENDPOINT || '/api/ai';
    this.geminiService = GeminiService.getInstance();
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async queryTickets(query: string, tickets: Ticket[] = []): Promise<AIResponse> {
    try {
      // Try Gemini first (local processing)
      if (process.env.GOOGLE_GEMINI_API_KEY) {
        return await this.geminiService.analyzeTicketQuery(query, tickets);
      }

      // Fallback to API endpoint
      const aiQuery: AIQuery = {
        id: this.generateId(),
        query,
        timestamp: new Date(),
      };

      const response = await fetch(`${this.apiEndpoint}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(aiQuery),
      });

      if (!response.ok) {
        throw new Error(`AI service error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error querying AI service:', error);
      throw error;
    }
  }

  async findSimilarTickets(query: string, tickets: Ticket[] = []): Promise<TicketSource[]> {
    try {
      // Try Gemini first (local processing)
      if (process.env.GOOGLE_GEMINI_API_KEY && tickets.length > 0) {
        return await this.geminiService.findSimilarTickets(query, tickets);
      }

      // Fallback to API endpoint
      const response = await fetch(`${this.apiEndpoint}/similar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`Similar tickets error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error finding similar tickets:', error);
      throw error;
    }
  }

  async analyzeTicketContent(content: string): Promise<{
    category: string;
    priority: string;
    suggestedTags: string[];
  }> {
    try {
      // Try Gemini first (local processing)
      if (process.env.GOOGLE_GEMINI_API_KEY) {
        const result = await this.geminiService.categorizeTicket(content);
        return {
          category: result.category,
          priority: result.priority,
          suggestedTags: result.suggestedTags
        };
      }

      // Fallback to API endpoint
      const response = await fetch(`${this.apiEndpoint}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error(`Content analysis error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error analyzing content:', error);
      throw error;
    }
  }

  async generateSolution(ticketDescription: string, similarTickets: Ticket[] = []): Promise<{
    solution: string;
    steps: string[];
    confidence: number;
    basedOnTickets: string[];
  }> {
    try {
      // Try Gemini first (local processing)
      if (process.env.GOOGLE_GEMINI_API_KEY) {
        return await this.geminiService.generateSolution(ticketDescription, similarTickets);
      }

      // Fallback - return basic response
      return {
        solution: 'Brak dostępnego rozwiązania. Skonfiguruj Gemini API lub zaimplementuj endpoint.',
        steps: ['Skontaktuj się z administratorem systemu'],
        confidence: 0.1,
        basedOnTickets: []
      };
    } catch (error) {
      console.error('Error generating solution:', error);
      throw error;
    }
  }

  private generateId(): string {
    return `ai_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
