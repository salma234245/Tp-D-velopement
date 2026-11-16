function demarrer() {
  const prenom = prompt("Quel est votre prénom ?");
  if (prenom === null) {
    return;
  }

  let age;
  while (true) {
    const saisie = prompt("Quel est votre âge ?");
    if (saisie === null) {
      return;
    }
    if (saisie.trim() !== "" && !isNaN(Number(saisie))) {
      age = Number(saisie);
      break;
    }
    alert("Saisie invalide : entrez un nombre.");
  }

  console.log("Prénom :", prenom, "| type :", typeof prenom);
  console.log("Âge :", age, "| type :", typeof age);

  alert("Bonjour " + prenom + ", vous aurez " + (age + 1) + " ans l'année prochaine.");

  const continuer = confirm("Souhaitez-vous continuer ?");
  console.log("Continuer :", continuer);
}

function sommeEntiers(n) {
  let somme = 0;
  for (let i = 1; i <= n; i++) {
    somme += i;
  }
  return somme;
}

function nombresPairs(n) {
  let texte = "";
  let i = 0;
  while (i <= n) {
    texte += i + " ";
    i += 2;
  }
  return texte.trim();
}

function lireN() {
  const zone = document.getElementById("resultat");
  const saisie = document.getElementById("nombre").value.trim();
  const n = Number(saisie);

  if (saisie === "" || isNaN(n) || n % 1 !== 0 || n < 1 || n > 100) {
    zone.textContent = "Erreur : N doit être un entier compris entre 1 et 100.";
    return null;
  }
  return n;
}

function afficherSomme() {
  const n = lireN();
  if (n !== null) {
    document.getElementById("resultat").textContent = "Somme : " + sommeEntiers(n);
  }
}

function afficherPairs() {
  const n = lireN();
  if (n !== null) {
    document.getElementById("resultat").textContent = "Nombres pairs : " + nombresPairs(n);
  }
}

document.getElementById("btSomme").addEventListener("click", afficherSomme);
document.getElementById("btPairs").addEventListener("click", afficherPairs);

// ===== Exercice 3 =====

// 1. Titre avec getElementById()
const titre = document.getElementById("titreCours");

// 2. Paragraphes de la section avec getElementsByTagName(), à partir de la section
const section = document.getElementById("cours");
const paragraphes = section.getElementsByTagName("p");

// 3. Éléments de classe "chapitre" avec getElementsByClassName()
const chapitres = document.getElementsByClassName("chapitre");

// 4. Premier élément ayant les classes "chapitre" et "important" avec querySelector()
const chapitreImportant = document.querySelector(".chapitre.important");

// 5. Paragraphes de classe "chapitre" avec querySelectorAll()
const paragraphesChapitre = document.querySelectorAll("p.chapitre");

// 6. Nombre de paragraphes sélectionnés dans la console
console.log("Paragraphes de la section :", paragraphes.length);
console.log("Éléments de classe chapitre :", chapitres.length);
console.log("Paragraphes de classe chapitre :", paragraphesChapitre.length);

// 7. Au clic sur le bouton
const bouton = document.getElementById("modifier");
bouton.addEventListener("click", function () {
  // remplacer le titre
  titre.textContent = "JavaScript : une page interactive";

  // chapitres en bleu avec une boucle
  for (let i = 0; i < chapitres.length; i++) {
    chapitres[i].style.color = "blue";
  }

  // chapitre important en gras
  chapitreImportant.style.fontWeight = "bold";

  // modifier le texte du bouton
  bouton.textContent = "Présentation modifiée";
});

// ===== Exercice 4 =====

// 1. Fond jaune clair au focus
function mettreEnEvidence(champ) {
  champ.style.backgroundColor = "lightyellow";
}

// 2. Supprimer le style en ligne au blur
function retablirStyle(champ) {
  champ.style.backgroundColor = "";
}

// 3. Afficher le prénom en temps réel
function afficherSaisie(champ) {
  document.getElementById("apercu").textContent = champ.value;
}

// 4. Texte survolé en rouge, puis couleur initiale
function changerCouleur(element) {
  element.style.color = "red";
}

function retablirCouleur(element) {
  element.style.color = "";
}

// 5. Clic sur « Sélectionner le texte »
const btSelectionner = document.getElementById("selectionner");
const champPrenom = document.getElementById("prenom");

btSelectionner.addEventListener("click", function () {
  champPrenom.focus();
  champPrenom.select();
});
// ===== Exercice 5 =====

// A. Accès au formulaire et aux champs
const formulaire = document.forms["inscription"];
const champNom = formulaire.elements["nom"];
const zoneMessage = document.getElementById("message");
const zoneRecap = document.getElementById("recapitulatif");

// B. Validation à la soumission
formulaire.addEventListener("submit", function (event) {
  event.preventDefault();
  zoneMessage.textContent = "";
  zoneRecap.textContent = "";

  const nom = champNom.value.trim();
  const profession = formulaire.elements["profession"].value;
  const sexeChoisi = formulaire.querySelector('input[name="sexe"]:checked');
  const cases = formulaire.querySelectorAll('input[name="langue"]');

  const langues = [];
  for (let i = 0; i < cases.length; i++) {
    if (cases[i].checked) {
      langues.push(cases[i].value);
    }
  }

  // Première erreur détectée
  if (nom.length < 3) {
    zoneMessage.textContent = "Erreur : le nom doit contenir au moins 3 caractères.";
    champNom.focus();
    return;
  }
  if (profession === "") {
    zoneMessage.textContent = "Erreur : choisissez une profession.";
    return;
  }
  if (sexeChoisi === null) {
    zoneMessage.textContent = "Erreur : sélectionnez un sexe.";
    return;
  }
  if (langues.length === 0) {
    zoneMessage.textContent = "Erreur : cochez au moins une langue.";
    return;
  }

  // C. Création de l'objet
  const inscription = {
    nom: nom,
    profession: profession,
    sexe: sexeChoisi.value,
    langues: langues.join(", "),
    presenter: function () {
      return "Nom : " + this.nom + "\n" +
             "Profession : " + this.profession + "\n" +
             "Sexe : " + this.sexe + "\n" +
             "Langues : " + this.langues;
    }
  };

  zoneRecap.textContent = inscription.presenter();
});

// D. Réinitialisation
formulaire.addEventListener("reset", function () {
  zoneMessage.textContent = "";
  zoneRecap.textContent = "";
});