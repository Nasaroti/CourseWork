function trylogin() {

    console.log("invoked login.js  tryLogin() ");
    event.preventDefault();

    const form = document.getElementById("loginForm");
    const formData = new FormData(form);

    alert("Trying");

    fetch("/User/login", {method: 'post', body: formData}
    ).then(response => response.json()
    ).then(responseData => {
        if (responseData.hasOwnProperty('Error')) {
            alert(responseData.Error);
        } else {
            Cookies.set("username", responseData.username);
            Cookies.set("token", responseData.token);

            window.location.href = 'Game.html';
        }
    });

}