/*On attend que le DOM soit totalement chargé*/
document.addEventListener("DOMContentLoaded", ready);

function ready() {

    /*Définition des variables de jeu*/
    const NOMBRE_DESSAIS = 6;
    var essaisRestants = NOMBRE_DESSAIS;
    var motPropose = [];
    var prochaineLettre = 0;
    retry = 0

    console.log("nombre d'essais : " + NOMBRE_DESSAIS)
    console.log("essais restants : " + essaisRestants)
    console.log("mot proposé : " + motPropose)
    console.log("prochaine lettre : " + prochaineLettre)

    /*Cacher les div de jeu et la page des règles*/
    document.getElementById("game-board").style.display = "none";
    document.getElementById("rules").style.display = "none";

    /*Si l'utilisateur choisit 6 lettres*/
    const button1 = document.getElementById("button6");

    /*Si on clique sur le bouton 6*/
    button1.addEventListener("click", () => {

        /*On crée une variable globale qui pourra être utilisé de n'importe où*/
        length = 6;

        console.log("length : " + length)

        /*On appelle la fonction de génération de mot*/
        motGenere();
        /*On appelle la fonction d'affichage de grille*/
        grille();
    });
    
    /*Si l'utilisateur choisit 7 lettres*/
    const button2 = document.getElementById("button7");

    /*Si on clique sur le bouton 7*/
    button2.addEventListener("click", () => {

        /*On crée une variable globale qui pourra être utilisé de n'importe où*/
        length = 7;

        console.log("length : " + length)
        
        /*On appelle la fonction de génération de mot*/
        motGenere();
        /*On appelle la fonction d'affichage de grille*/
        grille();
    });

    /*Si l'utilisateur choisit 8 lettres*/
    const button3 = document.getElementById("button8");

    /*Si on clique sur le bouton 8*/
    button3.addEventListener("click", () => {

        /*On crée une variable globale qui pourra être utilisé de n'importe où*/
        length = 8;
        
        console.log("length : " + length)
        
        /*On appelle la fonction de génération de mot*/
        motGenere();
        /*On appelle la fonction d'affichage de grille*/
        grille();
    });

    /*Fontion de génération de mot*/
    function motGenere() {
        
        /*Cacher la div de menu et afficher la div de règles*/
        document.getElementById("homeContainer").style.display = "none";
        document.getElementById("rules").style.display = "flex";

        /*Définition du dictionnaire*/
        const DICTIONNAIRE = [
            'pigeon',
            'souris',
            'chaise',
            'tomate',
            'banane',
            'lavabo',
            'rouage',
            'violet',
            'savane',
            'chemin',
            'horloge',
            'armoire',
            'couteau',
            'clavier',
            'compote',
            'poisson',
            'potiron',
            'feuille',
            'horaire',
            'esclave',
            'argument',
            'aiguille',
            'pantalon',
            'chargeur',
            'immeuble',
            'cerisier',
            'blizzard',
            'scorpion',
            'intestin',
            'capuchon',
            'cachalot',
        ]

        /*Choisir un mot en fonction de la longueur choisie*/
        motSecret = DICTIONNAIRE[Math.floor(Math.random() * DICTIONNAIRE.length)]

        /*Tant que la longueur du mot choisis n'est pas celle que l'on a choisi, nous changeons de mots*/
        while (motSecret.length !== length){
            motSecret = DICTIONNAIRE[Math.floor(Math.random() * DICTIONNAIRE.length)]
        }

        /*Nous attribuons à une variable la première lettre du mot choisi*/
        premiereLettre = motSecret[0];

        console.log("dictionnaire : " + DICTIONNAIRE) 
        console.log("mot secret : " + motSecret) 
        console.log("première lettre : " + premiereLettre) 

    }

    /*Si l'utilisateur souhaite revenir à l'écran d'accueil*/
    const buttonRules = document.getElementById("consent");

    /*Si l'utilisateur souhaite revenir à l'écran d'accueil*/
    buttonRules.addEventListener("click", () => {
        /*Cacher la div de règles et afficher les divs de jeu*/
        document.getElementById("game-board").style.display = "block";
        document.getElementById("rules").style.display = "none";
    });

    /*Fonction de création de la grille*/
    function grille() {

        if (retry == 0) {
            let board = document.getElementById("grille");
        
            /*Génération de 6 lignes (nb essais)*/
            for (let i = 0; i < NOMBRE_DESSAIS; i++) {
                /*On crée l'élément div dans une variable "ligne"*/
                let ligne = document.createElement("div")
                /*Attribution de la classe "letter-row" à la ligne créée*/
                ligne.className = "letter-row"
                
                /*Génération du nombre de cases en fonction de la longueur de mot choisie*/
                for (let j = 0; j < length; j++) {
                    let boite = document.createElement("div")
                    boite.className = "letter-box"
                    ligne.appendChild(boite)

                    /*On affiche la première lettre du mot*/
                    if (j == 0) {
                        boite.textContent = premiereLettre
                        boite.classList.add("filled-box")
                        prochaineLettre = 1
                    }
                }
        
                board.appendChild(ligne)
            }
        }
    }

    /*Si l'utilisateur souhaite revenir à l'écran d'accueil*/
    const buttonLogo = document.getElementById("logo");

    /*Si l'utilisateur souhaite revenir à l'écran d'accueil*/
    buttonLogo.addEventListener("click", () => {
        /*On recharge simplement la page, toutes les variables sont réinitialisées automatiquement*/
        location.reload();
    });

    /*Fonction affichage des lettres*/    
    document.addEventListener("keyup", (e) => {

        if (essaisRestants === 0) {
            return
        }

        /*On récupère la touche pressée*/
        let lettreChoisie = String(e.key)

        /*Si la touche pressée est Suppr et qu'on peut toujours ajouter des lettres*/
        if (lettreChoisie === "Backspace" && prochaineLettre !== 0) {

            console.log("lettre choisie : " + lettreChoisie) 
            /*On appelle la fonction supprLettre*/
            supprLettre()
            return
        }

        /*Si la touche pressée est Entrer et qu'on peut toujours ajouter des lettres*/
        if (lettreChoisie === "Enter") {

            console.log("lettre choisie : " + lettreChoisie)
            /*On appelle la fonction verification*/
            verification()
            return
        }

        /*On récupère la touche pressée et on vérifie que ce soit une lettre de notre alphabet*/
        let found = lettreChoisie.match(/[a-z]/gi)

        /*Si la lettre ne fait pas parti de notre alphabet ou si la longueur de la variable n'est pas 
        égale à 1 (donc qu'on a pas entrer une seule lettre)*/
        if (!found || found.length > 1) {

            console.log("lettre choisie : " + lettreChoisie) 
            return
        } else {
            /*On appelle la fonction affichageLettre*/
            affichageLettre(lettreChoisie)
        }
    })

    /*Fonction d'affichage de la lettre*/
    function affichageLettre (lettreChoisie) {

        /*Si la prochaine lettre est égale à la longueur*/
        if (prochaineLettre === length) {
            return
        }

        /*On transforme la lettre en minuscule*/
        lettreChoisie = lettreChoisie.toLowerCase()
    
        let ligne = document.getElementsByClassName("letter-row")[6 - essaisRestants]
        /*On se place sur la première case vide*/
        let boite = ligne.children[prochaineLettre]
        /*On fait apparaitre notre lettre dans la case prévue*/
        boite.textContent = lettreChoisie
        /*On ajoute la classe "filled-box"*/
        boite.classList.add("filled-box")
        /*On ajoute la lettre entrée à notre mot proposé*/
        motPropose.push(lettreChoisie)
        /*On ajoute 1 à notre variable de comptage de lettres vides*/
        prochaineLettre += 1

        console.log("mot proposé : " + motPropose) 
    }

    /*Fontion de suppression de lettres*/
    function supprLettre () {
        /*Si la lettre à effacer n'est pas égale 1 (donc à la première lettre qui doit apparaitre*/
        if (prochaineLettre - 1 != 0) {
            let ligne = document.getElementsByClassName("letter-row")[6 - essaisRestants]
            /*On se place sur la dernière case remplie*/
            let boite = ligne.children[prochaineLettre - 1]
            /*On vide le contenu de la case*/
            boite.textContent = ""
            /*On enlève la classe "filled-box"*/
            boite.classList.remove("filled-box")
            /*On enlève la dernière lettre entrée dans la variable*/
            motPropose.pop()
            /*On enlève 1 à notre variable de comptage de lettres vides*/
            prochaineLettre -= 1
        }
    }

    /*Fontion de vérification du mot*/
    function verification () {
        let ligne = document.getElementsByClassName("letter-row")[6 - essaisRestants]
        /*On définit notre mot créé comme vide en ajoutant la première lettre du mot à trouver*/
        let motCree = '' + premiereLettre
        let bonMot = Array.from(motSecret)
        
        console.log("ligne : " + ligne) 
        console.log("première lettre : " + premiereLettre) 
        console.log("mot créé : " + motCree) 
        console.log("bon mot : " + bonMot) 
    
        /*Pour chaque lettre du mot proposé*/
        for (const val of motPropose) {
            /*On ajoute à mot créé la lettre choisie*/
            motCree += val
            console.log("val : " + val) 
        }
    
        /*Si la longueur de notre mot créé est différente de la longueur du mot à trouver (donc inférieure)*/
        if (motCree.length != length) {
            console.log("Il n'y a pas assez de lettres.")
            return
        }
    
        /*Pour chaque lettre du mot à trouver (et donc de notre mot proposé)*/
        for (let i = 0; i < length; i++) {
            let couleurLettre = ''
            let boite = ligne.children[i]
            /*On récupère la position de la lettre*/
            let positionLettre = bonMot.indexOf(motCree[i])
            // is letter in the correct guess
            if (positionLettre === -1) {
                couleurLettre = 'grey'
                boite.classList.add("greyLetter")
                console.log("grey")
            } else {
                // now, letter is definitely in word
                // if letter index and right guess index are the same
                // letter is in the right position 
                if (motCree[i] === bonMot[i]) {
                    // shade green 
                    couleurLettre = 'green'
                    boite.classList.add("greenLetter")
                    console.log("green")
                } else {
                    // shade box yellow
                    couleurLettre = 'yellow'
                    boite.classList.add("yellowLetter")
                    console.log("yellow")
                }
    
                bonMot[positionLettre] = "#"
            }
    
            /*On calcule le délai en multipliant 250ms par i*/
            let delay = 100 * i

            setTimeout(()=> {

                console.log("settimeout")

                if (i === length - 1) {
                    if (motCree === motSecret) {
                        ecranWin();
                    } else {
                        essaisRestants -= 1;
                        motPropose = [];
                        prochaineLettre = 1;
    
                        console.log("ce n'est pas le bon mot")
                
                        /* Si le joueur n'a plus d'essais*/
                        if (essaisRestants === 0) {
                            alert(`Vous n'avez plus d'essais. Le mot secret était : "${motSecret}"`)
                            ecranLose();
                        }
                    }
                }
            }, delay)
        }
    }

    /*Ecran de victoire*/
    function ecranWin () {
        document.getElementById("game-board").style.display = "none";
        document.getElementById("win").style.display = "flex";
    }

    /*Ecran de défaite*/
    function ecranLose () {
        document.getElementById("game-board").style.display = "none";
        document.getElementById("lose").style.display = "flex";
    }

    /*Si l'utilisateur souhaite revenir à l'écran d'accueil*/
    const buttonHome = document.getElementById("home");

    /*Si l'utilisateur souhaite revenir à l'écran d'accueil*/
    buttonHome.addEventListener("click", () => {
        /*On recharge simplement la page, toutes les variables sont réinitialisées automatiquement*/
        location.reload();
    });

    /*Si l'utilisateur souhaite revenir à l'écran d'accueil*/
    const buttonReload = document.getElementById("reload");

    /*Si l'utilisateur souhaite revenir à l'écran d'accueil*/
    buttonReload.addEventListener("click", () => {
        /*On recharge simplement la page, toutes les variables sont réinitialisées automatiquement*/
        location.reload();
    });
};


