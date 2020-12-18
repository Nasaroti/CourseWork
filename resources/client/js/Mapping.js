let ctx = null;
let tileW = 32;
let tileH = 32;
const mapW = 13;
const mapH = 13;

let xco;
let yco;

const grass = new Image();  //Gets the images from the server
grass.src = "Images/Background-Grass.png";
const forest = new Image();
forest.src = "Images/Background-Forest.png";
const mfloor = new Image();
mfloor.src = "Images/Background-MountainsFloor.png";
const mountain = new Image();
mountain.src = "Images/Background-Mountains.png";
const castle = new Image();
castle.src = "Images/Background-Castle.png";
const dgrass = new Image();
dgrass.src = "Images/Background-DarkGrass.png";

const hero = new Image();
hero.src = "Images/Hero-Knight.png";
const hero2 = new Image();
hero2.src = "Images/Hero-Reaper.png";

const ladybird = new Image();
ladybird.src = "Images/Enemy-Ladybird.png";
const wyrm = new Image();
wyrm.src = "Images/Enemy-Wyrm.png";

const chest = new Image();
chest.src = "Images/Item-Chest.png";

const gatec = new Image();
gatec.src = "Images/Background-Gate.png";
const gateo = new Image();
gateo.src = "Images/Background-OpenGate.png";
const key1 = new Image();
key1.src = "Images/Item-Key.png";

const gatecr = new Image();
gatecr.src = "Images/Background-GateR.png";
const gateor = new Image();
gateor.src = "Images/Background-OpenGateR.png";
const key2 = new Image();
key2.src = "Images/Item-KeyR.png";

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

function stateChange(newState) {
    setTimeout(function () {
        if (newState === -1) {
            changemap((mapmain[mapyco][mapxco]));

            document.getElementById("textContainer").style.display = "none";
            ctx = document.getElementById("game").getContext("2d");
            resize();
        }
    }, 25);
}

window.onload = function() {  //Ensures that the canvas has been found

    LoadGame();
    stateChange(-1);
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
    if(!combat){ checkmap(mapmain[mapyco][mapxco]); }

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
    if (combat) { drawEnemy(); }
}

function showText(){
    document.getElementById("textContainer").style.display = "block";
}
function hideText(){
    document.getElementById("textContainer").style.display = "none";
}

function showStats(){
    document.getElementById("StatsContainer").innerHTML =
        "Attack Power: " + damage +
        "<br> Attack Range: " + attackrange +
        "<br> Move Distance: " + movecountmax +
        "<br> Max Health: " + playerhealthmax +
        "<br> Combat Percent: " + (100 - combatchance);
    document.getElementById("StatsContainer").style.display = "block";
}
function hideStats(){
    document.getElementById("StatsContainer").style.display = "none";
}

function changeKnight() {
    hero.src = "Images/Hero-Knight.png";
    drawGame();
    if (combat) { drawEnemy(); }
}

function changeReaper() {
    hero.src = "Images/Hero-Reaper.png";
    drawGame();
    if (combat) { drawEnemy(); }
}

function changemap(map){
    const url = "/Map/get/" + map;


    fetch(url, {method: "GET"}).then(response => {
        return response.json();                 //return response to JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) { //checks if response from server has a key "Error"
            alert(JSON.stringify(response));

            window.location.href = 'Login.html';// if it does, convert JSON object to string and alert then return
        } else {
            console.log(response);
            toArray(response);
        }
    });

}

function toArray(wholestring)
{
    let unsplit = wholestring.Map;
    let split1 = unsplit.split(";"); //Splits by semi-colon
    for (let i = 0; i < mapW; i++)
    {
        for(let j = 0; j < mapH; j++)
        {
            let split2 = split1[i].split(","); //Splits by all of the commas for each of the ; splits
            gamemap[i][j] = parseInt( split2[j] );
        }

    }
    console.log(gamemap);
    drawGame();
}
