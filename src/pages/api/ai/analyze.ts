import { NextApiRequest, NextApiResponse } from 'next';
import { AIService } from '@/services/ai/aiService';

interface AnalyzeResponse {
  category: string;
  priority: string;
  suggestedTags: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AnalyzeResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { content } = req.body as { content: string };

    if (!content || typeof content !== 'string') {
      return res.status(400).json({ error: 'Content is required and must be a string' });
    }

    const aiService = AIService.getInstance();
    const analysis = await aiService.analyzeTicketContent(content);

    res.status(200).json(analysis);
  } catch (error) {
    console.error('API Error in /api/ai/analyze:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
}
