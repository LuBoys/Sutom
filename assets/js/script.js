/*On attend que le DOM soit totalement chargé*/

$(document).ready(function() {

    /*Cacher les div de jeu*/
    document.getElementById("game-board").style.display = none;

    /*Si l'utilisateur choisit 6 lettres*/
    button1 = document.getElementById("6");

    button1.addEventListener("click", () => {

        /*Cacher la div de menu et afficher les divs de jeu*/
        document.getElementById("homeContainer").style.display = none;

        /*Appeler le dictionnaire, tous les mots à 6 lettres et en choisir un aléatoirement */
    })
    
    /*Si l'utilisateur choisit 7 lettres*/
    button2 = document.getElementById("7");

    button2.addEventListener("click", () => {

        /*Cacher la div de menu et afficher les divs de jeu*/
        document.getElementById("homeContainer").style.display = none;
    })

    /*Si l'utilisateur choisit 8 lettres*/
    button3 = document.getElementById("8");

    button3.addEventListener("click", () => {

        /*Cacher la div de menu et afficher les divs de jeu*/
        document.getElementById("homeContainer").style.display = none;
    })
});