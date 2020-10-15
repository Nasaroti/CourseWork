function Logout() {
    alert("Done");
    Cookies.remove("username");
    Cookies.remove("token");
    window.location.href = "Login.html";
    alert("Finished");
}
