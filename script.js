/* Le Labo des Savoirs – La Seconde Guerre mondiale */
(function () {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const A = 'assets/';
const store = {
  get(k) { try { return localStorage.getItem('sgm_' + k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem('sgm_' + k, v); } catch (e) {} }
};
let done = {};
try { done = JSON.parse(store.get('done') || '{}'); } catch (e) { done = {}; }
function markDone(id) { if (!done[id]) { done[id] = 1; store.set('done', JSON.stringify(done)); } updateProgress(); }
function updateProgress() {
  const all = $$('[data-point]');
  const n = all.filter(e => e.classList.contains('done')).length;
  $('#pgtxt').textContent = n + ' / ' + all.length;
  $('#pgbar').style.width = (all.length ? 100 * n / all.length : 0) + '%';
}
function el(tag, cls, html) { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

/* ---------- Frise d'ensemble ---------- */
const EVENTS = [
  ['#s1', '#f26b1d', '11 novembre 1918', 'Fin de la Première Guerre mondiale'],
  ['#s1', '#f26b1d', '1920', 'Début des années folles'],
  ['#s1', '#f26b1d', '1929', 'Krach boursier : l’Europe devient pauvre'],
  ['#s1', '#f26b1d', '3 septembre 1939', 'Début de la Seconde Guerre mondiale'],
  ['#s3', '#5a8210', '18 juin 1940', 'Appel à la Résistance de De Gaulle'],
  ['#s2', '#1e88e5', '22 juin 1940', 'Armistice signé entre Hitler et Pétain'],
  ['#s3', '#5a8210', '24 octobre 1940', 'Rencontre Hitler–Pétain à Montoire : début de la collaboration'],
  ['#s4', '#1b2a4a', '7 décembre 1941', 'Pearl Harbor : les États-Unis entrent en guerre'],
  ['#s4', '#1b2a4a', '6 juin 1944', 'Débarquement en Normandie'],
  ['#s4', '#1b2a4a', '8 mai 1945', 'Armistice : fin de la guerre en Europe']
];
const tl = $('#tlOverview');
EVENTS.forEach(e => { const a = el('a', '', '<b>' + e[2] + '</b>' + e[3]); a.href = e[0]; a.style.setProperty('--c', e[1]); tl.appendChild(a); });

/* Doc A (séance 2) */
(function () {
  const t = $('#timeA'); if (!t) return;
  const years = [1939, 1940, 1941, 1942, 1943, 1944, 1945];
  years.forEach((y, i) => { const p = 4 + i * 15.3; t.appendChild(el('i', '')).style.left = p + '%'; const em = el('em', '', y); em.style.left = p + '%'; t.appendChild(em); });
  const e1 = el('div', 'ev', '3 sept. 1939 : la France entre en guerre'); e1.style.left = '14%'; e1.style.bottom = '16px';
  const e2 = el('div', 'ev', '22 juin 1940 : armistice'); e2.style.left = '27%'; e2.style.bottom = '48px'; e2.style.background = 'var(--navy)';
  t.appendChild(e1); t.appendChild(e2);
  const lg = el('div', '', ''); lg.style.cssText = 'position:absolute;right:0;top:-8px;font-size:.85rem;font-weight:800;display:flex;gap:6px;align-items:center';
  lg.innerHTML = '<span style="display:inline-block;width:26px;height:14px;border:2px solid var(--navy);background:#fff"></span> La France est occupée par les Allemands (à colorier sur ta frise)';
  t.parentNode.insertBefore(lg, t); lg.style.position = 'static'; lg.style.margin = '0 0 4px';
})();

/* ---------- QCM ---------- */
const TAGS = { que: 'Que s’est-il passé ?', comment: 'Comment ?', pourquoi: 'Pourquoi ?', doc: 'Document', cause: 'Cause' };
const QCM = {
  s1: [
    { t: 'que', q: 'À quelle date s’achève la Première Guerre mondiale ?', o: ['11 novembre 1918', '3 septembre 1939', '22 juin 1940'], a: 0, e: 'La Première Guerre mondiale se termine le 11 novembre 1918. Les Européens veulent ensuite profiter de la vie.' },
    { t: 'comment', q: 'Comment vivent les Européens pendant les années folles (1920-1929) ?', o: ['Ils manquent de nourriture et font la queue', 'Ils font la fête, dansent sur du jazz, vont au spectacle et suivent la mode', 'Ils fuient sur les routes'], a: 1, e: 'Les années folles sont une période d’insouciance : on s’amuse, on danse, on s’intéresse à la mode.' },
    { t: 'pourquoi', q: 'Pourquoi les Européens s’appauvrissent-ils à partir de 1929 ?', o: ['À cause du krach boursier : l’argent perd sa valeur et la crise économique commence', 'À cause de l’invasion de la Pologne', 'À cause des années folles qui ont fait baisser les prix'], a: 0, e: 'Le krach boursier de 1929 déclenche une crise économique qui appauvrit l’Europe.' },
    { t: 'comment', q: 'Quelles sont les conséquences de la crise économique dès 1930 ?', o: ['La vie est moins chère et tout le monde trouve du travail', 'La vie est chère et beaucoup de personnes sont au chômage', 'Les Européens partent s’installer en URSS'], a: 1, e: 'Avec la crise, les prix montent et de nombreuses personnes perdent leur travail : c’est le chômage.' },
    { t: 'que', q: 'Quels dictateurs arrivent au pouvoir, et dans quels pays ?', o: ['Hitler en Allemagne, Mussolini en Italie, Staline en URSS', 'Hitler en Italie, Mussolini en Allemagne, Staline en URSS', 'Hitler en Allemagne, Pétain en France, Staline en Italie'], a: 0, e: 'Hitler dirige l’Allemagne, Mussolini l’Italie et Staline l’URSS.' },
    { t: 'cause', q: 'Pourquoi la crise économique peut-elle aider des dictateurs à arriver au pouvoir ?', o: ['Parce que des personnes pauvres et sans travail sont prêtes à suivre des chefs qui promettent de changer les choses', 'Parce que les gens ont plus d’argent pour voter', 'Parce que la crise rend tout le monde heureux'], a: 0, e: 'C’est une réflexion historique : dans la pauvreté et le chômage, beaucoup de gens sont mécontents et prêts à écouter des chefs autoritaires.' },
    { t: 'que', q: 'Que fait Hitler en 1939, après avoir pris le pouvoir ?', o: ['Il veut conquérir l’Europe et envahit la Pologne', 'Il signe la paix avec la France', 'Il débarque en Normandie'], a: 0, e: 'Hitler veut conquérir l’Europe : il commence par envahir la Pologne.' },
    { t: 'pourquoi', q: 'Pourquoi la France et le Royaume-Uni déclarent-ils la guerre à l’Allemagne le 3 septembre 1939 ?', o: ['Parce qu’Hitler a envahi la Pologne et veut conquérir l’Europe', 'Parce que l’Allemagne a attaqué Pearl Harbor', 'Parce que la France veut conquérir l’Allemagne'], a: 0, e: 'Pour arrêter Hitler qui envahit la Pologne, la France et le Royaume-Uni entrent en guerre : c’est le début de la Seconde Guerre mondiale.' },
    { t: 'doc', q: 'Sur la carte de l’Europe en 1939, quels pays appartiennent à l’Axe ?', img: A + 'europe-1939-allies-axe.png', o: ['Allemagne, Italie, Japon', 'France, Royaume-Uni, URSS', 'Espagne, Pologne, Belgique'], a: 0, e: 'L’Axe est formé par l’Allemagne, l’Italie et le Japon. Les Alliés sont la France, le Royaume-Uni et l’URSS.' }
  ],
  s2: [
    { t: 'que', q: 'Que se passe-t-il entre septembre 1939 et mai 1940 ?', o: ['Les Français tentent de résister aux Allemands, mais le Nord de la France est vite envahi', 'La France est déjà libérée', 'La France signe la paix avec l’URSS'], a: 0, e: 'Malgré les combats (et la ligne Maginot), les troupes allemandes envahissent rapidement le nord de la France.' },
    { t: 'pourquoi', q: 'Pourquoi les Français prennent-ils la route de l’exode ?', o: ['Pour partir en vacances', 'Pour fuir l’invasion allemande', 'Pour rejoindre l’armée allemande'], a: 1, e: 'L’exode, c’est la fuite massive des Français devant l’invasion des troupes allemandes.' },
    { t: 'que', q: 'Qui signe l’armistice avec Hitler le 22 juin 1940 ?', o: ['De Gaulle', 'Pétain', 'Mussolini'], a: 1, e: 'Pétain, chef du gouvernement, signe l’armistice avec Hitler le 22 juin 1940.' },
    { t: 'comment', q: 'Que change l’armistice pour la France ?', o: ['La France gagne la guerre', 'La France n’est plus en guerre mais elle est coupée en deux : une zone occupée et une zone libre', 'La France est entièrement libre'], a: 1, e: 'Le Nord est occupé par les Allemands, le Sud reste une zone libre.' },
    { t: 'doc', q: 'Sur la carte, où se trouve la zone occupée par les Allemands ?', o: ['Au Nord et le long de l’océan Atlantique', 'Seulement dans le Sud-Est', 'Uniquement en Corse'], a: 0, e: 'La zone occupée couvre le Nord et la côte atlantique ; la zone libre est au Sud.' },
    { t: 'doc', q: 'Sur la carte des offensives de 1940, que représentent les grandes flèches noires ?', img: A + 'carte-offensives-1940.png', o: ['Les offensives allemandes', 'Le repli de l’armée franco-britannique', 'La ligne Maginot'], a: 0, e: 'Les flèches noires montrent les offensives allemandes. La ligne Maginot est représentée par un trait crénelé vert.' },
    { t: 'doc', q: 'Que représente la ligne turquoise qui traverse la France sur cette carte ?', img: A + 'carte-offensives-1940.png', o: ['Le cours de la Loire', 'La limite sud de l’occupation allemande fixée lors de l’armistice', 'La frontière avec l’Espagne'], a: 1, e: 'Cette limite sépare la zone occupée au Nord de la zone libre au Sud.' },
    { t: 'comment', q: 'Comment la vie quotidienne change-t-elle à Paris ?', o: ['Rien ne change', 'Les rues sont rebaptisées en allemand et des soldats allemands sont partout', 'Les Allemands quittent la ville'], a: 1, e: 'Les panneaux sont en allemand (voir le panneau « Rue de Rivoli » sur le doc B) et les soldats allemands sont présents partout.' },
    { t: 'pourquoi', q: 'Pourquoi les Français font-ils la queue devant les magasins ?', o: ['Parce que la nourriture manque et que la vie est chère', 'Pour acheter des vêtements à la mode', 'Pour s’engager dans l’armée'], a: 0, e: 'Sous l’Occupation, la nourriture manque : il faut patienter longtemps pour acheter à manger (doc C).' }
  ],
  s3: [
    { t: 'que', q: 'Que lance le général de Gaulle depuis Londres, le 18 juin 1940 ?', o: ['Un appel à poursuivre le combat, diffusé à la radio', 'Un traité de paix', 'Une lettre de dénonciation'], a: 0, e: 'C’est l’Appel du 18 juin : de Gaulle invite les Français à continuer la lutte contre les Allemands.' },
    { t: 'pourquoi', q: 'Pourquoi de Gaulle s’adresse-t-il aux soldats, aux ingénieurs et aux ouvriers de l’armement ?', o: ['Pour qu’ils le rejoignent et que la flamme de la résistance française ne s’éteigne pas', 'Pour leur demander de rendre les armes', 'Pour leur annoncer l’armistice'], a: 0, e: 'Il a besoin d’hommes et d’armes pour continuer le combat. La « flamme de la résistance » ne doit pas s’éteindre.' },
    { t: 'comment', q: 'Comment agissent certains résistants pour lutter contre l’occupation ?', o: ['Ils sabotent des voies de communication, par exemple les voies ferrées', 'Ils dénoncent des voisins', 'Ils s’engagent dans la Milice'], a: 0, e: 'Les résistants font dérailler des trains pour gêner les Allemands (doc 2).' },
    { t: 'que', q: 'Qui se rencontre à Montoire le 24 octobre 1940 ?', o: ['De Gaulle et Churchill', 'Pétain et Hitler', 'Hitler et Mussolini'], a: 1, e: 'Pétain rencontre Hitler à Montoire. Leur poignée de main symbolise le début de la collaboration.' },
    { t: 'que', q: 'Que signifie « collaborer » avec les Allemands ?', o: ['Les combattre en secret', 'Coopérer avec eux et les aider', 'Quitter la France'], a: 1, e: 'Les collaborateurs aident l’occupant allemand, contrairement aux résistants qui le combattent.' },
    { t: 'comment', q: 'Comment certains Français collaborent-ils avec les Allemands ?', o: ['En sabotant des trains', 'En dénonçant des résistants et des Juifs, ou en s’engageant dans la Milice', 'En écoutant la radio de Londres'], a: 1, e: 'Dénoncer ou rejoindre la Milice aide les Allemands à arrêter et à déporter les résistants et les Juifs.' },
    { t: 'pourquoi', q: 'À quoi sert la Milice française ?', o: ['À aider les Allemands à arrêter et déporter les résistants et les Juifs', 'À protéger les résistants', 'À libérer la France'], a: 0, e: 'Des miliciens arrêtent des résistants (doc 4) : ils travaillent pour l’occupant.' },
    { t: 'cause', q: 'Pourquoi De Gaulle et Pétain s’opposent-ils en 1940 ?', o: ['De Gaulle refuse la défaite et appelle à continuer le combat, alors que Pétain signe l’armistice puis collabore', 'Ils sont d’accord sur tout', 'Ils sont tous les deux à Londres'], a: 0, e: 'D’un côté la Résistance (appel du 18 juin), de l’autre la collaboration (Montoire).' }
  ],
  s4: [
    { t: 'que', q: 'Que se passe-t-il le 7 décembre 1941 ?', o: ['Les Japonais attaquent par surprise la base américaine de Pearl Harbor', 'Les Allemands envahissent la Pologne', 'Les Alliés débarquent en Normandie'], a: 0, e: 'L’attaque de Pearl Harbor est une attaque surprise du Japon contre les États-Unis.' },
    { t: 'doc', q: 'Dans quelle partie du globe se situe Pearl Harbor ?', img: A + 'pearl-harbor-carte.png', o: ['En Europe', 'Dans l’océan Pacifique, à Hawaï', 'Dans l’océan Atlantique'], a: 1, e: 'Pearl Harbor est une base navale américaine à Hawaï, dans l’océan Pacifique.' },
    { t: 'pourquoi', q: 'Pourquoi l’attaque de Pearl Harbor est-elle importante dans la guerre ?', o: ['Les États-Unis entrent dans le conflit aux côtés des Alliés', 'Les États-Unis rejoignent l’Axe', 'La guerre se termine'], a: 0, e: 'Après l’attaque, les États-Unis déclarent la guerre : ils rejoignent les Alliés.' },
    { t: 'pourquoi', q: 'Pourquoi parle-t-on de guerre « mondiale » ?', o: ['Parce que de nombreux pays de plusieurs continents (Europe, Asie, Amérique…) sont en guerre', 'Parce que la guerre se passe uniquement en France', 'Parce que tous les pays ont gagné'], a: 0, e: 'La guerre touche l’Europe mais aussi l’océan Pacifique et l’Asie : elle concerne le monde entier.' },
    { t: 'comment', q: 'Qui débarque en Normandie le 6 juin 1944 ?', o: ['Américains, Canadiens et Britanniques', 'Allemands et Italiens', 'Japonais et Américains'], a: 0, e: 'Les Alliés débarquent sur cinq plages : Utah, Omaha, Gold, Juno et Sword.' },
    { t: 'doc', q: 'Sur la carte de la Normandie, quelle armée débarque sur la plage de Juno ?', img: A + 'normandie-carte.png', o: ['Les Canadiens', 'Les Américains', 'Les Allemands'], a: 0, e: 'Les Canadiens débarquent à Juno, les Britanniques à Gold et Sword, les Américains à Utah et Omaha.' },
    { t: 'pourquoi', q: 'Pourquoi les Alliés débarquent-ils en Normandie ?', o: ['Pour repousser les armées allemandes et libérer l’Europe', 'Pour aider les Allemands', 'Pour construire un port'], a: 0, e: 'Le débarquement permet de repousser les Allemands : l’Europe est peu à peu libérée de leur domination.' },
    { t: 'que', q: 'Quand l’Allemagne signe-t-elle sa reddition à Reims ?', o: ['7 mai 1945', '6 juin 1944', '2 septembre 1945'], a: 0, e: 'L’acte de reddition est signé à Reims le 7 mai 1945 ; l’armistice du 8 mai met fin à la guerre en Europe.' },
    { t: 'comment', q: 'Comment la guerre se termine-t-elle ?', o: ['En Europe le 8 mai 1945, puis dans le Pacifique le 2 septembre 1945 avec la capitulation du Japon', 'Partout le même jour', 'Elle ne se termine jamais'], a: 0, e: 'La guerre s’arrête en deux temps : l’Europe d’abord, le Pacifique ensuite.' }
  ],
  bilan: [
    { t: 'pourquoi', q: 'Quelle est la cause directe du début de la guerre en 1939 ?', o: ['L’invasion de la Pologne par Hitler', 'L’attaque de Pearl Harbor', 'Le débarquement en Normandie'], a: 0, e: 'Hitler envahit la Pologne ; la France et le Royaume-Uni lui déclarent la guerre le 3 septembre 1939.' },
    { t: 'comment', q: 'Comment la France est-elle organisée après l’armistice du 22 juin 1940 ?', o: ['En deux zones : occupée au Nord, libre au Sud', 'Entièrement occupée par les Italiens', 'Elle est annexée par l’URSS'], a: 0, e: 'Il y a une zone occupée par les Allemands et une zone libre.' },
    { t: 'que', q: 'Quel événement fait entrer les États-Unis dans la guerre ?', o: ['L’attaque de Pearl Harbor (7 décembre 1941)', 'Le krach boursier', 'L’armistice de 1940'], a: 0, e: 'Attaqués par le Japon, les États-Unis rejoignent les Alliés.' },
    { t: 'que', q: 'Quel mot désigne les Français qui continuent le combat contre l’occupant ?', o: ['Les résistants', 'Les miliciens', 'Les dictateurs'], a: 0, e: 'Les résistants luttent contre l’occupation allemande.' },
    { t: 'pourquoi', q: 'Pourquoi la Seconde Guerre mondiale éclate-t-elle ? (plusieurs causes)', o: ['Crise économique, arrivée de dictateurs puis volonté d’Hitler de conquérir l’Europe', 'Uniquement à cause des années folles', 'À cause du débarquement'], a: 0, e: 'Krach de 1929 → crise → dictateurs → Hitler envahit la Pologne.' },
    { t: 'comment', q: 'Comment l’Allemagne est-elle vaincue en Europe ?', o: ['Par le débarquement allié en Normandie puis la libération progressive de l’Europe jusqu’à la reddition de mai 1945', 'Par un accord à Montoire', 'Par le krach boursier'], a: 0, e: 'Les Alliés repoussent les Allemands après le 6 juin 1944 ; l’Allemagne capitule en mai 1945.' }
  ]
};
function renderQcm(box, key) {
  (QCM[key] || []).forEach((it, i) => {
    const id = 'q-' + key + '-' + i;
    const q = el('div', 'q'); q.setAttribute('data-point', '1'); q.dataset.id = id;
    q.innerHTML = '<div class="qt"><span class="qtag ' + it.t + '">' + TAGS[it.t] + '</span>' + (i + 1) + '. ' + it.q + '</div>' +
      (it.img ? '<img src="' + it.img + '" alt="" style="max-height:230px;margin:6px auto 10px;border:2px solid var(--navy);border-radius:10px;cursor:zoom-in">' : '');
    const opts = el('div', 'opts');
    const order = it.o.map((t, idx) => ({ t, idx }));
    shuffle(order).forEach(o => {
      const b = el('button', 'opt', o.t); b.type = 'button';
      b.addEventListener('click', () => {
        if (q.classList.contains('done')) return;
        if (o.idx === it.a) { b.classList.add('ok'); q.classList.add('done'); $$('.opt', opts).forEach(x => x.disabled = true); markDone(id); }
        else { b.classList.add('ko'); b.disabled = true; q.classList.add('tried'); }
      });
      opts.appendChild(b);
    });
    q.appendChild(opts);
    q.appendChild(el('div', 'hint-ko', 'Pas tout à fait… relis le cours ou observe à nouveau le document, puis réessaie.'));
    q.appendChild(el('div', 'expl', '<b>Bravo !</b> ' + it.e));
    box.appendChild(q);
    if (done[id]) { q.classList.add('done'); $$('.opt', opts).forEach(b => { if (b.textContent === it.o[it.a]) b.classList.add('ok'); b.disabled = true; }); }
  });
}

/* ---------- Questions ouvertes ---------- */
const OPEN = {
  s1: [
    { q: 'Explique avec tes mots comment on passe de la fête des années folles à la guerre de 1939.', a: 'Années folles (1920-1929) → krach boursier de 1929 et crise économique → pauvreté et chômage → des dictateurs arrivent au pouvoir → Hitler veut conquérir l’Europe et envahit la Pologne → la France et le Royaume-Uni lui déclarent la guerre le 3 septembre 1939.' },
    { q: 'Observe la carte (doc 1) : quels sont les deux camps ? Cite les pays de chaque camp.', a: 'Les Alliés : France, Royaume-Uni, URSS. L’Axe : Allemagne, Italie, Japon.' }
  ],
  s2: [
    { q: 'En t’aidant des documents A, B, C et D, explique quels changements s’opèrent dans la vie des Français sous l’occupation allemande.', lines: 4, a: 'La France entre en guerre le 3 septembre 1939 puis signe l’armistice le 22 juin 1940 : elle est occupée par les Allemands et divisée en deux zones (zone occupée au Nord, zone libre au Sud). À Paris, les soldats allemands sont partout et les panneaux sont écrits en allemand. La nourriture manque : il faut faire la queue devant les magasins.' },
    { q: 'Doc B : que lis-tu sur le panneau et que montre-t-il de la vie à Paris ?', a: 'Le panneau indique « Rue de Rivoli » mais les indications sont aussi en allemand : les Allemands sont maîtres de Paris et il y a des soldats partout.' },
    { q: 'Doc C : que fait la foule ? Pourquoi ?', a: 'Les gens font la queue devant un magasin parce que la nourriture manque et qu’elle est chère.' }
  ],
  s3a: [
    { q: '1. Quel type de document est-ce ?', a: 'C’est un discours (de Gaulle parle à la radio).' },
    { q: '2. Qui parle ?', a: 'Le général de Gaulle.' },
    { q: '3. À quelle date ce discours est-il prononcé ?', a: 'Le 18 juin 1940.' },
    { q: '4. À qui le locuteur s’adresse-t-il ?', a: 'Aux officiers et aux soldats français, aux ingénieurs et aux ouvriers spécialistes de l’armement qui se trouvent en territoire britannique.' },
    { q: '5. Que demande-t-il aux Français ?', a: 'Il leur demande de se mettre en rapport avec lui, à Londres, pour poursuivre le combat.' },
    { q: '6. Pourquoi ?', a: 'Pour que la flamme de la résistance française ne s’éteigne pas et que la lutte contre les Allemands continue.' },
    { q: '8. Quel lien peux-tu faire entre le doc 1 et les photos du doc 2 (sabotage de voies ferrées) ?', a: 'Des Français ont répondu à l’appel de de Gaulle : ils résistent en sabotant les voies ferrées pour gêner les Allemands.' }
  ],
  s3b: [
    { q: '9. Qui sont les deux hommes au premier plan sur la photo ?', a: 'Pétain et Hitler.' },
    { q: '10. Où et quand cette rencontre a-t-elle eu lieu ?', a: 'À Montoire (Montoire-sur-le-Loir), le 24 octobre 1940.' },
    { q: '11. À ton avis, pourquoi échangent-ils une poignée de main ?', a: 'La poignée de main symbolise un accord : Pétain accepte de collaborer avec l’Allemagne nazie.' },
    { q: '12. Quel lien peux-tu faire avec le discours du général de Gaulle (doc 1) ?', a: 'Ce sont deux attitudes opposées : de Gaulle refuse la défaite et appelle à résister, Pétain choisit la collaboration avec Hitler.' }
  ],
  s3c: [
    { q: 'Doc 4 et 5 – Qui sont les personnes sur chaque photo ? Que se passe-t-il selon toi ? Donne un titre aux deux photos.', a: 'Doc 4 : des miliciens arrêtent des résistants (« Arrestation de résistants par la Milice »). Doc 5 : des enfants juifs portent l’étoile jaune (« Des enfants juifs obligés de porter l’étoile jaune »).' },
    { q: '13. Qui a écrit cette lettre ?', a: 'Une Française, de façon anonyme (elle signe « Une Française »).' },
    { q: '14. Que dénonce-t-elle ?', a: 'Elle dénonce deux enfants d’environ onze ans qui ont posé des pierres sur les rails pour faire dérailler un train allemand, et leurs propos hostiles aux Allemands, ainsi que les adultes qui les conseillent.' },
    { q: '15. Est-elle plutôt résistante ou collaboratrice ?', a: 'Elle est collaboratrice : elle aide les autorités allemandes en dénonçant.' },
    { q: '16. À ton avis, quelles peuvent être les conséquences de cette lettre de dénonciation ?', a: 'Les enfants et les adultes dénoncés risquent d’être arrêtés, punis, voire déportés.' },
    { q: '17. En t’aidant des documents 4, 5 et 6, résume en quelques phrases les conséquences de l’entrevue de Montoire.', lines: 4, a: 'Après Montoire, la collaboration se met en place : des Français dénoncent des résistants et des Juifs (lettre anonyme), d’autres s’engagent dans la Milice qui arrête des résistants. Les Juifs sont persécutés (étoile jaune, déportations).' }
  ],
  s4a: [
    { q: '1. Dans quelle partie du globe se situe Pearl Harbor ?', a: 'Dans l’océan Pacifique, à Hawaï.' },
    { q: '2. Pourquoi cette attaque est-elle importante dans la Seconde Guerre mondiale ?', a: 'Après l’attaque japonaise, les États-Unis entrent dans le conflit aux côtés des Alliés.' },
    { q: '3. Explique pourquoi l’on parle de guerre « mondiale ».', a: 'Parce que la guerre ne se déroule pas seulement en Europe : elle touche aussi le Pacifique et l’Asie, et de nombreux pays de plusieurs continents y participent.' }
  ],
  s4b: [
    { q: '4. En t’aidant des documents 2, 3 et 4, explique comment la guerre se termine.', lines: 3, a: 'Le 6 juin 1944, les Alliés débarquent en Normandie et repoussent les Allemands. L’Allemagne signe sa reddition à Reims le 7 mai 1945 et l’armistice du 8 mai 1945 met fin à la guerre en Europe. La guerre continue dans le Pacifique jusqu’à la capitulation du Japon, le 2 septembre 1945.' },
    { q: '5. À quelle date est signée la capitulation allemande ?', a: 'Le 7 mai 1945 (à Reims).' }
  ],
  bilan: [
    { q: 'Pourquoi la Seconde Guerre mondiale éclate-t-elle ? (explique les causes en 3 ou 4 phrases)', lines: 4, a: 'Après la crise économique de 1929, l’Europe s’appauvrit et des dictateurs prennent le pouvoir. Hitler veut conquérir l’Europe, il envahit la Pologne et la France et le Royaume-Uni lui déclarent la guerre le 3 septembre 1939.' },
    { q: 'Comment la France est-elle occupée et comment réagissent les Français ?', lines: 4, a: 'Après l’exode et l’armistice du 22 juin 1940, le Nord est occupé et le Sud est une zone libre. Certains Français résistent (appel du 18 juin, sabotages), d’autres collaborent (Montoire, dénonciations, Milice).' },
    { q: 'Comment la guerre se termine-t-elle ?', lines: 3, a: 'Les États-Unis entrent en guerre après Pearl Harbor (1941), les Alliés débarquent en Normandie (1944), l’Allemagne capitule en mai 1945 et le Japon le 2 septembre 1945.' }
  ]
};
function renderOpen(box, key) {
  (OPEN[key] || []).forEach((it, i) => {
    const id = 'o-' + key + '-' + i;
    const d = el('div', 'oq' + (it.lines ? ' lines' : ''));
    d.innerHTML = '<label for="' + id + '">' + it.q + '</label>';
    const ta = el('textarea'); ta.id = id; ta.rows = it.lines || 2;
    ta.value = store.get(id) || '';
    ta.addEventListener('input', () => store.set(id, ta.value));
    d.appendChild(ta);
    const bt = el('button', 'corr-btn', 'Voir une réponse possible'); bt.type = 'button';
    const c = el('div', 'corr', '<b>Réponse possible :</b> ' + it.a);
    bt.addEventListener('click', () => c.classList.toggle('show'));
    d.appendChild(bt); d.appendChild(c);
    box.appendChild(d);
  });
}

/* ---------- Placement (cartes à glisser ou toucher) ---------- */
const PO = (n) => '<img src="' + A + n + '" alt="">';
const ACTS = {
  's1-frise': { label: 'Frise à compléter', title: 'Place chaque événement sur la frise', instr: 'Clique sur une carte puis sur sa date (ou glisse-la).', mode: 'frise',
    slots: [['a', '11 novembre 1918'], ['b', '1920'], ['c', '1929'], ['d', '3 septembre 1939']],
    chips: [['d', 'Début de la Seconde Guerre mondiale'], ['b', 'Début des années folles'], ['a', 'Fin de la Première Guerre mondiale'], ['c', 'Krach boursier : l’argent perd sa valeur, l’Europe devient pauvre']] },
  's1-chaine': { label: 'Les causes', title: 'Pourquoi la guerre éclate-t-elle ? Remets les étapes dans l’ordre', instr: 'De la première cause à la déclaration de guerre.', mode: 'order',
    slots: [['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5']],
    chips: [['4', 'Hitler veut conquérir l’Europe et envahit la Pologne'], ['2', 'Le krach de 1929 provoque une crise : vie chère, chômage, pauvreté'], ['5', 'Le 3 septembre 1939, la France et le Royaume-Uni déclarent la guerre à l’Allemagne'], ['1', 'Années folles : on danse, on s’amuse (1920-1929)'], ['3', 'Des dictateurs arrivent au pouvoir en Europe']] },
  's1-dictateurs': { label: 'Portraits', title: 'Qui dirige quel pays ?', instr: 'Place chaque dictateur dans le cadre du pays qu’il dirige (comme sur ta fiche : découpe et colle).', mode: 'bins',
    slots: [['de', 'Allemagne'], ['it', 'Italie'], ['su', 'URSS']],
    chips: [['su', '<img src="' + A + 'staline.jpg" alt="Portrait"><span>Staline (1928-1953)</span>', 'pic'], ['de', '<img src="' + A + 'hitler.jpg" alt="Portrait"><span>Hitler (1933-1945)</span>', 'pic'], ['it', '<img src="' + A + 'mussolini.jpg" alt="Portrait"><span>Mussolini (1922-1945)</span>', 'pic']] },
  's1-camps': { label: 'Carte à compléter', title: 'Alliés ou Axe ? Colorie la carte de l’Europe en 1939', instr: 'Place chaque pays dans son camp : il se colorie sur la carte (rose = Alliés, vert = Axe).', mode: 'bins',
    img: A + 'europe-vierge.png',
    colors: { al: '#f08fbf', ax: '#a8d12a' },
    pins: { fr: [32.4, 60], uk: [19.7, 38.4], de: [49.6, 40.3], it: [40.8, 70.4], su: [92, 36.8] },
    slots: [['al', 'Les Alliés'], ['ax', 'L’Axe']],
    chips: [['al', 'France'], ['al', 'Royaume-Uni'], ['al', 'URSS'], ['ax', 'Allemagne'], ['ax', 'Italie'], ['ax', 'Japon']] },
  's1-cloze': { label: 'Texte à trous', title: 'Complète le résumé', cloze: true,
    text: 'La Première Guerre mondiale se termine le [[11 novembre 1918]]. Entre 1920 et 1929, ce sont les [[années folles]]. En 1929, le [[krach]] boursier provoque une crise économique : la vie est chère et beaucoup de personnes sont au [[chômage]]. Des [[dictateurs]] arrivent au pouvoir : Hitler en [[Allemagne]], Mussolini en [[Italie]] et Staline en [[URSS]]. Hitler envahit la [[Pologne]] et le [[3 septembre 1939]], la France et le Royaume-Uni lui déclarent la guerre.',
    bank: ['11 novembre 1918', 'années folles', 'krach', 'chômage', 'dictateurs', 'Allemagne', 'Italie', 'URSS', 'Pologne', '3 septembre 1939', 'Espagne', 'armistice'] },

  's2-carte': { label: 'Carte à compléter', title: 'La France occupée : légende la carte', instr: 'Place chaque nom dans la case qui correspond au numéro de la carte.', mode: 'mapnum', img: A + 'france-vierge.png',
    pins: { 1: [48.8, 29.8], 2: [52, 74], 3: [81.6, 28.5], 4: [38.5, 62], 5: [58.6, 53.3] },
    slots: [['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5']],
    chips: [['3', 'Zone annexée par l’Allemagne'], ['1', 'Zone occupée par les Allemands'], ['5', 'Vichy'], ['2', 'Zone libre'], ['4', 'Frontière entre zone occupée et zone libre']] },
  's2-chaine': { label: 'Dans l’ordre', title: 'Comment la France se retrouve-t-elle occupée ? Remets les étapes dans l’ordre', mode: 'order',
    slots: [['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']],
    chips: [['3', 'La France est coupée en deux : zone occupée au Nord, zone libre au Sud'], ['1', 'Le Nord de la France est envahi : les Français fuient (exode)'], ['4', 'À Paris : rues rebaptisées en allemand, soldats partout, queues devant les magasins'], ['2', 'Le 22 juin 1940, Pétain signe l’armistice avec Hitler']] },
  's2-cloze': { label: 'Texte à trous', title: 'Complète le résumé', cloze: true,
    text: 'De septembre 1939 à mai 1940, les Français tentent de résister mais le Nord est envahi : c’est l’[[exode]]. Le [[22 juin 1940]], [[Pétain]] signe l’[[armistice]] avec Hitler. La France est divisée en deux : une zone [[occupée]] au Nord et une zone [[libre]] au Sud. À Paris, il y a des soldats [[allemands]] partout et il faut faire la [[queue]] pour acheter à manger.',
    bank: ['exode', '22 juin 1940', 'Pétain', 'armistice', 'occupée', 'libre', 'allemands', 'queue', 'De Gaulle', 'britanniques'] },

  's3-frise': { label: 'Frise à compléter', title: 'Place chaque événement sur la frise de 1939 à 1940', instr: 'Attention à l’ordre des dates !', mode: 'frise',
    slots: [['a', '3 septembre 1939'], ['b', '18 juin 1940'], ['c', '22 juin 1940'], ['d', '24 octobre 1940']],
    chips: [['d', 'Hitler et Pétain se rencontrent à Montoire : début de la collaboration'], ['b', 'Appel à la Résistance de De Gaulle'], ['a', 'Début de la Seconde Guerre mondiale'], ['c', 'Armistice signé entre Hitler et Pétain']] },
  's3-bins': { label: 'Je trie', title: 'Résistance ou collaboration ?', instr: 'Classe chaque action dans la bonne colonne.', mode: 'bins',
    slots: [['r', 'Résistance'], ['c', 'Collaboration']],
    chips: [['r', 'Saboter les voies ferrées'], ['c', 'Serrer la main d’Hitler à Montoire'], ['r', 'Répondre à l’appel de De Gaulle'], ['c', 'Dénoncer des résistants et des Juifs'], ['c', 'S’engager dans la Milice'], ['r', 'Poursuivre le combat contre les Allemands'], ['c', 'Aider les Allemands à déporter des résistants'], ['r', 'Écouter la radio de Londres : « la flamme de la résistance ne s’éteindra pas »']] },
  's3-chaine': { label: 'Dans l’ordre', title: 'Du discours de Londres à la Milice : remets les événements dans l’ordre', mode: 'order',
    slots: [['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']],
    chips: [['3', 'Pétain rencontre Hitler à Montoire : la collaboration commence'], ['1', 'De Gaulle appelle à Londres à poursuivre le combat'], ['4', 'Des Français dénoncent ou s’engagent dans la Milice pour aider les Allemands'], ['2', 'Pétain signe l’armistice avec Hitler']] },
  's3-cloze': { label: 'Texte à trous', title: 'Complète le résumé', cloze: true,
    text: 'Le [[18 juin 1940]], le général [[de Gaulle]], depuis [[Londres]], lance à la [[radio]] un appel à la [[Résistance]]. Des résistants [[sabotent]] des voies ferrées. Le [[24 octobre 1940]], [[Pétain]] rencontre Hitler à [[Montoire]] : c’est le début de la [[collaboration]]. Certains Français [[dénoncent]] des résistants et des Juifs, d’autres rejoignent la [[Milice]].',
    bank: ['18 juin 1940', 'de Gaulle', 'Londres', 'radio', 'Résistance', 'sabotent', '24 octobre 1940', 'Pétain', 'Montoire', 'collaboration', 'dénoncent', 'Milice', 'Berlin', 'journal'] },

  's4-frise': { label: 'Frise à compléter', title: 'Place chaque événement sur la frise de la fin de la guerre', instr: 'Du plus ancien au plus récent.', mode: 'frise',
    slots: [['a', '7 décembre 1941'], ['b', '6 juin 1944'], ['c', '7 mai 1945'], ['d', '8 mai 1945'], ['e', '2 septembre 1945']],
    chips: [['d', 'Armistice : fin de la guerre en Europe'], ['a', 'Attaque de Pearl Harbor : les États-Unis entrent dans le conflit'], ['e', 'Capitulation du Japon : fin de la guerre dans le Pacifique'], ['b', 'Débarquement des Alliés en Normandie'], ['c', 'Signature de la reddition allemande à Reims']] },
  's4-bins': { label: 'Je trie', title: 'Pays vainqueurs et pays vaincus', instr: 'Remplis le tableau en plaçant les pays.', mode: 'bins',
    slots: [['v', 'Pays vainqueurs'], ['p', 'Pays vaincus']],
    chips: [['v', 'France'], ['p', 'Allemagne'], ['v', 'URSS (Russie)'], ['p', 'Japon'], ['v', 'États-Unis'], ['v', 'Grande-Bretagne']] },
  's4-cloze': { label: 'Texte à trous', title: 'Complète le résumé', cloze: true,
    text: 'Le [[7 décembre 1941]], les Japonais attaquent la base américaine de [[Pearl Harbor]] : les [[États-Unis]] entrent dans la guerre. Le [[6 juin 1944]], les Alliés débarquent en [[Normandie]] et repoussent les armées [[allemandes]]. Le [[8 mai 1945]], l’armistice met fin à la guerre en [[Europe]]. Le Japon capitule le [[2 septembre 1945]].',
    bank: ['7 décembre 1941', 'Pearl Harbor', 'États-Unis', '6 juin 1944', 'Normandie', 'allemandes', '8 mai 1945', 'Europe', '2 septembre 1945', 'Bretagne', 'italiennes'] },

  'bilan-frise': { label: 'La grande frise', title: 'Associe chaque événement à sa date', instr: 'Dix événements à placer dans l’ordre chronologique.', mode: 'frise',
    slots: [['a', '11 novembre 1918'], ['b', '1920'], ['c', '1929'], ['d', '3 septembre 1939'], ['e', '18 juin 1940'], ['f', '22 juin 1940'], ['g', '24 octobre 1940'], ['h', '7 décembre 1941'], ['i', '6 juin 1944'], ['j', '8 mai 1945']],
    chips: [['g', 'Rencontre Hitler–Pétain à Montoire : début de la collaboration'], ['b', 'Début des années folles'], ['i', 'Débarquement en Normandie'], ['d', 'Début de la Seconde Guerre mondiale'], ['h', 'Pearl Harbor : les États-Unis entrent en guerre'], ['a', 'Fin de la Première Guerre mondiale'], ['j', 'Armistice : fin de la guerre en Europe'], ['e', 'Appel à la Résistance de De Gaulle'], ['c', 'Krach boursier : l’Europe devient pauvre'], ['f', 'Armistice signé entre Hitler et Pétain']] }
};

function Place(box, id, cfg) {
  const root = el('div', 'act'); root.setAttribute('data-label', cfg.label); root.setAttribute('data-point', '1'); root.dataset.id = id;
  root.appendChild(el('h4', '', cfg.title));
  if (cfg.instr) root.appendChild(el('p', 'consigne', cfg.instr));
  const bank = el('div', 'bank');
  const board = el('div', 'board ' + cfg.mode);
  const chips = cfg.chips.map((c, i) => ({ i, to: c[0], html: c[1], cls: c[1].indexOf('<img') >= 0 ? 'pic' : '', camp: c[2] }));
  const pos = {}; chips.forEach(c => pos[c.i] = null);
  const slotEls = {};
  const order = shuffle(chips.map(c => c.i));
  cfg.slots.forEach(s => {
    const col = el('div', 'col');
    const hd = el('div', 'hd', s[1]); col.appendChild(hd);
    const sl = el('div', 'slot'); sl.dataset.slot = s[0]; slotEls[s[0]] = sl; col.appendChild(sl);
    board.appendChild(col);
  });
  const cap = (cfg.mode === 'bins' && cfg.slots.length === 2 && cfg.chips.length > cfg.slots.length) ? 99 : (cfg.mode === 'bins' ? 1 : 1);
  let sel = null, mirrorBox = null;
  const msg = el('span', 'msg');

  function chipEl(c) {
    const b = el('button', 'chip ' + c.cls, c.html); b.type = 'button'; b.draggable = true; b.dataset.ci = c.i;
    if (sel === c.i) b.classList.add('sel');
    b.addEventListener('click', ev => { ev.stopPropagation(); const where = pos[c.i]; if (sel !== null && sel !== c.i && where !== null) { place(sel, where); return; } if (sel === c.i) { sel = null; } else if (where !== null && sel === null) { pos[c.i] = null; clearMarks(); } else { sel = c.i; } render(); });
    b.addEventListener('dragstart', ev => { ev.dataTransfer.setData('text/plain', String(c.i)); sel = c.i; });
    return b;
  }
  function place(ci, slotId) {
    if (cfg.mode !== 'bins' || cap === 1) {
      chips.forEach(c => { if (pos[c.i] === slotId && c.i !== ci) pos[c.i] = null; });
    }
    if (cfg.mode === 'bins' && cap === 99) { /* multiple allowed */ }
    pos[ci] = slotId; sel = null; clearMarks(); render();
  }
  function clearMarks() { msg.textContent = ''; msg.className = 'msg'; }
  function render() {
    bank.innerHTML = ''; Object.values(slotEls).forEach(s => s.innerHTML = '');
    order.forEach(i => { const c = chips[i]; const ce = chipEl(c); (pos[c.i] === null ? bank : slotEls[pos[c.i]]).appendChild(ce); });
    $$('.slot', board).forEach(s => s.classList.toggle('armed', sel !== null));
    drawMirror();
  }
  function drawMirror() {
    if (!mirrorBox) return;
    $$('.mk', mirrorBox).forEach(m => m.remove());
    Object.keys(cfg.pins).forEach(k => {
      const ch = chips.find(x => x.pinKey === k);
      const p = cfg.pins[k]; const m = el('div', 'mk');
      m.style.left = p[0] + '%'; m.style.top = p[1] + '%';
      const w = ch && pos[ch.i];
      if (w) m.style.background = cfg.colors[w]; else m.classList.add('empty');
      mirrorBox.appendChild(m);
    });
  }
  // pins mapping for camps: chip.pinKey = key in cfg.pins
  if (cfg.pins && cfg.colors) { const keys = ['fr', 'uk', 'su', 'de', 'it']; chips.forEach(c => { if (c.i < keys.length) c.pinKey = keys[c.i]; }); }

  // events on slots and bank
  Object.values(slotEls).forEach(sl => {
    sl.addEventListener('click', () => { if (sel !== null) place(sel, sl.dataset.slot); });
    sl.addEventListener('dragover', e => { e.preventDefault(); sl.classList.add('over'); });
    sl.addEventListener('dragleave', () => sl.classList.remove('over'));
    sl.addEventListener('drop', e => { e.preventDefault(); sl.classList.remove('over'); const ci = parseInt(e.dataTransfer.getData('text/plain'), 10); if (!isNaN(ci)) place(ci, sl.dataset.slot); });
  });
  bank.addEventListener('click', () => { if (sel !== null && pos[sel] !== null) { pos[sel] = null; sel = null; clearMarks(); render(); } });
  bank.addEventListener('dragover', e => e.preventDefault());
  bank.addEventListener('drop', e => { e.preventDefault(); const ci = parseInt(e.dataTransfer.getData('text/plain'), 10); if (!isNaN(ci)) { pos[ci] = null; sel = null; render(); } });

  root.appendChild(bank);
  if (cfg.img) {
    const lay = el('div', 'maplay');
    const mw = el('div', 'mapwrap'); const im = el('img'); im.src = cfg.img; im.alt = 'Carte à compléter'; im.loading = 'lazy'; mw.appendChild(im);
    if (cfg.mode === 'mapnum') Object.keys(cfg.pins).forEach(k => { const p = el('div', 'pin', k); p.style.left = cfg.pins[k][0] + '%'; p.style.top = cfg.pins[k][1] + '%'; mw.appendChild(p); });
    else mirrorBox = mw;
    lay.appendChild(mw); lay.appendChild(board); root.appendChild(lay);
  } else root.appendChild(board);

  const btns = el('div', 'btns');
  const check = el('button', 'btn', 'Vérifier'); check.type = 'button';
  const reset = el('button', 'btn alt', 'Recommencer'); reset.type = 'button';
  const solve = el('button', 'btn alt corr-btn', 'Correction'); solve.type = 'button';
  btns.appendChild(check); btns.appendChild(reset); btns.appendChild(solve); btns.appendChild(msg);
  root.appendChild(btns);

  check.addEventListener('click', () => {
    const unplaced = chips.filter(c => pos[c.i] === null).length;
    let ok = 0;
    $$('.chip', root).forEach(ce => { const c = chips[+ce.dataset.ci]; ce.classList.remove('ok', 'ko'); if (pos[c.i] !== null) { const good = pos[c.i] === c.to; ce.classList.add(good ? 'ok' : 'ko'); if (good) ok++; } });
    if (unplaced) { msg.textContent = ok + ' bien placée(s). Il reste ' + unplaced + ' carte(s) à placer.'; msg.className = 'msg ko'; return; }
    if (ok === chips.length) { msg.textContent = 'Bravo, tout est juste !'; msg.className = 'msg ok'; root.classList.add('done'); markDone(id); }
    else { msg.textContent = ok + ' / ' + chips.length + ' bien placées. Corrige les cartes en rouge et réessaie.'; msg.className = 'msg ko'; }
  });
  reset.addEventListener('click', () => { chips.forEach(c => pos[c.i] = null); sel = null; clearMarks(); render(); });
  solve.addEventListener('click', () => { chips.forEach(c => pos[c.i] = c.to); sel = null; render(); });
  box.appendChild(root);
  render();
  if (done[id]) { chips.forEach(c => pos[c.i] = c.to); render(); root.classList.add('done'); }
}

/* ---------- Textes à trous ---------- */
function Cloze(box, id, cfg) {
  const root = el('div', 'act'); root.setAttribute('data-label', cfg.label); root.setAttribute('data-point', '1'); root.dataset.id = id;
  root.appendChild(el('h4', '', cfg.title));
  root.appendChild(el('p', 'consigne', 'Choisis le bon mot dans chaque liste.'));
  const p = el('div', 'cloze');
  const opts = cfg.bank.slice().sort((a, b) => a.localeCompare(b, 'fr'));
  p.innerHTML = cfg.text.replace(/\[\[(.+?)\]\]/g, (m, a) => '<select class="gap" data-a="' + a.replace(/"/g, '&quot;') + '" aria-label="mot manquant"><option value="">…</option>' + opts.map(o => '<option>' + o + '</option>').join('') + '</select>');
  root.appendChild(p);
  const btns = el('div', 'btns'); const msg = el('span', 'msg');
  const check = el('button', 'btn', 'Vérifier'); check.type = 'button';
  const reset = el('button', 'btn alt', 'Recommencer'); reset.type = 'button';
  const solve = el('button', 'btn alt corr-btn', 'Correction'); solve.type = 'button';
  btns.append(check, reset, solve, msg); root.appendChild(btns);
  const sels = () => $$('select.gap', root);
  check.addEventListener('click', () => {
    let ok = 0; const all = sels();
    all.forEach(s => { s.classList.remove('ok', 'ko'); if (s.value) { const g = s.value === s.dataset.a; s.classList.add(g ? 'ok' : 'ko'); if (g) ok++; } });
    if (ok === all.length) { msg.textContent = 'Bravo, le texte est complet !'; msg.className = 'msg ok'; root.classList.add('done'); markDone(id); }
    else { msg.textContent = ok + ' / ' + all.length + ' mots corrects.'; msg.className = 'msg ko'; }
  });
  reset.addEventListener('click', () => { sels().forEach(s => { s.value = ''; s.classList.remove('ok', 'ko'); }); msg.textContent = ''; });
  solve.addEventListener('click', () => sels().forEach(s => s.value = s.dataset.a));
  box.appendChild(root);
  if (done[id]) { sels().forEach(s => { s.value = s.dataset.a; s.classList.add('ok'); }); root.classList.add('done'); }
}

/* ---------- Surligner le mot important ---------- */
function Surligne(box, id) {
  const root = el('div', 'act'); root.setAttribute('data-label', 'Je surligne'); root.setAttribute('data-point', '1'); root.dataset.id = id;
  root.appendChild(el('h4', '', 'Quel est le mot le plus important du discours de de Gaulle ?'));
  root.appendChild(el('p', 'consigne', 'Clique sur le mot que tu choisis (un seul).'));
  const txt = 'Moi, général de Gaulle, actuellement à Londres, j’invite les officiers et les soldats français qui se trouvent en territoire britannique ou qui viendraient à s’y trouver, avec leurs armes ou sans leurs armes, j’invite les ingénieurs et les ouvriers spécialistes des industries d’armement qui se trouvent en territoire britannique ou qui viendraient à s’y trouver, à se mettre en rapport avec moi. Quoi qu’il arrive, la flamme de la résistance française ne doit pas s’éteindre et ne s’éteindra pas. Demain comme aujourd’hui, je parlerai à la radio de Londres.';
  const sp = el('div', 'speech');
  sp.innerHTML = txt.split(' ').map(w => '<span class="w">' + w + '</span>').join(' ');
  root.appendChild(sp);
  let cur = null;
  $$('.w', sp).forEach(w => w.addEventListener('click', () => { $$('.w', sp).forEach(x => x.classList.remove('hl', 'ok', 'ko')); w.classList.add('hl'); cur = w; msg.textContent = ''; }));
  const btns = el('div', 'btns'); const msg = el('span', 'msg');
  const check = el('button', 'btn', 'Vérifier'); check.type = 'button';
  btns.append(check, msg); root.appendChild(btns);
  root.appendChild(el('div', 'note', '<b>Indice :</b> pense au titre de la séance et à la « flamme » qui ne doit pas s’éteindre.'));
  check.addEventListener('click', () => {
    if (!cur) { msg.textContent = 'Clique d’abord sur un mot.'; msg.className = 'msg ko'; return; }
    const good = /^résistance/i.test(cur.textContent);
    cur.classList.remove('hl'); cur.classList.add(good ? 'ok' : 'ko');
    if (good) { msg.textContent = 'Oui ! « résistance » est le mot clé : de Gaulle veut que la lutte continue.'; msg.className = 'msg ok'; root.classList.add('done'); markDone(id); }
    else { msg.textContent = 'Ce n’est pas le mot le plus important. Cherche le mot qui donne son nom à la séance.'; msg.className = 'msg ko'; }
  });
  box.appendChild(root);
  if (done[id]) root.classList.add('done');
}

/* ---------- Fiches événement ---------- */
const FICHES = [
  { t: 'Appel du 18 juin 1940', f: [['Qui ?', ['Pétain', 'De Gaulle', 'Hitler'], 1], ['Où ?', ['À Paris', 'À Londres', 'À Montoire'], 1], ['Comment ?', ['À la radio', 'Par une lettre anonyme', 'Par un traité'], 0], ['Pourquoi ?', ['Pour que la flamme de la résistance ne s’éteigne pas', 'Pour collaborer avec les Allemands', 'Pour fêter la victoire'], 0]] },
  { t: 'Entrevue de Montoire', f: [['Qui ?', ['Pétain et Hitler', 'De Gaulle et Hitler', 'Staline et Mussolini'], 0], ['Quand ?', ['24 octobre 1940', '18 juin 1940', '6 juin 1944'], 0], ['Quoi ?', ['Le début de la collaboration', 'Le début de la Résistance', 'La fin de la guerre'], 0], ['Conséquence ?', ['Dénonciations, Milice, arrestations', 'Libération de la France', 'Fin de l’occupation'], 0]] },
  { t: 'Pearl Harbor', f: [['Qui attaque ?', ['Les Japonais', 'Les Allemands', 'Les Britanniques'], 0], ['Où ?', ['Hawaï, océan Pacifique', 'Normandie', 'Londres'], 0], ['Quand ?', ['7 décembre 1941', '6 juin 1944', '3 septembre 1939'], 0], ['Conséquence ?', ['Les États-Unis entrent en guerre', 'Les États-Unis quittent la guerre', 'L’Allemagne capitule'], 0]] },
  { t: 'Débarquement en Normandie', f: [['Qui débarque ?', ['Américains, Canadiens, Britanniques', 'Allemands et Italiens', 'Soviétiques'], 0], ['Quand ?', ['6 juin 1944', '8 mai 1945', '22 juin 1940'], 0], ['Où ?', ['Sur les plages de Normandie', 'À Pearl Harbor', 'À Montoire'], 0], ['Pourquoi ?', ['Pour repousser les Allemands', 'Pour signer l’armistice', 'Pour aider Hitler'], 0]] }
];
function Fiches(box, id) {
  const root = el('div', 'act'); root.setAttribute('data-label', 'Fiches à compléter'); root.setAttribute('data-point', '1'); root.dataset.id = id;
  root.appendChild(el('h4', '', 'Complète la carte d’identité de chaque événement'));
  const wrap = el('div', 'fiche');
  FICHES.forEach(fc => {
    const c = el('div', 'fcard'); c.appendChild(el('h4', '', fc.t));
    const dl = el('dl');
    fc.f.forEach(r => {
      dl.appendChild(el('dt', '', r[0]));
      const dd = el('dd'); const s = el('select', 'gap'); s.dataset.a = r[1][r[2]];
      s.innerHTML = '<option value="">…</option>' + r[1].slice().sort((a, b) => a.localeCompare(b, 'fr')).map(o => '<option>' + o + '</option>').join('');
      dd.appendChild(s); dl.appendChild(dd);
    });
    c.appendChild(dl); wrap.appendChild(c);
  });
  root.appendChild(wrap);
  const btns = el('div', 'btns'); const msg = el('span', 'msg');
  const check = el('button', 'btn', 'Vérifier'); check.type = 'button';
  const reset = el('button', 'btn alt', 'Recommencer'); reset.type = 'button';
  const solve = el('button', 'btn alt corr-btn', 'Correction'); solve.type = 'button';
  btns.append(check, reset, solve, msg); root.appendChild(btns);
  const sels = () => $$('select.gap', root);
  check.addEventListener('click', () => {
    let ok = 0; const all = sels();
    all.forEach(s => { s.classList.remove('ok', 'ko'); if (s.value) { const g = s.value === s.dataset.a; s.classList.add(g ? 'ok' : 'ko'); if (g) ok++; } });
    if (ok === all.length) { msg.textContent = 'Bravo, toutes les fiches sont complètes !'; msg.className = 'msg ok'; root.classList.add('done'); markDone(id); }
    else { msg.textContent = ok + ' / ' + all.length + ' réponses correctes.'; msg.className = 'msg ko'; }
  });
  reset.addEventListener('click', () => { sels().forEach(s => { s.value = ''; s.classList.remove('ok', 'ko'); }); msg.textContent = ''; });
  solve.addEventListener('click', () => sels().forEach(s => s.value = s.dataset.a));
  box.appendChild(root);
  if (done[id]) { sels().forEach(s => { s.value = s.dataset.a; s.classList.add('ok'); }); root.classList.add('done'); }
}

/* ---------- Cartes mémo ---------- */
const FLIPS = [
  ['Années folles', '#f26b1d', 'De 1920 à 1929 : on fait la fête, on danse sur du jazz, on va au spectacle, on s’intéresse à la mode.'],
  ['Krach boursier', '#f26b1d', 'En 1929, l’argent perd sa valeur : début d’une crise économique, l’Europe devient pauvre.'],
  ['Dictateur', '#f26b1d', 'Chef qui prend le pouvoir : Hitler (Allemagne), Mussolini (Italie), Staline (URSS).'],
  ['Alliés', '#f26b1d', 'Camp opposé à l’Allemagne : France, Royaume-Uni, URSS (puis États-Unis).'],
  ['Axe', '#f26b1d', 'Camp de l’Allemagne, de l’Italie et du Japon.'],
  ['Exode', '#1e88e5', 'Fuite des Français sur les routes devant l’invasion allemande, en 1940.'],
  ['Armistice', '#1e88e5', 'Accord qui arrête les combats. Le 22 juin 1940, Pétain signe l’armistice avec Hitler.'],
  ['Zone occupée / zone libre', '#1e88e5', 'Après l’armistice, la France est coupée en deux : le Nord est occupé par les Allemands, le Sud est libre.'],
  ['Résistance', '#5a8210', 'Refus de l’occupation : de Gaulle lance l’appel du 18 juin 1940 ; des Français sabotent les voies de communication.'],
  ['Collaboration', '#5a8210', 'Coopération avec l’occupant allemand, à partir de la rencontre Pétain–Hitler à Montoire (24 octobre 1940).'],
  ['Milice', '#5a8210', 'Française, elle aide les Allemands à arrêter et à déporter les résistants et les Juifs.'],
  ['Débarquement', '#1b2a4a', '6 juin 1944 : les Alliés (Américains, Canadiens, Britanniques) débarquent en Normandie et repoussent les Allemands.'],
  ['Capitulation', '#1b2a4a', 'Reddition : l’Allemagne capitule en mai 1945 (reddition à Reims le 7 mai, armistice le 8 mai) ; le Japon, le 2 septembre 1945.']
];
(function () {
  const f = $('#flips'); if (!f) return;
  FLIPS.forEach(c => {
    const b = el('button', 'flip'); b.type = 'button'; b.style.setProperty('--c', c[1]);
    b.innerHTML = '<div class="in"><div class="f">' + c[0] + '</div><div class="b">' + c[2] + '</div></div>';
    b.addEventListener('click', () => b.classList.toggle('on'));
    f.appendChild(b);
  });
})();

/* ---------- Montage ---------- */
$$('[data-qcm]').forEach(b => renderQcm(b, b.dataset.qcm));
$$('[data-open]').forEach(b => renderOpen(b, b.dataset.open));
$$('[data-act]').forEach(b => {
  const k = b.dataset.act;
  if (k === 's3-surligne') Surligne(b, k);
  else if (k === 'bilan-fiches') Fiches(b, k);
  else if (ACTS[k] && ACTS[k].cloze) Cloze(b, k, ACTS[k]);
  else if (ACTS[k]) Place(b, k, ACTS[k]);
});
updateProgress();

/* mode enseignant */
const pb = $('#profBtn');
function setProf(on) { document.body.classList.toggle('prof', on); pb.setAttribute('aria-pressed', on); store.set('prof', on ? '1' : '0'); }
pb.addEventListener('click', () => setProf(!document.body.classList.contains('prof')));
setProf(store.get('prof') === '1');

/* lightbox */
const lb = $('#lb');
document.addEventListener('click', e => {
  const t = e.target;
  if (t.tagName === 'IMG' && (t.closest('figure.doc') || t.closest('.q'))) { $('img', lb).src = t.src; lb.classList.add('on'); }
  else if (lb.classList.contains('on')) lb.classList.remove('on');
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('on'); });
})();
