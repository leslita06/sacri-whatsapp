// Onglets, envoi automatique et campagne. Simulation : aucun message ne part réellement de cette page.
(function () {
  'use strict';
  var V = '20261119b';
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var I = {
    chat: '<path d="M21 11.5a8.4 8.4 0 0 1-12.6 7.3L3 20.5l1.7-5.2A8.5 8.5 0 1 1 21 11.5z"/>',
    zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/>',
    cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    tag: '<path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1.5"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5M12 3v12"/>',
    send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
    left: '<path d="m15 18-6-6 6-6"/>', right: '<path d="m9 18 6-6-6-6"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    reset: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
    play: '<path d="m7 4 13 8-13 8z"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    phone: '<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18h2"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'
  };
  function svg(k) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (I[k] || '') + '</svg>'; }
  var Q = new URLSearchParams(location.search);
  var FAST = Q.get('rapide') === '1';
  function T(ms) { return FAST ? 1 : ms; }
  var timers = [];
  function later(f, ms) { timers.push(setTimeout(f, ms)); }
  function stop() { timers.forEach(clearTimeout); timers = []; }
  function img(f) { return 'assets/img/' + f + '?v=' + V; }

  var STAT = { envoye: ['✓', 'Envoyé'], recu: ['✓✓', 'Reçu'], lu: ['✓✓', 'Lu'], repondu: ['', 'A répondu'] };
  function chip(s) { return '<span class="sc s-' + s + '"><i>' + STAT[s][0] + '</i>' + STAT[s][1] + '</span>'; }

  // ---------- Envoi automatique ----------
  var REGLES = [
    { k: 'devis', ic: 'doc', t: 'Relance de devis', q: 'Devis de réparation sans réponse', w: 'après 3 jours' },
    { k: 'rev', ic: 'cal', t: 'Rappel de révision', q: 'Machine non révisée depuis 6 mois', w: '15 jours avant la saison' },
    { k: 'promo', ic: 'tag', t: 'Promotion de saison', q: 'Texte validé par le responsable commercial', w: 'à la date prévue' },
    { k: 'pret', ic: 'wrench', t: 'Machine réparée', q: 'Le technicien passe la machine en « Réparée »', w: 'tout de suite' }
  ];
  var EVTS = [
    { r: 'devis', h: '09:00', cl: 'BTP Kanga & Fils', tel: '05 •• •• 63 10', img: 'compresseur.jpg',
      quoi: 'Devis BR-2026-0420 sans réponse depuis 3 jours',
      msg: 'Bonjour M. Kanga, ici le service client PST-CI. Le devis de réparation de votre compresseur à piston 270 L (bon BR-2026-0420), envoyé le 10/11, attend votre accord. Répondez OUI pour lancer la réparation, ou posez votre question ici.', fin: 'repondu', rep: 'OUI, allez-y.' },
    { r: 'rev', h: '09:15', cl: 'Résidence Les Palmiers', tel: '07 •• •• 44 06', img: 'debroussailleuse-fs250.jpg',
      quoi: 'FS 250 non révisée depuis 6 mois',
      msg: 'Bonjour Mme Yao, ici le service client SACRI. Votre débroussailleuse STIHL FS 250 n\'a pas été révisée depuis six mois. Avant la saison des pluies : bougie, filtre, lame, réglage. Répondez RDV pour choisir votre créneau à l\'atelier.', fin: 'repondu', rep: 'RDV' },
    { r: 'promo', h: '10:00', cl: 'Plantations Akoupé Sud', tel: '07 •• •• 21 48', img: 'debroussailleuse-fs400.jpg',
      quoi: 'Promotion débroussailleuses, début de saison',
      msg: 'Bonjour M. Aka, ici SACRI. La saison des pluies arrive : la débroussailleuse STIHL FS 400 est disponible à Abidjan, avec harnais et lame. Répondez PRIX pour recevoir l\'offre du service commercial.', fin: 'lu' },
    { r: 'pret', h: '10:30', cl: 'Scierie du Haut-Sassandra', tel: '01 •• •• 35 82', img: 'tronconneuse-ms661.jpg',
      quoi: 'MS 661 passée en « Réparée »',
      msg: 'Bonjour, ici le service client SACRI. Bonne nouvelle : votre tronçonneuse STIHL MS 661 (bon BR-2026-0422) est réparée et prête à retirer au comptoir de l\'atelier. Présentez le bon de réception.', fin: 'repondu', rep: 'Merci, on passe demain matin.' }
  ];
  var A = { n: 0, l: 0, r: 0 };

  function autoView() {
    A = { n: 0, l: 0, r: 0 };
    $('auto').innerHTML =
      '<ol class="flow" aria-label="Comment ça marche">' +
        '<li>' + svg('clock') + '<span><b>1. L\'événement arrive</b><i>devis sans réponse, révision, promotion</i></span></li>' +
        '<li class="ar">' + svg('arrow') + '</li>' +
        '<li>' + svg('zap') + '<span><b>2. Le message part seul</b><i>personnalisé, sans aucun clic</i></span></li>' +
        '<li class="ar">' + svg('arrow') + '</li>' +
        '<li>' + svg('phone') + '<span><b>3. Le client le reçoit</b><i>sur son WhatsApp</i></span></li>' +
      '</ol>' +
      '<div class="au">' +
        '<div class="au-l">' +
          '<div class="card"><p class="cap">' + svg('zap') + 'Les règles actives</p><p class="sub">Chaque règle envoie son message dès qu\'elle se déclenche. Pour la voir agir, cliquez sur « Déclencher ».</p>' +
          '<ul class="rg">' + REGLES.map(function (r) { return '<li id="rg-' + r.k + '"><span class="ri">' + svg(r.ic) + '</span><span class="rt"><b>' + r.t + '</b><span>' + r.q + ', ' + r.w + '</span></span><button type="button" class="btn sm ghost" data-r="' + r.k + '">' + svg('play') + 'Déclencher</button></li>'; }).join('') + '</ul>' +
          '<p class="garde">' + svg('shield') + 'Jamais de prix, de délai ni de geste commercial dans un message automatique : un conseiller les donne.</p></div>' +
          '<div class="card live"><div class="lh"><p class="cap"><span class="dot"></span>Messages partis seuls, ce matin</p><button type="button" class="btn sm" id="au-go">' + svg('reset') + 'Rejouer la matinée</button></div>' +
          '<div class="cpt"><div><b id="au-n">–</b><span>partis seuls</span></div><div><b id="au-l">–</b><span>lus</span></div><div><b id="au-r">–</b><span>réponses</span></div><div><b>Aucun</b><span>clic d\'un agent</span></div></div>' +
          '<ol class="feed" id="feed"></ol></div>' +
        '</div>' +
        '<div class="au-r"><div class="wa" id="au-phone"><div class="wa-h"><span class="pa">' + svg('users') + '</span><span><b id="ph-cl">Le client</b><i id="ph-tel">ce qu\'il voit sur WhatsApp</i></span></div><div class="wa-c" id="ph-c"><p class="wait">En attente du prochain message…</p></div></div><p class="cap-ph">Écran du client (fictif)</p></div>' +
      '</div>';
    $('au-go').addEventListener('click', function () { stop(); autoView(); matinee(); });
    document.querySelectorAll('#auto [data-r]').forEach(function (b) {
      b.addEventListener('click', function () {
        var e = EVTS.filter(function (x) { return x.r === b.getAttribute('data-r'); })[0];
        var now = new Date(); fire(e, ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2));
        $('au-phone').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });
  }
  function maj() { $('au-n').textContent = A.n || '–'; $('au-l').textContent = A.l || '–'; $('au-r').textContent = A.r || '–'; }
  var seq = 0;
  function fire(e, h) {
    var id = 'fs' + (seq++);
    document.querySelectorAll('.rg li').forEach(function (x) { x.classList.remove('hit'); });
    var rg = $('rg-' + e.r); if (rg) rg.classList.add('hit');
    var li = document.createElement('li'); li.className = 'fi new';
    li.innerHTML = '<span class="fh">' + h + '</span><span class="fic">' + svg(REGLES.filter(function (r) { return r.k === e.r; })[0].ic) + '</span><span class="fb"><span class="fq">' + esc(e.quoi) + '</span><b>' + esc(e.cl) + ' <i class="fx">fictif</i></b><span class="fs" id="' + id + '">' + chip('envoye') + '<em>' + svg('zap') + 'parti tout seul, sans clic</em></span></span>';
    var fd = $('feed'); fd.insertBefore(li, fd.firstChild); A.n++; maj();
    $('ph-cl').textContent = e.cl; $('ph-tel').textContent = '+225 ' + e.tel + ', client fictif';
    $('ph-c').innerHTML = '<div class="day">Aujourd\'hui</div><div class="tag-auto">' + svg('zap') + 'Message automatique SACRI</div><div class="bb pop"><img src="' + img(e.img) + '" alt=""><p>' + esc(e.msg) + '</p><span class="bm">' + h + '</span></div>';
    later(function () { var s = $(id); if (s) s.firstChild.outerHTML = chip('recu'); }, T(700));
    if (e.fin !== 'envoye') later(function () { var s = $(id); if (s) s.firstChild.outerHTML = chip('lu'); A.l++; maj(); }, T(1500));
    if (e.fin === 'repondu') later(function () {
      var s = $(id); if (s) s.firstChild.outerHTML = chip('repondu'); A.r++; maj();
      if ($('ph-cl').textContent === e.cl) $('ph-c').insertAdjacentHTML('beforeend', '<div class="bo pop"><p>' + esc(e.rep) + '</p><span class="bm">' + h + '</span></div>');
    }, T(2400));
  }
  function matinee() { EVTS.forEach(function (e, i) { later(function () { fire(e, e.h); }, T(600 + i * 3200)); }); }

  // ---------- Campagne ----------
  var BASE = [
    { id: 'c1', nom: 'Plantations Akoupé Sud', contact: 'M. Aka', tel: '07 •• •• 21 48', soc: 'SACRI', mach: 'STIHL FS 400', devis: { br: 'BR-2026-0428', le: '17/11' }, rev: '7 mois' },
    { id: 'c2', nom: 'BTP Kanga & Fils', contact: 'M. Kanga', tel: '05 •• •• 63 10', soc: 'PST-CI', mach: 'compresseur à piston 270 L', devis: { br: 'BR-2026-0420', le: '10/11' }, rev: '9 mois' },
    { id: 'c3', nom: 'Scierie Bandama Bois', contact: 'Mme Konan', tel: '07 •• •• 90 27', soc: 'SACRI', mach: 'STIHL MS 381', devis: { br: 'BR-2026-0426', le: '13/11' }, rev: '6 mois' },
    { id: 'c4', nom: 'Scierie de Soubré', contact: 'M. Gbané', tel: '01 •• •• 35 82', soc: 'SACRI', mach: 'STIHL MS 462', devis: null, rev: '8 mois' },
    { id: 'c5', nom: 'Résidence Les Palmiers', contact: 'Mme Yao', tel: '07 •• •• 44 06', soc: 'SACRI', mach: 'STIHL FS 250', devis: null, rev: '6 mois' },
    { id: 'c6', nom: 'Transports Lagune Express', contact: 'M. Ehui', tel: '05 •• •• 18 73', soc: 'PST-CI', mach: 'compresseur à piston 270 L', devis: { br: 'BR-2026-0433', le: '14/11' }, rev: '10 mois' },
    { id: 'c7', nom: 'M. Paul Kouakou', contact: 'M. Kouakou', tel: '07 •• •• 52 39', soc: 'SACRI', mach: 'STIHL FS 250', devis: null, rev: '6 mois' },
    { id: 'c8', nom: 'Mme Mariam Diallo', contact: 'Mme Diallo', tel: '01 •• •• 77 14', soc: 'SACRI', mach: 'STIHL MS 250', devis: null, rev: '12 mois' }
  ];
  var CSV = [
    { id: 'f1', nom: 'Coopérative agricole de Daloa', contact: 'M. Gnagne', tel: '07 •• •• 30 58', soc: 'SACRI', mach: 'STIHL FS 400', devis: null, rev: '7 mois', csv: 1 },
    { id: 'f2', nom: 'Espaces Verts du Plateau', contact: 'Mme Touré', tel: '05 •• •• 81 22', soc: 'SACRI', mach: 'STIHL FS 250', devis: null, rev: '6 mois', csv: 1 },
    { id: 'f3', nom: 'Ferme avicole de Bingerville', contact: 'M. Kouamé', tel: '07 •• •• 09 61', soc: 'SACRI', mach: 'STIHL RE 130 Plus', devis: null, rev: '8 mois', csv: 1 },
    { id: 'f4', nom: 'Golf Club Lagune', contact: 'M. Bamba', tel: '01 •• •• 46 95', soc: 'SACRI', mach: 'STIHL RM 448', devis: null, rev: '6 mois', csv: 1 },
    { id: 'f5', nom: 'Plantations de Gagnoa', contact: 'Mme Zadi', tel: '07 •• •• 72 30', soc: 'SACRI', mach: 'STIHL SR 420', devis: null, rev: '11 mois', csv: 1 }
  ];
  var TYPES = {
    rev: { t: 'Rappel de révision', ic: 'cal', img: 'debroussailleuse-fs400.jpg', ok: function () { return true; },
      msg: function (c) { return 'Bonjour ' + c.contact + ', ici le service client ' + c.soc + '. Votre ' + c.mach + ' n\'a pas été révisée depuis ' + c.rev + '. Avant la saison des pluies, une révision évite la panne en plein travail. Répondez RDV pour choisir votre créneau à l\'atelier.'; } },
    devis: { t: 'Relance de devis', ic: 'doc', img: 'compresseur.jpg', ok: function (c) { return !!c.devis; },
      msg: function (c) { return 'Bonjour ' + c.contact + ', ici le service client ' + c.soc + '. Le devis de réparation de votre ' + c.mach + ' (bon ' + c.devis.br + '), envoyé le ' + c.devis.le + ', attend votre accord. Répondez OUI pour lancer la réparation.'; } },
    promo: { t: 'Promotion de saison', ic: 'tag', img: 'debroussailleuse-fs400.jpg', ok: function () { return true; },
      msg: function (c) { return 'Bonjour ' + c.contact + ', ici SACRI. La saison des pluies arrive : débroussailleuses STIHL FS 400 et FS 250 disponibles à Abidjan, avec harnais et lame. Répondez PRIX pour recevoir l\'offre du service commercial.'; } }
  };
  var C = { type: 'rev', clients: BASE.slice(), coches: {}, apercu: 0, envoye: false, imp: false, res: null };
  ['c1', 'c3', 'c4', 'c5', 'c7'].forEach(function (k) { C.coches[k] = true; });

  function photo(c) {
    var m = c.mach;
    if (/FS 400/.test(m)) return 'debroussailleuse-fs400.jpg';
    if (/FS 2/.test(m)) return 'debroussailleuse-fs250.jpg';
    if (/MS 661/.test(m)) return 'tronconneuse-ms661.jpg';
    if (/MS /.test(m)) return 'tronconneuse.jpg';
    if (/compresseur/.test(m)) return 'compresseur.jpg';
    if (/RE 130/.test(m)) return 're130.jpg';
    if (/RM 448/.test(m)) return 'rm448.jpg';
    if (/SR 420/.test(m)) return 'sr420.jpg';
    return 'debroussailleuse-fs400.jpg';
  }
  function liste() { var tp = TYPES[C.type]; return C.clients.filter(function (c) { return tp.ok(c); }); }
  function choisis() { return liste().filter(function (c) { return C.coches[c.id]; }); }

  function campView() {
    var tp = TYPES[C.type], L = liste(), S = choisis();
    if (C.apercu >= S.length) C.apercu = 0;
    var cur = S[C.apercu];
    $('camp').innerHTML =
      '<ol class="cp-steps"><li class="on"><i>1</i>Le message</li><li class="' + (S.length ? 'on' : '') + '"><i>2</i>Les clients</li><li class="' + (S.length ? 'on' : '') + '"><i>3</i>L\'aperçu</li><li class="' + (C.envoye ? 'on' : '') + '"><i>4</i>Le suivi</li></ol>' +
      '<div class="cp">' +
      '<div class="cp-l">' +
        '<div class="card"><p class="cap">1. Quel message ?</p><div class="ty">' + Object.keys(TYPES).map(function (k) { return '<button type="button" data-t="' + k + '" class="' + (k === C.type ? 'on' : '') + '">' + svg(TYPES[k].ic) + TYPES[k].t + '</button>'; }).join('') + '</div></div>' +
        '<div class="card"><div class="lh"><p class="cap">2. Quels clients ? <span class="cnt">' + S.length + ' sur ' + L.length + '</span></p>' +
        '<div class="lb"><button type="button" class="btn sm ghost" id="cp-all">' + (S.length === L.length && L.length ? 'Tout décocher' : 'Tout cocher') + '</button><button type="button" class="btn sm" id="cp-imp"' + (C.imp ? ' disabled' : '') + '>' + svg('upload') + (C.imp ? 'Fichier importé' : 'Importer un fichier') + '</button></div></div>' +
        '<p class="fict">Liste de clients fictifs, numéros masqués.</p>' +
        (C.imp ? '<p class="impf">' + svg('file') + '<span><b>clients_saison_pluies.csv</b> : 5 lignes lues, 5 numéros valides, 0 doublon. Les clients sont ajoutés et cochés.</span></p>' : '') +
        '<ul class="cl">' + (L.length ? L.map(function (c) {
          return '<li><label><input type="checkbox" data-c="' + c.id + '"' + (C.coches[c.id] ? ' checked' : '') + (C.envoye ? ' disabled' : '') + '><span class="ck"></span><span class="cn"><b>' + esc(c.nom) + ' <i class="fx">fictif</i>' + (c.csv ? ' <i class="nv">importé</i>' : '') + '</b><span>' + esc(c.contact) + ', +225 ' + esc(c.tel) + ', ' + esc(c.mach) + '</span></span></label></li>';
        }).join('') : '<li class="empty">Aucun client concerné par ce message.</li>') + '</ul></div>' +
      '</div>' +
      '<div class="cp-r"><div class="card"><div class="lh"><p class="cap">3. Le message de chaque client</p>' +
        (S.length > 1 ? '<span class="nav"><button type="button" id="cp-p" aria-label="Client précédent">' + svg('left') + '</button><span>' + (C.apercu + 1) + ' / ' + S.length + '</span><button type="button" id="cp-n" aria-label="Client suivant">' + svg('right') + '</button></span>' : '') + '</div>' +
        (cur ? '<div class="pv"><p class="pvh"><b>' + esc(cur.nom) + '</b>, +225 ' + esc(cur.tel) + '</p><div class="pvz"><div class="bb"><img src="' + img(C.type === 'promo' ? tp.img : photo(cur)) + '" alt=""><p>' + esc(tp.msg(cur)) + '</p><span class="bm">maintenant</span></div></div>' +
          '<p class="pvn">Les mots surlignés changent d\'un client à l\'autre.</p></div>' : '<p class="empty">Cochez au moins un client pour voir son message.</p>') +
        '<button type="button" class="btn big" id="cp-go"' + (!S.length || C.envoye ? ' disabled' : '') + '>' + svg('send') + (C.envoye ? 'Campagne envoyée' : 'Envoyer à ' + S.length + ' client' + (S.length > 1 ? 's' : '')) + '</button>' +
        (C.envoye ? '<button type="button" class="btn sm ghost again" id="cp-new">' + svg('reset') + 'Préparer une autre campagne</button>' : '') +
        '<p class="garde">' + svg('shield') + 'Un seul clic pour tous, un message personnel pour chacun. Les prix et les remises restent donnés par un conseiller.</p></div>' +
        '<div class="card" id="cp-res"' + (C.envoye ? '' : ' hidden') + '></div></div>' +
      '</div>';
    var p = document.querySelector('.pv .bb p');
    if (p && cur) {
      var h = p.innerHTML;
      [cur.contact, cur.mach, cur.devis && cur.devis.br, cur.devis && cur.devis.le, cur.rev].filter(Boolean).forEach(function (v) { h = h.split(esc(v)).join('<span class="vr">' + esc(v) + '</span>'); });
      p.innerHTML = h;
    }
    document.querySelectorAll('.ty button').forEach(function (b) { b.addEventListener('click', function () { if (C.envoye) return; C.type = b.getAttribute('data-t'); C.apercu = 0; campView(); }); });
    document.querySelectorAll('.cl input').forEach(function (b) { b.addEventListener('change', function () { C.coches[b.getAttribute('data-c')] = b.checked; campView(); }); });
    $('cp-all').addEventListener('click', function () { if (C.envoye) return; var all = S.length === L.length; L.forEach(function (c) { C.coches[c.id] = !all; }); campView(); });
    $('cp-imp').addEventListener('click', function () {
      var b = $('cp-imp'); b.disabled = true; b.innerHTML = svg('upload') + 'Lecture du fichier…';
      later(function () { C.imp = true; C.clients = BASE.concat(CSV); CSV.forEach(function (c) { C.coches[c.id] = true; }); campView(); }, T(900));
    });
    if ($('cp-p')) { $('cp-p').addEventListener('click', function () { C.apercu = (C.apercu - 1 + S.length) % S.length; campView(); }); $('cp-n').addEventListener('click', function () { C.apercu = (C.apercu + 1) % S.length; campView(); }); }
    $('cp-go').addEventListener('click', function () { C.envoye = true; campView(); envoyer(S); });
    if ($('cp-new')) $('cp-new').addEventListener('click', function () { stop(); C.envoye = false; C.res = null; campView(); });
    if (C.envoye && C.res) resultats(C.res);
  }
  function envoyer(S) {
    var reps = ['RDV', 'OUI, on passe vendredi', 'RDV', 'Merci, je vous rappelle', 'PRIX'];
    C.res = S.map(function (c, i) { return { c: c, s: 'envoye', r: i % 3 === 0 ? reps[(i / 3) % reps.length] : null, lu: i % 4 !== 3 }; });
    resultats(C.res);
    $('cp-res').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    C.res.forEach(function (x, i) {
      later(function () { x.s = 'recu'; resultats(C.res); }, T(500 + i * 200));
      if (x.lu) later(function () { x.s = 'lu'; resultats(C.res); }, T(1600 + i * 280));
      if (x.r) later(function () { x.s = 'repondu'; resultats(C.res); }, T(2800 + i * 380));
    });
  }
  function resultats(R) {
    var el = $('cp-res'); if (!el) return; el.hidden = false;
    var c = { envoye: R.length, lu: 0, repondu: 0 };
    R.forEach(function (x) { if (x.s === 'lu' || x.s === 'repondu') c.lu++; if (x.s === 'repondu') c.repondu++; });
    el.innerHTML = '<p class="cap">4. Le suivi de l\'envoi <span class="cnt">' + TYPES[C.type].t.toLowerCase() + '</span></p>' +
      '<div class="cpt"><div><b>' + c.envoye + '</b><span>envoyés</span></div><div><b>' + c.lu + '</b><span>lus</span></div><div><b>' + c.repondu + '</b><span>ont répondu</span></div></div>' +
      '<ul class="rs">' + R.map(function (x) { return '<li><span class="rn"><b>' + esc(x.c.nom) + '</b><span>+225 ' + esc(x.c.tel) + '</span></span>' + chip(x.s) + (x.s === 'repondu' ? '<span class="rr">« ' + esc(x.r) + ' »</span>' : '') + '</li>'; }).join('') + '</ul>' +
      '<p class="sub">Chaque réponse arrive dans la conversation WhatsApp du client ; un conseiller la reprend.</p>';
  }

  // ---------- Onglets ----------
  var MODES = [
    ['conversations', 'conv', 'chat', 'Conversations', 'Le client écrit, l\'assistant répond'],
    ['automatique', 'auto', 'zap', 'Envoi automatique', 'Les messages partent seuls'],
    ['campagne', 'camp', 'users', 'Campagne', 'Plusieurs clients en un clic']
  ];
  var cur = null;
  function show(h) {
    var m = MODES.filter(function (x) { return x[0] === h; })[0] || MODES[0];
    if (cur === m[0]) return; cur = m[0];
    stop(); if (window.SacriConv) window.SacriConv.stop();
    MODES.forEach(function (x) { $('mode-' + x[1]).hidden = x[0] !== m[0]; });
    document.querySelectorAll('#tabs a').forEach(function (a) { var on = a.getAttribute('data-m') === m[0]; a.classList.toggle('on', on); a.setAttribute('aria-selected', on); });
    if (m[1] === 'conv' && window.SacriConv) window.SacriConv.start();
    if (m[1] === 'auto') { autoView(); matinee(); }
    if (m[1] === 'camp') campView();
  }
  $('tabs').innerHTML = MODES.map(function (m) { return '<a href="#' + m[0] + '" role="tab" data-m="' + m[0] + '">' + svg(m[2]) + '<span><b>' + m[3] + '</b><i>' + m[4] + '</i></span></a>'; }).join('');
  window.addEventListener('hashchange', function () { show(location.hash.slice(1)); window.scrollTo(0, 0); });
  show(location.hash.slice(1));
})();
