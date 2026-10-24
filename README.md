# Scheda D&D — PWA

Scheda personaggio per D&D, installabile come app sul telefono via web.

## Novità v18

- **Schermata iniziale senza scorrimento**: l'altezza tiene conto dei margini della barra di stato e della barra dei gesti (prima si sommavano e la pagina scorreva come una tendina) e gli spazi si stringono sugli schermi bassi; niente più rimbalzo quando non c'è niente da scorrere. Le pagine senza barra delle sezioni non lasciano più spazio vuoto in fondo.
- **Pallini tondi**: esaurimento, slot e risorse non vengono più allungati in ellissi dalla griglia dei pulsanti.

## Novità v17

- **Combattimento live, protocollo 2** (tutti i telefoni devono avere questa versione: le versioni vecchie non si vedono più con quelle nuove):
  - ogni giocatore crea, entrando in una stanza, chiavi sue: una per firmare e una per cifrare. Il Master lega ogni giocatore alla sua chiave al primo messaggio, quindi nessuno può più mandare tiri, schede o profili a nome di un altro;
  - profilo, tiri, scheda, accettazione e ricompense sono cifrati con una chiave che conoscono solo quel giocatore e il Master (ECDH P-256 + HKDF + AES-GCM): gli altri giocatori della stanza non li leggono. Lo stato dello scontro resta visibile a tutta la stanza, firmato dal Master;
  - ogni messaggio ha un contatore che può solo crescere: un messaggio ricopiato e rimandato (replay) viene ignorato; il Master accetta solo messaggi firmati, i giocatori solo stati firmati dal Master;
  - i broker non vedono più stanza e identificativi: i topic sono codici derivati con un hash dal link;
  - quattro broker pubblici, tre collegati insieme: se uno cade gli altri continuano.
- **Sicurezza** (verificata con attacchi di prova):
  - aprendo un link live l'app conserva l'impronta del Master contenuta nel link (prima la perdeva, e un giocatore della stanza poteva spacciarsi per il Master) e chiede conferma prima di entrare in una stanza nuova;
  - entrando in una stanza nuova la scheda non parte più da sola: va scelta di nuovo;
  - i pacchetti troppo grandi dal broker vengono saltati senza riempire la memoria, e i messaggi oltre la dimensione prevista per il loro tipo non vengono nemmeno decifrati;
  - Content Security Policy: la pagina può caricare solo i propri file e collegarsi solo ai broker del live, quindi niente script, immagini o invii di dati verso altri server;
  - i testi salvati nel telefono vengono ripuliti come quelli importati (niente HTML nei nomi).
- **Descrizioni nuove per tutti i 335 incantesimi** (incantesimi.js): cosa fanno, che tiro serve e cosa succede se riesce, più come crescono (slot superiore o livelli 5, 11, 17 per i trucchetti). Nella lista si leggono aprendo l'incantesimo.
- **Anteprima in Aggiungi incantesimo**: scegliendo dalla lista vedi subito livello, lancio, gittata, durata, componenti, effetto, descrizione, crescita, classi che lo hanno e se è già nella tua lista.
- **Manuale dell'avventuriero** (in fondo allo Zaino, manuale.js): 20 capitoli brevi in una finestra a libro, con indice, ricerca, schede dei capitoli, Indietro/Avanti e scorrimento col dito. Spiega caratteristiche, competenza, abilità, TS, vantaggio, CA, iniziativa, PF e Dadi Vita, attacchi, incantesimi, slot, Punti Stregoneria, concentrazione, riposi, condizioni, carico e monete, livelli, combattimento e live, salvataggi; dove serve mostra i numeri del tuo personaggio.
- **Lista dei personaggi rifatta**: una scheda per eroe con avatar colorato (iniziali e livello), classe e specie, barra dei PF; si tocca la scheda (o la freccia) per giocare; Modifica, Duplica ed Elimina in una barra sola sotto. In fondo "Nuovo personaggio" e "Contenuti personalizzati"; Esci e Personalizza in alto.
- **Righe di pulsanti a colonne uguali**: se quattro pulsanti non stanno in fila diventano 2x2, mai tre più uno da solo a capo (es. Attacco, Danno, Secondaria, Modifica nelle Armi). Provato anche con caratteri grandi.
- **Avviso di aggiornamento nuovo**: riquadro coi colori del tema, icona animata, "Più tardi" e "Aggiorna ora".
## Novità v16

- **Icona nuova**: d20 d'oro sfaccettato dentro un cerchio runico, su viola notte con scintille (sorgente in icons/icon.svg). Sul telefono l'icona già installata si aggiorna quando il sistema rilegge il manifest; su iPhone serve togliere e rimettere l'app nella Home.
- **Animazioni**: pulsanti che si schiacciano e lasciano un'onda al tocco, schermate che entrano con una leggera dissolvenza a cascata, finestre che salgono dal basso, messaggi dei dadi che compaiono con un piccolo rimbalzo, PF che pulsano quando cambiano, icona della sezione che salta, sezioni a scomparsa che si aprono morbide, emblema e tasto Giocatore animati nella schermata iniziale. Si spengono da Personalizza o con "riduci movimento" del telefono.
- **Aspetto nei salvataggi**: in Salva e importa c'è "Solo l'aspetto" (tema, colori e immagini in un file a parte) e, salvando giocatori o mostri, la casella "Includi l'aspetto". Importando un file che lo contiene puoi scegliere se applicarlo. Il tema importato viene controllato: valori sconosciuti scartati, solo immagini png/jpeg/webp/gif.
- **Schermata iniziale nuova**: titolo centrato "Tomo dell'Avventuriero" con emblema a d20, Salva e importa e Personalizza in alto, ruoli Giocatore e Master come due schede affiancate con descrizione, combattimento live sotto.
- **Barra delle sezioni** con un'icona per ogni sezione (Scheda, Abilità, Armi, Magie, Zaino; Forgia, Scontro, Eventi, Negozio) e la sezione attiva evidenziata da una pillola colorata.
- **Personalizza l'aspetto** (tasto 🎨 nella schermata iniziale e in alto nella scheda e nel Master): 9 temi (Automatico, Chiaro, Scuro, Pergamena, Notte arcana, Foresta, Brace di drago, Abissi, Inchiostro), i 7 colori modificabili uno per uno (sfondo, riquadri, testo, testo secondario, pulsanti, PF, contorni), spessore dei contorni, angoli e carattere dei titoli.
- **Immagini personalizzate** per sfondo dell'app, riquadri, pulsanti, finestre a comparsa e barra in basso, ciascuna con un "velo" regolabile che la tiene leggibile. Le immagini vengono rimpicciolite e salvate in IndexedDB, separate dai personaggi: non riempiono lo spazio dei salvataggi. Non sono incluse in "Salva e importa".
- **Pulsanti che non vanno più a capo**: restano su una riga e il testo accanto si stringe; vanno su due righe solo quando da soli non ci starebbero (prima: "+ Tabella" negli Eventi, intestazioni dei riquadri).
- **Descrizioni lunghe accorciate** a 3 righe con "Mostra tutto" (si può disattivare dal pannello); lo stato aperto resta anche quando la schermata si ridisegna.
- **Ordine dei turni** più leggibile: nome su una riga, PF e CA sotto quando non c'è spazio. Tiri salvezza in una griglia 3×2.
- **Testo leggibile sui pulsanti** anche col tema scuro (prima era bianco su verde chiaro).
- La scritta della versione non copre più la barra in basso: si vede nella schermata iniziale e nel pannello Aspetto.
- **Corretto**: `style.css` non veniva caricato, quindi i pulsanti "Ritira il dado", i riquadri dei timer e le barre non avevano stile. Ora tutto lo stile sta in `style.css`.

## Novità v15

- **Timer**: lanciando un incantesimo con una durata parte il suo timer (C = concentrazione: un nuovo incantesimo a concentrazione chiude il precedente). Fuori dallo scontro ci sono +1 round, +1 min, +10 min e +1 h. Il riposo breve fa passare un'ora a tutti i timer (prima cancellava solo quelli brevi). Verificati Ira, Ira persistente, Magia innata, timer nel live e durate degli effetti lato Master.
- **Forgia**: budget di PE in alto, opzione del capo (miniboss/boss) a scomparsa, riquadro Gruppo con totale di PE rispetto al budget, Manda tutti e Svuota; ogni mostro è una riga con il tasto Scontro, il resto si apre toccando il nome.
- **Eventi**: tabella compatta con le fasce del d100, catalogo con l'elenco a scomparsa, drop invariato.
- **Negozio**: ricerca, categoria e ordinamento in un riquadro; senza filtri le categorie sono sezioni da aprire con il loro conteggio; ogni oggetto è una riga con prezzo, peso e Vendi, il resto si apre toccando il nome.
- **Pesi realistici**: 124 oggetti corretti (valori PHB 2024 dove esistono, stime realistiche per il resto: gemme e anelli non pesano più 0, mantelli e stivali 1 kg, munizioni in proporzione, armature magiche come la loro base, mithral a metà peso, libri 2,5 kg), 27 materiali degli incantesimi con un peso proprio. Le copie già nel negozio e negli zaini si aggiornano, tranne quelle cambiate a mano.
- **Cavalcature e veicoli** non contano più nel carico (li porta la cavalcatura): nello Zaino stanno in una sezione a parte e si possono comprare anche se pesano più di quanto il personaggio regge.
- **Corretto**: le munizioni di cerbottana e armi da fuoco del negozio ora vengono consumate (prima i nomi non corrispondevano). Borsa conservante e Bottiglia di vetro con la descrizione giusta, chiodi da arrampicata a 0,5 MO.

## Novità v14

- **Punti Stregoneria come gli slot**: un pallino per punto; tocca un pallino pieno per spendere un punto, uno vuoto per recuperarlo. Spariti i tasti -1 e +1.
- **Durate: 1 round = 6 secondi** (regola ufficiale), quindi 1 minuto = 10 round. Ira 100 round (10 minuti), Magia innata 10 round (1 minuto); i timer a mano si impostano in minuti, round o ore e mostrano anche il tempo reale (es. "15 round (1 min 30 s)"). I timer salvati con la v12-v13 (1 minuto = 1 round) vengono convertiti da soli.
- **Zaino riordinato**: riquadro "Zaino" con gli oggetti in righe compatte (nome, quantità, peso, tasti − e +, "Usa" durante il live); tocca il nome per vedere descrizione e dettagli. "+ Aggiungi oggetto" e "Materiali degli incantesimi" sono in fondo allo stesso riquadro. Poi "Oggetti magici" con la sintonia, le Monete e il Carico.
- **Personalizzati modificabili**: in "Personalizzati" ogni classe (con sottoclassi), specie, background e talento creato ha il tasto **Modifica**, con il modulo già compilato. Le modifiche valgono subito per i personaggi che li usano; nomi di talenti e sottoclassi cambiati vengono aggiornati anche nelle schede.
- **Bonus agli incantesimi automatici**: niente più "Danno bonus" a mano. Attacco, CD e danni fissi degli incantesimi si calcolano da caratteristica, competenza, tratti, privilegi e talenti (nuovi effetti DANI, ATTI, CDI nei personalizzati); la Magia innata attiva dà +1 alla CD. Il riquadro "Bonus agli incantesimi" mostra da dove arriva ogni bonus. Il vecchio valore scritto a mano non viene più usato.
- **Riposo breve**: spendi i Dadi Vita uno alla volta e al termine tornano le risorse giuste (Ira 1 uso, Ispirazione bardica dal 5°, Incanalare divinità 1 uso, Forma selvatica 1 uso, Recuperare energie 1 uso, Azione impetuosa, Punti Ferocia, Dadi di superiorità, Colpo di fortuna, slot del patto, Ripristino stregonesco una volta, Recupero arcano del Mago a scelta). Il **riposo lungo** ora ridà tutti i Dadi Vita (regola 2024) e toglie un livello di esaurimento.
- **Risorse di classe e di specie** con i pallini: anche Indomito, Metabolismo straordinario, Imposizione delle mani (riserva di PF), Nemico prescelto, Astuzia magica (recupera davvero gli slot del patto), Intervento divino, Punizione divina gratuita, Instancabile, Velo della natura, Arcanum mistico, Dadi psionici, e per le specie Soffio, Volo draconico, Adrenalina, Resistenza implacabile, Mani guaritrici, Rivelazione celestiale, Discendenza gigante, Forma grande, Percezione tellurica.
- **Esaurimento** con 6 pallini: -2 per livello a tutti i tiri d20 (anche nel live) e -1,5 m di velocità; al 6 si muore.
- **Incantesimi**: 54 corretti secondo le regole 2024 (classi, gittate, componenti, durate, concentrazione, danni), 6 doppioni tolti, Punizione Marchiante diventa Punizione Splendente. Le copie già salvate nelle schede si aggiornano da sole, ma solo nei campi che non hai cambiato tu. **Slot superiori**: i dadi aumentano davvero (52 incantesimi) e nei dettagli dell'incantesimo puoi scegliere con che slot lanciarlo.
- **Talenti e tratti 2024**: descrizioni aggiornate (Armi Possenti, Tiratore Scelto, Fortunato, Mente Acuta, Maestro di Scudi, Ammazzamaghi, armature, Furtivo, Incantatore Rituale, Osservatore, Durevole, tratti di Goliath, Gnomo, Nano, Aasimar), aumenti di caratteristica mancanti, nuovi Maestro delle Due Armi e Maestro Armature Pesanti; all'Aumento dei punteggi si possono scegliere anche i talenti di origine. Il Draconico è una lingua standard.
- **Regole corrette**: CA del Monaco senza scudo; Movimento veloce ed Errante solo senza armatura pesante, velocità del Monaco solo senza armatura né scudo; Duellare +2 solo con armi da mischia a una mano; a 0 PF un critico conta 2 fallimenti e il danno che supera i PF massimi uccide; Evocazione potenziata dal 10°; privilegi di classe/sottoclasse sistemati (Bardo, Stregone, Warlock, Druido, Ranger, Monaco, Maestro di Battaglia, Cavaliere Mistico, Gloria, Antichi, Ombra, Magia selvaggia, domini Inganno e Guerra); incantesimi preparati dello Stregone 2024.
- **Armi**: Padronanza 2024 su ogni arma per le classi che la hanno (tocca per la descrizione), avviso di svantaggio con armi Pesanti sotto FOR/DES 13, Lancia da cavaliere corretta.
- **Negozio**: pozioni con azione bonus, prezzi e pesi di Cassa, Sella da guerra e Barde.
- **Corretto un bug della v13**: all'avvio la v13 cancellava le competenze nelle abilità delle schede. Ora quelle del background tornano da sole e nella scheda Abilità compare un riquadro per riscegliere quelle di classe (quelle di specie o talenti si riaggiungono in fondo, come prima).
- **Tratti di specie e privilegi di 1° livello**: nel 2024 si hanno tutti. Nella creazione partono già spuntati (prima partivano vuoti e chi non li spuntava restava senza); le schede salvate senza nessuno spuntato li riottengono tutti.
- **Abile (Umano) e Sensi acuti (Elfo)**: la scheda Abilità chiede l'abilità da scegliere e assegna la competenza.
- **Strumenti**: nella scheda, sotto Lingue, le competenze negli strumenti del background e della classe.
- **Equipaggiamento iniziale**: un personaggio nuovo sceglie nello Zaino il pacchetto del background (armi, oggetti e monete) oppure 50 MO.
- **61 incantesimi nuovi** dell'SRD 2024 (livelli 1-5, più gli Evocare usati dalle sottoclassi).
- **Armi**: senza competenza nell'arma non si aggiunge il bonus di competenza (lo dice anche la scheda); le armi a munizioni consumano frecce, quadrelli e proiettili dallo zaino (il ritiro con l'Ispirazione non ne consuma altre) e "Recupera munizioni" ridà la metà di quelle tirate; con due armi Leggere c'è il tasto **Secondaria** (azione bonus, senza modificatore ai danni salvo lo stile Combattente con Due Armi). Padronanze con i nomi italiani: Doppio Fendente, Colpo di Striscio, Graffio, Spinta, Fiaccare, Lentezza, Rovesciamento, Vessazione.
- **Sottoclassi**: incantesimi di Meccanica, Draconico, Celestiale, Cacciatore delle Ombre, Vagabondo Fatato, Grande Antico e Circolo del Mare; Assassino 9°, Cacciatore delle Ombre 11°, Glamour 3° e 14°, Inganno 17°; Mago con Adepto dei rituali; Punire divino 2024; Mago con 25 incantesimi preparati al 20°. Pesi e prezzi dei pacchetti del negozio secondo il 2024.
- **Modifica oggetto in un solo modulo**: nome, quantità, peso, descrizione, oggetto magico, uso in battaglia ed Elimina (prima erano sparsi tra Mod. e Descr.). Il controllo del peso trasportabile resta attivo; togliendo "Oggetto magico" si toglie anche la sintonia.

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
2. **Cambia la versione in UN solo punto**: in `index.html`, riga `<script>window.APP_VER='15'</script>` e il `?v=15` accanto (metti lo stesso numero in entrambi, es. `10`). Serve a forzare il ricaricamento di `app.js` sui telefoni.
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
