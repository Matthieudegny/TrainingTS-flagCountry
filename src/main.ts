fetch("https://restcountries.com/v3.1/all").then(function (response) {
  let contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json().then(function (datas) {
      startApplication(datas);
      console.log("datas", datas);
    });
  } else {
    document.querySelector("h1")!.textContent = "Les informations récupérées ne sont pas au format JSON";
  }
});

type Pays = {
  nom: string;
  drapeau: string;
};
let listePays: Pays[] = [];
let randomPays: Pays;

type Datas = {
  //propriété dynamique si je ne connais pas précisemment le type des propriétés
  [props: string]: any;
};

const melangeTableau = (tab: any[]) => {
  let randomTab = tab;
  for (var i = randomTab.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)); //random index
    [randomTab[i], randomTab[j]] = [randomTab[j], randomTab[i]]; // swap
  }
  return randomTab;
};

const debuterJeu = () => {
  randomPays = getRandomPays(listePays);
  document.querySelector(
    "#drapeau"
  )!.innerHTML = `<img src="${randomPays.drapeau}" width="250px" class="border border-dark" alt="${randomPays.nom}"/>`;

  const bonneReponse = randomPays.nom;
  const mauvaiseReponse1 = getRandomPays(listePays).nom;
  const mauvaiseReponse2 = getRandomPays(listePays).nom;
  const mauvaiseReponse3 = getRandomPays(listePays).nom;

  let lesReponse: string[] = [bonneReponse, mauvaiseReponse1, mauvaiseReponse2, mauvaiseReponse3];
  lesReponse = melangeTableau(lesReponse);

  document.querySelector("#boutons")!.innerHTML = genererBoutonsReponse(lesReponse);
};

const genererBoutonsReponse = (tab: string[]): string => {
  let boutonsHTML = "";
  for (let nom of tab) {
    boutonsHTML += `<button class="btn btn-primary me-1 mt-1" onClick="verificationReponse('${nom}')">${nom}</button>`;
  }
  return boutonsHTML;
};

const verificationReponse = (reponse: string): void => {
  const divResultat = document.querySelector("#resultat")! as HTMLDivElement;
  if (reponse === randomPays.nom) {
    divResultat.innerHTML = `<div class="alert alert-success">${reponse} est la bonne réponse</div>`;
  } else {
    divResultat.innerHTML = `<div class="alert alert-danger">${reponse} est une mauvaise réponse</div>`;
  }
  divResultat.innerHTML += "<button class='btn btn-warning' onClick='debuterJeu()'>Changer de pays</button>";
};

const getRandomPays = (listePays: Pays[]): Pays => {
  let random = Math.floor(Math.random() * listePays.length);
  return listePays[random];
};

const startApplication = (datas: Datas[]) => {
  for (let unPays of datas) {
    const pays: Pays = {
      nom: unPays.name.common,
      drapeau: unPays.flags.png,
    };
    listePays.push(pays);
  }
  debuterJeu();
};
