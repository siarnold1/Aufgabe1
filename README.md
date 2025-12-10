# Text Feedback Tool

Eine moderne, futuristische Webapplikation zum Teilen von Textideen und Erhalten von Feedback.

## Features

### ✨ Hauptfunktionen
- **Ideen einreichen**: Nutzer können ihre Textideen hochladen
- **Automatisches Feedback**: Intelligentes System analysiert Texte und gibt sofortige Hinweise
- **Community Feedback**: Andere Nutzer können detailliertes Feedback hinterlassen
- **Spezifisches Feedback**: Feedback kann sich auf einzelne Textpassagen beziehen

### 🤖 Automatische Feedback-Regeln
Das System analysiert Texte auf folgende Schlüsselwörter und gibt entsprechendes Feedback:

1. **KI/Künstliche Intelligenz** → Hinweis auf ethische Bedenken
2. **Datenschutz** → DSGVO und Datensicherheitshinweise
3. **Innovation/Zukunft** → Machbarkeitsüberlegungen
4. **Nachhaltigkeit/Umwelt** → Ökologische Auswirkungen
5. **Technologie** → Barrierefreiheit und Skalierbarkeit
6. **Gesellschaft** → Soziale Gerechtigkeit
7. **Wirtschaft** → Marktpotenzial und Geschäftsmodelle
8. **Bildung** → Wissensvermittlung
9. **Gesundheit** → Medizinische Standards
10. **Sicherheit** → Risikoanalyse

## Seiten

### 1. Startseite (`index.html`)
- Willkommensnachricht und Beschreibung
- Zwei Hauptbuttons:
  - **Eigene Idee einreichen** → führt zu `submit.html`
  - **Ideen reviewen** → führt zu `feedback.html`
- Feature-Übersicht mit Icons

### 2. Formularseite (`submit.html`)
- Eingabefelder für:
  - Name (optional)
  - Titel der Idee (Pflichtfeld)
  - Textinhalt (Pflichtfeld)
- Zeichenzähler
- Erfolgsbestätigung nach Einreichung

### 3. Feedback-Seite (`feedback.html`)
- Anzeige aller eingereichten Ideen
- Pro Idee:
  - **Automatisches Feedback** (zuerst angezeigt)
  - **Nutzer-Feedback** (darunter)
  - Button zum Hinzufügen von eigenem Feedback
- Modal-Fenster für Feedback-Eingabe

## Design

### 🌈 Farben
- **Dunkler Hintergrund**: `#0a0e27`
- **Regenbogen-Gradient**: Für Titel und primäre Elemente
- **Glasmorphismus**: Halbtransparente Karten mit Blur-Effekt
- **Neon-Akzente**: Leuchtende Hover-Effekte

### 🎨 Designmerkmale
- Futuristisches, modernes Interface
- Animierte Regenbogen-Gradienten
- Smooth Transitions und Hover-Effekte
- Responsive Design für alle Bildschirmgrößen
- Glasmorphismus-Effekte

## Technische Details

### Datenspeicherung
- **LocalStorage**: Alle Daten werden clientseitig im Browser gespeichert
- Keine Backend-Anbindung erforderlich
- Persistente Datenhaltung zwischen Sessions

### Verwendete Technologien
- **HTML5**: Semantisches Markup
- **CSS3**: Custom Properties, Flexbox, Grid, Animations
- **Vanilla JavaScript**: Keine Frameworks oder Libraries

## Installation & Nutzung

1. Alle Dateien in einem Verzeichnis speichern:
   - `index.html`
   - `submit.html`
   - `feedback.html`
   - `style.css`
   - `script.js`

2. `index.html` in einem modernen Browser öffnen

3. Keine weiteren Installationsschritte erforderlich!

## Browser-Kompatibilität

- Chrome/Edge (empfohlen)
- Firefox
- Safari
- Opera

**Hinweis**: LocalStorage muss aktiviert sein.

## Projektstruktur

```
Aufgabe1/
├── index.html         # Startseite
├── submit.html        # Formular zum Einreichen
├── feedback.html      # Feedback-Übersicht
├── style.css          # Alle Styles
├── script.js          # JavaScript-Logik
└── README.md          # Diese Datei
```

## Entwickelt von Claude Code
Erstellt im Rahmen von Aufgabe1
