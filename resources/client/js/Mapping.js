let ctx = null;
const tileW = 32;
const tileH = 32;
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
    ctx = document.getElementById("game").getContext("2d");
    drawGame();
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

    ctx.drawImage(hero, xco * 32, yco * 32, 32, 32); //Draws the main char

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
