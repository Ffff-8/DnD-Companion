# Scheda D&D — PWA

Scheda personaggio per D&D, installabile come app sul telefono via web.

## Novità v13

- **Sicurezza dei file importati e del live**: un file o una scheda ricevuta non possono più eseguire codice (testi con apici o entità HTML nei tasti). Le schede arrivano con tipi e limiti sistemati (armi, incantesimi, oggetti, armatura, caratteristiche, livello), quindi una scheda malformata non blocca più l'app.
- **Live più robusto**: i dati del Master vengono controllati prima di essere mostrati; i messaggi vuoti (che chiunque sul broker può mandare) non espellono più il giocatore e non nascondono lo scontro: rimozione e fine condivisione ora sono messaggi cifrati; le accettazioni vecchie ripubblicate non vengono più accettate.
- **Messaggi del Master firmati**: il Master firma scontro, accettazioni, ricompense, sblocchi e rimozioni. Il link ora ha in fondo un pezzo in più (l'impronta della chiave del Master): con quel link il giocatore accetta solo i messaggi firmati dal Master, quindi un altro giocatore con il link non può più fingersi Master. Nel live compare "Master verificato" e, se arrivano messaggi falsi, quanti ne sono stati ignorati. I link vecchi funzionano ancora: il giocatore memorizza la chiave del Master al primo messaggio firmato, ma per la protezione piena conviene ridare ai giocatori il link nuovo.
- **Mai più schermo bianco**: se una schermata ha dati rovinati compare un avviso con "Torna all'elenco"; le schede danneggiate sono segnalate nell'elenco e si possono eliminare.
- **Salvataggio fallito**: se la memoria del browser è piena compare un avviso invece di perdere i dati in silenzio.

## Novità v12

- **Armi riordinate**: un solo riquadro "Armi" con, per ogni arma, nome, tiro per colpire e danno in vista e i tasti Attacco, Danno e Modifica. Aggiungere un'arma (dalla lista o personalizzata) sta in "+ Aggiungi arma" in fondo allo stesso riquadro; Danni extra è in alto. Sotto: Armatura e scudo, poi il Carico. Elimina è dentro Modifica (con conferma).
- **Magie riordinate**: in cima CD, attacco e slot. Gli incantesimi sono raggruppati per livello (con gli slot liberi di quel livello), ognuno in una riga compatta con il tasto **Lancia** sempre visibile: tocca il nome per aprire dettagli, effetti, Attacco/Danno/Cura (solo se servono) e Modifica. Elimina è dentro Modifica. In fondo: Aggiungi incantesimo, Limiti e Bonus agli incantesimi.
- **Durate: 1 minuto = 1 round.** Ira 10 round, Magia innata 1 round, timer a mano in minuti (round) o ore. I timer già attivi di Ira e Magia innata vengono convertiti da soli.
- **Rientro nel live**:
  - il giocatore che esce durante uno scontro trova sulla scheda il tasto **Rientra nel live**;
  - durante lo scontro l'identità del giocatore è quella decisa dal Master all'accettazione (prima poteva restare un "Chi sei?" vecchio, che bloccava tiri e aggiornamenti dei PF); il Master riconosce i tiri dal codice del giocatore e, se serve, gli rimanda l'identità giusta;
  - se il Master ha tolto il giocatore dallo scontro, al rientro la scheda si sblocca e viene reinviata in automatico: il Master la riaccetta e i PF tornano a sincronizzarsi;
  - toccare "Chi sei?" con la scheda bloccata ora mostra un messaggio invece di non fare nulla.

## Novità v11

- **Modifica oggetti**: corretto il salvataggio (il modulo di modifica usava gli stessi nomi dei campi del modulo di aggiunta).
- **Modifica incantesimi e trucchetti**: tasto **Modifica** su ogni incantesimo (nome, livello, tempo di lancio, gittata, componenti, durata, concentrazione, rituale, danno o cura, effetti, note).
- **Ritiri con etichetta**: i pulsanti che compaiono dopo un tiro non sono più bianchi e dicono da dove vengono (Ispirazione eroica, talento, specie, classe, sottoclasse, background). I danni extra sono in rosso con la loro origine.
- **Ira con contatore** (regole 2024): usi per livello (2/3/4/5/6), consumo a ogni Ira, durata massima 10 minuti (100 round) con conto alla rovescia. L'Ira finisce da sola se non la prolunghi (attacco contro un nemico, TS imposto o azione bonus; dal livello 15 con Ira persistente dura i 10 minuti). Gli usi tornano con il riposo lungo.
- **Durate**: riquadro per le abilità a tempo, 1 minuto = 10 round. Scende di un round a ogni round del combattimento live; fuori dal live c'è il tasto Round successivo. Si possono aggiungere timer a mano.
- **Stregone**: Punti Stregoneria (livello 2+, uguali al livello) con consumo, Magia innata (2 usi, 1 minuto, a livello 7 anche con 2 PS), Fonte di magia (slot, PS) e riquadro **Metamagia** con le 10 opzioni, il costo, la descrizione e il tasto Usa. Le Metamagie conosciute sono 2, poi 4 al 10, 6 al 17: salendo di livello si apre la scelta.
- Il riposo lungo azzera Ira, Magia innata, Punti Stregoneria e durate.

## Novità v10

- **Armi modificabili**: nella scheda, in ogni arma aggiunta c'è il tasto **Modifica** (nome, dadi, caratteristica, bonus magico, tipo di danno, proprietà, peso). Il controllo del peso trasportabile resta attivo.
- **Oggetti usabili in battaglia**: nel modulo "Aggiungi oggetto" (e nel Negozio del Master) c'è l'opzione **Usabile in battaglia (si consuma)**, con dadi ed effetto (cura / danno / altro). Anche gli oggetti già presenti si possono impostare dal tasto **Mod.**. Le pozioni di cura vengono riconosciute da sole. Durante il live compare il tasto **Usa**: tira i dadi, manda il risultato al Master e toglie l'oggetto dallo zaino (la quantità scende anche dopo lo sblocco della scheda).
- **PF sempre aggiornati**: quando il Master applica danni o cure, la scheda del giocatore si aggiorna in tempo reale (PF, PF temporanei, a terra, morto, tiri contro la morte). Sul telefono del Master i PF dei personaggi vengono riscritti nelle loro schede anche a fine scontro.
- **Collegamento live più solido**:
  - controllo continuo della connessione: se il telefono dorme o cambia rete e il collegamento resta "finto aperto", l'app se ne accorge e si ricollega da sola (anche al ritorno in primo piano);
  - due broker usati **in parallelo**, così Master e giocatori non finiscono su server diversi e non smettono di vedersi;
  - risolti i rimbalzi blocca/sblocca della scheda dopo uno scontro e lo sblocco "fantasma" che arrivava da un messaggio vecchio conservato dal broker all'inizio del nuovo scontro;
  - gli aggiornamenti vecchi non sovrascrivono più quelli nuovi.

## Novità v9

- **Sblocco manuale dal Master**: nel pannello "Combattimento live", sotto l'elenco giocatori, ora c'è un tasto **Sblocca** per ogni giocatore e un tasto **Sblocca tutte le schede**. Usa lo stesso canale dello sblocco automatico (fin scontro), quindi se quello automatico non arriva al giocatore, il Master lo forza con un tap: il giocatore riceve la notifica "Sbloccata" e la sua scheda si sblocca subito (funziona anche se il giocatore era offline: appena si ricollega lo snapshot lo sblocca).
- **Aggiornamenti affidabili**: nuovo service worker "network-first" — l'app controlla GitHub ad ogni apertura/ritorno in primo piano; se c'è una versione nuova compare il banner **"Aggiornamento disponibile"** con il tasto *Aggiorna ora* (niente più cache bloccata dopo aver sostituito i file). In basso a destra vedi sempre la **versione** installata (es. "Scheda D&D v10").

## Pubblicare una nuova versione (importante!)

1. Modifica i file che ti servono.
2. **Cambia la versione in UN solo punto**: in `index.html`, riga `<script>window.APP_VER='13'</script>` e il `?v=13` accanto (metti lo stesso numero in entrambi, es. `10`). Serve a forzare il ricaricamento di `app.js` sui telefoni.
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
