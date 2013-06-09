
var gHauteur;                // nombre de lignes
var gLargeur;                // nombre de colonnes
var gTaille;                // dimension en pixel d'une case de forme carre
var gContinue;                // 1: partie en cours, 0: fin de la partie
var gMinesRestantes;
var gTempsEcoule;
var gDebut = 0;             // Premier clic marque le debut de l'ecoulement du timer
var gCasesRestantes;        // Nombre de cases ne contenant pas de mines
var gMarqueurActif;            // 1: la touche CTRL est enfoncee, sinon 0

var runGame = function() {
    
    var tab = creerGrille(25, 10, 10);
    debugger;
    return tab;
};

if (typeof module !== 'undefined') {
    module.exports.runGame = runGame;
}


function creerGrille( taille, largeur, hauteur )
{
    gHauteur = hauteur;
    gLargeur = largeur;
    gTaille     = taille;
    
    // Debut du jeu
    gContinue = true;
    
    // Initialisation du tableau
    tab = new Array(hauteur);
    for ( i = 0; i < hauteur; i++ )
        tab[i] = new Array(largeur);
    
    // Initialisation par des zeros
    for ( i = 0; i < hauteur; i++ )
        for ( j = 0; j < largeur; j++ )
            tab[i][j] = 0;
    
    // Generation du nombre de mines
    var nbMines = parseInt(hauteur * largeur * 0.1);
    gMinesRestantes = nbMines;
    gCasesRestantes = hauteur * largeur - nbMines;
    
    // Ajout des mines
    while ( nbMines > 0 )
    {
        i = random(hauteur);
        j = random(largeur);
        
        if ( tab[i][j] != 'x' )
        {
            tab[i][j] = 'x';
            nbMines--;
        }
    }

    return tab;
}

function compteMines(i , j)
{
    var minesDetectees = 0; 
    
    if ( i < gHauteur-1 && j > 0 && tab[i+1][j-1] == 'x' )                 minesDetectees++;
    if ( i < gHauteur-1 && tab[i+1][j] == 'x' )                         minesDetectees++;
    if ( i < gHauteur-1 && j < gLargeur-1 && tab[i+1][j+1] == 'x' )     minesDetectees++;

    if ( j > 0 && tab[i][j-1] == 'x' )                                     minesDetectees++;
    if ( j < gLargeur-1 && tab[i][j+1] == 'x' )                         minesDetectees++;

    if ( i > 0 && j > 0 && tab[i-1][j-1] == 'x' )                         minesDetectees++;
    if ( i > 0 && tab[i-1][j] == 'x' )                                     minesDetectees++;
    if ( i > 0 && j < gLargeur-1 &&tab[i-1][j+1] == 'x' )                 minesDetectees++;
    
    return(minesDetectees);
}

function afficheGrille()
{

    // Affichage
    for ( i = 0; i < gHauteur; i++ )
    {
        for ( j = 0; j < gLargeur; j++ )
        {            
            document.getElementById('grille').style.width = gLargeur * gTaille + 'px';
            document.getElementById('grille').style.height = gHauteur * gTaille + 'px';
            
            document.write("<div class=\"case\" id=\"x" + i + "y" + j + "\" onmouseup=\"verifieCase(" + i + "," + j + ")\"></div>\n");
            
            caseEnCours = document.getElementById('x' + i + 'y' + j);
            caseEnCours.style.top = (gTaille + 1) * i + 'px';
            caseEnCours.style.left = (gTaille + 1) * j + 'px';
            caseEnCours.style.width = gTaille + 'px';
            caseEnCours.style.height = gTaille + 'px';
            caseEnCours.style.lineHeight = gTaille + 'px';
        }
    }
}

function verifieCase(i, j)
{
    if ( gMarqueurActif )
    {
        poseMarqueur(i, j);
    }
    else
    {
        // Premier clic dans la grille : on lance le timer
        if ( !gDebut )
        {
            gDebut = 1;
            gTempsEcoule = 1;    
            timerID = setInterval('afficheTemps()', 1000);
        }
        
        // Explosion d'une mine
        if ( gContinue && document.getElementById('x' + i + 'y' + j).innerHTML != "!" )
            if ( tab[i][j] == 'x' )
            {
                afficheMines(i, j);
                gContinue = false;
            }
            else
                rechercheVide(i, j);
    }
}


function rechercheVide(i, j)
{
    // Verifie qu'on ne sort pas des limites de la grille
    // Verifie aussi qu'il n'y a pas de marqueur dessus
    if ( i >= 0 && i < gHauteur && j >=0 && j < gLargeur && document.getElementById('x' + i + 'y' + j).innerHTML != "!" )
    {
        // Si la case est vide...
        if (tab[i][j] == 0)
        {
            var nb = compteMines(i, j);            
            afficheIndice(i, j, nb);
            
            // On retire une case vide
            gCasesRestantes--;
            
            // Si toutes les cases vides ont ete trouvees, victoire :D
            if ( gCasesRestantes == 0 )
            {
                // Arret du timer
                clearTimeout(timerID);
                gContinue = 0;
                alert('VICTOIRE');
            }
            
            // On change le contenu de la case pour eviter de repasser dessus
            tab[i][j] = 9;
            
            // Si les cases adjacentes ne presentent pas de mines, on effectue la recherche sur ces cases
            if (nb == 0)
            {
                rechercheVide(i+1, j-1);
                rechercheVide(i+1, j);
                rechercheVide(i+1, j+1);
                rechercheVide(i, j-1);
                rechercheVide(i, j+1);
                rechercheVide(i-1, j-1);
                rechercheVide(i-1, j);
                rechercheVide(i-1, j+1);
            }
        }
    }
}


function afficheIndice(i, j, nb)
{
    document.getElementById('x' + i + 'y' + j).style.backgroundColor = '#DDD';
    if ( nb != 0 )
    {
        document.getElementById('x' + i + 'y' + j).innerHTML = nb;
        switch (nb)
        {
            case 1: document.getElementById('x' + i + 'y' + j).style.color = '#00F'; break;
            case 2: document.getElementById('x' + i + 'y' + j).style.color = '#090'; break;
            case 3: document.getElementById('x' + i + 'y' + j).style.color = '#F00'; break;
            case 4: document.getElementById('x' + i + 'y' + j).style.color = '#009'; break;
            case 5: document.getElementById('x' + i + 'y' + j).style.color = '#900'; break;
            case 6: document.getElementById('x' + i + 'y' + j).style.color = '#099'; break;
            case 7: document.getElementById('x' + i + 'y' + j).style.color = '#333'; break;
            case 8: document.getElementById('x' + i + 'y' + j).style.color = '#999'; break;
        }
    }
}

// Boom !! Perdu ? On affiche toutes les mines
function afficheMines(x, y)
{
    for ( i = 0; i < gHauteur; i++ )
        for ( j = 0; j < gLargeur; j++)
            if ( tab[i][j] == 'x' )
            {
                // Arret du timer
                clearTimeout(timerID);
                
                // Affichage de toutes les bombes
                document.getElementById('x' + i + 'y' + j).style.backgroundColor = '#DDD';
                document.getElementById('x' + i + 'y' + j).innerHTML = '<img src="img/bomb32.png" height="' + (gTaille-2) + '" width="' + (gTaille) + '" alt="bombe" />';
                
                // Mise en evidence de la bombe qui a ete declenchee
                if ( x == i && y == j )
                    document.getElementById('x' + i + 'y' + j).style.backgroundColor = '#F00';
            }    
}


function afficheTemps()
{
    var temps = new Date();
    temps.setTime(gTempsEcoule * 1000); // convertit en seconde
    
    var s = temps.getSeconds();
    var m = temps.getMinutes();
    var h = temps.getHours() - 1;

    if ( s <= 9 ) s = '0' + s; 
    if ( m <= 9 ) m = '0' + m; 
    if ( h <= 9 ) h = '0' + h; 
    
    document.getElementById('timer').innerHTML = h + ':' + m + ':' + s;
    gTempsEcoule++;
}




var random = function(n)
{
    return parseInt(Math.random() * n);
}


function poseMarqueur(i, j)
{
    if ( gContinue )
    {
        // Depot d'un marqueur si et seulement
        //         s'il n'y a pas un marqueur auparavent
        //         et si la case n'a pas ete ouverte
        if ( document.getElementById('x' + i + 'y' + j).innerHTML != "!" && tab[i][j] != 9 )
        {
            document.getElementById('x' + i + 'y' + j).innerHTML = "!";
            
            // Affichage du nombre de mines restantes
            gMinesRestantes--;
            document.getElementById('minesRestantes').innerHTML = "Mines : " + (gMinesRestantes);
            
            // Verifie si les marqueurs ont ete bien poses
            if ( gMinesRestantes == 0 )
                verifieMarqueurs(i, j);
        }
        // Si un marqueur existe deja, on lui le retire
        else if ( document.getElementById('x' + i + 'y' + j).innerHTML == "!" && tab[i][j] != 9 )
        {
            document.getElementById('x' + i + 'y' + j).innerHTML = "";
            
            // Affichage du nombre de mines restantes
            gMinesRestantes++;
            document.getElementById('minesRestantes').innerHTML = "Mines : " + (gMinesRestantes);        
        }
    }
}

//
function verifieMarqueurs(i, j)
{
    for ( hauteur = 0; hauteur < gHauteur; hauteur++ )
        for ( largeur = 0; largeur < gLargeur; largeur++ )
            if ( document.getElementById('x' + hauteur + 'y' + largeur).innerHTML == "!" && tab[i][j] == "x" )
            {
                // Arret du timer
                clearTimeout(timerID);
                
                gContinue = 0;
                
                alert('VICTOIRE');
                return;
            }
}
