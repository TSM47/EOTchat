import { NextApiRequest, NextApiResponse } from 'next';
import { AIService } from '@/services/ai/aiService';
import { Ticket } from '@/types';

interface SolutionResponse {
  solution: string;
  steps: string[];
  confidence: number;
  basedOnTickets: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SolutionResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { description, similarTickets = [] } = req.body as { 
      description: string; 
      similarTickets?: Ticket[] 
    };

    if (!description || typeof description !== 'string') {
      return res.status(400).json({ error: 'Description is required and must be a string' });
    }

    const aiService = AIService.getInstance();
    const solution = await aiService.generateSolution(description, similarTickets);

    res.status(200).json(solution);
  } catch (error) {
    console.error('API Error in /api/ai/solution:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
}
