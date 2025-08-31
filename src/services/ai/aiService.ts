import { AIQuery, AIResponse, Ticket, TicketSource } from '@/types';

export class AIService {
  private static instance: AIService;
  private apiEndpoint: string;

  private constructor() {
    this.apiEndpoint = process.env.NEXT_PUBLIC_AI_API_ENDPOINT || '/api/ai';
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async queryTickets(query: string): Promise<AIResponse> {
    try {
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

  async findSimilarTickets(query: string): Promise<TicketSource[]> {
    try {
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

  private generateId(): string {
    return `ai_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
