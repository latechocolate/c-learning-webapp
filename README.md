# C-Kurs

Webapp zum Erlernen der Programmiersprache **C** — von „Hallo, Welt!" bis zu Funktionszeigern und Bitmasks.

## Features

- 18 Lektionen (7 Grundlagen + 11 Fortgeschritten)
- Code-Beispiele mit Syntax-Highlighting (highlight.js)
- Erwartete Ausgabe für jedes Beispiel
- Mini-Quiz pro Lektion
- Fortschritts-Tracking via `localStorage`
- Mobile-fähiges Layout mit ausklappbarer Sidebar

## Lektionen

### Grundlagen
1. Hallo, Welt!
2. Variablen und Typen
3. Arrays
4. Strings
5. For-Schleifen
6. While-Schleifen
7. Funktionen

### Fortgeschritten
8. Zeiger (Pointer)
9. Strukturen (struct)
10. Funktionsargument als Referenz
11. Dynamische Allozierung
12. Rekursion
13. Gelinkte Listen
14. Binäre Bäume
15. Unions
16. Zeiger-Arithmetik
17. Funktionszeiger
18. Bitmasks

## Setup

```bash
npm install
node server.js   # läuft auf http://localhost:8094
```

`PORT` lässt sich als Environment-Variable überschreiben.

## Architektur

- `server.js` — Express-Server, der das `public/`-Verzeichnis statisch ausliefert
- `public/index.html` — Grundgerüst mit Sidebar und Content-Bereich
- `public/style.css` — Dark-Theme, vollständig in CSS-Variablen
- `public/app.js` — SPA-Logik: Routing per Hash, Fortschritt, Quiz, Code-Copy
- `public/lessons.js` — Inhalte aller Lektionen als Array `window.LESSONS`

Neue Lektion hinzufügen: einfach ein Objekt zu `LESSONS` ergänzen — kein Build-Schritt nötig.

## Deployment (lx-home)

Der Service läuft als systemd-User-Service unter `~/.config/systemd/user/c-kurs.service` auf Port `8094`.

```bash
systemctl --user restart c-kurs.service
systemctl --user status c-kurs.service
```
