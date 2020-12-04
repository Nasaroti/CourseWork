function Save() {
    alert("Saving");
    console.log("Saving");

    let formData = new FormData();
    formData.append("xco", xco);
    formData.append("yco", yco);
    formData.append("mapxco", mapxco);
    formData.append("mapyco", mapyco);

    const url = "/Position/update";

    fetch(url, {method: "POST", body: formData,})
}

function LoadGame() {
    const url = "/Position/get";


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
}

function setcoordinate(data){
    console.log(data);
    xco = data.Xco;
    yco = data.Yco;
    mapxco = data.MapXco;
    mapyco = data.MapYco;
}