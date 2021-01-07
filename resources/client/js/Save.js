function Save() {
    if (!combat) {

        let formData = new FormData();
        formData.append("xco", xco);
        formData.append("yco", yco);
        formData.append("mapxco", mapxco);
        formData.append("mapyco", mapyco);

        let url = "/Position/update";

        fetch(url, {method: "POST", body: formData,})

        url = "/Inventory/update";
        let savestring = "";
        if (1 === 1) //KeyHolding
        {
            if (keyone === 1) {
                savestring = savestring + "Key1,";
            }
            if (keyone === 2) {
                savestring = savestring + "Key1.5,";
            }
            if (keytwo === 1) {
                savestring = savestring + "Key2,";
            }
            if (keytwo === 2) {
                savestring = savestring + "Key2.5,";
            }
        }
        if (1 === 1) //ItemHolding
        {
            if (longsword === 1) {
                savestring = savestring + "Longsword,";
            }
            if (fireenchant === 1) {
                savestring = savestring + "Flaming,";
            }
            if (armour === 1) {
                savestring = savestring + "Armour,";
            }
            if (visor === 1) {
                savestring = savestring + "Visor,";
            }
            if (boots === 1) {
                savestring = savestring + "Boots,";
            }
        }
        if (1 === 1) //BossSave
        {
            if (boss1 === 2) {
                savestring = savestring + "Boss1,";
            }
        }
        if (1 === 1) //CharSave
        {
            if( hero.src === "http://localhost:8081/client/Images/Hero-Knight.png")
            {
                savestring = savestring + "Sword,";
            }
            if (hero.src === "http://localhost:8081/client/Images/Hero-Reaper.png"){
                savestring = savestring + "Scythe,";
            }
        }


        let formData2 = new FormData();
        formData2.append("items", savestring);

        fetch(url, {method: "POST", body: formData2,}) //Updates the inventory
        alert("Saved");
    } else {
        alert("Please finish the fight before saving");
    }
}

function LoadGame() {
    let url = "/Position/get";


    fetch(url, {method: "GET"}).then(response => {
        return response.json();                 //return response to JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) { //checks if response from server has a key "Error"
            alert(JSON.stringify(response));

            window.location.href = 'Login.html';// if it does, convert JSON object to string and alert then return
        } else {
            setcoordinate(response);
        }
    });

    url = "/Inventory/get";


    fetch(url, {method: "GET"}).then(response => {
        return response.json();                 //return response to JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) { //checks if response from server has a key "Error"
            alert(JSON.stringify(response));

            window.location.href = 'Login.html';// if it does, convert JSON object to string and alert then return
        } else {
            setinv(response);
        }
    });
}

function setcoordinate(data){
    console.log(data);
    xco = data.Xco;
    yco = data.Yco;
    mapxco = data.MapXco;
    mapyco = data.MapYco;
}

function setinv(data){
    console.log(data);
    for (let item of data)
    {
        console.log(item.Item);
        if(item.Item === "Key1") { keyone = 1;}
        if(item.Item === "Key1.5") { keyone = 2;}
        if(item.Item === "Key2") { keytwo = 1;}
        if(item.Item === "Key2.5") { keytwo = 2;}
        if(item.Item === "Longsword") { attackrange += 1;  longsword = 1;}
        if(item.Item === "Armour") { playerhealth += 1; playerhealthmax += 1; armour = 1;}
        if(item.Item === "Flaming") { damage += 1; fireenchant = 1;}
        if(item.Item === "Boots") { movecountmax += 1; movecount += 1; boots = 1;}
        if(item.Item === "Visor") { combatchance += 1; visor =1;}
        if(item.Item === "Boss1") { boss1 = 2;}
        if(item.Item === "Sword") { hero.src = "Images/Hero-Knight.png";}
        if(item.Item === "Scythe") { hero.src = "Images/Hero-Reaper.png";}
    }
}