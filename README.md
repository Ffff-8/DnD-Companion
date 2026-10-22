# Scheda D&D — PWA

Scheda personaggio per D&D, ora installabile come app sul telefono via web.

## Pubblicare su GitHub Pages

1. Crea un repository su GitHub (es. `scheda-dd`).
2. Estrai questo ZIP e carica **tutto il contenuto** nella root del repository (index.html deve stare alla radice).
   - Da web: github.com → nuovo repo → "uploading an existing file" → trascina i file → Commit.
   - Oppure da terminale:
     ```bash
     git init
     git add .
     git commit -m "Scheda D&D PWA"
     git branch -M main
     git remote add origin https://github.com/TUO-USER/scheda-dd.git
     git push -u origin main
     ```
3. Attiva Pages: **Settings → Pages → Source: Deploy from a branch → Branch: main / (root) → Save**.
4. Dopo 1-2 minuti l'app sarà su: `https://TUO-USER.github.io/scheda-dd/`

## Installare sul telefono

- **Android (Chrome)**: apri l'URL → menu ⋮ → "Installa app" (o "Aggiungi a schermata Home").
- **iPhone (Safari)**: apri l'URL → pulsante Condividi → "Aggiungi a Home".

L'app funziona **offline**: service worker e cache conservano dati e interfaccia.
Le impostazioni (ruolo MQTT, connessione live) restano salvate nel browser come nella versione originale.

## Struttura file

- `index.html` — interfaccia (identica all'originale)
- `app.js` — tutta la logica (byte-identica all'originale, caricata in `defer`)
- `style.css` — stili originali
- `manifest.json` — metadati PWA (start_url e scope relativi: funziona in sottocartella)
- `sw.js` — service worker per la cache offline
- `icons/` — icone 192/512 px + apple-touch-icon
