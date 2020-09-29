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
           Cookies.set("username", responseData.username);
           Cookies.set("token", responseData.token);
           window.location.href = 'Game.html';
       }
   });
}