var button = document.querySelectorAll(".button");
var div = document.querySelectorAll("div");
var dpass = document.querySelector(".dpass");
var email = document.querySelector("#email");
var erroR = document.querySelectorAll(".erro-r");
var errorp = document.querySelectorAll(".erro-rp");
var firstname = document.querySelector("#firstname");
var form = document.querySelector("#form");
var i = document.querySelector("i");
var lastname = document.querySelector("#lastname");
var password = document.querySelector("#password");
var span = document.querySelectorAll("span");
var username = document.querySelector("#username");


function isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

email.oninput = () => {
    if(isValidEmail(email.value)){
        email.classList.remove("error");
        erroR[2].style.display = "none";
    } else {
        email.classList.add("error");
        erroR[2].style.display = "block";
        if(email.value === ""){
            email.classList.remove("error");
            erroR[2].innerHTML = "Please add your email";
        } else {
            erroR[2].innerHTML = "Valid email required";
        }
    }
}

firstname.oninput = () => {
    if(firstname.value === ""){
        firstname.classList.add("error");
        //erroR[0].style.display = "block";
        //erroR[0].innerHTML = "Please add your first name";
    } else {
        firstname.classList.remove("error");
        erroR[0].style.display = "none";
    }

}

lastname.oninput = () => {
    if(lastname.value === ""){
        lastname.classList.add("error");
        //erroR[1].style.display = "block";
        //erroR[1].innerHTML = "Please add your last name";
    } else {
        lastname.classList.remove("error");
        erroR[1].style.display = "none";
    }

}

function isValidUsername(username) {
    var re = /^[a-zA-Z]+$/;
    return re.test(String(username));
}

username.oninput = () => {
    if(isValidUsername(username.value)){
        username.classList.remove("error");
        erroR[3].style.display = "none";
    } else {
        username.classList.add("error");
        erroR[3].style.display = "block";
        if(username.value === ""){
            username.classList.remove("error");
            erroR[3].innerHTML = "Please add your username";
        } else {
            erroR[3].innerHTML = "Username must contain only letters";
        }
    }
}

function isValidPassword(password) {
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.,\/#!$%\^&\*;:{}=\-_`~()]).{6,20}$/;
    return re.test(String(password));
}

const errors = [
    "Password must contain at least one digit",
    "Password must contain at least one lowercase letter",
    "Password must contain at least one uppercase letter",
    "Password must contain at least one special character",
    "Password must be at least 6 characters long"
];

password.oninput = () => {
    if(isValidPassword(password.value)){
        dpass.classList.remove("error");
        erroR[4].style.display = "none";
    } else {
        dpass.classList.add("error");
        erroR[4].style.display = "block";
        errors.forEach((error, index) => {
            if(password.value === ""){
                password.classList.remove("error");
                erroR[4].innerHTML = "Please add your password";
            } else if(password.value.length < 6){
                erroR[4].innerHTML = "Password must be at least 6 characters long";
            } else if(password.value.match(/[a-z]/g) === null || password.value.match(/[A-Z]/g) === null){
                erroR[4].innerHTML = "Password must contain at least one uppercase letter and one lowercase letter";
            } else if(password.value.match(/[0-9]/g) === null){
                erroR[4].innerHTML = "Password must contain at least one digit";
            } else if(password.value.match(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g) === null){
                erroR[4].innerHTML = "Password must contain at least one special character";
            } else{
                erroR[4].innerHTML = error;
            }
        }); 
    }

}


i.onclick = () => {
    if (password.type === "password") {
      i.className ="fa-solid fa-eye";
      password.type = "text";
    } else{
      i.className ="fa-solid fa-eye-slash";
      password.type = "password";
    }  
  }

  setInterval(function() {
    if (window.innerWidth >= 768) {
        div[2].className = "sign-up-img";
        div[3].classList.remove("sign-up-img");
    } else {
        div[2].className = "img-content *";
        div[3].classList.add("sign-up-img");
    }
}, 1000);

document.getElementById('prevBtn').addEventListener('click', function() {
    nextPrev(-1);
});

document.getElementById('nextBtn').addEventListener('click', function() {
    nextPrev(1);
});

function validateForm() {
    var x = document.getElementsByClassName("tab");
    var inputs = x[currentTab].getElementsByTagName("input");
    var valid = true;
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") {
            // add an "invalid" class to the field:
            inputs[i].classList.add("error");
            // and set the current valid status to false:
            valid = false;
        }
    }
    return valid; // return the valid status
}

 var currentTab = 0;
        showTab(currentTab);
    
        function showTab(n) {
            var x = document.getElementsByClassName("tab");
            x[n].style.display = "block";
    
            var prevBtn = document.querySelector(".prevBtn");
            var nextBtn = document.getElementById("nextBtn");
    
            if (n === 0) {
                prevBtn.id = "none";
            } else {
                prevBtn.id = "prevBtn";
            }
    
            if (n === (x.length - 1)) {
                nextBtn.innerHTML = "Submit";
            } else {
                nextBtn.innerHTML = "Next";
            }
    
            fixStepIndicator(n);
        }
    
        function nextPrev(n) {
            var x = document.getElementsByClassName("tab");
            if (n === 1 && !validateForm()) return false;
            x[currentTab].style.display = "none";
            currentTab = currentTab + n;
    var form = document.getElementById('form');
            if (currentTab >= x.length) {
                form.submit();
                return false;
            }
    
            showTab(currentTab);
        }
        
        function fixStepIndicator(n) {
            var i, step = document.getElementsByClassName("step");
            for (i = 0; i < step.length; i++) {
                step[i].className = step[i].className.replace(" active", "");
            }
            step[n].className += " active";
        }

