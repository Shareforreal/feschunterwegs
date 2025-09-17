# Reiseagentur - Boutique Travel Agency Landing Page

Eine emotionale Landing Page für eine Boutique-Reiseagentur, die kuratierte Kurztrips für Münchener anbietet.

## Features

- **Hero Section** mit atmosphärischem Hintergrundbild und emotionaler Headline
- **Problem/Solution** Sektion, die Vertrauen durch Insider-Expertise aufbaut
- **Experiences Showcase** mit 6 kuratierten Reiseerlebnissen
- **How it Works** - 3 einfache Schritte
- **Interaktives Quiz** mit Framer Motion Animationen
- **Backend API** für Quiz-Datensammlung mit SQLite
- **Responsive Design** mit Tailwind CSS
- **Deutsche Lokalisierung** durchgehend

## Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Framer Motion
- Lucide React (Icons)
- Axios

### Backend
- Node.js
- Express
- SQLite3
- CORS

## Setup

### Voraussetzungen
- Node.js (v16 oder höher)
- npm

### Installation

1. **Dependencies installieren:**
```bash
# Root dependencies
npm install

# Client dependencies
cd client
npm install
cd ..
```

2. **Development Server starten:**
```bash
npm run dev
```

Dies startet sowohl den Backend-Server (Port 5000) als auch den React Development Server (Port 3000).

### Manuelle Installation

Falls der `concurrently` Befehl nicht funktioniert:

**Terminal 1 (Backend):**
```bash
npm run server
```

**Terminal 2 (Frontend):**
```bash
cd client
npm start
```

## Projektstruktur

```
reiseagentur/
├── client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React Komponenten
│   │   │   ├── Hero.js
│   │   │   ├── ProblemSolution.js
│   │   │   ├── ExperiencesShowcase.js
│   │   │   ├── HowItWorks.js
│   │   │   ├── Quiz.js
│   │   │   └── Footer.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── tailwind.config.js
├── server.js              # Express Backend
├── package.json
└── README.md
```

## API Endpoints

### POST /api/quiz
Speichert Quiz-Antworten und E-Mail-Adresse.

**Request Body:**
```json
{
  "email": "user@example.com",
  "answers": {
    "mood": "relax",
    "duration": "2-3-nights",
    "atmosphere": "nature"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Quiz submission saved successfully",
  "id": 123
}
```

### GET /api/stats
Gibt Statistiken über Quiz-Einreichungen zurück.

**Response:**
```json
{
  "total_submissions": 42
}
```

## Design System

### Farben
- **Warm Gray**: Hauptfarbpalette (50-900)
- **Sage**: Akzentfarben für natürliche Elemente
- **Weiß**: Hintergrund und Karten

### Typografie
- **Font**: Inter (Google Fonts)
- **Hero**: 4xl-6xl, font-light
- **Section**: 2xl-3xl, font-light
- **Body**: lg, leading-relaxed

### Komponenten
- **Buttons**: btn-primary, btn-secondary
- **Cards**: card (mit Schatten und Rundungen)
- **Animations**: Framer Motion für sanfte Übergänge

## Deployment

### Production Build

1. **Frontend builden:**
```bash
cd client
npm run build
cd ..
```

2. **Server starten:**
```bash
npm start
```

### Environment Variables

Für Production können folgende Umgebungsvariablen gesetzt werden:
- `PORT`: Server Port (Standard: 5000)
- `NODE_ENV`: Environment (development/production)

## Datenbank

Die SQLite-Datenbank wird automatisch erstellt (`quiz_data.db`). Die Tabelle `quiz_submissions` speichert:
- `id`: Auto-increment Primary Key
- `email`: E-Mail-Adresse des Users
- `answers`: JSON-String mit Quiz-Antworten
- `created_at`: Timestamp der Einreichung

## Anpassungen

### Quiz-Fragen ändern
In `client/src/components/Quiz.js` das `questions` Array anpassen.

### Reiseerlebnisse hinzufügen
In `client/src/components/ExperiencesShowcase.js` das `experiences` Array erweitern.

### Styling anpassen
- Globale Styles: `client/src/index.css`
- Komponenten-spezifisch: Inline Tailwind Classes
- Design System: `client/tailwind.config.js`

## Browser Support

- Chrome (letzte 2 Versionen)
- Firefox (letzte 2 Versionen)
- Safari (letzte 2 Versionen)
- Edge (letzte 2 Versionen)

## License

Private Projekt für Reiseagentur.

