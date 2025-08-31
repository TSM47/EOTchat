import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { AIResponse, TicketSource, Ticket } from '@/types';

export class GeminiService {
  private static instance: GeminiService;
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  private constructor() {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GOOGLE_GEMINI_API_KEY is not configured');
    }
    
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  async analyzeTicketQuery(query: string, tickets: Ticket[] = []): Promise<AIResponse> {
    try {
      const prompt = this.buildAnalysisPrompt(query, tickets);
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parse response and extract relevant information
      const parsedResponse = this.parseGeminiResponse(text, query);
      
      return {
        id: this.generateId(),
        queryId: this.generateId(),
        response: parsedResponse.answer,
        confidence: parsedResponse.confidence,
        sources: parsedResponse.sources,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('Error analyzing ticket query with Gemini:', error);
      throw new Error(`Gemini analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async findSimilarTickets(query: string, tickets: Ticket[]): Promise<TicketSource[]> {
    try {
      const prompt = this.buildSimilarityPrompt(query, tickets);
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return this.parseSimilarTickets(text, tickets);
    } catch (error) {
      console.error('Error finding similar tickets with Gemini:', error);
      throw error;
    }
  }

  async categorizeTicket(content: string): Promise<{
    category: string;
    priority: string;
    suggestedTags: string[];
    reasoning: string;
  }> {
    try {
      const prompt = this.buildCategorizationPrompt(content);
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return this.parseCategorizationResponse(text);
    } catch (error) {
      console.error('Error categorizing ticket with Gemini:', error);
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
      const prompt = this.buildSolutionPrompt(ticketDescription, similarTickets);
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return this.parseSolutionResponse(text, similarTickets);
    } catch (error) {
      console.error('Error generating solution with Gemini:', error);
      throw error;
    }
  }

  private buildAnalysisPrompt(query: string, tickets: Ticket[]): string {
    const ticketContext = tickets.length > 0 
      ? `\n\nDostępne zgłoszenia do analizy:\n${tickets.map(t => 
          `ID: ${t.id}\nTytuł: ${t.title}\nOpis: ${t.description}\nStatus: ${t.status}\nRozwiązanie: ${t.solution || 'Brak'}\n---`
        ).join('\n')}`
      : '';

    return `Jesteś asystentem AI dla systemu zgłoszeń firmy EOT (Emergency Operations Technology). 
Twoja rola to pomoc w analizie i rozwiązywaniu problemów technicznych związanych z:
- Systemami medycznymi (defibrylatory, EKG)
- Aplikacjami mobilnymi (Analityk, automapa)
- Infrastrukturą IT (drukarki, łączność internetowa)
- Systemami SWD PRM

Pytanie użytkownika: "${query}"
${ticketContext}

Przeanalizuj pytanie i udziel pomocnej odpowiedzi w języku polskim. Jeśli masz dostęp do podobnych zgłoszeń, wykorzystaj je do udzielenia lepszej odpowiedzi.

Format odpowiedzi:
ODPOWIEDŹ: [Twoja odpowiedź]
PEWNOŚĆ: [0-100]
ŹRÓDŁA: [ID zgłoszeń, które wykorzystałeś, oddzielone przecinkami]`;
  }

  private buildSimilarityPrompt(query: string, tickets: Ticket[]): string {
    return `Znajdź zgłoszenia podobne do zapytania: "${query}"

Dostępne zgłoszenia:
${tickets.map(t => 
  `ID: ${t.id}\nTytuł: ${t.title}\nOpis: ${t.description}\nKategoria: ${t.category}\nTagi: ${t.tags.join(', ')}\n---`
).join('\n')}

Oceń podobieństwo każdego zgłoszenia do zapytania w skali 0-100 i zwróć tylko te z oceną powyżej 30.

Format odpowiedzi:
ID: [id_zgłoszenia]
PODOBIEŃSTWO: [0-100]
DOPASOWANA_TREŚĆ: [fragment tekstu, który pasuje do zapytania]
---`;
  }

  private buildCategorizationPrompt(content: string): string {
    return `Skategoryzuj następujące zgłoszenie:

"${content}"

Dostępne kategorie:
- afternoon (Popołudniowe) - do realizacji na zmianach popołudniowych/nocnych
- long_term (Długofalowe) - wymagające dłuższego czasu realizacji
- overdue (Zaległe) - zalegające lub wymagające weryfikacji

Dostępne priorytety:
- low (Niski)
- medium (Średni) 
- high (Wysoki)
- urgent (Pilny)

Format odpowiedzi:
KATEGORIA: [afternoon/long_term/overdue]
PRIORYTET: [low/medium/high/urgent]
TAGI: [tag1, tag2, tag3]
UZASADNIENIE: [krótkie uzasadnienie decyzji]`;
  }

  private buildSolutionPrompt(description: string, similarTickets: Ticket[]): string {
    const similarContext = similarTickets.length > 0
      ? `\n\nPodobne rozwiązane zgłoszenia:\n${similarTickets.map(t =>
          `Problem: ${t.title}\nRozwiązanie: ${t.solution}\n---`
        ).join('\n')}`
      : '';

    return `Zaproponuj rozwiązanie dla następującego problemu:

"${description}"
${similarContext}

Bazując na dostępnych informacjach i podobnych przypadkach, zaproponuj krok po kroku rozwiązanie problemu.

Format odpowiedzi:
ROZWIĄZANIE: [ogólne rozwiązanie]
KROKI:
1. [pierwszy krok]
2. [drugi krok]
3. [trzeci krok]
PEWNOŚĆ: [0-100]
BAZUJE_NA: [ID zgłoszeń, które wykorzystałeś]`;
  }

  private parseGeminiResponse(text: string, originalQuery: string): {
    answer: string;
    confidence: number;
    sources: TicketSource[];
  } {
    const lines = text.split('\n');
    let answer = '';
    let confidence = 70; // default confidence
    const sources: TicketSource[] = [];

    for (const line of lines) {
      if (line.startsWith('ODPOWIEDŹ:')) {
        answer = line.replace('ODPOWIEDŹ:', '').trim();
      } else if (line.startsWith('PEWNOŚĆ:')) {
        confidence = parseInt(line.replace('PEWNOŚĆ:', '').trim()) || 70;
      } else if (line.startsWith('ŹRÓDŁA:')) {
        const sourceIds = line.replace('ŹRÓDŁA:', '').trim().split(',');
        sourceIds.forEach(id => {
          if (id.trim()) {
            sources.push({
              ticketId: id.trim(),
              relevanceScore: confidence / 100,
              matchedContent: originalQuery
            });
          }
        });
      }
    }

    return {
      answer: answer || text,
      confidence: confidence / 100,
      sources
    };
  }

  private parseSimilarTickets(text: string, _tickets: Ticket[]): TicketSource[] {
    const sources: TicketSource[] = [];
    const sections = text.split('---');

    for (const section of sections) {
      const lines = section.trim().split('\n');
      let ticketId = '';
      let similarity = 0;
      let matchedContent = '';

      for (const line of lines) {
        if (line.startsWith('ID:')) {
          ticketId = line.replace('ID:', '').trim();
        } else if (line.startsWith('PODOBIEŃSTWO:')) {
          similarity = parseInt(line.replace('PODOBIEŃSTWO:', '').trim()) || 0;
        } else if (line.startsWith('DOPASOWANA_TREŚĆ:')) {
          matchedContent = line.replace('DOPASOWANA_TREŚĆ:', '').trim();
        }
      }

      if (ticketId && similarity > 30) {
        sources.push({
          ticketId,
          relevanceScore: similarity / 100,
          matchedContent
        });
      }
    }

    return sources.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  private parseCategorizationResponse(text: string): {
    category: string;
    priority: string;
    suggestedTags: string[];
    reasoning: string;
  } {
    const lines = text.split('\n');
    let category = 'long_term';
    let priority = 'medium';
    let suggestedTags: string[] = [];
    let reasoning = '';

    for (const line of lines) {
      if (line.startsWith('KATEGORIA:')) {
        category = line.replace('KATEGORIA:', '').trim();
      } else if (line.startsWith('PRIORYTET:')) {
        priority = line.replace('PRIORYTET:', '').trim();
      } else if (line.startsWith('TAGI:')) {
        const tagsStr = line.replace('TAGI:', '').trim();
        suggestedTags = tagsStr.split(',').map(tag => tag.trim()).filter(tag => tag);
      } else if (line.startsWith('UZASADNIENIE:')) {
        reasoning = line.replace('UZASADNIENIE:', '').trim();
      }
    }

    return { category, priority, suggestedTags, reasoning };
  }

  private parseSolutionResponse(text: string, _similarTickets: Ticket[]): {
    solution: string;
    steps: string[];
    confidence: number;
    basedOnTickets: string[];
  } {
    const lines = text.split('\n');
    let solution = '';
    const steps: string[] = [];
    let confidence = 70;
    const basedOnTickets: string[] = [];

    let inSteps = false;

    for (const line of lines) {
      if (line.startsWith('ROZWIĄZANIE:')) {
        solution = line.replace('ROZWIĄZANIE:', '').trim();
      } else if (line.startsWith('KROKI:')) {
        inSteps = true;
      } else if (line.startsWith('PEWNOŚĆ:')) {
        confidence = parseInt(line.replace('PEWNOŚĆ:', '').trim()) || 70;
        inSteps = false;
      } else if (line.startsWith('BAZUJE_NA:')) {
        const ticketIds = line.replace('BAZUJE_NA:', '').trim().split(',');
        basedOnTickets.push(...ticketIds.map(id => id.trim()).filter(id => id));
        inSteps = false;
      } else if (inSteps && line.trim().match(/^\d+\./)) {
        steps.push(line.trim());
      }
    }

    return {
      solution: solution || text,
      steps,
      confidence: confidence / 100,
      basedOnTickets
    };
  }

  private generateId(): string {
    return `gemini_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
