// Ticket types
export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  assignedTo?: string;
  tags: string[];
  solution?: string;
}

export enum TicketStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
  PENDING = 'pending'
}

export enum TicketPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export enum TicketCategory {
  AFTERNOON = 'afternoon', // Popołudniowe
  LONG_TERM = 'long_term', // Długofalowe
  OVERDUE = 'overdue'      // Zaległe
}

// AI types
export interface AIQuery {
  id: string;
  query: string;
  timestamp: Date;
  userId?: string;
}

export interface AIResponse {
  id: string;
  queryId: string;
  response: string;
  confidence: number;
  sources: TicketSource[];
  timestamp: Date;
}

export interface TicketSource {
  ticketId: string;
  relevanceScore: number;
  matchedContent: string;
}

// Search types
export interface SearchResult {
  tickets: Ticket[];
  totalCount: number;
  query: string;
  executionTime: number;
}

export interface SearchFilters {
  status?: TicketStatus[];
  priority?: TicketPriority[];
  category?: TicketCategory[];
  dateRange?: {
    from: Date;
    to: Date;
  };
  tags?: string[];
}

// UI types
export interface TicketCardData {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: TicketCategory;
}

export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  sources?: TicketSource[];
}
