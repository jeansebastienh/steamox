function Demineur() {
    this.gTaille = 3;
}
Demineur.prototype.DrawGrid = function(grid)
{
    var gHauteur = grid.length;
    var gLargeur = grid[0].length;
    document.getElementById('grille').style.width = gLargeur * this.gTaille + 'px';
    document.getElementById('grille').style.height = gHauteur * this.gTaille + 'px';
    // Affichage
    for ( i = 0; i < gHauteur; i++ )
    {
        for ( j = 0; j < gLargeur; j++ )
        {           
            

            switch (grid[i][j]) {
                case 'x': 
                    this.drawMine(i, j);
                    break;
               default: 
                    this.drawCase(i,j, grid[i][j]);
              }

        }
    }
};
Demineur.prototype.drawMine(x, y) {
        document.getElementById('x' + i + 'y' + j).style.backgroundColor = '#DDD';
        document.getElementById('x' + i + 'y' + j).innerHTML = '<img src="img/bomb32.png" height="' + (gTaille-2) + '" width="' + (gTaille) + '" alt="bombe" />';
        document.getElementById('x' + i + 'y' + j).style.backgroundColor = '#F00';

};
Demineur.prototype.drawCase(i, j, value) {
    document.write("<div class=\"case\" id=\"x" + i + "y" + j + "\"></div>\n");
    
    caseEnCours = document.getElementById('x' + i + 'y' + j);
    caseEnCours.style.top = (this.gTaille + 1) * i + 'px';
    caseEnCours.style.left = (this.gTaille + 1) * j + 'px';
    caseEnCours.style.width = this.gTaille + 'px';
    caseEnCours.style.height = this.gTaille + 'px';
    caseEnCours.style.lineHeight = this.gTaille + 'px';
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
};
