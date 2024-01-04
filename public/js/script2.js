var button = document.querySelector(".button");
var div = document.querySelectorAll("div");
var loader = document.getElementById("loader");

button.onclick = function() {
    window.location.href = "/";
}

setTimeout(function() {
    loader.classList.remove("show");
}, 6000);