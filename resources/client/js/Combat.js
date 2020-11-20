let movecount = 3;
const movecountmax = 3;

let moved = false;

let direction = 1;

let enemyhealth = 5;

let carryon = false;
let Allowmove = true;
let attacked = false;

let attackrange = 2;

const attack1 = new Image();  //Gets the images from the server
attack1.src = "Images/Attack1.png";
const attack2 = new Image();
attack2.src = "Images/Attack2.png";
const attack3 = new Image();
attack3.src = "Images/Attack3.png";
const attack4 = new Image();
attack4.src = "Images/Attack4.png";

attackanim = [attack1, attack2, attack3, attack4];

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
    if (carryon === false) {
        moved = true;
        if (event.key === "w") { //Checks what key press and changes co-ords as required
            direction = 1;
            if (Allowmove) {
                yco--;
                if ((gamemap[yco][xco] === 1) || (enemymap[yco][xco] === 1)) {
                    yco++; //Checks for illegal move made and moves player co-ords back if needed
                    moved = false;
                }
            }

        } else if (event.key === "a") {
            direction = 2;
            if (Allowmove) {
                xco--;
                if ((gamemap[yco][xco] === 1) || (enemymap[yco][xco] === 1)) {
                    xco++;
                    moved = false;
                }
            }

        } else if (event.key === "s") {
            direction = 3;
            if (Allowmove) {
                yco++;
                if ((gamemap[yco][xco] === 1) || (enemymap[yco][xco] === 1)) {
                    yco--;
                    moved = false;
                }
            }

        } else if (event.key === "d") {
            direction = 4;
            if (Allowmove) {
                xco++;
                if ((gamemap[yco][xco] === 1) || (enemymap[yco][xco] === 1)) {
                    xco--;
                    moved = false;
                }
            }

        } else if (event.key === " ") { //Checks for the spacebar
            carryon = true;

            let attackxco = xco;
            let attackyco = yco;
            for (let i = 0; i < attackrange; i++) {
                switch (direction) {
                    case 1:
                        attackyco -= 1;
                        break;
                    case 2:
                        attackxco -= 1;
                        break;
                    case 3:
                        attackyco += 1;
                        break;
                    case 4:
                        attackxco += 1;
                        break;
                }
                Attackanimation(attackxco, attackyco);
            }
            movecount = 0;
            attacked = true;

        }

        if (moved) {
            movecount -= 1;
        }

        if (movecount <= 0) {
            Allowmove = false;
        }

        if (attacked) {
            enemyTurn();
        }

        drawGame();
        drawEnemy();
    }
}

function enemyTurn()
{
    if (enemyhealth <= 0) {endCombat(); }
    movecount = movecountmax;
    drawGame();
    drawEnemy();
    attacked = false;
    Allowmove = true;

}

function endCombat()
{
    attacked = false;
    Allowmove = false;
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

function Attackanimation(attackxco, attackyco) {
    let timing;
    for (let i = 0; i < 4; i++) //Loops through the parts of the attackanim array
    {
        timing = i * 250; //sets the timings for the attacks
        setTimeout(function () {
            ctx.drawImage(attackanim[i], attackxco * tileW, attackyco * tileH, tileW, tileH);
        }, timing); //Calls the function to draw the attack frame
        timing += 249;
        setTimeout(function () {
            drawGame();
            drawEnemy();
        }, timing); //Calls the function to clear the board, 1ms before the next attack frame
    }
    setTimeout(function () {
        carryon = false;
    }, timing); //Calls the function to clear the board, 1ms before the next attack frame

}