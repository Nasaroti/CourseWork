function combatmoveboss1() {
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
                Attackanimationb1(attackxco, attackyco);
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
        drawEnemyb1();
    }
}

function enemyTurnb1() {
    if (enemyhealth <= 0) {
        endCombat();
        boss1 = 2;
        return;
    }
    if(enemymap[yco][xco] === 2) {playerhealth -= 2;}
    if(playerhealth <= 0) {window.location.href = 'Game.html';}
    mapreset();

    enemyMove();

    enemyAttackb1();

    movecount = movecountmax;
    drawGame();
    drawEnemyb1();
    Allowmove = true;
    carryon = false;
}

function enemyAttackb1() { //Sets the squares for the enemy attack
    let randnum = Math.floor((Math.random() * 10) + 1); //Generates a random number from 1 to 10
    console.log(randnum);
    if (randnum < 3) {
        for (let i = 0; i < 13; i += 2) {
            for (let j = 0; j < 13; j++) {
                updateMap(i, j);
                updateMap(j, i);
            }
        }


    }
    if (randnum === 3 || randnum === 4) {
        updateMap(yco, xco);
        updateMap(yco + 1, xco);
        updateMap(yco - 1, xco);
        updateMap(yco, xco + 1);
        updateMap(yco, xco - 1);
        updateMap(yco + 1, xco + 1);
        updateMap(yco - 1, xco + 1);
        updateMap(yco + 1, xco - 1);
        updateMap(yco - 1, xco - 1);
        updateMap(yco + 2, xco);
        updateMap(yco - 2, xco);
        updateMap(yco, xco + 2);
        updateMap(yco, xco - 2);
    }
    if (randnum === 6 || randnum === 7) {
        for (let tempy = 0; tempy < mapH; tempy++) { //Loops through the map to check for the enemy
            for (let tempx = 0; tempx < mapW; tempx++) {
                if (enemymap[tempy][tempx] === 1) {
                    x = tempx;
                    y = tempy;
                }
            }
        }
        updateMap(y, x);
        updateMap(y + 1, x);
        updateMap(y - 1, x);
        updateMap(y, x + 1);
        updateMap(y, x - 1);
        updateMap(y + 1, x + 1);
        updateMap(y - 1, x + 1);
        updateMap(y + 1, x - 1);
        updateMap(y - 1, x - 1);
        updateMap(y + 2, x);
        updateMap(y - 2, x);
        updateMap(y, x + 2);
        updateMap(y, x - 2);
    }
    if (randnum === 8 || randnum === 9) {
        for (let y = 0; y < mapH; y++) { //Loops through the map to check for the enemy
            for (let x = 0; x < mapW; x++) {
                updateMap(x, y);
            }
        }

        for (let i = 0; i < 6; i++) //Loops this attack so that many square are attacked
        {
            let randx = Math.floor(Math.random() * (11) + 1); //Generates random co-ordinate for a attack square
            let randy = Math.floor(Math.random() * (11) + 1);
            if (enemymap[randx][randy] === 2) {
                enemymap[randx][randy] = 0;
            }
        }
    }
    if (randnum === 10 || randnum === 5) {
        for (let i = 0; i < 100; i++) //Loops this attack so that many square are attacked
        {
            let randx = Math.floor(Math.random() * (11) + 1); //Generates random co-ordinate for a attack square
            let randy = Math.floor(Math.random() * (11) + 1);
            updateMap(randy, randx);
        }
    }
}

function drawEnemyb1()
{
    for (let y = 0; y < mapH; y++) { //Loops through the map to draw every tile based on the current array
        for (let x = 0; x < mapW; x++) {
            if(enemymap[y][x] === 1)
                ctx.drawImage(wyrm, x * tileW, y * tileH, tileW, tileH);
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

function Attackanimationb1(attackxco, attackyco) {
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
            drawEnemyb1();
        }, timing); //Calls the function to clear the board, 1ms before the next attack frame
    }
    timing += 1;
    if (changeturn === true)
    {
        changeturn = false;
        setTimeout(function () {
            enemyTurnb1();
            changeturn = true;
        }, timing); //Calls the function to clear the board, 1ms before the next attack frame
    }


}