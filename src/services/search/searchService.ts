import { Ticket, SearchResult, SearchFilters, TicketStatus, TicketPriority, TicketCategory } from '@/types';

export class SearchService {
  private static instance: SearchService;
  private apiEndpoint: string;

  private constructor() {
    this.apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT || '/api';
  }

  public static getInstance(): SearchService {
    if (!SearchService.instance) {
      SearchService.instance = new SearchService();
    }
    return SearchService.instance;
  }

  async searchTickets(
    query: string, 
    filters?: SearchFilters,
    limit: number = 20,
    offset: number = 0
  ): Promise<SearchResult> {
    try {
      const params = new URLSearchParams({
        q: query,
        limit: limit.toString(),
        offset: offset.toString(),
      });

      if (filters) {
        if (filters.status?.length) {
          params.append('status', filters.status.join(','));
        }
        if (filters.priority?.length) {
          params.append('priority', filters.priority.join(','));
        }
        if (filters.category?.length) {
          params.append('category', filters.category.join(','));
        }
        if (filters.tags?.length) {
          params.append('tags', filters.tags.join(','));
        }
        if (filters.dateRange) {
          params.append('dateFrom', filters.dateRange.from.toISOString());
          params.append('dateTo', filters.dateRange.to.toISOString());
        }
      }

      const response = await fetch(`${this.apiEndpoint}/tickets/search?${params}`);
      
      if (!response.ok) {
        throw new Error(`Search error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error searching tickets:', error);
      throw error;
    }
  }

  async getTicketsByCategory(category: TicketCategory): Promise<Ticket[]> {
    try {
      const response = await fetch(`${this.apiEndpoint}/tickets/category/${category}`);
      
      if (!response.ok) {
        throw new Error(`Category search error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting tickets by category:', error);
      throw error;
    }
  }

  async getResolvedTickets(limit: number = 100): Promise<Ticket[]> {
    try {
      const response = await fetch(
        `${this.apiEndpoint}/tickets?status=${TicketStatus.RESOLVED}&limit=${limit}`
      );
      
      if (!response.ok) {
        throw new Error(`Resolved tickets error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting resolved tickets:', error);
      throw error;
    }
  }

  async getTicketById(id: string): Promise<Ticket | null> {
    try {
      const response = await fetch(`${this.apiEndpoint}/tickets/${id}`);
      
      if (response.status === 404) {
        return null;
      }
      
      if (!response.ok) {
        throw new Error(`Ticket fetch error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting ticket by ID:', error);
      throw error;
    }
  }
}
