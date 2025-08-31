# Konfiguracja Gemini API

## Instrukcja konfiguracji Google Gemini API dla EOTchat

### 1. Uzyskanie klucza API

1. Przejdź do [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Zaloguj się na swoje konto Google
3. Kliknij "Create API Key"
4. Skopiuj wygenerowany klucz API

### 2. Konfiguracja zmiennych środowiskowych

1. Otwórz plik `.env.local` w głównym katalogu projektu
2. Zastąp `your_gemini_api_key_here` swoim prawdziwym kluczem API:

```env
GOOGLE_GEMINI_API_KEY=AIzaSyC-twój-prawdziwy-klucz-api-tutaj
```

### 3. Uruchomienie aplikacji

```bash
npm run dev
```

### 4. Testowanie integracji

Po uruchomieniu aplikacji możesz przetestować funkcjonalności AI:

1. **Zapytania AI**: Wpisz pytanie w głównym polu tekstowym
2. **Analiza zgłoszeń**: Kliknij na karty kategorii zgłoszeń
3. **Podobne zgłoszenia**: Użyj przycisku "Podobne zgłoszenia"

### 5. Dostępne funkcjonalności

#### Analiza zapytań
- Inteligentne odpowiedzi na pytania dotyczące problemów technicznych
- Kontekstowe rozwiązania bazujące na historii zgłoszeń
- Ocena pewności odpowiedzi

#### Kategoryzacja zgłoszeń
- Automatyczne przypisywanie kategorii (Popołudniowe, Długofalowe, Zaległe)
- Określanie priorytetu (Niski, Średni, Wysoki, Pilny)
- Sugerowanie tagów

#### Wyszukiwanie podobnych zgłoszeń
- Znajdowanie podobnych przypadków w bazie
- Ocena podobieństwa
- Dopasowana treść

#### Generowanie rozwiązań
- Krok po kroku instrukcje rozwiązania
- Bazowanie na podobnych rozwiązanych zgłoszeniach
- Ocena pewności rozwiązania

### 6. Struktura API

Aplikacja udostępnia następujące endpointy:

- `POST /api/ai/query` - Analiza zapytań
- `POST /api/ai/similar` - Wyszukiwanie podobnych zgłoszeń  
- `POST /api/ai/analyze` - Kategoryzacja zgłoszeń
- `POST /api/ai/solution` - Generowanie rozwiązań

### 7. Bezpieczeństwo

⚠️ **Ważne**: 
- Nigdy nie commituj pliku `.env.local` do repozytorium
- Klucz API jest poufny i nie powinien być udostępniany
- Używaj różnych kluczy dla środowisk dev/prod

### 8. Rozwiązywanie problemów

#### Błąd: "GOOGLE_GEMINI_API_KEY is not configured"
- Sprawdź czy plik `.env.local` istnieje
- Upewnij się, że klucz API jest poprawnie wpisany
- Zrestartuj serwer deweloperski

#### Błąd: "API key not valid"
- Sprawdź czy klucz API jest aktywny w Google AI Studio
- Upewnij się, że nie ma dodatkowych spacji w kluczu

#### Aplikacja nie odpowiada na zapytania
- Sprawdź konsole przeglądarki i terminala pod kątem błędów
- Upewnij się, że masz połączenie z internetem
- Sprawdź czy Gemini API jest dostępne w Twojej lokalizacji

### 9. Limity i koszty

- Google Gemini API ma darmowy tier z limitami
- Sprawdź aktualne ceny na [Google AI Pricing](https://ai.google.dev/pricing)
- Monitoruj użycie w Google AI Studio

### 10. Wsparcie

W przypadku problemów:
1. Sprawdź logi w konsoli przeglądarki (F12)
2. Sprawdź logi serwera w terminalu
3. Skonsultuj się z dokumentacją [Google AI](https://ai.google.dev/docs)
