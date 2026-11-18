(function(){
"use strict";
var BOT='<span class="who-l bot">Assistant SACRI</span>';
var HUM=function(n){return '<span class="who-l hum">'+n+' · conseiller SACRI</span>';};
var S=[
{ k:"piece", t:"Pièce par photo", d:"La photo suffit pour trouver la pièce",
  title:"Le client envoie une photo, la pièce est trouvée",
  pitch:"Un exploitant forestier photographie le pignon usé de sa tronçonneuse. L'assistant reconnaît la pièce, demande la plaque, prépare la demande ; le conseiller confirme la référence et envoie le devis.",
  steps:[["Photo de la pièce usée","c","Client"],["Pièce reconnue, plaque demandée","a","Assistant"],["Référence et stock confirmés","h","Conseiller"],["Devis envoyé, commande lancée","h","Conseiller"]],
  k1:"35 s", k2:"14 min", k2l:"pour le devis validé par le conseiller",
  m:[
   {d:"Aujourd'hui"},
   {o:1,tm:"08:12",h:'<img class="photo" src="assets/photo-piece.svg" alt="Photo d\'un pignon de chaîne usé">Bonjour SACRI 🙏🏾 C\'est cette pièce là sur ma tronçonneuse. Vous avez ?',s:0},
   {o:0,tm:"08:12",h:BOT+'Bonjour Monsieur, bienvenue chez SACRI 👋🏾<br>Sur la photo, c\'est un <strong>pignon de chaîne</strong> (couronne), bien usé.<br>Pour la bonne référence, envoyez-moi la photo de la <strong>plaque de la machine</strong> (modèle et numéro de série).',s:1,badge:"Réponse en 35 s"},
   {o:1,tm:"08:15",h:'C\'est une MS 381. Le numéro est effacé un peu, mais on voit 1 7 4 8…',s:1},
   {o:0,tm:"08:15",h:BOT+'Merci Monsieur. STIHL MS 381 noté ✅<br>Je transmets à un conseiller pour vérifier la référence et le stock. Il vous répond ici même.',s:1},
   {sys:"Conversation transmise au magasin pièces · un conseiller prend la suite"},
   {o:0,tm:"08:26",h:HUM("Didier")+'Bonjour Monsieur, Didier du magasin pièces.<br>Référence vérifiée au catalogue STIHL pour la MS 381, la pièce est <strong>disponible</strong> à Abidjan.<br>Je vous conseille aussi de changer la chaîne : elle s\'use avec le pignon.',s:2},
   {o:1,tm:"08:28",h:'D\'accord, mettez les deux dedans.',s:2},
   {o:0,tm:"08:29",h:HUM("Didier")+'<span class="doc"><span class="pdf">PDF</span><span><span class="dn">Devis DV-2611-0217.pdf</span><span class="ds">1 page · pignon + chaîne MS 381</span></span></span>Voici votre devis, prix vérifiés par mes soins. Répondez <strong>OUI</strong> pour lancer la commande.',s:3},
   {o:1,tm:"08:31",h:'OUI. Je passe prendre ça demain matin.',s:3},
   {o:0,tm:"08:31",h:BOT+'C\'est noté ✅ Commande lancée. Votre pièce sera prête au <strong>comptoir demain matin</strong>, au nom indiqué sur le devis. Bonne journée Monsieur !',s:3,badge:"Réponse en 20 s"}
  ]},
{ k:"devis", t:"Devis en 1 minute", d:"Trois débroussailleuses pour une plantation",
  title:"Une demande de devis traitée dans la minute",
  pitch:"Une gérante de plantation veut trois débroussailleuses. L'assistant précise le besoin, répond tout de suite avec le modèle conseillé et le catalogue, puis le devis chiffré part après validation du conseiller.",
  steps:[["Besoin exprimé : 3 machines","c","Client"],["Usage précisé, modèle proposé","a","Assistant"],["Prix « à confirmer » et lien catalogue","a","Assistant"],["Devis chiffré validé et envoyé","h","Conseiller"]],
  k1:"40 s", k2:"25 min", k2l:"pour le devis chiffré, validé par le conseiller",
  m:[
   {d:"Aujourd'hui"},
   {o:1,tm:"10:04",h:'Bonjour. Il me faut 3 débroussailleuses pour ma plantation à Divo. Vous pouvez me faire un devis ?',s:0},
   {o:0,tm:"10:04",h:BOT+'Bonjour Madame, merci de nous écrire 🙏🏾<br>Pour bien vous conseiller : c\'est pour <strong>herbe haute et broussaille</strong>, ou pour l\'entretien léger autour des parcelles ?',s:1,badge:"Réponse en 40 s",btn:["Broussaille épaisse","Entretien léger"]},
   {o:1,tm:"10:05",h:'Broussaille épaisse. Les gars travaillent toute la journée.',s:1,pick:0},
   {o:0,tm:"10:05",h:BOT+'Pour un travail de toute la journée en broussaille, le modèle conseillé est la <strong>STIHL FS 450</strong>, avec harnais et lame.<br>• 3 × FS 450<br>• 3 × kits harnais + lame<br>Prix : <strong>à confirmer par le conseiller</strong>, selon la quantité et les accessoires.',s:2},
   {o:0,tm:"10:05",h:BOT+'<span class="lnk"><b>SACRI · Entretien espaces verts</b><span>Débroussailleuses, élagueuses, souffleurs STIHL</span><br><u>sacri-ci.com</u></span>Le catalogue en attendant. Le devis chiffré arrive ici dans la matinée.',s:2},
   {sys:"Demande transmise au service commercial · le conseiller valide les prix"},
   {o:0,tm:"10:30",h:HUM("Mariam")+'<span class="doc"><span class="pdf">PDF</span><span><span class="dn">Devis DV-2611-0223.pdf</span><span class="ds">1 page · 3 × STIHL FS 450 + kits</span></span></span>Bonjour Madame, Mariam du service commercial. Voici le devis, prix vérifiés. Pour la livraison à Divo, je vous confirme les conditions dès votre accord.',s:3},
   {o:1,tm:"10:41",h:'Merci, je regarde ça avec mon associé et je reviens vers vous.',s:3},
   {o:0,tm:"10:41",h:BOT+'Avec plaisir Madame. Mariam reste votre contact, on est là pour toute question 🙏🏾',s:3,badge:"Réponse en 15 s"}
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
   {o:0,tm:"11:06",h:BOT+'<span class="doc"><span class="pdf">PDF</span><span><span class="dn">Devis réparation BR-2026-0431.pdf</span><span class="ds">1 page · validé par l\'atelier</span></span></span>Voici le devis de réparation. On commence dès votre accord.',s:1,btn:["J'accepte le devis","Appeler un conseiller"]},
   {o:1,tm:"11:20",h:'J\'accepte le devis',s:2,pick:0},
   {o:0,tm:"11:20",h:BOT+'Merci Monsieur, accord enregistré ✅ La réparation démarre aujourd\'hui. Machine prête prévue <strong>jeudi 19</strong>.',s:2,badge:"Réponse en 30 s"},
   {d:"Jeudi 19 novembre"},
   {o:1,tm:"08:02",h:'Bonjour, ma machine est prête ?',s:2},
   {o:0,tm:"08:02",h:BOT+'Bonjour Monsieur ! Le technicien termine l\'essai ce matin. Je vous écris dès qu\'elle est prête 👍🏾',s:2,badge:"Réponse en 25 s"},
   {o:0,tm:"10:45",h:BOT+'Bonne nouvelle Monsieur Bamba : votre MS 250 est <strong>prête à retirer</strong> 🎉<br>• Essai moteur validé par le technicien<br>• À retirer au comptoir de l\'atelier<br>• Présentez le bon BR-2026-0431',s:3,badge:"Prête à retirer"},
   {o:1,tm:"10:52",h:'Merci beaucoup, j\'arrive à 14 h. Vous êtes forts ! 💪🏾',s:3}
  ]},
{ k:"entretien", t:"Rappel d'entretien", d:"Avant la saison, rendez-vous en 2 clics",
  title:"Le rappel d'entretien qui remplit l'atelier avant la saison",
  pitch:"Avant la grande saison des pluies, l'assistant écrit aux clients dont la machine n'a pas été révisée depuis six mois. Le client choisit son créneau en deux clics ; l'atelier sait qui arrive et pour quoi.",
  steps:[["Rappel envoyé avant la saison","a","Assistant"],["Le client choisit un créneau","c","Client"],["Rendez-vous confirmé à l'atelier","a","Assistant"],["Rappel la veille","a","Assistant"]],
  k1:"20 s", k2:"2 clics", k2l:"pour prendre rendez-vous à l'atelier",
  m:[
   {d:"Lundi 15 mars"},
   {o:0,tm:"09:00",h:BOT+'Bonjour Madame Koffi 👋🏾<br>La <strong>saison des pluies</strong> arrive, et la broussaille avec. Votre débroussailleuse <strong>STIHL FS 400</strong> n\'a pas été révisée depuis 7 mois.<br>Une révision avant la saison : bougie, filtre, lame, réglage.',s:0,btn:["Prendre rendez-vous","Me le rappeler plus tard"]},
   {o:1,tm:"09:34",h:'Prendre rendez-vous',s:1,pick:0},
   {o:0,tm:"09:34",h:BOT+'Très bien Madame. Voici les créneaux libres à l\'atelier :',s:1,badge:"Réponse en 20 s",btn:["Mercredi 17 mars · 9 h","Jeudi 18 mars · 9 h","Jeudi 18 mars · 14 h"]},
   {o:1,tm:"09:35",h:'Jeudi 18 mars · 9 h',s:1,pick:1},
   {o:0,tm:"09:35",h:BOT+'C\'est réservé ✅<br>• <strong>Jeudi 18 mars à 9 h</strong>, atelier SACRI, boulevard de Marseille<br>• Révision STIHL FS 400<br>• Prix de la révision confirmé par le conseiller à l\'arrivée<br>Je vous rappelle la veille.',s:2},
   {o:1,tm:"09:36",h:'Merci, c\'est bien organisé comme ça 👍🏾',s:2},
   {d:"Mercredi 17 mars"},
   {o:0,tm:"17:00",h:BOT+'Bonsoir Madame Koffi, petit rappel : votre rendez-vous atelier, c\'est <strong>demain jeudi à 9 h</strong>. Pensez à vider le réservoir avant de venir 🙏🏾',s:3,btn:["Je confirme","Changer d'heure"]},
   {o:1,tm:"17:12",h:'Je confirme',s:3,pick:0}
  ]}
];

var $=function(id){return document.getElementById(id);};
var chat=$("chat"),status=$("status"),clock=$("clock");
var cur=0,timers=[],run=0;
var q=new URLSearchParams(location.search);

function nav(){
  var n=$("scen");
  S.forEach(function(s,i){
    var b=document.createElement("button");b.type="button";
    b.innerHTML='<span class="n">'+(i+1)+'</span><span class="t">'+s.t+'<span class="d">'+s.d+'</span></span>';
    b.addEventListener("click",function(){play(i,false);});
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
  var w=document.createElement("div");w.className="m "+(m.o?"out":"in");
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
function scroll(){chat.scrollTop=chat.scrollHeight;}
function clear(){timers.forEach(clearTimeout);timers=[];}
function later(f,ms){timers.push(setTimeout(f,ms));}
function play(i,all){
  clear();run++;cur=i;chat.innerHTML="";side(i);mark(-1);status.textContent="compte professionnel";
  var s=S[i],t=500,me=run;
  if(all){
    s.m.forEach(function(m){chat.appendChild(el(m));pickPrev(m);if(m.tm)clock.textContent=m.tm;});
    mark(s.steps.length-1);scroll();return;
  }
  s.m.forEach(function(m){
    if(m.d||m.sys){later(function(){if(me!==run)return;chat.appendChild(el(m));scroll();},t);t+=700;return;}
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
var start=Math.max(0,Math.min(S.length-1,(parseInt(q.get("c"),10)||1)-1));
play(start,q.get("tout")==="1");
})();
