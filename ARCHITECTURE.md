# EOT Chat - Architektura Aplikacji

## Przegląd
Aplikacja AI do wyszukiwania odpowiedzi w systemie zgłoszeń EOT. Umożliwia zadawanie pytań w języku naturalnym i otrzymywanie odpowiedzi na podstawie rozwiązanych zgłoszeń.

## Struktura Folderów

### `/src/components/`
- **`/ui/`** - Komponenty UI z shadcn/ui i custom komponenty
  - `icons.tsx` - Zoptymalizowane ikony SVG
  - `prompt-input.tsx` - Komponent do wprowadzania zapytań AI
  - `ripple-button.tsx` - Przycisk z efektem ripple
- **`/chat/`** - Komponenty związane z czatem AI
- **`/tickets/`** - Komponenty do wyświetlania zgłoszeń
- **`/search/`** - Komponenty wyszukiwania
- `ChatArea.tsx` - Główny obszar czatu
- `Sidebar.tsx` - Boczny panel nawigacji
- `TicketCard.tsx` - Karta zgłoszenia (zoptymalizowana)
- `IconBadge.tsx` - Badge z ikoną (zoptymalizowany)

### `/src/services/`
- **`/ai/`** - Serwisy AI
  - `aiService.ts` - Główny serwis AI do komunikacji z backend
- **`/tickets/`** - Serwisy zgłoszeń
- **`/search/`** - Serwisy wyszukiwania
  - `searchService.ts` - Wyszukiwanie w bazie zgłoszeń

### `/src/hooks/`
- **`/ai/`** - Hooki związane z AI
  - `useAI.ts` - Hook do zarządzania zapytaniami AI

### `/src/types/`
- `index.ts` - Definicje typów TypeScript dla całej aplikacji

### `/src/contexts/`
- Konteksty React (do dodania w przyszłości)

### `/src/utils/`
- Funkcje pomocnicze

### `/src/data/`
- Dane statyczne, konfiguracja

### `/pages/api/` (do stworzenia)
- **`/ai/`** - Endpointy API dla AI
- **`/tickets/`** - Endpointy API dla zgłoszeń

## Optymalizacje Wprowadzone

### 1. **Wydzielenie Komponentów**
- `TicketCard` - Uniwersalny komponent karty zgłoszenia
- `IconBadge` - Komponent badge z ikoną
- `icons.tsx` - Centralne zarządzanie ikonami SVG

### 2. **Usunięcie Nieużywanych Plików**
- Usunięto wszystkie nieużywane pliki SVG z `/public/`
- Usunięto puste foldery

### 3. **Struktura Typów**
- Kompletne typy TypeScript dla zgłoszeń, AI, wyszukiwania
- Enumeracje dla statusów, priorytetów, kategorii

### 4. **Serwisy**
- Wzorzec Singleton dla serwisów
- Centralne zarządzanie API calls
- Error handling

### 5. **Hooki Custom**
- `useAI` - Zarządzanie stanem AI zapytań
- Reusable logic

## Funkcjonalności AI

### Planowane Funkcje:
1. **Wyszukiwanie Semantyczne** - AI analizuje pytania i znajduje podobne rozwiązane zgłoszenia
2. **Analiza Kategorii** - Automatyczne kategoryzowanie nowych zgłoszeń
3. **Sugerowanie Rozwiązań** - AI proponuje rozwiązania na podstawie historii
4. **Podobne Zgłoszenia** - Znajdowanie podobnych przypadków

### API Endpoints (do implementacji):
- `POST /api/ai/query` - Zapytanie AI
- `POST /api/ai/similar` - Znajdź podobne zgłoszenia
- `POST /api/ai/analyze` - Analiza treści zgłoszenia
- `GET /api/tickets/search` - Wyszukiwanie zgłoszeń
- `GET /api/tickets/category/:category` - Zgłoszenia według kategorii

## Kategorie Zgłoszeń

1. **Popołudniowe** (`afternoon`) - Do realizacji na zmianach popołudniowych/nocnych
2. **Długofalowe** (`long_term`) - Wymagające dłuższego czasu realizacji
3. **Zaległe** (`overdue`) - Zalegające lub wymagające weryfikacji

## Technologie

- **Frontend**: Next.js 14, TypeScript, TailwindCSS, shadcn/ui
- **Backend**: Next.js API Routes (do implementacji)
- **AI**: OpenAI API lub podobne (do konfiguracji)
- **Database**: Do wyboru (PostgreSQL/MongoDB)
- **Search**: Elasticsearch lub podobne (opcjonalnie)

## Następne Kroki

1. Implementacja API endpoints
2. Integracja z bazą danych zgłoszeń
3. Konfiguracja AI service (OpenAI/inne)
4. Implementacja wyszukiwania semantycznego
5. Dodanie systemu autentykacji
6. Testy jednostkowe i integracyjne
