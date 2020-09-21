let ctx = null;
const tileW = 32;
const tileH = 32;
const mapW = 13;
const mapH = 13;

const grass = new Image();
grass.src = "Images/Background - Grass.png";
const forest = new Image();
forest.src = "Images/Background - Forest.png";
const hero = new Image();
hero.src = "Images/Hero - Knight.png";
const chest = new Image();
chest.src = "Images/Item - Chest.png";
const key = new Image();
key.src = "Images/Item - Key.png";
const gatec = new Image();
gatec.src = "Images/Background - Gate.png";
const gateo = new Image();
gateo.src = "Images/Background - Open Gate.png";
const mfloor = new Image();
mfloor.src = "Images/Background - Mountains Floor.png";
const mountain = new Image();
mountain.src = "Images/Background - Mountains.png";
const castle = new Image();
castle.src = "Images/Background - Castle.png"
const dgrass = new Image();
dgrass.src = "Images/Background - Dark Grass.png";

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

window.onload = function() {
    ctx = document.getElementById("game").getContext("2d");
    drawGame();
}

function drawGame() {
    if (ctx == null) {
        return;
    }
    for (let y = 0; y < mapH; y++) {
        for (let x = 0; x < mapW; x++) {

            ctx.drawImage(tile[gamemap[y][x]], x * tileW, y * tileH, tileW, tileH);
        }
    }

}