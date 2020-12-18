let mapxco;
let mapyco;

let combatchance = 97;

var mapmain = [
    [17, 18, 19, 39, 38, 37],
    [14, 15, 16, 41, 40, 36],
    [11, 12, 13, 42, 34, 35],
    [20, 10, 21,22 ,23, 24],
    [2, 3, 7, 27, 25, 26],
    [1, 4, 8, 28, 33, 29],
    [5, 6, 9, 30, 32, 31]
];

let leftedge = true;
let combat = false;

let storagemap;
let storagexco;
let storageyco;

document.addEventListener("keypress", function(event) { //Event listener checks for keypress's
    if (boss1fight === true)
    {
        combatmoveboss1();
    } else if (combat === true) {
        combatmove();
    } else {
        movement();
    }

});

function movement() {
    if (event.key === "w") { //Checks what key press and changes co-ords as required

        yco--;
        console.log( gamemap[yco][xco] );
        console.log( yco );

        if ((gamemap[yco][xco] === 1) || (gamemap[yco][xco] === 3) || (gamemap[yco][xco] === 5)) {
            yco++; //Checks for illegal move made and moves player co-ords back if needed
            console.log(yco);
        }

    } else if (event.key === "a") {
        xco--;
        if ((gamemap[yco][xco] === 1) || (gamemap[yco][xco] === 3) || (gamemap[yco][xco] === 5)) {
            xco++;
        }

    } else if (event.key === "s") {
        yco++;
        if ((gamemap[yco][xco] === 1) || (gamemap[yco][xco] === 3) || (gamemap[yco][xco] === 5)) {
            yco--;
        }

    } else if (event.key === "d") {
        xco++;
        if ((gamemap[yco][xco] === 1) || (gamemap[yco][xco] === 3) || (gamemap[yco][xco] === 5)) {
            xco--;
        }
    }

    if (leftedge === false) {
        if (xco === 2 || xco === 10 || yco === 2 || yco === 10) {
            leftedge = true;
        }
    } else {
        if (xco === 1 || xco === 11 || yco === 1 || yco === 11) {
            if (xco === 1) {
                mapxco--;
                xco = 11;
            } else if (xco === 11) {
                mapxco++;
                xco = 1;
            } else if (yco === 1) {
                mapyco--;
                yco = 11;
            } else if (yco === 11) {
                mapyco++;
                yco = 1;
            }
            leftedge = false;
            changemap((mapmain[mapyco][mapxco]));
        }
    }

    let randnum = Math.floor((Math.random() * 100) + 1); //Generates a random number between 1 and 100
    console.log(randnum);
    if (randnum >= combatchance) //Gives roughly a 3% change of combat on any given movement
    {
        combat = true;
        storagemap = gamemap;
        storagexco = xco;
        storageyco = yco;
        xco = 6;
        yco = 10;
        gamemap = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 1],
            [1, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 1],
            [1, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 1],
            [1, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
    }
    drawGame();
    if(combat && !boss1fight){drawEnemy();}
}