import { useState, useCallback } from 'react';
import { AIService } from '@/services/ai/aiService';
import { AIResponse, TicketSource } from '@/types';

interface UseAIReturn {
  response: AIResponse | null;
  similarTickets: TicketSource[];
  isLoading: boolean;
  error: string | null;
  queryAI: (query: string) => Promise<void>;
  findSimilar: (query: string) => Promise<void>;
  clearResponse: () => void;
}

export const useAI = (): UseAIReturn => {
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [similarTickets, setSimilarTickets] = useState<TicketSource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const aiService = AIService.getInstance();

  const queryAI = useCallback(async (query: string) => {
    if (!query.trim()) {
      setError('Query cannot be empty');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const aiResponse = await aiService.queryTickets(query);
      setResponse(aiResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [aiService]);

  const findSimilar = useCallback(async (query: string) => {
    if (!query.trim()) {
      setError('Query cannot be empty');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const similar = await aiService.findSimilarTickets(query);
      setSimilarTickets(similar);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [aiService]);

  const clearResponse = useCallback(() => {
    setResponse(null);
    setSimilarTickets([]);
    setError(null);
  }, []);

  return {
    response,
    similarTickets,
    isLoading,
    error,
    queryAI,
    findSimilar,
    clearResponse,
  };
};
