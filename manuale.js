/* v16: Manuale dell'avventuriero. Un libro a capitoli in una finestra: indice con ricerca, schede dei capitoli, Avanti/Indietro.
   I conti mostrati "per il tuo personaggio" usano le stesse funzioni della scheda (M, PB, AC, spDC...), così non possono divergere. */
(function(){
var K='ddman';
function e(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function sg(n){n=+n||0;return (n>=0?'+':'')+n}
function ch(){try{return C()}catch(x){return null}}
/* blocchi di pagina */
function box(t,h,k){return '<div class="mbx'+(k?' '+k:'')+'">'+(t?'<b>'+t+'</b>':'')+h+'</div>'}
function ex(h){return box('Esempio',h,'ex')}
function you(f){var c=ch();if(!c)return '';try{var h=f(c);return h?box('Per '+e(c.nm),h,'you'):''}catch(x){return ''}}
function tb(rows,head){return '<table class="mtb">'+(head?'<tr>'+head.map(function(x){return '<th>'+x+'</th>'}).join('')+'</tr>':'')+rows.map(function(r){return '<tr>'+r.map(function(x){return '<td>'+x+'</td>'}).join('')+'</tr>'}).join('')+'</table>'}
function ul(a){return '<ul>'+a.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul>'}
var AB6=['FOR','DES','COS','INT','SAG','CAR'];

var P=[
{id:'via',ic:'d20',t:'Benvenuto',s:'Come è fatta l\'app',h:function(){return '<p class="ml">Questa app è la scheda del tuo personaggio: fa i conti al posto tuo, ma è utile sapere <b>da dove vengono</b> i numeri. Ogni capitolo è breve e si legge in un minuto.</p>'+
 tb([['<b>Scheda</b>','PF, CA, risorse, riposi, esperienza, caratteristiche, tiri salvezza'],['<b>Abilità</b>','le prove (Furtività, Percezione…) e le competenze'],['<b>Armi</b>','attacchi, danni, armatura e scudo'],['<b>Magie</b>','slot, incantesimi, CD e attacco con incantesimi'],['<b>Zaino</b>','oggetti, monete, carico e questo manuale']])+
 box('Come si legge un tiro','<p>Quasi tutto funziona così: tiri <b>1d20</b>, aggiungi un <b>modificatore</b> e confronti il risultato con un numero da battere (la CA del nemico o una CD scelta dal Master). Se lo raggiungi o lo superi, riesci.</p>')+
 '<p class="mu">Tocca un numero sulla scheda per tirarlo: il risultato compare in basso con il dettaglio del calcolo.</p>'}},
{id:'car',ic:'ab',t:'Caratteristiche',s:'I sei punteggi e i modificatori',h:function(){return '<p class="ml">Ogni personaggio ha sei caratteristiche. Il <b>punteggio</b> (di solito da 8 a 20) serve a poco da solo: quello che usi nei tiri è il <b>modificatore</b>.</p>'+
 tb([['<b>FOR</b> Forza','colpire in mischia, Atletica, carico'],['<b>DES</b> Destrezza','CA, iniziativa, armi a distanza, Furtività'],['<b>COS</b> Costituzione','punti ferita, concentrazione'],['<b>INT</b> Intelligenza','Arcano, Indagare, incantesimi del Mago'],['<b>SAG</b> Saggezza','Percezione, Intuizione, incantesimi di Chierico, Druido, Ranger'],['<b>CAR</b> Carisma','Persuasione, Inganno, incantesimi di Bardo, Stregone, Warlock, Paladino']])+
 box('La formula','<p class="mf">modificatore = (punteggio − 10) ÷ 2, arrotondato per difetto</p>'+tb([['8–9','10–11','12–13','14–15','16–17','18–19','20'],['−1','+0','+1','+2','+3','+4','+5']]))+
 ex('<p>DES 15 → (15 − 10) ÷ 2 = 2,5 → <b>+2</b>. INT 9 → (9 − 10) ÷ 2 = −0,5 → <b>−1</b>.</p>')+
 box('Da dove vengono i punteggi','<p>Alla creazione tiri 4d6 e scarti il dado più basso (sei volte), oppure usi la serie standard <b>15, 14, 13, 12, 10, 8</b>. Il background aggiunge +2 a una e +1 a un\'altra (oppure +1 a tre). Alcuni talenti danno +1.</p>')+
 you(function(c){return tb(AB6.map(function(a,i){var p=c.st[i];return [a,p,'<b>'+sg(M(i))+'</b>']}),['','Punteggio','Mod.'])})}},
{id:'pb',ic:'lv',t:'Bonus di competenza',s:'Il numero che cresce con il livello',h:function(){return '<p class="ml">Il bonus di competenza si aggiunge a tutto quello in cui il tuo personaggio è <b>addestrato</b>: armi, abilità, tiri salvezza, incantesimi. Dipende solo dal livello.</p>'+
 box('La formula','<p class="mf">bonus = 2 + (livello − 1) ÷ 4, arrotondato per difetto</p>'+tb([['Liv. 1–4','5–8','9–12','13–16','17–20'],['+2','+3','+4','+5','+6']]))+
 '<p>Non si somma due volte: se una cosa ti dà la competenza da due fonti diverse, il bonus resta uno. Fa eccezione la <b>Maestria</b>, che lo raddoppia (vedi Abilità).</p>'+
 you(function(c){return '<p>Livello '+c.lv+' → bonus di competenza <b>'+sg(PB())+'</b>.</p>'})}},
{id:'abi',ic:'ab',t:'Abilità e competenze',s:'Prove, competenza, Maestria',h:function(){return '<p class="ml">Un\'abilità è un modo specifico di usare una caratteristica: Furtività è Destrezza, Persuasione è Carisma. Quando il Master chiede una prova tiri 1d20 e aggiungi il valore dell\'abilità.</p>'+
 box('La formula','<p class="mf">prova = d20 + mod. della caratteristica + competenza (se ce l\'hai)</p>')+
 ul(['<b>Competente</b> (● nella scheda): aggiungi il bonus di competenza.','<b>Maestria</b>: aggiungi il bonus <b>due volte</b>. La danno ad esempio Ladro e Bardo.','<b>Factotum</b> (Bardo): metà del bonus, arrotondata per difetto, sulle prove in cui non sei competente.','Senza competenza aggiungi solo il modificatore.'])+
 box('Da dove arrivano le competenze','<p>Dalla classe (ne scegli alcune all\'inizio), dal background (due fisse), dalla specie e dai talenti. Ci sono competenze anche per armi, armature, strumenti e tiri salvezza: funzionano allo stesso modo.</p>')+
 ex('<p>Furtività con DES 16 (+3), competente, livello 5 (+3): d20 <b>+6</b>. Con Maestria: d20 <b>+9</b>.</p>')+
 you(function(c){var b=[];SK.forEach(function(s,i){if(c.ps&&c.ps[i])b.push(s[0]+' '+sg(SM(i)))});return b.length?'<p>Sei competente in: '+b.join(', ')+'.</p>':''})}},
{id:'ts',ic:'sh',t:'Tiri salvezza',s:'Resistere a trappole e magie',h:function(){return '<p class="ml">Un tiro salvezza (TS) serve a evitare qualcosa di brutto: una palla di fuoco, un veleno, un incantesimo che ti controlla. Chi ti colpisce sceglie la caratteristica, tu tiri.</p>'+
 box('La formula','<p class="mf">TS = d20 + mod. della caratteristica + competenza (se la tua classe te la dà)</p>')+
 '<p>Ogni classe è competente in <b>due</b> tiri salvezza (● nella scheda). Il risultato deve raggiungere la <b>CD</b> dell\'effetto.</p>'+
 box('Tiri contro la morte','<p>A 0 PF sei a terra. A ogni tuo turno tiri 1d20 senza modificatori: <b>10 o più</b> è un successo, meno è un fallimento. Tre successi: sei stabile. Tre fallimenti: muori. Un <b>20</b> ti rimette in piedi con 1 PF, un <b>1</b> conta come due fallimenti. Se subisci danni a 0 PF è un fallimento automatico.</p>')}},
{id:'vt',ic:'d20',t:'Vantaggio e critici',s:'Due dadi, il 20 e l\'1',h:function(){return box('Vantaggio','<p>Tiri <b>due d20</b> e tieni il più alto. Lo ottieni quando le circostanze ti favoriscono (nemico prono vicino a te, aiuto di un alleato, Ispirazione…).</p>')+
 box('Svantaggio','<p>Tiri due d20 e tieni il <b>più basso</b>. Arriva con condizioni negative, bersagli lontani, esaurimento…</p>')+
 '<p>Vantaggio e svantaggio insieme si <b>annullano</b>, anche se ne hai più di uno da una parte.</p>'+
 box('20 e 1 naturali','<p>Sul tiro per colpire un <b>20</b> sul dado colpisce sempre ed è un <b>critico</b>: tiri due volte i dadi del danno (il bonus fisso una volta sola). Un <b>1</b> manca sempre. Sulle prove e sui TS il 20 e l\'1 non sono automatici.</p>')}},
{id:'ca',ic:'sh',t:'Classe Armatura',s:'Quanto è difficile colpirti',h:function(){return '<p class="ml">La CA è il numero che un nemico deve raggiungere con il suo tiro per colpirti.</p>'+
 tb([['Senza armatura','10 + DES'],['Barbaro senza armatura','10 + DES + COS (anche con scudo)'],['Monaco senza armatura','10 + DES + SAG (senza scudo)'],['Armatura leggera','base + DES'],['Armatura media','base + DES (massimo +2)'],['Armatura pesante','solo la base (la DES non conta)'],['Scudo','+2']],['Situazione','CA'])+
 '<p>Poi si aggiungono bonus magici, talenti e incantesimi (come <i>Scudo</i> o <i>Armatura Magica</i>). Se indossi un\'armatura in cui non sei addestrato hai svantaggio e non puoi lanciare incantesimi.</p>'+
 you(function(c){return '<p>CA attuale: <b>'+AC()+'</b> (DES '+sg(M(1))+').</p>'})}},
{id:'ini',ic:'go',t:'Iniziativa, velocità, sensi',s:'Chi agisce prima e cosa noti',h:function(){return box('Iniziativa','<p class="mf">d20 + mod. DES</p><p>Il talento Allerta aggiunge anche il bonus di competenza. Si agisce dal risultato più alto al più basso.</p>')+
 box('Percezione passiva','<p class="mf">10 + Percezione</p><p>È quello che noti senza cercare: il Master la confronta con la Furtività dei nemici e con gli indizi nascosti. Vantaggio +5, svantaggio −5.</p>')+
 box('Velocità','<p>Quanti metri ti muovi nel tuo turno, di solito 9 m. Puoi spezzare il movimento prima e dopo l\'azione. Ogni livello di esaurimento la riduce di 1,5 m.</p>')+
 you(function(c){return '<p>Iniziativa '+sg(M(1))+'+eventuali bonus, Percezione passiva <b>'+(10+SM(11))+'</b>.</p>'})}},
{id:'pf',ic:'hp',t:'Punti ferita e Dadi Vita',s:'Salute, riposi e guarigione',h:function(){return '<p class="ml">I PF sono quanto puoi incassare prima di cadere. Il massimo dipende dalla classe e dalla Costituzione.</p>'+
 box('Il massimo','<p>Al 1° livello: il valore più alto del tuo Dado Vita + COS. A ogni livello in più: il valore medio del Dado Vita (o un tiro) + COS. Talenti come Robusto aggiungono altri PF.</p>'+tb([['d6','d8','d10','d12'],['Mago, Stregone','Bardo, Chierico, Druido, Ladro, Monaco, Warlock','Guerriero, Paladino, Ranger','Barbaro']]))+
 box('PF temporanei','<p>Uno scudo extra che si consuma per primo. Non si sommano: se ne ricevi altri tieni il valore più alto. Spariscono col riposo lungo.</p>')+
 box('Riposo breve (1 ora)','<p>Spendi quanti Dadi Vita vuoi: ognuno ti cura del tiro del dado + COS. Alcune risorse di classe tornano (ad esempio gli slot del Warlock).</p>')+
 box('Riposo lungo (8 ore)','<p>Torni al massimo dei PF, recuperi tutti i Dadi Vita, gli slot e quasi tutte le risorse. L\'esaurimento scende di un livello.</p>')+
 you(function(c){return '<p>PF '+c.hp+'/'+MH(c)+', Dadi Vita '+(c.hd||0)+'/'+c.lv+'.</p>'})}},
{id:'att',ic:'at',t:'Attacchi con le armi',s:'Colpire e fare danni',h:function(){return box('Tiro per colpire','<p class="mf">d20 + mod. + competenza</p><p>Il modificatore è <b>FOR</b> per le armi da mischia, <b>DES</b> per quelle a distanza. Con le armi <b>Accurate</b> scegli il più alto dei due. La competenza si aggiunge se sei addestrato in quell\'arma.</p>')+
 box('Danni','<p class="mf">dado dell\'arma + lo stesso modificatore</p><p>Con un critico tiri due volte il dado.</p>')+
 ul(['<b>Leggera</b>: dopo un attacco puoi colpire con un\'altra arma Leggera come azione bonus (il tasto <i>Secondaria</i>); a quel danno non aggiungi il modificatore, se è positivo.','<b>Gittata</b>: oltre la prima distanza hai svantaggio, oltre la seconda non puoi tirare.','<b>Due mani, Pesante, Portata, Versatile</b>: limiti e vantaggi dell\'arma, scritti sotto il suo nome.','<b>Padronanza</b>: un effetto extra dell\'arma (Graffio, Vessazione, Spinta…) che puoi usare solo con le armi che hai scelto. Quante dipende dalla classe.'])+
 ex('<p>Pugnale con DES 16 (+3), competente, livello 1 (+2): attacco d20 <b>+5</b>, danno 1d4 <b>+3</b>.</p>')}},
{id:'mag',ic:'ma',t:'Incantesimi',s:'CD, attacco, trucchetti, preparati',h:function(){return '<p class="ml">Ogni classe magica usa una caratteristica per i suoi incantesimi: INT per il Mago; SAG per Chierico, Druido e Ranger; CAR per Bardo, Stregone, Warlock e Paladino.</p>'+
 box('I due numeri della magia','<p class="mf">CD dei tiri salvezza = 8 + competenza + mod.</p><p class="mf">attacco con incantesimi = d20 + competenza + mod.</p><p>Se l\'incantesimo chiede un TS, è il bersaglio a tirare contro la tua CD. Se chiede un attacco, tiri tu contro la sua CA.</p>')+
 box('Trucchetti','<p>Incantesimi di livello 0: li lanci quante volte vuoi, senza slot. Quelli che fanno danni crescono da soli ai livelli <b>5, 11 e 17</b> del personaggio.</p>')+
 box('Incantesimi preparati','<p>Sono quelli che puoi lanciare oggi. Quanti ne puoi avere e di che livello lo dice la tua classe: la scheda Magie mostra il limite in <i>Limiti</i>.</p>')+
 ul(['<b>V, S, M</b>: componenti verbali, somatiche e materiali. Se una componente M ha un costo, devi averla.','<b>Rituale</b> (R): lo lanci in 10 minuti in più senza spendere lo slot.','<b>Concentrazione</b> (C): vedi il capitolo Concentrazione.'])+
 you(function(c){return '<p>Caratteristica '+AB6[SA()]+', CD <b>'+spDC()+'</b>, attacco <b>'+sg(spAtk())+'</b>.</p>'})}},
{id:'slot',ic:'ma',t:'Slot incantesimo',s:'L\'energia per lanciare',h:function(){return '<p class="ml">Gli slot sono le "cariche" della magia. Ogni volta che lanci un incantesimo di livello 1 o superiore spendi uno slot.</p>'+
 ul(['Un incantesimo di livello 2 richiede uno slot di livello <b>2 o più alto</b>.','Con uno slot più alto molti incantesimi diventano più forti (più dadi, più bersagli): sulla scheda trovi i tasti <i>Liv. 3, Liv. 4…</i>','Gli slot tornano tutti con il <b>riposo lungo</b>.','Nella scheda Magie ogni pallino è uno slot: pieno è disponibile, vuoto è usato. Toccalo per segnarlo o recuperarlo.'])+
 box('Warlock: Magia del Patto','<p>Il Warlock ha pochi slot, tutti dello stesso livello (che sale col livello del personaggio), ma li recupera con il <b>riposo breve</b>.</p>')+
 box('Mezzi incantatori','<p>Paladino e Ranger ottengono gli slot più lentamente, e mai oltre il 5° livello.</p>')+
 you(function(c){var s=slots(),r=[];s.forEach(function(n,i){if(n)r.push('Liv. '+(i+1)+': '+Math.max(0,n-((c.us||{})[i+1]||0))+'/'+n)});return r.length?'<p>'+r.join(' · ')+'</p>':'<p>Non hai slot incantesimo.</p>'})}},
{id:'ps',ic:'ma',t:'Punti Stregoneria',s:'I "punti magia" dello Stregone',h:function(){return '<p class="ml">Lo Stregone, dal 2° livello, ha una riserva di <b>Punti Stregoneria</b> (PS) pari al suo livello. Si recuperano con il riposo lungo.</p>'+
 box('Cosa ci fai','<ul><li><b>Metamagia</b>: modifichi un incantesimo mentre lo lanci (più lontano, senza componenti, su due bersagli…). Ogni opzione ha il suo costo in PS.</li><li><b>Slot → PS</b>: sacrifichi uno slot e guadagni tanti PS quanto il suo livello.</li><li><b>PS → slot</b>: crei uno slot spendendo PS.</li></ul>')+
 tb([['Slot da creare','1°','2°','3°','4°','5°'],['Costo in PS','2','3','5','6','7']])+
 '<p>Non puoi creare slot sopra il 5° livello. Nella scheda i PS sono pallini come gli slot: tocca un pallino pieno per spenderne uno.</p>'+
 you(function(c){return isSorc(c)?'<p>PS disponibili: <b>'+spLeft()+'/'+spMax(c.lv)+'</b>.</p>':''})}},
{id:'con',ic:'ma',t:'Concentrazione e durate',s:'Tenere attivo un incantesimo',h:function(){return '<p class="ml">Alcuni incantesimi durano finché ti concentri (segnati con <b>C</b>). Puoi mantenerne <b>uno solo</b> alla volta: lanciarne un altro a concentrazione chiude il primo.</p>'+
 box('Quando la perdi','<ul><li>Se subisci danni fai un TS su <b>Costituzione</b> con CD 10 o metà del danno, se è più alta (massimo 30).</li><li>Se vai a 0 PF o diventi incapacitato.</li><li>Quando decidi tu di smettere.</li></ul>')+
 box('Il tempo nel gioco','<p>1 round = <b>6 secondi</b>, quindi 1 minuto = 10 round. I timer della scheda scendono di un round a ogni turno del combattimento live; fuori dallo scontro usa i tasti +1 round, +1 min, +10 min, +1 h. Il riposo breve fa passare un\'ora.</p>')}},
{id:'ris',ic:'sc',t:'Risorse e riposi',s:'Cosa torna e quando',h:function(){return '<p class="ml">Molte capacità di classe hanno un numero di usi (Ira, Ispirazione bardica, Incanalare Divinità…). Nella scheda sono i pallini sotto <i>Risorse di classe e di specie</i>.</p>'+
 tb([['Riposo breve','PF con i Dadi Vita, slot del Warlock, risorse "riposo breve"'],['Riposo lungo','tutti i PF, tutti i Dadi Vita, tutti gli slot e le risorse, −1 esaurimento, PF temporanei azzerati']],['',''])+
 box('Ispirazione eroica','<p>Un "jolly": quando la hai puoi ritirare un dado appena tirato e tenere il nuovo risultato. Ne hai al massimo una. Gli Umani la recuperano a ogni riposo lungo; il Master la può dare quando giochi bene il personaggio.</p>')}},
{id:'esa',ic:'hp',t:'Condizioni ed esaurimento',s:'Stati che ti ostacolano',h:function(){return box('Esaurimento','<p>Si accumula a livelli, da 1 a 6. Ogni livello toglie <b>2 a tutti i tiri di d20</b> (attacchi, prove, TS) e 1,5 m alla velocità. Al 6° livello si muore. Il riposo lungo ne toglie uno.</p>')+
 tb([['Accecato','non vedi; i tuoi attacchi hanno svantaggio, quelli contro di te vantaggio'],['Affascinato','non puoi attaccare chi ti ha affascinato'],['Afferrato','velocità 0'],['Avvelenato','svantaggio ad attacchi e prove'],['Incapacitato','niente azioni né reazioni'],['Invisibile','vantaggio ai tuoi attacchi, svantaggio a quelli contro di te'],['Paralizzato','incapacitato; chi ti colpisce da vicino fa un critico'],['Prono','a terra: svantaggio ai tuoi attacchi; chi è vicino ha vantaggio contro di te'],['Spaventato','svantaggio finché vedi la fonte della paura; non puoi avvicinarti'],['Stordito','incapacitato, fallisci i TS su FOR e DES'],['Trattenuto','velocità 0, svantaggio ai tuoi attacchi e ai TS su DES']],['Condizione','In breve'])+
 '<p class="mu">Negli incantesimi e nelle armi i nomi delle condizioni sono tasti: toccali per leggere l\'effetto.</p>'}},
{id:'zai',ic:'zn',t:'Zaino, carico e monete',s:'Quanto porti e quanto vale',h:function(){return box('Carico','<p class="mf">capacità = FOR × 7,5 kg × taglia</p><p>La taglia conta 1 per Piccola e Media, 2 per Grande. Classe, specie e background possono aggiungere bonus. Contano armi, armatura, scudo, oggetti e monete; cavalcature e veicoli no.</p>')+
 box('Monete','<p>MR rame, MA argento, ME electrum, MO oro, MP platino.</p>'+tb([['1 MP','=','10 MO'],['1 MO','=','2 ME = 10 MA'],['1 MA','=','10 MR']])+'<p>100 monete pesano 1 kg. Il tasto <i>Converti</i> cambia le monete senza perdere valore.</p>')+
 box('Oggetti magici e sintonia','<p>Alcuni oggetti funzionano solo se sei <b>sintonizzato</b> (un riposo breve passato con l\'oggetto). Puoi essere sintonizzato con <b>3 oggetti</b> al massimo.</p>')+
 you(function(c){return '<p>Carico '+fmt(load(c))+' / '+fmt(cap(c))+' kg.</p>'})}},
{id:'lv',ic:'lv',t:'Esperienza e livelli',s:'Come cresce il personaggio',h:function(){return '<p class="ml">Guadagni punti esperienza (PE) superando sfide. Quando arrivi alla soglia sali di livello: più PF, nuovi privilegi, a volte un talento o un aumento di caratteristica, e il bonus di competenza cresce.</p>'+
 tb([[1,'0'],[2,'300'],[3,'900'],[4,'2.700'],[5,'6.500'],[6,'14.000'],[7,'23.000'],[8,'34.000'],[9,'48.000'],[10,'64.000'],[11,'85.000'],[12,'100.000'],[13,'120.000'],[14,'140.000'],[15,'165.000'],[16,'195.000'],[17,'225.000'],[18,'265.000'],[19,'305.000'],[20,'355.000']].map(function(r){return [r[0],r[1]]}),['Livello','PE totali'])+
 '<p>Scrivi i PE guadagnati nella Scheda, sotto i riposi: quando basta l\'app ti propone il passaggio di livello.</p>'}},
{id:'liv',ic:'cb',t:'Combattimento e live',s:'Il tuo turno, il Master, la condivisione',h:function(){return box('Nel tuo turno','<ul><li><b>Movimento</b> fino alla tua velocità.</li><li><b>Un\'azione</b>: attaccare, lanciare un incantesimo, Scattare, Disimpegnarsi, Schivare, Aiutare, Nascondersi…</li><li><b>Un\'azione bonus</b>, se qualcosa te la concede.</li><li><b>Una reazione</b> per round, anche nel turno degli altri (es. attacco di opportunità).</li></ul>')+
 box('Combattimento live','<p>Il Master avvia la condivisione dalla scheda Scontro; tu entri con <i>Unisciti al combattimento live</i> dalla schermata iniziale. Vedi turni, PF ed effetti in tempo reale; durante lo scontro la tua scheda è bloccata per le modifiche importanti e si sblocca quando il Master chiude.</p>')+
 box('Strumenti del Master','<p><b>Forgia</b> crea mostri e gruppi bilanciati sui PE, <b>Scontro</b> gestisce iniziativa e turni, <b>Eventi</b> tira sulla tabella d100, <b>Negozio</b> vende e compra oggetti.</p>')}},
{id:'app',ic:'pal',t:'Salvare e personalizzare',s:'Backup, altri telefoni, aspetto',h:function(){return box('Salva e importa','<p>Dalla schermata iniziale. Salvi giocatori o mostri in un file (anche con l\'aspetto, se spunti la casella) e lo importi su un altro telefono. I dati vivono <b>solo nel tuo telefono</b>: fai un salvataggio ogni tanto.</p>')+
 box('Personalizza','<p>Tema, colori, contorni, carattere e immagini per sfondo, riquadri, pulsanti, finestre e barra. Il <i>velo</i> rende le immagini più tenui per leggere meglio. Puoi spegnere le animazioni e l\'accorciamento dei testi lunghi.</p>')+
 '<p class="mu">L\'app funziona anche offline. Quando esce una versione nuova compare l\'avviso <i>Nuova versione pronta</i>.</p>'}}
];

var IC={
 d20:'<path d="M12 2.5l8.2 4.75v9.5L12 21.5l-8.2-4.75v-9.5z"/><path d="M12 2.5L7.2 15h9.6zM7.2 15L12 21.5l4.8-6.5"/>',
 ab:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
 lv:'<path d="M4 18l5-5 4 4 7-8"/><path d="M15 9h5v5"/>',
 sh:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/>',
 go:'<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
 hp:'<path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z"/>',
 at:'<path d="M20.5 3.5v4.5L10 18.5 5.5 14 16 3.5z"/><path d="M7 16l-3.5 3.5 1 1L8 17"/>',
 ma:'<path d="M11 3l1.8 5.2L18 10l-5.2 1.8L11 17l-1.8-5.2L4 10l5.2-1.8z"/>',
 sc:'<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5"/>',
 zn:'<path d="M5.5 8.5h13l-1 12.5h-11z"/><path d="M9 8.5V6.5a3 3 0 016 0v2"/>',
 cb:'<path d="M5 5l14 14M19 5L5 19"/>',
 pal:'<circle cx="12" cy="12" r="9"/><circle cx="8" cy="10" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16" cy="10" r="1"/>',
 book:'<path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z"/><path d="M4 19V5M8 7h7M8 10h5"/>',
 l:'<path d="M15 5l-7 7 7 7"/>',r:'<path d="M9 5l7 7-7 7"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',grid:'<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',srch:'<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/>'};
function ic(k){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(IC[k]||'')+'</svg>'}

var cur=-1,q='';
try{var sv0=localStorage.getItem(K);if(sv0!=null&&P[+sv0])cur=+sv0}catch(x){}
function remember(){try{localStorage.setItem(K,String(cur))}catch(x){}}
function txt(p){var d=document.createElement('div');try{d.innerHTML=p.h()}catch(x){}return (p.t+' '+p.s+' '+d.textContent).toLowerCase()}
function shell(body,foot){var mo=document.getElementById('mo');if(!mo)return;var had=!!mo.querySelector('.ov.bko');
 mo.innerHTML='<div class="ov bko" onclick="if(event.target==this)manClose()"><div class="sh bk" role="dialog" aria-label="Manuale dell\'avventuriero"><div class="bkh"><span class="bkl">'+ic('book')+'<span><b>Manuale dell\'avventuriero</b><small>'+(cur<0?'Indice':'Capitolo '+(cur+1)+' di '+P.length)+'</small></span></span><span class="bkb">'+(cur>=0?'<button class="b o ico" onclick="manGo(-1)" aria-label="Indice" title="Indice">'+ic('grid')+'</button>':'')+'<button class="b o ico" onclick="manClose()" aria-label="Chiudi" title="Chiudi">'+ic('x')+'</button></span></div>'+body+(foot||'')+'</div></div>';
 if(had){var o=mo.querySelector('.ov');if(o)o.classList.remove('in')}}
function index(){var list=P.map(function(p,i){return {p:p,i:i}}).filter(function(o){return !q||txt(o.p).indexOf(q)>=0});
 shell('<div class="bkp bki"><p class="ml">Tocca un capitolo per aprirlo. Ogni pagina spiega una cosa sola, con un esempio e i numeri del tuo personaggio.</p><label class="bks">'+ic('srch')+'<input type="search" placeholder="Cerca: CA, slot, Furtività, riposo…" value="'+e(q)+'" oninput="manQ(this.value)"></label><div class="bkg">'+(list.map(function(o){return '<button class="bkc" onclick="manGo('+o.i+')"><span class="bkn">'+(o.i+1)+'</span>'+ic(o.p.ic)+'<b>'+o.p.t+'</b><small>'+o.p.s+'</small></button>'}).join('')||'<p class="mu">Nessun capitolo trovato.</p>')+'</div></div>')}
function page(){var p=P[cur],h='';try{h=p.h()}catch(x){h='<p class="mu">Questa pagina non si apre.</p>'}
 var tabs='<div class="bkt" role="tablist">'+P.map(function(o,i){return '<button role="tab" class="'+(i==cur?'on':'')+'" onclick="manGo('+i+')" aria-label="'+e(o.t)+'">'+ic(o.ic)+'<span>'+o.t+'</span></button>'}).join('')+'</div>';
 shell(tabs+'<div class="bkp" id="bkp"><div class="bkhd"><span class="bkn">'+(cur+1)+'</span><div><h2>'+p.t+'</h2><small>'+p.s+'</small></div></div>'+h+'</div>',
  '<div class="bkf"><button class="b o" onclick="manGo('+(cur-1)+')" '+(cur<=0?'disabled':'')+'>'+ic('l')+'<span>'+'Indietro'+'</span></button><span class="bkd">'+P.map(function(o,i){return '<i class="'+(i==cur?'on':'')+'"></i>'}).join('')+'</span><button class="b" onclick="manGo('+(cur+1)+')" '+(cur>=P.length-1?'disabled':'')+'><span>'+(cur<P.length-1?'Avanti':'Fine')+'</span>'+ic('r')+'</button></div>');
 var t=document.querySelector('.bkt .on');if(t&&t.scrollIntoView)try{t.scrollIntoView({block:'nearest',inline:'center'})}catch(x){}}
function draw(){if(cur<0)index();else page()}
window.manOpen=function(i){if(i!=null&&P[i])cur=i;draw()};
window.manGo=function(i){cur=i<0?-1:Math.min(P.length-1,i);remember();draw();var b=document.querySelector('.bk');if(b)b.scrollTop=0;var p=document.getElementById('bkp');if(p){p.classList.remove('flip');void p.offsetWidth;p.classList.add('flip')}};
window.manQ=function(v){q=String(v||'').trim().toLowerCase();var a=document.activeElement,pos=a&&a.selectionStart;index();var n=document.querySelector('.bks input');if(n){n.focus();try{n.setSelectionRange(pos,pos)}catch(x){}}};
window.manClose=function(){var mo=document.getElementById('mo');if(mo)mo.innerHTML=''};
document.addEventListener('keydown',function(ev){if(!document.querySelector('.bko'))return;if(ev.key=='Escape')manClose();else if(cur>=0&&ev.key=='ArrowRight')manGo(cur+1);else if(cur>=0&&ev.key=='ArrowLeft'&&cur>0)manGo(cur-1)});
/* scorrere col dito tra le pagine */
var sx=null,sy=0;document.addEventListener('touchstart',function(ev){if(!ev.target.closest||!ev.target.closest('#bkp'))return;sx=ev.touches[0].clientX;sy=ev.touches[0].clientY},{passive:true});
document.addEventListener('touchend',function(ev){if(sx==null)return;var dx=ev.changedTouches[0].clientX-sx,dy=ev.changedTouches[0].clientY-sy;sx=null;if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.5&&cur>=0){if(dx<0&&cur<P.length-1)manGo(cur+1);else if(dx>0&&cur>0)manGo(cur-1)}},{passive:true});
window.manCard=function(){return '<button class="mcard" onclick="manOpen()"><span class="mci">'+ic('book')+'</span><span class="mct"><b>Manuale dell\'avventuriero</b><small>Come funziona tutto: caratteristiche, competenze, CA, slot, Punti Stregoneria, riposi e altro, in '+P.length+' capitoli brevi.</small></span>'+ic('r')+'</button>'};
})();
