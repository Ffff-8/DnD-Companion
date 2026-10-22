# Scheda D&D — PWA

Scheda personaggio per D&D, installabile come app sul telefono via web.

## Novità v9

- **Sblocco manuale dal Master**: nel pannello "Combattimento live", sotto l'elenco giocatori, ora c'è un tasto **Sblocca** per ogni giocatore e un tasto **Sblocca tutte le schede**. Usa lo stesso canale dello sblocco automatico (fin scontro), quindi se quello automatico non arriva al giocatore, il Master lo forza con un tap: il giocatore riceve la notifica "Sbloccata" e la sua scheda si sblocca subito (funziona anche se il giocatore era offline: appena si ricollega lo snapshot lo sblocca).
- **Aggiornamenti affidabili**: nuovo service worker "network-first" — l'app controlla GitHub ad ogni apertura/ritorno in primo piano; se c'è una versione nuova compare il banner **"Aggiornamento disponibile"** con il tasto *Aggiorna ora* (niente più cache bloccata dopo aver sostituito i file). In basso a destra vedi sempre la **versione** installata (es. "Scheda D&D v9").

## Pubblicare una nuova versione (importante!)

1. Modifica i file che ti servono.
2. **Cambia la versione in UN solo punto**: in `index.html`, riga `<script>window.APP_VER='9'</script>` e il `?v=9` accanto (metti lo stesso numero in entrambi, es. `10`). Serve a forzare il ricaricamento di `app.js` sui telefoni.
3. Se hai modificato anche `sw.js`, aumenta `CACHE_VERSION` in cima a `sw.js` (es. `'2'` → `'3'`).
4. Commit e push su GitHub: i dispositivi si aggiornano da soli entro la prossima apertura (GitHub Pages aggiorna i file in ~10 minuti).

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

- `index.html` — interfaccia + banner aggiornamenti + versione
- `app.js` — tutta la logica (originale + sblocco manuale Master)
- `style.css` — stili originali
- `manifest.json` — metadati PWA (start_url e scope relativi: funziona in sottocartella)
- `sw.js` — service worker network-first con versionamento
- `icons/` — icone 192/512 px + apple-touch-icon
