async function trylogin() {

    console.log("invoked login.js  tryLogin() ");
    event.preventDefault();

    const form = document.getElementById("loginForm");
    const formData = new FormData(form);


    fetch("/User/login", { method: 'POST', body: formData}
    ).then(response => {
        return( response.json() );                 //now return that promise to JSON
}).then(response => {
        if (response.hasOwnProperty("Error")) {
        alert(JSON.stringify(response));        // if it does, convert JSON object to string and alert
    } else {
        Cookies.set("username", response.username);
        Cookies.set("token", response.token);
        window.location.href = 'Game.html';
    }
});
}

async function newAccount() {

    console.log("invoked login.js  newAccount() ");
    event.preventDefault();

    const form = document.getElementById("loginForm"); //Collects the data to log in with
    const formData = new FormData(form);

    let trycreate = true;

    for (let value of formData.values()) { //Checks that none of the form data is empty
        if (value === null || value === "") {
            alert("Please enter information into all the box's");
            trycreate = false;
        }
    }

    if (trycreate === true) {

        fetch("/User/new", {method: 'POST', body: formData}
        ).then(response => {
            return (response.json());                 //now return that promise to JSON
        }).then(response => {
            alert(JSON.stringify(response));
            if (response.hasOwnProperty("Error")) {
                alert(JSON.stringify(response));        // if it does, convert JSON object to string and alert
            } else {
                document.getElementById("login").click();
            }
        });
    }
}