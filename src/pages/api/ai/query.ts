import { NextApiRequest, NextApiResponse } from 'next';
import { AIService } from '@/services/ai/aiService';
import { AIResponse, Ticket } from '@/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AIResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query, tickets = [] } = req.body as { query: string; tickets?: Ticket[] };

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query is required and must be a string' });
    }

    const aiService = AIService.getInstance();
    const response = await aiService.queryTickets(query, tickets);

    res.status(200).json(response);
  } catch (error) {
    console.error('API Error in /api/ai/query:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
}
