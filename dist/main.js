"use strict";
fetch("https://restcountries.com/v3.1/all").then(function (response) {
    var contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json().then(function (datas) {
            startApplication(datas);
            console.log("datas", datas);
        });
    }
    else {
        document.querySelector("h1").textContent = "Les informations récupérées ne sont pas au format JSON";
    }
});
let listePays = [];
let randomPays;
function startApplication(datas) {
    for (let unPays of datas) {
        const pays = {
            nom: unPays.translations.fr,
            drapeau: unPays.flag,
        };
        listePays.push(pays);
    }
    randomPays = getRandomPays(listePays);
    document.querySelector("#drapeau").innerHTML = `<img src="${randomPays.drapeau}" width="250px" class="border border-dark" alt="${randomPays.nom}"/>`;
}
function getRandomPays(listePays) {
    let random = Math.floor(Math.random() * listePays.length);
    return listePays[random];
}
