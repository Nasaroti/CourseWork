let movecount = 3;
const movecountmax = 3;

let moved = false;

let direction = 1;

let enemyhealth = 5;
let playerhealth = 3;

let carryon = false;
let Allowmove = true;

let changeturn=true;

let attackrange = 2;

let enemymove = 5;

const attack1 = new Image();  //Gets the images from the server
attack1.src = "Images/Attack1.png";
const attack2 = new Image();
attack2.src = "Images/Attack2.png";
const attack3 = new Image();
attack3.src = "Images/Attack3.png";
const attack4 = new Image();
attack4.src = "Images/Attack4.png";

const pheart = new Image();
pheart.src = "Images/UI-PHeart.png"
const eheart = new Image();
eheart.src = "Images/UI-EHeart.png"
const eattack = new Image();
eattack.src = "Images/UI-EAttack.png"
const foot = new Image();
foot.src = "Images/UI-Foot.png"

attackanim = [attack1, attack2, attack3, attack4];

let enemymap = [
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
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
                if(enemymap[attackyco][attackxco] === 1)
                {
                    enemyhealth -= 1;
                }
                Attackanimation(attackxco, attackyco);
            }
            movecount = 0;
        } else if (event.key === "f") {

        } else {
            moved = false;
        }

        if (moved) {
            movecount -= 1;
        }

        if (movecount <= 0) {
            Allowmove = false;
        }

        drawGame();
        drawEnemy();
    }
}

function enemyTurn() {
    if (enemyhealth <= 0) {
        endCombat();
        return;
    }
    if(enemymap[yco][xco] === 2) {playerhealth -= 1;}
    if(playerhealth <= 0) {endCombat(); return;}
    mapreset();

    enemyMove();

    enemyAttack();

    movecount = movecountmax;
    drawGame();
    drawEnemy();
    Allowmove = true;
    carryon = false;
}

function enemyMove()
{
    let tempex; // Creates temporary variables for the enemys x and y coordinates
    let tempey;
    for (let y = 0; y < mapH; y++) { //Loops through the map to check for the enemy
        for (let x = 0; x < mapW; x++) {
            if (enemymap[y][x] === 1) {
                enemymap[y][x] = 0; //Sets the enemy location to get rid of the enemy
                tempey = y; //Stores the enemy location
                tempex = x;
            }
        }
    }
    for (let i = 0; i < enemymove; i++)
    {
        let randnum = Math.floor((Math.random() * 4)); //Generates a random number from 0 to 3
        console.log("Move: " + randnum);
        if (randnum === 0) { //Checks what number is generated and changes co-ords as required

            tempey--;
            if (enemymap[tempey][tempex] === 3 || ( (tempex === xco) && (tempey === yco))) {
                tempey++; //Checks for illegal move made and moves enemy co-ords back if needed
                enemymove += 1; //Increases the number of moves the enemy can use
            }

        } else if (randnum === 1) {

            tempey++;
            if (enemymap[tempey][tempex] === 3 || ( (tempex === xco) && (tempey === yco))) {
                tempey--;
                enemymove += 1;
            }

        } else if (randnum === 2) {

            tempex--;
            if (enemymap[tempey][tempex] === 3 || ( (tempex === xco) && (tempey === yco))) {
                tempex++;
                enemymove += 1;
            }

        } else if (randnum === 3) {

            tempex++;
            if (enemymap[tempey][tempex] === 3 || ( (tempex === xco) && (tempey === yco))) {
                tempex--;
                enemymove += 1;
            }
        }
    }
    enemymove = 5;
    enemymap[tempey][tempex] = 1; // Sets the players location
}

function enemyAttack() { //Sets the squares for the enemy attack
    let randnum = Math.floor((Math.random() * 10) + 1); //Generates a random number from 1 to 10
    console.log(randnum);
    if (randnum < 3)
    {
        updateMap(yco,xco);
        updateMap(yco+1,xco);
        updateMap(yco-1,xco);
        updateMap(yco,xco+1);
        updateMap(yco,xco-1);
    }
    if (randnum === 3 || randnum === 4)
    {
        updateMap(yco,xco);
        updateMap(yco+1,xco);
        updateMap(yco-1,xco);
        updateMap(yco,xco+1);
        updateMap(yco,xco-1);
        updateMap(yco+1,xco + 1);
        updateMap(yco-1,xco + 1);
        updateMap(yco + 1,xco - 1);
        updateMap(yco - 1,xco - 1);
    }
    if (randnum === 6 || randnum === 7)
    {
        updateMap(yco + 2,xco);
        updateMap(yco + 1,xco);
        updateMap(yco,xco);
        updateMap(yco - 1,xco);
        updateMap(yco - 2,xco);
    }
    if (randnum === 8 || randnum === 9)
    {
        updateMap(yco,xco + 2);
        updateMap(yco,xco + 1);
        updateMap(yco,xco);
        updateMap(yco,xco - 1);
        updateMap(yco,xco - 2);
    }
    if (randnum === 10 || randnum === 5)
    {
        for (let i = 0; i < 30; i++) //Loops this attack so that many square are attacked
        {
            let randx = Math.floor(Math.random() * (11) + 1); //Generates random co-ordinate for a attack square
            let randy = Math.floor(Math.random() * (11) + 1);
            updateMap(randy,randx);
        }

    }

}

function mapreset() {
    for (let y = 0; y < mapH; y++) { //Loops through the map to check if there is a two and replaces them if there is
        for (let x = 0; x < mapW; x++) {
            if (enemymap[y][x] === 2) {
                enemymap[y][x] = 0;
            }
        }
    }
}

function updateMap(yco, xco )//Checks the squares are not where the enemy is
{
    if (!((enemymap[yco][xco] === 1) || (enemymap[yco][xco] === 3)))
    {
        enemymap[yco][xco] = 2;
    }
}

function endCombat(){
    Allowmove = false;
    gamemap = storagemap;
    combat = false;
    xco = storagexco;
    yco = storageyco;
    drawGame();
    reset();
}

function reset() { //Resets the variables to the beginning of combat
    movecount = movecountmax;
    enemyhealth = 5;
    playerhealth = 3;
    carryon = false;
    Allowmove = true;
    enemymap = [
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
    ];
}

function drawEnemy()
{
    for (let y = 0; y < mapH; y++) { //Loops through the map to draw every tile based on the current array
        for (let x = 0; x < mapW; x++) {
            if(enemymap[y][x] === 1)
                ctx.drawImage(ladybird, x * tileW, y * tileH, tileW, tileH);
            if(enemymap[y][x] === 2)
                ctx.drawImage(eattack, x * tileW, y * tileH, tileW, tileH);
        }
    }

    for (let y = 0; y < enemyhealth; y++) //Draws the enemy health bar
    {
        ctx.drawImage(eheart, (12-y) * tileW, 0 * tileH, tileW, tileH);
    }

    for (let y = 0; y < playerhealth; y++) //Draws the player health bar
    {
        ctx.drawImage(pheart, (y) * tileW, 0 * tileH, tileW, tileH);
    }

    for (let y = 0; y < movecount; y++) //Draws the player health bar
    {
        ctx.drawImage(foot, 0 * tileW, (12-y) * tileH, tileW, tileH);
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
    timing += 1;
    if (changeturn === true)
    {
        changeturn = false;
        setTimeout(function () {
            enemyTurn();
            changeturn = true;
        }, timing); //Calls the function to clear the board, 1ms before the next attack frame
    }


}