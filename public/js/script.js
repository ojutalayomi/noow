var bold = document.querySelector("b");
var button = document.querySelectorAll(".button");
var div = document.querySelectorAll("div");
var divv = document.querySelector(".divv");
var email = document.getElementById("email");
var erroR = document.querySelector(".erro-r");
var form = document.querySelector("form");
var imgContent = document.querySelector(".i");
var loader = document.getElementById("loader");
var main = document.querySelector(".main");
var message = document.querySelector(".success-message");

email.setAttribute("oninput", "isValidEmail(this.value)");

function isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


button[0].addEventListener("click", function() {

//setInterval(function() {    
    if(isValidEmail(email.value)){
        bold.innerText = email.value;
        email.classList.remove("error");
        erroR.style.display = "none";
        loader.classList.add("show");
        loader.style.display ="flex";
        message.style.display = "block";
        setTimeout(function() {
        divv.style.display = "block";
        }, 5000);
        main.style.display = "none";
    } else {
        email.classList.add("error");
        erroR.style.display = "block";
        if(email.value === ""){
            erroR.innerHTML = "Please add your email";
        } else {
            erroR.innerHTML = "Valid email required";
        }
        message.style.display = "none";
        window.onresize = function() {
            if(window.innerWidth <= 431){
                main.style.display = "block";
            } else {
                main.style.display = "flex";
            }
        }
    }

    setTimeout(function() {
        if(message.style.display === "block"){
        loader.classList.remove("show");
        loader.style.display ="none";
        }
    }, 6000);
//    }, 500);
});

button[1].addEventListener("click", function() {
    email.classList.remove("error");
    email.value = "";
    erroR.style.display = "none";
    message.style.display = "none";

    if (window.innerWidth < 768) {
        main.style.display = "block";
    } else {
        main.style.display = "flex";
    }
});

form.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault(); // Prevent the default action (form submission)

        // Trigger the click event on the submit button
        button[0].click();
    }
});


setInterval(function() {
    if (window.innerWidth >= 768) {
        div[2].className = "sign-up-img";
        div[3].classList.remove("sign-up-img");
    } else {
        div[2].className = "img-content *";
        div[3].classList.add("sign-up-img");
    }
}, 1000); // 1000 milliseconds = 1 second


 
/**setTimeout(function() {
    document.querySelector('.success-message div').classList.add('show');
}, 1000);**/ // Delay in milliseconds