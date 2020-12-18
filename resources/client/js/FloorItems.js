let keyone = 0;//0 for not, 1 for held, 2 for used
let keytwo = 0;//0 for not, 1 for held, 2 for used

let longsword = 0;//0 for not, 1 for held, 2 for used
let armour = 0;//0 for not, 1 for held, 2 for used
let boots = 0;//0 for not, 1 for held, 2 for used
let fireenchant = 0;//0 for not, 1 for held, 2 for used
let visor = 0;//0 for not, 1 for held, 2 for used

let boss1 = 0;
let boss1fight = false;

function checkmap(maploc)
{
    switch(maploc) {
        //Key 1
        case 20: //Checks if the player is on the map with the key
            if (keyone === 0) //If they have not yet got the key
            {
                if (xco === 6 && yco === 6){ //If they are standing on the key location give them the key
                    keyone = 1; //Set the key to held
                } else {
                    drawimg(key1, 6, 6); //Otherwise draw the key on the floor
                }
            }
            break;

            //Gates
        case 23:
            //Gate 1
            if  (keyone !== 2) //If the gate is not yet open
            {
                if (xco === 6 && yco === 10  && keyone === 1) //Checks if the player can open the gate
                {
                    keyone = 2; //Opens the gate
                    gamemap[11][6] = 0;
                    drawimg(tile[0], 6, 11);
                    drawimg(tile[4], 6, 11);

                } else {
                    drawimg(tile[0], 6, 11);
                    drawimg(tile[3], 6, 11);
                    gamemap[11][6] = 1;  //Draw the closed gate then set the map to one so that the player is unable to walk though
                }
            } else {
                drawimg(tile[4], 6, 11);
            }

            //Gate 2
            if  (keytwo !== 2) //If the gate is not yet open
            {
                if (xco === 6 && yco === 2  && keytwo === 1) //Checks if the player can open the gate
                {
                    keytwo = 2; //Opens the gate
                    gamemap[1][6] = 0;
                    drawimg(tile[0], 6, 1);
                    drawimg(gateor, 6, 1);

                } else {
                    drawimg(tile[0], 6, 1);
                    drawimg(gatecr, 6, 1);
                    gamemap[1][6] = 1;  //Draw the closed gate then set the map to one so that the player is unable to walk though
                }
            } else {
                drawimg(gateor, 6, 1);
            }
            break;


            //Key 2
        case 33: //Checks if the player is on the map with the key
            if (keytwo === 0) //If they have not yet got the key
            {
                if (xco === 6 && yco === 6){ //If they are standing on the key location give them the key
                    keytwo = 1; //Set the key to held
                } else {
                    drawimg(key2, 6, 6); //Otherwise draw the key on the floor
                }
            }
            break;

            //LongSword
        case 19: //Checks if the player is on the map with the chest

            if (longsword === 0) //If they have not yet got the key
            {
                if (xco === 6 && yco === 6){ //If they are standing on the key location give them the key
                    longsword = 1; //Set the key to held
                    attackrange += 1;
                } else {
                    drawimg(chest, 6, 6); //Otherwise draw the key on the floor
                }
            }
            break;

        //Boots
        case 5: //Checks if the player is on the map with the chest

            if (boots === 0) //If they have not yet got the key
            {
                if (xco === 6 && yco === 6){ //If they are standing on the key location give them the key
                    boots = 1; //Set the key to held
                    movecount += 1;
                    movecountmax += 1;
                } else {
                    drawimg(chest, 6, 6); //Otherwise draw the key on the floor
                }
            }
            break;

        //Armour
        case 6: //Checks if the player is on the map with the chest

            if (armour === 0) //If they have not yet got the key
            {
                if (xco === 5 && yco === 4){ //If they are standing on the key location give them the key
                    armour = 1; //Set the key to held
                    playerhealth += 1;
                    playerhealthmax += 1;
                } else {
                    drawimg(chest, 5, 4); //Otherwise draw the key on the floor
                }
            }
            break;

        //Fire
        case 24: //Checks if the player is on the map with the chest

            if (fireenchant === 0) //If they have not yet got the item
            {
                if (xco === 9 && yco === 6){ //If they are standing on the item location give them the key
                    fireenchant = 1; //Set the item to held
                    damage += 1;
                } else {
                    drawimg(chest, 9, 6); //Otherwise draw the chest on the floor
                }
            }
            break;

        //Visor
        case 39: //Checks if the player is on the map with the chest

            if (visor === 0) //If they have not yet got the key
            {
                if (xco === 6 && yco === 6){ //If they are standing on the key location give them the key
                    visor = 1; //Set the key to held
                    combatchance += 1;
                } else {
                    drawimg(chest, 6, 6); //Otherwise draw the key on the floor
                }
            }
            break;

        //Boss 1
        case 42: //Checks if the player is on the map for the boss fight

            if (boss1 === 0) //If they have not yet beaten the boss
            {
                if (xco === 6 && yco === 6){ //If they have walked to the location start the fight
                    boss1fight = true;
                    combat = true;
                    enemyhealth = 7;
                    enemymove = 9;
                    storagemap = gamemap;
                    storagexco = xco;
                    storageyco = yco;
                    xco = 6;
                    yco = 10;
                    boss1 = 1;
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
                    drawGame();
                    drawEnemyb1();
                } else {
                    drawimg(wyrm, 6, 6); //Otherwise draw the enemy on the floor
                }
            }
            break;
    }

    if (keyone === 1) {
        ctx.fillStyle = ("#000000");
        ctx.fillRect(tileH * 0.5 - 2, tileW * 0.5 - 2 ,tileH + 4, tileW + 4);
        ctx.fillStyle = ("#FFFFFF");
        ctx.fillRect(tileH * 0.5, tileW * 0.5, tileH, tileW);
        ctx.drawImage(key1, tileH * 0.5, tileW * 0.5, tileH, tileW);
    }
    if (keytwo === 1) {
        ctx.fillStyle = ("#000000");
        ctx.fillRect(tileH * 0.5 - 2, tileW * 0.5 - 2 ,tileH + 4, tileW + 4);
        ctx.fillStyle = ("#FFFFFF");
        ctx.fillRect(tileH * 0.5, tileW * 0.5, tileH, tileW);
        ctx.drawImage(key2, tileH * 0.5, tileW * 0.5, tileH, tileW);
    }


}

function drawimg(image, x, y)
{
    ctx.drawImage(image, x * tileW, y * tileH, tileW, tileH);
}