(function(){
"use strict";
var BOT='<span class="who-l bot">Assistant SACRI</span>';
var CATALOGUE="https://leslita06.github.io/sacri-catalogue/";
var CAT='<a class="lk" href="'+CATALOGUE+'" target="_blank" rel="noopener">Ouvrir le catalogue</a>';
var HUM=function(n){return '<span class="who-l hum">'+n+', conseiller SACRI</span>';};
var S=[
{ k:"panne", t:"Panne en note vocale", d:"Diagnostic dès le premier message",
  title:"Le client parle, l'assistant diagnostique tout de suite",
  pitch:"Un exploitant envoie une note vocale : sa tronçonneuse ne démarre plus. L'assistant transcrit la note et répond en deux lignes : les trois vérifications de la notice STIHL, puis trois boutons. Le détail ne vient que si la panne persiste. Le rendez-vous reste une demande jusqu'à confirmation de l'atelier.",
  steps:[["Note vocale du client","c","Client"],["Transcrite et comprise","a","Assistant"],["Diagnostic issu de la notice","a","Assistant"],["Demande d'atelier à confirmer","c","Client"]],
  k1:"25 s", k2:"0", k2l:"question posée avant le diagnostic",
  m:[
   {d:"Aujourd'hui"},
   {o:1,tm:"07:42",h:'<span class="voice"><span class="vp">▶</span><span class="vw"></span><span class="vd">0:06</span></span><span class="vt">« Ma tronçonneuse-là ne démarre plus, qu\'est-ce que je fais ? »</span>',s:0},
   {o:0,tm:"07:42",h:BOT+'Pas de panique, c\'est souvent simple 🔧<br>Vérifiez dans cet ordre : <strong>carburant frais</strong>, <strong>bougie</strong>, <strong>filtre à air</strong>.',s:2,badge:"Réponse simulée, environ 25 s"},
   {o:0,tm:"07:42",h:BOT+'Et après ces vérifications ?',s:2,btn:["Ça repart 👍","Toujours en panne","Je l'apporte à l'atelier"]},
   {o:1,tm:"07:49",h:'Toujours en panne',s:2,pick:1},
   {o:0,tm:"07:49",h:BOT+'Alors, deux points précis, moteur arrêté :<br>• <strong>Mélange</strong> : 1:50, soit 20 ml d\'huile 2 temps pour 1 litre d\'essence.<br>• <strong>Moteur noyé</strong> (odeur d\'essence) : séchez la bougie, tirez le lanceur 5 ou 6 fois, redémarrez sans starter.<br>Catalogue des pièces : '+CAT,s:2,btn:["Ça repart 👍","Je l'apporte à l'atelier","Être rappelé par un technicien"]},
   {o:1,tm:"07:51",h:'Je l\'apporte à l\'atelier',s:2,pick:1},
   {o:0,tm:"07:51",h:BOT+'D\'accord, on la répare à l\'atelier 🔧<br>Prochains créneaux à l\'atelier (lun.-ven., 8 h-17 h) :',s:3,btn:["Mercredi 25 novembre, matin, dès 8 h","Jeudi 26 novembre, matin, dès 8 h","Vendredi 27 novembre, après-midi, avant 17 h","Autre date"]},
   {o:1,tm:"07:52",h:'Jeudi 26 novembre, matin, dès 8 h',s:3,pick:1},
   {o:0,tm:"07:52",h:BOT+'Votre demande de rendez-vous est transmise à l\'atelier SACRI ✅<br>🛠️ Réparation, tronçonneuse<br>📅 <strong>Jeudi 26 novembre, matin, dès 8 h</strong><br>📍 Atelier SACRI, boulevard de Marseille, face à la SIVOA<br>L\'atelier confirme la disponibilité ici même : le créneau n\'est pas encore réservé.',s:3}
  ]},
{ k:"revision", t:"Révision en deux touches", d:"Modèles et créneaux proposés",
  title:"Une demande d'entretien en deux touches",
  pitch:"Une gérante de plantation veut faire réviser sa débroussailleuse. L'assistant ne demande ni le modèle ni le jour : il propose les modèles STIHL courants et les trois prochains créneaux de l'atelier. Elle touche son modèle, puis son créneau, sans rien taper ; une demande est transmise, l'atelier doit confirmer.",
  steps:[["Demande de révision","c","Client"],["Modèles et créneaux proposés","a","Assistant"],["Modèle puis créneau touchés","c","Client"],["Demande transmise pour confirmation","a","Assistant"]],
  k1:"15 s", k2:"2", k2l:"touches, sans rien écrire",
  m:[
   {d:"Aujourd'hui"},
   {o:1,tm:"10:12",h:'Je veux réviser ma débroussailleuse',s:0},
   {o:0,tm:"10:12",h:BOT+'Avec plaisir, on prépare l\'entretien de votre débroussailleuse 🔧<br>Touchez votre <strong>modèle</strong> :',s:1,badge:"Réponse simulée, environ 15 s",btn:["FS 120","FS 250","FS 400","FS 460","Autre ou photo de la plaque 📷"]},
   {o:1,tm:"10:13",h:'FS 250',s:2,pick:1},
   {o:0,tm:"10:13",h:BOT+'FS 250 noté ✅ Touchez un <strong>créneau</strong> (lun.-ven., 8 h-17 h) :',s:2,btn:["Mercredi 25 novembre, matin","Jeudi 26 novembre, matin","Vendredi 27 novembre, après-midi","Autre date"]},
   {o:1,tm:"10:13",h:'Jeudi 26 novembre, matin',s:2,pick:1},
   {o:0,tm:"10:13",h:BOT+'Votre demande de rendez-vous est transmise à l\'atelier SACRI ✅<br>🛠️ Entretien, débroussailleuse <strong>FS 250</strong><br>📅 <strong>Jeudi 26 novembre, matin, dès 8 h</strong><br>📍 Atelier SACRI, boulevard de Marseille, face à la SIVOA<br>Référence : DEMANDE-RDV-2611<br>L\'atelier confirme la disponibilité ici même : le créneau n\'est pas encore réservé.',s:3}
  ]},
{ k:"prix", t:"Prix d'une pièce", d:"Référence et devis, sans prix inventé",
  title:"« Chaîne pour MS 250, prix ? » : la référence tout de suite",
  pitch:"Le client donne la pièce et le modèle. L'assistant fournit les caractéristiques de chaîne prévues pour la configuration du guide, le lien catalogue et un bouton devis. Aucun prix n'est inventé : le conseiller vérifie prix et disponibilité.",
  steps:[["Pièce et modèle donnés","c","Client"],["Référence compatible et catalogue","a","Assistant"],["Devis demandé","c","Client"],["Prix vérifié par le conseiller","h","Conseiller"]],
  k1:"10 s", k2:"0", k2l:"question posée avant la réponse",
  m:[
   {d:"Aujourd'hui"},
   {o:1,tm:"15:31",h:'chaîne pour MS 250 prix ?',s:0},
   {o:0,tm:"15:31",h:BOT+'Chaîne pour <strong>STIHL MS 250</strong> 🔧<br>• Référence d\'origine : Picco Micro 3 (3/8"P, 1,3 mm, 55 maillons) pour le guide d\'origine de 40 cm. Vérifiez les chiffres gravés sur votre guide : s\'ils diffèrent, le conseiller ajuste.<br>• Prix : confirmé ici par un conseiller SACRI, avec la disponibilité en magasin. Touchez « Demander le devis » et la demande part tout de suite.<br>• Catalogue : '+CAT,s:1,badge:"Réponse simulée, environ 10 s",btn:["Demander le devis","Ajouter une autre pièce","Parler à un conseiller"]},
   {o:1,tm:"15:32",h:'Demander le devis',s:2,pick:0},
   {sys:"Demande transmise au magasin pièces : chaîne pour MS 250"},
   {o:0,tm:"15:44",h:HUM("Didier")+'Bonjour, Didier du magasin pièces. Je vérifie votre guide et la chaîne compatible, ainsi que le prix SACRI et la disponibilité. Je vous envoie le devis ici.',s:3}
  ]},
{ k:"piece", t:"Pièce par photo", d:"La photo suffit pour trouver la pièce",
  title:"Le client envoie une photo, la pièce est trouvée",
  pitch:"Un exploitant forestier photographie la chaîne usée de sa tronçonneuse. L'assistant reconnaît la pièce, demande la plaque, prépare la demande ; le conseiller confirme la référence et envoie le devis.",
  steps:[["Photo de la pièce usée","c","Client"],["Pièce reconnue, plaque demandée","a","Assistant"],["Référence et stock confirmés","h","Conseiller"],["Devis envoyé, commande lancée","h","Conseiller"]],
  k1:"35 s", k2:"14 min", k2l:"pour le devis validé par le conseiller",
  m:[
   {d:"Aujourd'hui"},
   {o:1,tm:"08:12",h:'<img class="photo" src="assets/img/chaine.jpg?v=20261119b" alt="Photo de chaînes de tronçonneuse">Bonjour SACRI 🙏🏾 C\'est cette chaîne là sur ma tronçonneuse. Vous avez ?',s:0},
   {o:0,tm:"08:12",h:BOT+'Bonjour Monsieur, bienvenue chez SACRI 👋🏾<br>Sur la photo, c\'est une <strong>chaîne de tronçonneuse</strong>, les dents sont usées.<br>Pour la bonne référence, envoyez-moi la photo de la <strong>plaque de la machine</strong> (modèle et numéro de série).',s:1,badge:"Réponse en 35 s"},
   {o:1,tm:"08:15",h:'C\'est une MS 381. Le numéro est effacé un peu, mais on voit 1 7 4 8…',s:1},
   {o:0,tm:"08:15",h:BOT+'Merci Monsieur. STIHL MS 381 noté ✅<br>Je transmets à un conseiller pour vérifier la référence et le stock. Il vous répond ici même.',s:1},
   {sys:"Conversation transmise au magasin pièces : un conseiller prend la suite"},
   {o:0,tm:"08:26",h:HUM("Didier")+'Bonjour Monsieur, Didier du magasin pièces.<br>Référence vérifiée au catalogue STIHL pour la MS 381, la pièce est <strong>disponible</strong> à Abidjan.<br>Je vous conseille aussi de changer le pignon : il s\'use avec la chaîne.',s:2},
   {o:1,tm:"08:28",h:'D\'accord, mettez les deux dedans.',s:2},
   {o:0,tm:"08:29",h:HUM("Didier")+'<span class="doc"><span class="pdf">PDF</span><span><span class="dn">Devis DV-2611-0217.pdf</span><span class="ds">1 page, chaîne et pignon MS 381</span></span></span>Voici votre devis, prix vérifiés par mes soins. Répondez <strong>OUI</strong> pour lancer la commande.',s:3},
   {o:1,tm:"08:31",h:'OUI. Je passe prendre ça demain matin.',s:3},
   {o:0,tm:"08:31",h:BOT+'C\'est noté ✅ Commande lancée. Votre pièce sera prête au <strong>comptoir demain matin</strong>, au nom indiqué sur le devis. Bonne journée Monsieur !',s:3,badge:"Réponse en 20 s"}
  ]},
{ k:"atelier", t:"Suivi atelier", d:"De la réception à « prête à retirer »",
  title:"Le client suit sa machine sans appeler",
  pitch:"Un entrepreneur dépose sa tronçonneuse à l'atelier. Il reçoit chaque étape sur WhatsApp : réception, diagnostic, devis de réparation, machine prête. Il n'a plus besoin d'appeler pour savoir où elle en est.",
  steps:[["Machine reçue, bon remis","a","Assistant"],["Diagnostic du technicien","h","Atelier"],["Devis de réparation accepté","c","Client"],["Prête à retirer","a","Assistant"]],
  k1:"30 s", k2:"0 appel", k2l:"du client pour savoir où en est sa machine",
  m:[
   {d:"Lundi 16 novembre"},
   {o:0,tm:"09:20",h:BOT+'Bonjour Monsieur Bamba, votre machine est bien <strong>reçue à l\'atelier</strong> ✅<br>• Tronçonneuse STIHL MS 250<br>• Bon de réception <strong>BR-2026-0431</strong><br>• Panne déclarée : démarre puis cale<br>Je vous écris à chaque étape.',s:0,badge:"Bon BR-2026-0431"},
   {d:"Mardi 17 novembre"},
   {o:0,tm:"11:05",h:HUM("Koné")+'Bonjour Monsieur. Diagnostic fait : <strong>carburateur encrassé</strong> et filtre à air à changer. Le moteur est bon.',s:1},
   {o:0,tm:"11:06",h:BOT+'<span class="doc"><span class="pdf">PDF</span><span><span class="dn">Devis réparation BR-2026-0431.pdf</span><span class="ds">1 page, validé par l\'atelier</span></span></span>Voici le devis de réparation. On commence dès votre accord.',s:1,btn:["J'accepte le devis","Appeler un conseiller"]},
   {o:1,tm:"11:20",h:'J\'accepte le devis',s:2,pick:0},
   {o:0,tm:"11:20",h:BOT+'Merci Monsieur, accord enregistré ✅ La réparation démarre aujourd\'hui. Machine prête prévue <strong>jeudi 19</strong>.',s:2,badge:"Réponse en 30 s"},
   {d:"Jeudi 19 novembre"},
   {o:1,tm:"08:02",h:'Bonjour, ma machine est prête ?',s:2},
   {o:0,tm:"08:02",h:BOT+'Bonjour Monsieur ! Le technicien termine l\'essai ce matin. Je vous écris dès qu\'elle est prête 👍🏾',s:2,badge:"Réponse simulée, environ 25 s"},
   {o:0,tm:"10:45",h:BOT+'Bonne nouvelle Monsieur Bamba : votre MS 250 est <strong>prête à retirer</strong> 🎉<br>• Essai moteur validé par le technicien<br>• À retirer au comptoir de l\'atelier<br>• Présentez le bon BR-2026-0431',s:3,badge:"Prête à retirer"},
   {o:1,tm:"10:52",h:'Merci beaucoup, j\'arrive à 14 h. Vous êtes forts ! 💪🏾',s:3}
  ]},
{ k:"reclamation", t:"Réclamation", d:"La direction alertée dans la minute", dg:1,
  title:"Une réclamation, et la direction le sait tout de suite",
  pitch:"Un client écrit : sa débroussailleuse, réparée à l'atelier, retombe en panne. Il donne le numéro de série. L'assistant s'excuse, retrouve la machine et ses passages à l'atelier, ouvre la réclamation avec son numéro et donne l'heure du rappel. Au même moment, le directeur général reçoit l'alerte sur son téléphone. Sans réponse au client, une nouvelle alerte part à 24 h au responsable de la société, puis à 48 h au directeur général.",
  steps:[["Plainte avec le numéro de série","c","Client"],["Machine et passages à l'atelier retrouvés","a","Assistant"],["Réclamation R-2026-104 ouverte, direction alertée","a","Automatique"],["Client rappelé par l'atelier","h","Atelier"],["Réparée, réclamation close","h","Atelier"]],
  k1:"1 min", k2:"42 min", k2l:"avant le rappel du technicien",
  m:[
   {d:"Mardi 10 novembre"},
   {o:1,tm:"08:38",h:'Bonjour. Ma débroussailleuse déposée chez vous le 4&nbsp;novembre est encore en panne, le lanceur a recassé. Numéro de série 2209&nbsp;8835. Je ne suis pas content.',s:0},
   {o:0,tm:"08:39",h:BOT+'Toutes nos excuses, Monsieur Kouadio 🙏🏾 Ce n\'est pas normal qu\'elle retombe en panne après notre réparation.<br>J\'ai retrouvé votre machine :<br>• STIHL FS 250, n° de série <strong>2209&nbsp;8835</strong>, achetée le 8&nbsp;juin 2026<br>• Déjà venue à l\'atelier le <strong>7&nbsp;septembre</strong> (BR-2026-0341) et le <strong>4&nbsp;novembre</strong> (BR-2026-0417), pour le lanceur',s:1,badge:"Réponse en 1&nbsp;min"},
   {o:0,tm:"08:39",h:BOT+'Votre réclamation est ouverte : <strong><span class="nw">R-2026-104</span></strong> ✅<br>Le responsable de l\'atelier et la direction sont prévenus.<br>📞 Un technicien vous rappelle sur ce numéro <strong>avant 10&nbsp;h&nbsp;40</strong>.',s:2},
   {g:1,tm:"08:40",h:'<span class="who-l al">🔴 Nouvelle réclamation</span><strong><span class="nw">R-2026-104</span></strong>, SACRI<br>👤 M. Serge Kouadio<br>⚙️ STIHL FS 250, n° 2209&nbsp;8835<br>⚠️ <strong>2e retour en 60 jours</strong> : 7&nbsp;septembre puis 4&nbsp;novembre, même panne (lanceur cassé)<br>🛠️ Responsable de l\'atelier SACRI prévenu<br>📞 Rappel du client prévu <strong>avant 10&nbsp;h&nbsp;40</strong><br>⏱️ Sans réponse : alerte au responsable SACRI à 24&nbsp;h, à vous à 48&nbsp;h',s:2},
   {g:1,tm:"08:40",h:'<span class="mailn"><b>E-mail</b> · Réclamation <span class="nw">R-2026-104</span> : M. Serge Kouadio, FS 250, 2e retour en 60 jours</span>',s:2},
   {o:1,tm:"08:41",h:'D\'accord, j\'attends l\'appel.',s:2},
   {g:1,tm:"08:55",h:'<span class="who-l ok">Prise en charge</span><span class="nw">R-2026-104</span> : Yao K., technicien SACRI, prend le dossier.',s:2},
   {sys:"Appel de l'atelier SACRI à 9 h 20 : le technicien rappelle le client"},
   {o:0,tm:"09:26",h:HUM("Yao")+'Merci Monsieur Kouadio pour votre patience. Comme convenu au téléphone, déposez la machine quand vous voulez : elle passe en priorité, sans attente.',s:3},
   {g:1,tm:"09:26",h:'<span class="who-l ok">Client rappelé</span><span class="nw">R-2026-104</span> : client rappelé à 9&nbsp;h&nbsp;20, <strong>42&nbsp;min</strong> après son message. Les alertes des 24&nbsp;h et des 48&nbsp;h ne partiront pas.',s:3},
   {d:"Jeudi 12 novembre"},
   {o:0,tm:"17:00",h:BOT+'Votre FS 250 est réparée ✅<br>Le lanceur est remplacé et le technicien vous a expliqué la cause.<br>La réclamation <strong><span class="nw">R-2026-104</span></strong> est close. Encore pardon pour ce désagrément, Monsieur Kouadio.',s:4},
   {g:1,tm:"17:01",h:'<span class="who-l ok">Réclamation close</span><span class="nw">R-2026-104</span> : lanceur remplacé, cause expliquée au client. Durée totale : 2&nbsp;j 8&nbsp;h.',s:4}
  ]},
{ k:"entretien", t:"Exemple de rappel d'entretien", d:"Message et créneau à confirmer par l'atelier",
  title:"Préparer un rappel d'entretien sans inventer d'historique",
  pitch:"Exemple de campagne à activer seulement après validation du calendrier, des clients et des machines réellement concernées. Chaque créneau est une demande, jusqu'à confirmation par l'atelier.",
  steps:[["Rappel soumis à validation","h","Conseiller"],["Le client demande un créneau","c","Client"],["Créneau proposé","a","Assistant"],["Confirmation de l'atelier","h","Atelier"]],
  k1:"exemple", k2:"0", k2l:"réservation réelle depuis cette page",
  m:[
   {d:"Exemple de conversation"},
   {o:0,tm:"09:00",h:BOT+'Bonjour. Souhaitez-vous faire l\'entretien de votre débroussailleuse ? Cette démonstration n\'utilise aucun historique client réel.',s:0,btn:["Demander un créneau","Pas maintenant"]},
   {o:1,tm:"09:34",h:'Demander un créneau',s:1,pick:0},
   {o:0,tm:"09:34",h:BOT+'Voici des créneaux indicatifs ; l\'atelier doit vérifier et confirmer leur disponibilité.',s:1,badge:"Exemple uniquement",btn:["Mercredi matin","Jeudi matin","Autre date"]},
   {o:1,tm:"09:35",h:'Jeudi matin',s:2,pick:1},
   {o:0,tm:"09:35",h:BOT+'Votre demande est transmise à l\'atelier. <strong>Aucun rendez-vous n\'est réservé</strong> tant que l\'atelier ne vous a pas confirmé la disponibilité.',s:3}
  ]}
];

var $=function(id){return document.getElementById(id);};
var chat=$("chat"),status=$("status"),clock=$("clock"),dchat=$("dg-chat"),dclock=$("dg-clock"),stage=document.querySelector(".stage");
var cur=0,timers=[],run=0;
var q=new URLSearchParams(location.search);

function nav(){
  var n=$("scen");
  S.forEach(function(s,i){
    var b=document.createElement("button");b.type="button";
    b.innerHTML='<span class="n">'+(i+1)+'</span><span class="t">'+s.t+'<span class="d">'+s.d+'</span></span>';
    b.addEventListener("click",function(){play(i,true);});
    n.appendChild(b);
  });
}
function side(i){
  var s=S[i];
  $("s-num").textContent="Conversation "+(i+1)+" sur "+S.length;
  $("s-title").textContent=s.title;$("s-pitch").textContent=s.pitch;
  $("s-steps").innerHTML=s.steps.map(function(x){return '<li><b>'+x[0]+'<span class="who '+x[1]+'">'+x[2]+'</span></b></li>';}).join("");
  $("s-delai").textContent=s.k1;$("s-humain").textContent=s.k2;$("s-humain-l").textContent=s.k2l;
  [].forEach.call($("scen").children,function(b,j){b.setAttribute("aria-pressed",j===i?"true":"false");});
}
function mark(st){var li=$("s-steps").children;for(var j=0;j<li.length;j++)li[j].classList.toggle("done",j<=st);}
function el(m){
  if(m.d){var d=document.createElement("div");d.className="day";d.textContent=m.d;return d;}
  if(m.sys){var y=document.createElement("div");y.className="sys";y.textContent=m.sys;return y;}
  var w=document.createElement("div");w.className="m "+(m.o?"out":"in")+(m.g?" al":"");
  var b=document.createElement("div");b.className="b";
  var h=m.h;
  if(m.badge)h+='<br><span class="badge'+(/Réponse/.test(m.badge)?'':' o')+'">'+m.badge+'</span>';
  h+='<span class="meta">'+m.tm+(m.o?'<span class="tk">✓✓</span>':'')+'</span>';
  if(m.btn)h+='<span class="btns">'+m.btn.map(function(x){return '<span>'+x+'</span>';}).join("")+'</span>';
  b.innerHTML=h;w.appendChild(b);return w;
}
function pickPrev(m){
  if(m.pick===undefined)return;
  var all=chat.querySelectorAll(".btns");var last=all[all.length-1];
  if(last&&last.children[m.pick])last.children[m.pick].classList.add("on");
}
function scroll(){chat.scrollTop=chat.scrollHeight;dchat.scrollTop=dchat.scrollHeight;}
function put(m){if(m.g){dchat.appendChild(el(m));dclock.textContent=m.tm;}else{chat.appendChild(el(m));if(m.d&&S[cur].dg)dchat.appendChild(el(m));}}
function clear(){timers.forEach(clearTimeout);timers=[];}
function later(f,ms){timers.push(setTimeout(f,ms));}
function play(i,all){
  clear();run++;cur=i;chat.innerHTML="";dchat.innerHTML="";side(i);
  var dg=!!S[i].dg;stage.classList.toggle("duo",dg);$("phone-dg").hidden=!dg;$("dg-cap").hidden=!dg;mark(-1);status.textContent="compte professionnel";
  var s=S[i],t=500,me=run;
  if(all){
    s.m.forEach(function(m){put(m);pickPrev(m);if(m.tm&&!m.g)clock.textContent=m.tm;});
    mark(s.steps.length-1);chat.scrollTop=0;dchat.scrollTop=0;return;
  }
  s.m.forEach(function(m){
    if(m.d||m.sys){later(function(){if(me!==run)return;put(m);scroll();},t);t+=700;return;}
    if(m.g){later(function(){if(me!==run)return;put(m);mark(m.s);scroll();},t);t+=1400;return;}
    if(!m.o){
      later(function(){if(me!==run)return;status.textContent="en train d'écrire…";
        var ty=document.createElement("div");ty.className="m in typing";ty.innerHTML='<div class="b"><span class="dots"><i></i><i></i><i></i></span></div>';
        chat.appendChild(ty);scroll();
        later(function(){if(me!==run)return;ty.remove();chat.appendChild(el(m));clock.textContent=m.tm;status.textContent="en ligne";mark(m.s);scroll();},1300);
      },t);
      t+=1300+Math.min(2600,700+m.h.length*6);
    }else{
      later(function(){if(me!==run)return;pickPrev(m);chat.appendChild(el(m));clock.textContent=m.tm;mark(m.s);scroll();},t);
      t+=900+Math.min(1800,m.h.length*8);
    }
  });
}
nav();
$("replay").addEventListener("click",function(){play(cur,false);});
$("skip").addEventListener("click",function(){play(cur,true);});
var start=Math.max(0,Math.min(S.length-1,(parseInt(q.get("c"),10)||1)-1)),started=false;
window.SacriConv={
  start:function(){if(started)return;started=true;play(start,q.get("anim")!=="1");},
  stop:function(){clear();run++;started=false;}
};
})();
