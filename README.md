# PRESKPOL — nowa witryna (statyczna)

Kompletna, gotowa do wdrożenia witryna zbudowana od zera na treściach i grafikach
z dotychczasowego serwisu www.preskpol.pl.

## Struktura

```
/                            → index.html (strona główna)
/o-nas/                      /system/
/kanalizacja-cisnieniowa/    ← NOWA strona filarowa pod SEO i wyszukiwarki AI
/wylaczniki-plywakowe-plywaki/
/certyfikaty/                /do-pobrania/
/realizacje/                 /serwis/
/srodowisko/                 /dla-inwestorow/
/kontakt/                    /rodo/
/assets/style.css  /assets/app.js  /assets/favicon.svg
/sitemap.xml  /robots.txt  /llms.txt
```

Adresy podstron są identyczne jak w starym serwisie — nie tracisz pozycji ani linków
przychodzących. Jedyny nowy adres to `/kanalizacja-cisnieniowa/`.

## Wdrożenie

Witryna jest w pełni statyczna (HTML + CSS + 3 kB JavaScriptu, bez frameworków i bez bazy).

1. Wgraj całą zawartość katalogu na serwer, do katalogu głównego domeny.
2. Wymuś HTTPS i przekierowanie `http://` → `https://www.preskpol.pl` (obecnie część
   podstron serwuje kanoniczne adresy po `http`, co osłabia indeksację).
3. Prześlij `sitemap.xml` w Google Search Console i Bing Webmaster Tools.

Hosting alternatywny bez własnego serwera: Netlify, Cloudflare Pages, GitHub Pages —
wystarczy przeciągnąć katalog.

## Grafiki i pliki PDF

Wszystkie zdjęcia, animacja MP4 i dokumenty PDF są linkowane z obecnej biblioteki mediów
(`www.preskpol.pl/wp-content/uploads/...`), więc witryna działa od razu po wgraniu.

**Zalecane po wdrożeniu:** pobierz te pliki na nowy serwer do katalogu `/media/`
i podmień adresy, żeby uniezależnić się od starej instalacji WordPressa. Warto przy okazji
przekonwertować zdjęcia do WebP — obecne JPG/PNG są główną pozycją w wadze strony.

## Co zrobiono pod SEO

- Unikalne `title` (≤ 72 znaki) i `description` (110–185 znaków) na każdej podstronie.
- Adresy kanoniczne, Open Graph, Twitter Card, `lang="pl"`, dane geolokalizacyjne.
- Dane strukturalne schema.org (JSON-LD) w jednym grafie na stronę:
  `Organization` + `LocalBusiness` (adres, NIP, KRS, telefony, godziny, nagrody),
  `WebSite`, `WebPage`, `BreadcrumbList`, `Product` (urządzenie pompowe, łącznik SHUTTLE),
  `Service` (system, serwis), `VideoObject` (animacja), `FAQPage`, `Article`, `ContactPage`.
- Poprawna hierarchia nagłówków: dokładnie jeden `H1` na stronę, sensowne `H2`/`H3`.
- Opisowe teksty alternatywne przy każdej grafice.
- Wewnętrzne linkowanie między podstronami + strona filarowa `/kanalizacja-cisnieniowa/`
  celująca we frazę główną.
- `sitemap.xml` z priorytetami, `robots.txt` z jawnym dostępem dla robotów wyszukiwarek.

## Co zrobiono pod wyszukiwarki AI (AEO/GEO)

- `llms.txt` w katalogu głównym — zwięzła, faktograficzna wizytówka firmy z kluczowymi
  liczbami, danymi rejestrowymi i mapą podstron. To format, po który sięgają asystenci AI.
- Dwie sekcje FAQ (strona główna i poradnik) napisane tak, by odpowiedzi dało się cytować
  w całości — z konkretnymi liczbami i bez marketingowej waty.
- `robots.txt` jawnie dopuszcza GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot,
  Google-Extended i Applebot-Extended. **Jeśli firma nie chce, by treści trafiały do
  modeli AI, te wpisy należy zmienić na `Disallow: /`.**
- Fakty podane wprost w treści, nie tylko na grafikach (liczba urządzeń, gmin, rok
  założenia, rok najstarszej instalacji, dane rejestrowe, parametry techniczne w tabelach).

## Dostępność i wydajność

- Kontrast zgodny z WCAG AA, widoczny focus klawiatury, link „Przejdź do treści”.
- Respektowane `prefers-reduced-motion` (animacje schematu i odsłanianie sekcji wyłączają się).
- Wideo `preload="none"`, obrazy `loading="lazy"` z podanymi wymiarami (brak przeskoków układu).
- Zero zewnętrznych bibliotek JS. Jedyny zasób zewnętrzny to Google Fonts.

## Do uzupełnienia przez firmę

- `/certyfikaty/` — podpisy pod certyfikatami opisano jako „13/138” i „13/139” na podstawie
  nazw plików. Warto wpisać pełne, poprawne numery certyfikatów PCBC.
- Mapa realizacji jest nadal grafiką JPG. Jeśli udostępnisz liczby urządzeń dla każdego
  województwa, mogę zrobić z niej interaktywną mapę SVG (silny sygnał dla Google i AI).
- Formularz kontaktowy — świadomie pominięty, bo strona jest statyczna. Można dodać
  np. przez Formspree lub Netlify Forms.
- Warto rozważyć dodanie strony „Aktualności” dla wpisów w rodzaju informacji o Diamentach
  Forbesa — regularnie odświeżana treść pomaga w indeksacji.
