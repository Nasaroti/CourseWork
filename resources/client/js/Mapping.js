let ctx = null;
var tileW = 32;
var tileH = 32;
const mapW = 13;
const mapH = 13;

let xco = 3;
let yco = 3;

const grass = new Image();  //Gets the images from the server
grass.src = "Images/Background-Grass.png";
const forest = new Image();
forest.src = "Images/Background-Forest.png";
const hero = new Image();
hero.src = "Images/Hero-Knight.png";
const gatec = new Image();
gatec.src = "Images/Background-Gate.png";
const gateo = new Image();
gateo.src = "Images/Background-OpenGate.png";
const mfloor = new Image();
mfloor.src = "Images/Background-MountainsFloor.png";
const mountain = new Image();
mountain.src = "Images/Background-Mountains.png";
const castle = new Image();
castle.src = "Images/Background-Castle.png";
const dgrass = new Image();
dgrass.src = "Images/Background-DarkGrass.png";

tile = [grass, forest, forest, gatec, gateo, mountain, mfloor, castle, dgrass];

let gamemap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 8, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 8, 8, 8, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

window.onload = function() {  //Ensures that the canvas has been found
    document.getElementById("textContainer").style.display = "none";
    ctx = document.getElementById("game").getContext("2d");
    resize();
}

function drawGame() {
    if (ctx == null) {
        return;
    }
    for (let y = 0; y < mapH; y++) { //Loops through the map to draw every tile based on the current array
        for (let x = 0; x < mapW; x++) {

            ctx.drawImage(tile[gamemap[y][x]], x * tileW, y * tileH, tileW, tileH);
        }
    }

    ctx.drawImage(hero, xco * tileW, yco * tileH, tileW, tileH); //Draws the main char

}

window.addEventListener('resize', resize);

function resize() {
    var newwidth = window.innerWidth;
    newwidth = newwidth / 2;
    if (document.getElementById("game").width !== newwidth) {
        document.getElementById("game").width = newwidth;
        document.getElementById("game").height = newwidth;
        tileW = newwidth / mapW;
        tileH = newwidth / mapH;
    }
    drawGame();
}

function showText(){
    document.getElementById("textContainer").style.display = "block";
}
function hideText(){
    document.getElementById("textContainer").style.display = "none";
}

function changemap(map){
    switch (map) {
        case 1:
            gamemap = [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 0, 8, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 8, 8, 8, 0, 0, 0, 1, 1],
                [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ];
            break;
        case 2:
            gamemap = [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ];
            break;
        case 3:
            gamemap = [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
                [1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1],
                [1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1],
                [1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1],
                [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
                [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ];
            break;
        case 4:
            gamemap = [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
                [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
                [1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1],
                [1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1],
                [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1],
                [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1],
                [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1],
                [1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1],
                [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ];
            break;
    }
}
