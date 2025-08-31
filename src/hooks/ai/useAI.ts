import { useState, useCallback } from 'react';
import { AIService } from '@/services/ai/aiService';
import { AIResponse, TicketSource, Ticket } from '@/types';

interface UseAIReturn {
  response: AIResponse | null;
  similarTickets: TicketSource[];
  solution: {
    solution: string;
    steps: string[];
    confidence: number;
    basedOnTickets: string[];
  } | null;
  analysis: {
    category: string;
    priority: string;
    suggestedTags: string[];
  } | null;
  isLoading: boolean;
  error: string | null;
  queryAI: (query: string, tickets?: Ticket[]) => Promise<void>;
  findSimilar: (query: string, tickets?: Ticket[]) => Promise<void>;
  generateSolution: (description: string, similarTickets?: Ticket[]) => Promise<void>;
  analyzeContent: (content: string) => Promise<void>;
  clearResponse: () => void;
}

export const useAI = (): UseAIReturn => {
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [similarTickets, setSimilarTickets] = useState<TicketSource[]>([]);
  const [solution, setSolution] = useState<{
    solution: string;
    steps: string[];
    confidence: number;
    basedOnTickets: string[];
  } | null>(null);
  const [analysis, setAnalysis] = useState<{
    category: string;
    priority: string;
    suggestedTags: string[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const aiService = AIService.getInstance();

  const queryAI = useCallback(async (query: string, tickets?: Ticket[]) => {
    if (!query.trim()) {
      setError('Query cannot be empty');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const aiResponse = await aiService.queryTickets(query, tickets);
      setResponse(aiResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [aiService]);

  const findSimilar = useCallback(async (query: string, tickets?: Ticket[]) => {
    if (!query.trim()) {
      setError('Query cannot be empty');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const similar = await aiService.findSimilarTickets(query, tickets);
      setSimilarTickets(similar);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [aiService]);

  const generateSolution = useCallback(async (description: string, similarTickets?: Ticket[]) => {
    if (!description.trim()) {
      setError('Description cannot be empty');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const solutionResult = await aiService.generateSolution(description, similarTickets);
      setSolution(solutionResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [aiService]);

  const analyzeContent = useCallback(async (content: string) => {
    if (!content.trim()) {
      setError('Content cannot be empty');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const analysisResult = await aiService.analyzeTicketContent(content);
      setAnalysis(analysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [aiService]);

  const clearResponse = useCallback(() => {
    setResponse(null);
    setSimilarTickets([]);
    setSolution(null);
    setAnalysis(null);
    setError(null);
  }, []);

  return {
    response,
    similarTickets,
    solution,
    analysis,
    isLoading,
    error,
    queryAI,
    findSimilar,
    generateSolution,
    analyzeContent,
    clearResponse,
  };
};
