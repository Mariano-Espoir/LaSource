/* =========================================================
   Plateforme de Mentorat — Logique applicative (vanilla JS)
   Aucune dépendance externe. Données de démo en mémoire.
   ========================================================= */

/* ---------- État global ---------- */
const etat = {
  utilisateur: {
    prenom: 'Marie', nom: 'Dupont', initiales: 'MD',
    role: 'etudiant', pays: 'France', etudes: 'Master 2 — Sciences Po Paris',
    bio: "Étudiante curieuse, passionnée par la finance durable et l'entrepreneuriat à impact.",
    secteurs: ['Finance', 'Entrepreneuriat', 'Technologie'],
    estAdmin: true,
    questionsPosees: 12, mentorsSuivis: 5
  },
  tri: 'recent',
  categorieChoisie: null,
  roleChoisi: 'etudiant',
  etapeOnboarding: 1,
  conversationActive: null,
  ongletProfil: 'questions'
};

/* ---------- Données de démonstration ---------- */
const mentors = [
  { id: 1, prenom: 'Sophie', nom: 'Lambert', initiales: 'SL', secteur: 'Finance', pays: 'France', ville: 'Paris',
    bio: "20 ans d'expérience en banque d'affaires, ex-Goldman Sachs. Aujourd'hui je conseille les jeunes diplômés en quête de carrière en finance.",
    note: 4.8, reponses: 142, anciennete: '3 ans', dispo: 'disponible', verifie: true,
    experiences: [
      { icone:'💼', poste:'Directrice — Goldman Sachs', dates:'2010-2022' },
      { icone:'🎓', poste:'MBA — INSEAD', dates:'2008-2010' }
    ]},
  { id: 2, prenom: 'Karim', nom: 'Benali', initiales: 'KB', secteur: 'Technologie', pays: 'Maroc', ville: 'Casablanca',
    bio: "Ingénieur IA chez Meta, ex-Google. Je partage des conseils sur les carrières tech et la recherche en IA.",
    note: 4.9, reponses: 87, anciennete: '2 ans', dispo: 'occupe', verifie: true,
    experiences: [
      { icone:'💼', poste:'Senior Research Engineer — Meta', dates:'2021-aujourd\'hui' },
      { icone:'🎓', poste:'PhD en IA — Polytechnique', dates:'2017-2021' }
    ]},
  { id: 3, prenom: 'Amélie', nom: 'Rousseau', initiales: 'AR', secteur: 'Médecine', pays: 'Belgique', ville: 'Bruxelles',
    bio: "Médecin pédiatre depuis 15 ans. J'accompagne les étudiants en médecine dans leur parcours.",
    note: 4.7, reponses: 64, anciennete: '4 ans', dispo: 'disponible', verifie: true,
    experiences: [
      { icone:'💼', poste:'Pédiatre — Hôpital Saint-Pierre', dates:'2010-aujourd\'hui' },
      { icone:'🎓', poste:'Doctorat — ULB', dates:'2003-2010' }
    ]},
  { id: 4, prenom: 'Thomas', nom: 'Martin', initiales: 'TM', secteur: 'Entrepreneuriat', pays: 'Canada', ville: 'Montréal',
    bio: "Fondateur de 3 startups dont 2 exits. J'aide les jeunes entrepreneurs à éviter les pièges classiques.",
    note: 4.6, reponses: 53, anciennete: '1 an', dispo: 'absent', verifie: false,
    experiences: [
      { icone:'💼', poste:'CEO & Co-fondateur — TerraVerde', dates:'2019-aujourd\'hui' },
      { icone:'🎓', poste:'HEC Montréal', dates:'2005-2008' }
    ]},
  { id: 5, prenom: 'Fatou', nom: 'Diop', initiales: 'FD', secteur: 'Droit', pays: 'Sénégal', ville: 'Dakar',
    bio: "Avocate en droit international des affaires. Membre du barreau de Dakar et de Paris.",
    note: 4.9, reponses: 38, anciennete: '2 ans', dispo: 'disponible', verifie: true,
    experiences: [
      { icone:'💼', poste:'Associée — Cabinet Diop & Partners', dates:'2015-aujourd\'hui' },
      { icone:'🎓', poste:'Master Droit international — Sorbonne', dates:'2008-2010' }
    ]}
];

const questions = [
  { id: 1, titre: "Comment décrocher un stage en M&A à Londres sans école cible ?",
    corps: "Bonjour, je suis en M1 finance à Dauphine. Je vise des stages M&A en banque d'affaires à Londres mais je ne suis pas dans une école cible (HEC, ESSEC…). Quels sont les leviers concrets pour passer les filtres CV des grandes banques ?",
    secteur: 'Finance', auteur: 'Sophie M.', initiales:'SM', pays:'France', temps:'il y a 2 h', utile: 24, repCount: 5,
    reponses: [
      { auteur:'Sophie Lambert', init:'SL', mentor:true, verifie:true, contenu:"Excellente question. Plusieurs leviers : 1) Networking intensif sur LinkedIn (vise 30 cafés virtuels avec des analysts ex-Dauphine). 2) Spring weeks dès la L3. 3) Off-cycles plutôt que summer (moins compétitifs). 4) Maîtrise impeccable de la modélisation financière (Wall Street Prep). N'hésite pas à m'envoyer ton CV.", utile:18, etoiles:5,
        sousReponses:[{ auteur:'Sophie M.', init:'SM', contenu:'Merci beaucoup pour ces conseils ! Je vais commencer dès la semaine prochaine.', utile:3 }]},
      { auteur:'Marc L.', init:'ML', mentor:false, contenu:"J'ai vécu la même situation l'an dernier, j'ai fini par décrocher un off-cycle chez Lazard via un cousin. Le piston existe encore !", utile:6 }
    ]},
  { id: 2, titre: "Faut-il un doctorat pour faire de la recherche en IA dans l'industrie ?",
    corps: "Je suis en master 2 informatique et je m'interroge : doctorat académique long, ou aller direct en industrie comme research engineer ? Les portes restent-elles ouvertes sans PhD ?",
    secteur: 'Technologie', auteur: 'Karim B.', initiales:'KB', pays:'Maroc', temps:'il y a 5 h', utile: 42, repCount: 12,
    reponses: [
      { auteur:'Karim Benali', init:'KB', mentor:true, verifie:true, contenu:"Réponse honnête : pour les rôles de Research Scientist (Meta AI, DeepMind), le PhD est quasi indispensable. Pour Research Engineer, beaucoup d'opportunités sans PhD si tu publies sur arXiv, contribues à des projets open source, et maîtrises PyTorch en profondeur.", utile:28, etoiles:5 }
    ]},
  { id: 3, titre: "Reconversion à 30 ans vers le développement web : par où commencer ?",
    corps: "Ancien commercial, je veux pivoter vers le dev web full-stack. Bootcamp, autodidacte, ou retour à l'université ? Quelle voie a le meilleur ratio temps/employabilité ?",
    secteur: 'Technologie', auteur: 'Julien P.', initiales:'JP', pays:'France', temps:'il y a 1 jour', utile: 19, repCount: 8, reponses: [] },
  { id: 4, titre: "Lancer une SaaS B2B sans co-fondateur technique, c'est viable ?",
    corps: "Profil business, j'ai une idée validée par 30 entretiens clients. Faut-il absolument trouver un CTO ou puis-je démarrer en no-code/avec une agence ?",
    secteur: 'Entrepreneuriat', auteur: 'Léa T.', initiales:'LT', pays:'France', temps:'il y a 1 jour', utile: 31, repCount: 9,
    reponses: [
      { auteur:'Thomas Martin', init:'TM', mentor:true, verifie:false, contenu:"100% viable. Beaucoup de SaaS à 7 chiffres ont démarré en no-code (Bubble, Webflow + Airtable). Le vrai risque n'est pas technique, c'est de scaler trop vite sans architecture. Démarre simple, valide, puis recrute.", utile:22, etoiles:4 }
    ]},
  { id: 5, titre: "Internat de médecine en Belgique pour un étudiant français : démarches ?",
    corps: "Je passe les ECN bientôt. La Belgique est-elle une alternative crédible si je n'ai pas la spécialité voulue ? Quelles équivalences ?",
    secteur: 'Médecine', auteur: 'Camille R.', initiales:'CR', pays:'France', temps:'il y a 3 jours', utile: 14, repCount: 4, reponses:[] },
  { id: 6, titre: "Comment construire un portfolio juridique solide en sortie d'école ?",
    corps: "Sortie de M2 Droit des affaires. Beaucoup de théorie, peu de pratique concrète à valoriser. Comment se démarquer auprès des cabinets ?",
    secteur: 'Droit', auteur: 'Hugo D.', initiales:'HD', pays:'France', temps:'il y a 4 jours', utile: 9, repCount: 2, reponses:[] }
];

const conversations = [
  { id: 1, avec: 'Sophie Lambert', init:'SL', dernier: "Avec plaisir, envoie-moi ton CV par message.", heure:'14:32', nonLu: true,
    messages: [
      { de:'Sophie Lambert', contenu:'Bonjour Marie, j\'ai vu votre question sur les stages M&A.', heure:'14:20', recu:true },
      { de:'moi', contenu:'Bonjour Sophie ! Merci d\'avoir pris le temps de répondre.', heure:'14:25', recu:false, statut:'Lu ✓✓' },
      { de:'Sophie Lambert', contenu:'Avec plaisir, envoie-moi ton CV par message.', heure:'14:32', recu:true }
    ]},
  { id: 2, avec: 'Karim Benali', init:'KB', dernier:"Je te recommande de commencer par les MOOC de Stanford.", heure:'Hier', nonLu: true,
    messages:[{ de:'Karim Benali', contenu:'Je te recommande de commencer par les MOOC de Stanford.', heure:'18:40', recu:true }]},
  { id: 3, avec: 'Fatou Diop', init:'FD', dernier:'Tu peux candidater dès septembre.', heure:'Lundi', nonLu: true,
    messages:[{ de:'Fatou Diop', contenu:'Tu peux candidater dès septembre.', heure:'10:15', recu:true }]},
  { id: 4, avec: 'Amélie Rousseau', init:'AR', dernier:'Bon courage pour ton concours !', heure:'12 mars', nonLu: false,
    messages:[{ de:'Amélie Rousseau', contenu:'Bon courage pour ton concours !', heure:'09:00', recu:true }]}
];

const notifications = [
  { icone:'🟦', texte:'Sophie Lambert a répondu à votre question "Comment décrocher un stage en M&A…"', temps:'il y a 1 h', nonLu:true },
  { icone:'❤️', texte:'Karim Benali a marqué votre réponse comme utile', temps:'il y a 3 h', nonLu:true },
  { icone:'👤', texte:'Vous avez un nouvel abonné : Hugo Dupont', temps:'il y a 6 h', nonLu:true },
  { icone:'📌', texte:'Nouvelle question dans Finance : "Banque d\'affaires à 35 ans ?"', temps:'hier', nonLu:true },
  { icone:'🟦', texte:'Thomas Martin a répondu à votre question sur les SaaS B2B', temps:'il y a 2 jours', nonLu:false }
];

/* ============================================================
   NAVIGATION ENTRE VUES (auth vs app)
   ============================================================ */
function afficherVue(id) {
  document.querySelectorAll('.vue').forEach(v => v.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

function naviguerApp(panneau) {
  document.querySelectorAll('.sous-vue').forEach(sv => sv.style.display = 'none');
  document.getElementById('sv-' + panneau).style.display = 'block';
  document.getElementById('menuProfil').classList.remove('ouvert');
  if (panneau === 'fil') rendreFil();
  if (panneau === 'profil') rendreProfil();
  if (panneau === 'messages') rendreMessagerie();
  if (panneau === 'parametres') changerPanParam(document.querySelector('#menu-param button.actif'), 'compte');
  if (panneau === 'admin') changerPanAdmin(document.querySelector('.menu-admin button.actif'), 'dashboard');
}

/* ============================================================
   AUTHENTIFICATION
   ============================================================ */
function choisirRole(elem, role) {
  document.querySelectorAll('.carte-role').forEach(c => c.classList.remove('actif'));
  elem.classList.add('actif');
  etat.roleChoisi = role;
}

function seConnecter() {
  toast('Connexion réussie. Bienvenue !');
  afficherVue('vue-app');
  initApp();
}

function commencerOnboarding() {
  etat.etapeOnboarding = 1;
  majEtapeOnboarding();
  afficherVue('vue-onboarding');
}

function naviguerEtape(delta) {
  const nouv = etat.etapeOnboarding + delta;
  if (nouv < 1) return;
  if (nouv > 4) {
    toast('Inscription terminée. Bienvenue sur LaSource !');
    afficherVue('vue-app');
    initApp();
    return;
  }
  etat.etapeOnboarding = nouv;
  majEtapeOnboarding();
}

function majEtapeOnboarding() {
  const e = etat.etapeOnboarding;
  const labels = ['Informations de base', "Secteurs d'intérêt", 'Photo de profil', 'Découverte de la plateforme'];
  for (let i=1; i<=4; i++) {
    document.getElementById('ob-e'+i).classList.toggle('fait', i <= e);
    document.getElementById('etape-'+i).style.display = (i === e) ? 'block' : 'none';
  }
  document.getElementById('ob-num').textContent = e;
  document.getElementById('ob-label').textContent = labels[e-1];
  document.getElementById('ob-prec').disabled = (e === 1);
  document.getElementById('ob-suiv').textContent = (e === 4) ? "Accéder à la plateforme →" : 'Suivant →';
}

function toggleChip(elem) { elem.classList.toggle('actif'); }

function seDeconnecter() {
  document.getElementById('menuProfil').classList.remove('ouvert');
  toast('Vous avez été déconnecté(e).');
  afficherVue('vue-accueil');
}

/* ============================================================
   INITIALISATION DE L'APP
   ============================================================ */
function initApp() {
  document.getElementById('avatar-nav').textContent = etat.utilisateur.initiales;
  document.getElementById('avatar-fil').textContent = etat.utilisateur.initiales;
  document.getElementById('lien-admin').style.display = etat.utilisateur.estAdmin ? 'flex' : 'none';
  rendreSidebarProfil();
  rendreFil();
  rendreColonneDroite();
  rendreNotifications();
}

/* ============================================================
   SIDEBAR PROFIL (col gauche)
   ============================================================ */
function rendreSidebarProfil() {
  const u = etat.utilisateur;
  document.getElementById('sidebar-profil').innerHTML = `
    <div class="avatar avatar-l">${u.initiales}</div>
    <div class="nom">${u.prenom} ${u.nom}</div>
    <span class="badge-role">${u.role === 'mentor' ? '🏆 Mentor' : '🎓 Étudiant'}</span>
    <div class="meta">📍 ${u.pays}</div>
    <button class="btn btn-secondaire btn-petit btn-bloc" onclick="naviguerApp('profil')">Voir mon profil</button>
    <div class="profil-stats">
      <div><strong>${u.questionsPosees}</strong><span>Questions posées</span></div>
      <div><strong>${u.mentorsSuivis}</strong><span>Mentors suivis</span></div>
    </div>`;
  document.getElementById('mes-secteurs').innerHTML =
    u.secteurs.map((s, i) => `<span class="tag ${['','tag-ambre','tag-vert','tag-violet'][i%4]}">${s}</span>`).join('');
  document.getElementById('mentors-suivis').innerHTML =
    mentors.slice(0, 4).map(m => `
      <div class="suivi-item" onclick="ouvrirProfilMentor(${m.id})">
        <div class="avatar avatar-s">${m.initiales}</div>
        <div class="info"><strong>${m.prenom} ${m.nom}</strong><span>${m.secteur}</span></div>
      </div>`).join('');
}

/* ============================================================
   FIL D'ACTUALITE (col centre)
   ============================================================ */
function changerTri(elem, tri) {
  document.querySelectorAll('.onglet').forEach(o => o.classList.remove('actif'));
  elem.classList.add('actif');
  etat.tri = tri;
  rendreFil();
}

function rendreFil() {
  const pays = document.getElementById('filtre-pays')?.value || '';
  const sect = document.getElementById('filtre-secteur')?.value || '';
  let liste = questions.filter(q => (!pays || q.pays === pays) && (!sect || q.secteur === sect));
  if (etat.tri === 'populaire') liste.sort((a, b) => b.utile - a.utile);
  if (etat.tri === 'sansrep') liste = liste.filter(q => q.reponses.length === 0);

  const conteneur = document.getElementById('fil-questions');
  if (!liste.length) {
    conteneur.innerHTML = `<div class="etat-vide carte"><div class="illu">🌱</div><h3>Aucune question pour ces filtres</h3><p>Essayez d'élargir vos critères ou soyez le premier à poser une question !</p></div>`;
    return;
  }
  conteneur.innerHTML = liste.map(q => carteQuestionHTML(q)).join('');
}

function carteQuestionHTML(q) {
  return `
    <article class="carte-question" data-id="${q.id}">
      <div class="q-entete">
        <div class="avatar avatar-s">${q.initiales}</div>
        <div class="info"><strong>${q.auteur}</strong> · <span>${q.pays}</span><time>${q.temps}</time></div>
        <button class="btn-fantome btn-petit" title="Signaler" onclick="signaler(${q.id})">⚐</button>
      </div>
      <h3 class="q-titre" onclick="basculerReponses(${q.id})">${q.titre}</h3>
      <p class="q-corps">${q.corps}</p>
      <div class="q-tags"><span class="tag">${q.secteur}</span></div>
      <div class="q-pied">
        <button onclick="marquerUtileQ(${q.id})">👍 ${q.utile} Utile</button>
        <button onclick="basculerReponses(${q.id})">💬 ${q.repCount} réponses</button>
        <button class="repondre btn btn-secondaire btn-petit" onclick="basculerReponses(${q.id})">Répondre</button>
      </div>
      <div class="reponses" id="rep-${q.id}" style="display:none;">
        ${q.reponses.map(r => reponseHTML(r)).join('') || '<p style="color:var(--texte-doux); font-size:14px;">Soyez le premier à répondre.</p>'}
        <div style="display:flex; gap:8px; margin-top:8px;">
          <input type="text" placeholder="Écrire une réponse…" id="rep-input-${q.id}" />
          <button class="btn btn-primaire btn-petit" onclick="ajouterReponse(${q.id})">Envoyer</button>
        </div>
      </div>
    </article>`;
}

function reponseHTML(r) {
  const cls = r.mentor ? 'reponse mentor' : 'reponse';
  const badge = r.verifie ? '<span class="badge-verifie">✓ Mentor vérifié</span>' : (r.mentor ? '<span class="badge-mentor badge-role">🏆 Mentor</span>' : '');
  const etoiles = r.mentor ? `<span class="etoiles" title="Notez cette réponse">
    ${[1,2,3,4,5].map(i => `<span class="${i <= (r.etoiles||0) ? '' : 'vide'}" onclick="noter(this, ${i})">★</span>`).join('')}
  </span>` : '';
  const sous = (r.sousReponses||[]).map(sr => `
    <div class="reponse-imbriquee">
      <div class="r-entete">
        <div class="avatar avatar-s">${sr.init}</div>
        <div class="info"><strong>${sr.auteur}</strong></div>
      </div>
      <p>${sr.contenu}</p>
    </div>`).join('');
  return `
    <div class="${cls}">
      <div class="r-entete">
        <div class="avatar avatar-s">${r.init}</div>
        <div class="info"><strong>${r.auteur}</strong> ${badge}</div>
      </div>
      <p>${r.contenu}</p>
      <div class="actions">
        <button onclick="utileR(this)">👍 ${r.utile} Utile</button>
        ${etoiles}
        <button onclick="repondreA(this)">↩ Répondre</button>
      </div>
      ${sous}
    </div>`;
}

function basculerReponses(id) {
  const z = document.getElementById('rep-' + id);
  z.style.display = z.style.display === 'none' ? 'flex' : 'none';
  z.style.flexDirection = 'column';
}

function marquerUtileQ(id) {
  const q = questions.find(x => x.id === id); q.utile++;
  toast('Marqué comme utile.'); rendreFil();
}
function utileR(btn) { toast('Réponse marquée comme utile.'); }
function repondreA(btn) { toast('Fonction : répondre à cette réponse.'); }
function noter(elem, n) {
  const conteneur = elem.parentElement;
  [...conteneur.children].forEach((c, i) => c.classList.toggle('vide', i >= n));
  toast(`Note attribuée : ${n}/5 ⭐`);
}
function signaler(id) { toast('Question signalée à la modération.'); }
function ajouterReponse(id) {
  const inp = document.getElementById('rep-input-'+id);
  if (!inp.value.trim()) return toast('Écrivez votre réponse.', 'erreur');
  const q = questions.find(x => x.id === id);
  q.reponses.push({ auteur: etat.utilisateur.prenom + ' ' + etat.utilisateur.nom, init: etat.utilisateur.initiales, mentor: etat.utilisateur.role === 'mentor', verifie: false, contenu: inp.value, utile: 0 });
  q.repCount++;
  toast('Réponse publiée.');
  inp.value = ''; rendreFil(); setTimeout(() => basculerReponses(id), 50);
}

/* ============================================================
   COLONNE DROITE (tendance + suggestions)
   ============================================================ */
function rendreColonneDroite() {
  document.getElementById('questions-tendance').innerHTML =
    [...questions].sort((a,b) => b.utile - a.utile).slice(0, 5).map(q => `
      <li><a href="#" onclick="event.preventDefault(); basculerReponses(${q.id})">${q.titre}</a>
      <span>${q.utile} 👍 · ${q.repCount} 💬</span></li>`).join('');
  document.getElementById('mentors-suggeres').innerHTML =
    mentors.slice(0, 4).map(m => `
      <li><div class="mentor-sugg">
        <div class="avatar">${m.initiales}</div>
        <div class="info"><strong>${m.prenom} ${m.nom}</strong><span>${m.secteur}</span></div>
        <button class="btn btn-fantome btn-petit" onclick="suivre(this, '${m.prenom}')">+ Suivre</button>
      </div></li>`).join('');
}

function suivre(btn, nom) {
  btn.textContent = '✓ Suivi'; btn.classList.add('btn-secondaire');
  toast(`Vous suivez désormais ${nom}.`);
}

/* ============================================================
   MODAL PUBLIER UNE QUESTION
   ============================================================ */
function ouvrirModal(id) { document.getElementById(id).classList.add('ouvert'); }
function fermerModal(id) { document.getElementById(id).classList.remove('ouvert'); }
function majCompteur() {
  const v = document.getElementById('q-titre').value;
  document.getElementById('compteur').textContent = v.length;
}
function choisirCat(elem) {
  document.querySelectorAll('#chips-cat .chip-select').forEach(c => c.classList.remove('actif'));
  elem.classList.add('actif');
  etat.categorieChoisie = elem.textContent;
}
function publierQuestion() {
  const t = document.getElementById('q-titre').value.trim();
  const c = document.getElementById('q-corps').value.trim();
  if (!t || !c) return toast('Titre et description sont obligatoires.', 'erreur');
  if (!etat.categorieChoisie) return toast('Choisissez une catégorie.', 'erreur');
  questions.unshift({ id: Date.now(), titre: t, corps: c, secteur: etat.categorieChoisie,
    auteur: `${etat.utilisateur.prenom} ${etat.utilisateur.nom}`, initiales: etat.utilisateur.initiales,
    pays: etat.utilisateur.pays, temps: 'à l\'instant', utile: 0, repCount: 0, reponses: [] });
  fermerModal('modalPublier');
  document.getElementById('q-titre').value = ''; document.getElementById('q-corps').value = '';
  document.querySelectorAll('#chips-cat .chip-select').forEach(c => c.classList.remove('actif'));
  document.getElementById('compteur').textContent = '0';
  toast('Votre question a été publiée !');
  rendreFil();
}

/* ============================================================
   PROFIL UTILISATEUR
   ============================================================ */
let profilCible = null; // null = mon profil, sinon mentor

function ouvrirProfilMentor(id) {
  profilCible = mentors.find(m => m.id === id);
  naviguerApp('profil');
}
function rendreProfil() {
  if (profilCible) return rendreProfilMentor(profilCible);
  profilCible = null;
  const u = etat.utilisateur;
  document.getElementById('entete-profil').innerHTML = `
    <div class="avatar avatar-xl">${u.initiales}</div>
    <div class="infos">
      <h2>${u.prenom} ${u.nom}</h2>
      <div class="ligne-meta">
        <span class="badge-role">🎓 Étudiant</span>
        <span>📍 ${u.pays}</span>
        <span>🏫 ${u.etudes}</span>
      </div>
      <div style="display:flex; gap:6px; flex-wrap:wrap;">
        ${u.secteurs.map(s => `<span class="tag">${s}</span>`).join('')}
      </div>
      <div style="display:flex; gap:24px; margin-top:14px; font-size:14px;">
        <div><strong style="font-family:'DM Serif Display',serif; font-size:1.4rem; color:var(--bleu);">${u.questionsPosees}</strong> questions</div>
        <div><strong style="font-family:'DM Serif Display',serif; font-size:1.4rem; color:var(--bleu);">${u.mentorsSuivis}</strong> mentors suivis</div>
      </div>
    </div>
    <div class="actions"><button class="btn btn-secondaire" onclick="naviguerApp('parametres')">✎ Modifier le profil</button></div>`;
  document.getElementById('tabs-profil').innerHTML = `
    <div class="tab-profil actif" onclick="ongletProfil(this, 'questions')">Mes questions</div>
    <div class="tab-profil" onclick="ongletProfil(this, 'sauvees')">Questions sauvegardées</div>
    <div class="tab-profil" onclick="ongletProfil(this, 'mentors')">Mentors suivis</div>`;
  ongletProfil(document.querySelector('.tab-profil.actif'), 'questions');
}
function ongletProfil(elem, t) {
  document.querySelectorAll('.tab-profil').forEach(o => o.classList.remove('actif'));
  elem.classList.add('actif');
  const c = document.getElementById('contenu-profil');
  if (t === 'questions') c.innerHTML = questions.slice(0,3).map(q => carteQuestionHTML(q)).join('');
  else if (t === 'sauvees') c.innerHTML = `<div class="etat-vide carte"><div class="illu">🔖</div><h3>Aucune question sauvegardée</h3><p>Sauvegardez les questions intéressantes pour les retrouver ici.</p></div>`;
  else c.innerHTML = `<div class="carte"><div class="carte-titre">Mes mentors suivis</div>${mentors.slice(0,4).map(m => `
    <div class="suivi-item" onclick="ouvrirProfilMentor(${m.id})">
      <div class="avatar">${m.initiales}</div>
      <div class="info"><strong>${m.prenom} ${m.nom}</strong><span>${m.secteur} · ${m.pays}</span></div>
    </div>`).join('')}</div>`;
}

function rendreProfilMentor(m) {
  const dispoLabel = { disponible:'🟢 Disponible', occupe:'🟠 Occupé', absent:'⚫ Absent' }[m.dispo];
  document.getElementById('entete-profil').innerHTML = `
    <div class="avatar avatar-xl">${m.initiales}</div>
    <div class="infos">
      <h2>${m.prenom} ${m.nom} ${m.verifie ? '<span class="badge-verifie">✓ Vérifié</span>' : ''}</h2>
      <div class="ligne-meta">
        <span class="badge-role badge-mentor">🏆 Mentor</span>
        <span>📍 ${m.ville}, ${m.pays}</span>
        <span><span class="point-statut ${m.dispo}"></span>${dispoLabel.replace(/^[^A-Za-zÀ-ÿ]+/, '')}</span>
      </div>
      <p style="margin:10px 0; color:var(--texte-doux);">${m.bio}</p>
      <div style="display:flex; gap:6px; flex-wrap:wrap;">
        <span class="tag tag-ambre">${m.secteur}</span>
      </div>
      <div style="display:flex; gap:24px; margin-top:14px; font-size:14px;">
        <div><strong style="font-family:'DM Serif Display',serif; font-size:1.4rem; color:var(--bleu);">${m.reponses}</strong> réponses</div>
        <div><strong style="font-family:'DM Serif Display',serif; font-size:1.4rem; color:var(--ambre);">${m.note} ★</strong> note moyenne</div>
        <div><strong style="font-family:'DM Serif Display',serif; font-size:1.4rem; color:var(--bleu);">${m.anciennete}</strong> sur Mentora</div>
      </div>
    </div>
    <div class="actions">
      <button class="btn btn-primaire" onclick="ouvrirModalMsg('${m.prenom} ${m.nom}')">✉️ Envoyer un message</button>
      <button class="btn btn-secondaire" onclick="toast('Vous suivez ${m.prenom}.')">+ Suivre</button>
    </div>`;
  document.getElementById('tabs-profil').innerHTML = `
    <div class="tab-profil actif" onclick="ongletMentor(this, 'apropos')">À propos</div>
    <div class="tab-profil" onclick="ongletMentor(this, 'reponses')">Réponses récentes</div>`;
  ongletMentor(document.querySelector('.tab-profil.actif'), 'apropos');
  // Trick : back to my profile button
  const back = document.createElement('button');
}
function ongletMentor(elem, t) {
  document.querySelectorAll('.tab-profil').forEach(o => o.classList.remove('actif'));
  elem.classList.add('actif');
  const c = document.getElementById('contenu-profil');
  const m = profilCible;
  if (t === 'apropos') {
    c.innerHTML = `<div class="carte"><div class="carte-titre">Expériences & formations</div>
      ${m.experiences.map(e => `<div class="bloc-exp"><div class="icone">${e.icone}</div><div class="details"><strong>${e.poste}</strong><span>${e.dates}</span></div></div>`).join('')}</div>
      <div style="margin-top:14px;"><button class="btn btn-fantome btn-petit" onclick="profilCible = null; rendreProfil()">← Retour à mon profil</button></div>`;
  } else {
    const reps = questions.flatMap(q => q.reponses.filter(r => r.auteur.includes(m.prenom)).map(r => ({...r, question: q.titre})));
    c.innerHTML = reps.length ? reps.map(r => `<div class="carte" style="margin-bottom:12px;"><strong>Sur :</strong> ${r.question}<p style="margin-top:8px; color:var(--texte-doux);">${r.contenu}</p></div>`).join('')
      : `<div class="etat-vide carte"><div class="illu">💭</div><h3>Pas de réponse récente</h3></div>`;
  }
}

/* ============================================================
   MESSAGERIE
   ============================================================ */
function rendreMessagerie() {
  document.getElementById('liste-conversations').innerHTML = conversations.map(c => `
    <div class="conv-item ${etat.conversationActive === c.id ? 'actif' : ''}" onclick="ouvrirConversation(${c.id})">
      <div class="avatar">${c.init}</div>
      <div class="info"><strong>${c.avec}<time>${c.heure}</time></strong><p>${c.dernier}</p></div>
      ${c.nonLu ? '<div class="non-lu-point"></div>' : ''}
    </div>`).join('');
}

function ouvrirConversation(id) {
  etat.conversationActive = id;
  const c = conversations.find(x => x.id === id);
  c.nonLu = false; majBadgeMsg();
  rendreMessagerie();
  document.getElementById('zone-chat').innerHTML = `
    <div class="chat-entete">
      <div class="avatar">${c.init}</div>
      <div><div class="nom">${c.avec}</div><span style="font-size:12px; color:var(--vert);">● En ligne</span></div>
      <div class="menu" onclick="menuChatContextuel('${c.avec}')">⋯</div>
    </div>
    <div class="chat-messages" id="chat-msgs">
      ${c.messages.map(m => `<div class="bulle ${m.recu?'recu':'envoye'}">${m.contenu}${m.statut?`<span class="statut">${m.statut}</span>`:''}</div>`).join('')}
    </div>
    <div class="chat-saisie">
      <input type="text" id="champ-msg" placeholder="Votre message…" onkeydown="if(event.key==='Enter') envoyerMessage(${id})" />
      <button class="btn btn-secondaire btn-petit" onclick="envoyerLien(${id})" title="Joindre une question">🔗</button>
      <button class="btn btn-primaire" onclick="envoyerMessage(${id})">Envoyer</button>
    </div>`;
  const msgs = document.getElementById('chat-msgs'); msgs.scrollTop = msgs.scrollHeight;
}
function envoyerMessage(id) {
  const inp = document.getElementById('champ-msg');
  if (!inp.value.trim()) return;
  const c = conversations.find(x => x.id === id);
  c.messages.push({ de:'moi', contenu: inp.value, heure:'maintenant', recu:false, statut:'Envoyé ✓' });
  c.dernier = inp.value; c.heure = 'maintenant';
  inp.value = '';
  ouvrirConversation(id);
}
function envoyerLien(id) {
  const c = conversations.find(x => x.id === id);
  c.messages.push({ de:'moi', contenu:'🔗 Question partagée : "Comment décrocher un stage en M&A à Londres ?"', heure:'maintenant', recu:false, statut:'Envoyé ✓' });
  ouvrirConversation(id);
}
function menuChatContextuel(nom) {
  if (confirm(`Bloquer ${nom} ?`)) toast(`${nom} a été bloqué(e).`);
}
function majBadgeMsg() {
  const n = conversations.filter(c => c.nonLu).length;
  const b = document.getElementById('badge-msg');
  b.style.display = n ? 'flex' : 'none'; b.textContent = n;
}
function ouvrirModalMsg(nom) {
  document.getElementById('dest-msg').value = nom;
  document.getElementById('contenu-msg').value = '';
  ouvrirModal('modalMessage');
}
function envoyerNouveauMsg() {
  const d = document.getElementById('dest-msg').value;
  if (!document.getElementById('contenu-msg').value.trim()) return toast('Le message est vide.', 'erreur');
  fermerModal('modalMessage');
  toast(`Message envoyé à ${d}.`);
}

/* ============================================================
   NOTIFICATIONS
   ============================================================ */
function basculerNotifs() {
  document.getElementById('panneauNotifs').classList.toggle('ouvert');
  document.getElementById('menuProfil').classList.remove('ouvert');
}
function rendreNotifications() {
  document.getElementById('liste-notifs').innerHTML = notifications.map(n => `
    <div class="notif-item ${n.nonLu?'non-lu':''}">
      <div class="notif-icone">${n.icone}</div>
      <div><p>${n.texte}</p><time>${n.temps}</time></div>
    </div>`).join('');
  majBadgeNotifs();
}
function majBadgeNotifs() {
  const n = notifications.filter(x => x.nonLu).length;
  const b = document.getElementById('badge-notif');
  b.style.display = n ? 'flex' : 'none'; b.textContent = n;
}
function toutMarquerLu() {
  notifications.forEach(n => n.nonLu = false);
  rendreNotifications(); toast('Toutes les notifications ont été marquées comme lues.');
}

/* ============================================================
   MENU PROFIL (navbar)
   ============================================================ */
function basculerMenuProfil() {
  document.getElementById('menuProfil').classList.toggle('ouvert');
  document.getElementById('panneauNotifs').classList.remove('ouvert');
}

/* ============================================================
   RECHERCHE GLOBALE
   ============================================================ */
function rechercher(terme) {
  const drop = document.getElementById('dropRech');
  if (!terme || terme.length < 2) { drop.classList.remove('ouvert'); return; }
  const t = terme.toLowerCase();
  const mres = mentors.filter(m => (m.prenom+' '+m.nom+' '+m.secteur).toLowerCase().includes(t));
  const qres = questions.filter(q => q.titre.toLowerCase().includes(t) || q.secteur.toLowerCase().includes(t));
  let html = '';
  if (mres.length) {
    html += '<h5>Mentors</h5>';
    html += mres.slice(0,4).map(m => `<div class="item-resultat" onclick="ouvrirProfilMentor(${m.id}); document.getElementById('dropRech').classList.remove('ouvert');"><div class="avatar avatar-s">${m.initiales}</div><div><strong>${m.prenom} ${m.nom}</strong><div style="font-size:12px; color:var(--texte-doux);">${m.secteur} · ${m.pays}</div></div></div>`).join('');
  }
  if (qres.length) {
    html += '<h5>Questions</h5>';
    html += qres.slice(0,4).map(q => `<div class="item-resultat">💬 ${q.titre}</div>`).join('');
  }
  if (!html) html = '<div style="padding:14px; color:var(--texte-doux); font-size:14px;">Aucun résultat</div>';
  drop.innerHTML = html;
  drop.classList.add('ouvert');
}

/* ============================================================
   PARAMETRES
   ============================================================ */
function changerPanParam(elem, p) {
  if (!elem) return;
  document.querySelectorAll('#menu-param button').forEach(b => b.classList.remove('actif'));
  elem.classList.add('actif');
  const c = document.getElementById('contenu-param');
  if (p === 'compte') c.innerHTML = panneauCompte();
  if (p === 'notifs') c.innerHTML = panneauNotifsParam();
  if (p === 'securite') c.innerHTML = panneauSecurite();
  if (p === 'confid') c.innerHTML = panneauConfid();
}

function panneauCompte() {
  const u = etat.utilisateur;
  return `<div class="section-param">
    <h2>Mon compte</h2>
    <div class="champs-cote">
      <div class="champ"><label>Prénom</label><input value="${u.prenom}" /></div>
      <div class="champ"><label>Nom</label><input value="${u.nom}" /></div>
    </div>
    <div class="champ"><label>E-mail</label><input type="email" value="${u.prenom.toLowerCase()}.${u.nom.toLowerCase()}@email.com" /></div>
    <div class="champ"><label>Pays</label>
      <select><option>France</option><option>Belgique</option><option>Suisse</option><option>Canada</option><option>Sénégal</option><option>Maroc</option></select>
    </div>
    <div class="champ"><label>Biographie</label>
      <textarea maxlength="500" oninput="document.getElementById('bio-cnt').textContent=this.value.length">${u.bio}</textarea>
      <div class="compteur-car"><span id="bio-cnt">${u.bio.length}</span>/500</div>
    </div>
    <div class="champ"><label>Photo de profil</label>
      <div style="display:flex; align-items:center; gap:14px;"><div class="avatar avatar-l">${u.initiales}</div><button class="btn btn-secondaire">Téléverser</button></div>
    </div>
    <div class="champ"><label>Secteurs d'intérêt</label>
      <div class="chips-select">
        ${['Technologie','Médecine','Droit','Finance','Arts','Éducation','Ingénierie','Entrepreneuriat'].map(s =>
          `<div class="chip-select ${u.secteurs.includes(s)?'actif':''}" onclick="toggleChip(this)">${s}</div>`).join('')}
      </div>
    </div>
    <button class="btn btn-primaire" onclick="toast('Modifications enregistrées.')">Enregistrer</button>
  </div>`;
}

function panneauNotifsParam() {
  const lignes = [
    ['Nouvelle réponse à mes questions', true],
    ['Réactions sur mes publications', true],
    ['Nouveaux abonnés', true],
    ['Nouvelles questions dans mes secteurs', false],
    ['Messages privés', true],
    ['Newsletter hebdomadaire', false],
  ];
  return `<div class="section-param"><h2>Notifications</h2>
    <h3 style="font-family:'DM Sans'; font-size:14px; margin:14px 0 4px; color:var(--texte-doux);">Dans l'application</h3>
    ${lignes.map(([l, on]) => `<div class="ligne-toggle"><div><strong>${l}</strong></div><div class="toggle ${on?'on':''}" onclick="this.classList.toggle('on'); toast('Préférence mise à jour.')"></div></div>`).join('')}
    <h3 style="font-family:'DM Sans'; font-size:14px; margin:20px 0 4px; color:var(--texte-doux);">Par e-mail</h3>
    ${lignes.slice(0,3).map(([l, on]) => `<div class="ligne-toggle"><div><strong>${l}</strong></div><div class="toggle ${on?'on':''}" onclick="this.classList.toggle('on'); toast('Préférence mise à jour.')"></div></div>`).join('')}
  </div>`;
}

function panneauSecurite() {
  return `<div class="section-param"><h2>Sécurité</h2>
    <h3 style="font-family:'DM Sans'; font-size:15px; margin-bottom:10px;">Changer le mot de passe</h3>
    <div class="champ"><label>Mot de passe actuel</label><input type="password" /></div>
    <div class="champ"><label>Nouveau mot de passe</label><input type="password" /></div>
    <div class="champ"><label>Confirmer le nouveau mot de passe</label><input type="password" /></div>
    <button class="btn btn-primaire" onclick="toast('Mot de passe modifié.')">Modifier le mot de passe</button>
    <div style="margin-top:24px;">
      <div class="ligne-toggle"><div><strong>Authentification à deux facteurs</strong><div class="desc">Renforce la sécurité de votre compte.</div></div><div class="toggle" onclick="this.classList.toggle('on'); toast('Préférence mise à jour.')"></div></div>
      <button class="btn btn-secondaire" style="margin-top:14px;" onclick="toast('5 sessions actives.')">Gérer mes sessions</button>
    </div>
  </div>`;
}

function panneauConfid() {
  return `<div class="section-param"><h2>Confidentialité</h2>
    <div class="champ"><label>Qui peut m'envoyer des messages ?</label>
      <select><option>Tout le monde</option><option>Seulement les mentors</option><option>Personnes que je suis</option><option>Personne</option></select>
    </div>
    <div class="ligne-toggle"><div><strong>Profil public</strong><div class="desc">Votre profil est visible par tous les visiteurs.</div></div><div class="toggle on" onclick="this.classList.toggle('on'); toast('Préférence mise à jour.')"></div></div>
    <button class="btn btn-primaire" style="margin-top:14px;" onclick="toast('Préférences enregistrées.')">Enregistrer</button>
  </div>`;
}

/* ============================================================
   ADMINISTRATION
   ============================================================ */
function changerPanAdmin(elem, p) {
  if (!elem) return;
  document.querySelectorAll('.menu-admin button').forEach(b => b.classList.remove('actif'));
  elem.classList.add('actif');
  const c = document.getElementById('contenu-admin');
  if (p === 'dashboard') c.innerHTML = adminDashboard();
  if (p === 'users') c.innerHTML = adminUsers();
  if (p === 'mentors') c.innerHTML = adminMentors();
  if (p === 'signalements') c.innerHTML = adminSignalements();
  if (p === 'categories') c.innerHTML = adminCategories();
}
function adminDashboard() {
  const secteurs = [['Technologie', 78],['Finance', 65],['Médecine', 52],['Entrepreneuriat', 41],['Droit', 30]];
  return `<h2 style="margin-bottom:18px;">Tableau de bord</h2>
    <div class="kpi-grid">
      <div class="kpi-carte"><div class="label">Total inscrits</div><div class="valeur">2 478</div><div class="evolution">+ 124 cette semaine</div></div>
      <div class="kpi-carte"><div class="label">Questions postées</div><div class="valeur">1 832</div><div class="evolution">+ 56 cette semaine</div></div>
      <div class="kpi-carte"><div class="label">Taux de réponse</div><div class="valeur">87 %</div><div class="evolution">+ 3 % vs mois dernier</div></div>
      <div class="kpi-carte"><div class="label">Mentors actifs</div><div class="valeur">382</div><div class="evolution">+ 18 cette semaine</div></div>
    </div>
    <div style="display:grid; grid-template-columns: 2fr 1fr; gap:16px;">
      <div class="carte"><div class="carte-titre">Top secteurs (cette semaine)</div>
        ${secteurs.map(([s, v]) => `<div class="barre-graphique"><div class="label">${s}</div><div class="barre"><div class="remplir" style="width:${v}%; background:var(--bleu);"></div></div><div class="val">${v}%</div></div>`).join('')}
      </div>
      <div class="carte"><div class="carte-titre">Activités récentes</div>
        <ul style="list-style:none; font-size:13px;">
          <li style="padding:8px 0; border-bottom:1px solid var(--bordure);">✓ Nouveau mentor validé : <strong>Karim B.</strong></li>
          <li style="padding:8px 0; border-bottom:1px solid var(--bordure);">🚩 Signalement résolu (commentaire)</li>
          <li style="padding:8px 0; border-bottom:1px solid var(--bordure);">👤 12 nouvelles inscriptions aujourd'hui</li>
          <li style="padding:8px 0;">🏷️ Catégorie ajoutée : "Cybersécurité"</li>
        </ul>
      </div>
    </div>`;
}
function adminUsers() {
  const users = [
    ['Marie Dupont','marie@email.com','Étudiant','actif'],
    ['Sophie Lambert','sophie@email.com','Mentor','actif'],
    ['Karim Benali','karim@email.com','Mentor','actif'],
    ['Hugo Dupont','hugo@email.com','Étudiant','suspendu'],
    ['Léa Tremblay','lea@email.com','Étudiant','actif'],
  ];
  return `<h2 style="margin-bottom:18px;">Gestion des utilisateurs</h2>
    <input style="max-width:340px; margin-bottom:14px;" placeholder="🔍 Rechercher un utilisateur…" />
    <table class="tableau"><thead><tr><th>Nom</th><th>E-mail</th><th>Rôle</th><th>Statut</th><th>Actions</th></tr></thead>
    <tbody>${users.map(u => `<tr>
      <td><strong>${u[0]}</strong></td><td>${u[1]}</td>
      <td><span class="badge-role ${u[2]==='Mentor'?'badge-mentor':''}">${u[2]}</span></td>
      <td><span class="tag ${u[3]==='actif'?'tag-vert':'tag-rose'}">${u[3]}</span></td>
      <td>
        <button class="btn btn-secondaire btn-petit" onclick="toast('Utilisateur suspendu.')">Suspendre</button>
        <button class="btn btn-danger btn-petit" onclick="toast('Utilisateur supprimé.', 'erreur')">Supprimer</button>
      </td></tr>`).join('')}</tbody></table>`;
}
function adminMentors() {
  const att = mentors.filter(m => !m.verifie);
  return `<h2 style="margin-bottom:18px;">Validation des mentors</h2>
    <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap:14px;">
      ${att.map(m => `<div class="carte"><div style="display:flex; gap:12px; align-items:center;">
        <div class="avatar avatar-l">${m.initiales}</div>
        <div><strong>${m.prenom} ${m.nom}</strong><div style="color:var(--texte-doux); font-size:13px;">${m.ville}, ${m.pays}</div><span class="tag tag-ambre">${m.secteur}</span></div>
        </div><p style="margin:12px 0; font-size:14px;">${m.bio}</p>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-primaire btn-petit" style="background:var(--vert);" onclick="toast('${m.prenom} validé(e).')">✓ Valider</button>
          <button class="btn btn-danger btn-petit" onclick="toast('${m.prenom} refusé(e).', 'erreur')">✕ Refuser</button>
        </div></div>`).join('')}
    </div>`;
}
function adminSignalements() {
  return `<h2 style="margin-bottom:18px;">Signalements</h2>
    ${[1,2,3].map(i => `<div class="carte" style="margin-bottom:12px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <strong>Signalement #${1000+i}</strong>
        <span class="tag tag-rose">Contenu inapproprié</span>
      </div>
      <p style="color:var(--texte-doux); font-size:14px;">"Lorem ipsum dolor sit amet, contenu signalé par un utilisateur…"</p>
      <div style="margin-top:8px; font-size:13px; color:var(--texte-doux);">Auteur : <strong>Utilisateur ${i}</strong> · Signalé par 3 personnes</div>
      <div style="display:flex; gap:8px; margin-top:12px;">
        <button class="btn btn-secondaire btn-petit" onclick="toast('Contenu masqué.')">Masquer</button>
        <button class="btn btn-danger btn-petit" onclick="toast('Contenu supprimé.', 'erreur')">Supprimer</button>
        <button class="btn btn-fantome btn-petit" onclick="toast('Signalement rejeté.')">Rejeter</button>
      </div></div>`).join('')}`;
}
let categories = ['Technologie','Médecine','Droit','Finance','Arts','Éducation','Ingénierie','Entrepreneuriat'];
function adminCategories() {
  return `<h2 style="margin-bottom:18px;">Catégories</h2>
    <div class="carte">
      <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:14px;">
        ${categories.map(c => `<span class="tag" style="display:inline-flex; align-items:center; gap:6px;">${c} <span style="cursor:pointer; font-weight:700;" onclick="supprimerCat('${c}')">×</span></span>`).join('')}
      </div>
      <div style="display:flex; gap:8px;">
        <input id="nouv-cat" placeholder="Nouvelle catégorie…" />
        <button class="btn btn-primaire" onclick="ajouterCat()">Ajouter</button>
      </div>
    </div>`;
}
function supprimerCat(c) { categories = categories.filter(x => x !== c); changerPanAdmin(document.querySelector('[data-adm=categories]'), 'categories'); toast(`Catégorie "${c}" supprimée.`); }
function ajouterCat() {
  const v = document.getElementById('nouv-cat').value.trim();
  if (!v) return toast('Saisissez un nom.', 'erreur');
  categories.push(v); toast(`Catégorie "${v}" ajoutée.`);
  changerPanAdmin(document.querySelector('[data-adm=categories]'), 'categories');
}

/* ============================================================
   TOASTS
   ============================================================ */
function toast(message, type = 'succes') {
  const zone = document.getElementById('zoneToasts');
  const t = document.createElement('div');
  t.className = 'toast' + (type === 'erreur' ? ' erreur' : '');
  t.innerHTML = `<span>${type === 'erreur' ? '⚠️' : '✓'}</span><span>${message}</span>`;
  zone.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; }, 3000);
  setTimeout(() => t.remove(), 3400);
}

/* ============================================================
   FERMETURES CLIC EXTERIEUR
   ============================================================ */
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-profil') && !e.target.closest('.menu-profil'))
    document.getElementById('menuProfil')?.classList.remove('ouvert');
  if (!e.target.closest('[onclick*="basculerNotifs"]') && !e.target.closest('.panneau-notifs'))
    document.getElementById('panneauNotifs')?.classList.remove('ouvert');
});

/* ============================================================
   DEMARRAGE
   ============================================================ */
window.addEventListener('DOMContentLoaded', () => {
  majBadgeMsg();
  // Vue par défaut : accueil. Décommenter pour démarrer directement dans l'app.
  // afficherVue('vue-app'); initApp();
});
