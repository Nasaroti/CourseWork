let movecount = 3;
const movecountmax = 3;

let moved = false;

let enemyhealth = 5;

let enemymap = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function combatmove() {
    moved = true;
    if (event.key === "w") { //Checks what key press and changes co-ords as required

        yco--;
        if ((gamemap[yco][xco] === 1) || (enemymap[yco][xco] === 1)) {
            yco++; //Checks for illegal move made and moves player co-ords back if needed
            moved = false;
        }

    } else if (event.key === "a") {
        xco--;
        if ((gamemap[yco][xco] === 1) || (enemymap[yco][xco] === 1)) {
            xco++;
            moved = false;
        }

    } else if (event.key === "s") {
        yco++;
        if ((gamemap[yco][xco] === 1) || (enemymap[yco][xco] === 1)) {
            yco--;
            moved = false;
        }

    } else if (event.key === "d") {
        xco++;
        if ((gamemap[yco][xco] === 1) || (enemymap[yco][xco] === 1)) {
            xco--;
            moved = false;
        }
    }

    if (moved){    movecount -= 1;}

    if  ((movecount === 0) && (enemyhealth === 0))
    {
        endCombat();
    } else {

        movecount = movecountmax
        drawGame();
        drawEnemy();
    }
}

function endCombat()
{
    movecount = movecountmax;
    gamemap = storagemap;
    combat = false;
    xco = storagexco;
    yco = storageyco;
    drawGame();
}

function drawEnemy()
{
    for (let y = 0; y < mapH; y++) { //Loops through the map to draw every tile based on the current array
        for (let x = 0; x < mapW; x++) {
            if(enemymap[y][x] === 1)
            ctx.drawImage(ladybird, x * tileW, y * tileH, tileW, tileH);
        }
    }
}