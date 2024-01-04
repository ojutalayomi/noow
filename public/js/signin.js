//const button = document.querySelector(".button");
const div = document.querySelectorAll("div");
const dpass = document.querySelectorAll(".dpass");
//const email = document.querySelector("input#email");
const erroR = document.querySelectorAll(".erro-r");
//const errorp = document.querySelectorAll(".erro-rp");
const form = document.querySelector("#form");
const i = document.querySelectorAll("i");
const password = document.querySelector("#password");
const p = document.querySelector("p");
const username = document.querySelector("#username");
const usn = document.querySelector(".usn");

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function isValidUsername(username) {
    const re = /^[a-zA-Z]+$/;
    return re.test(String(username));
}

username.oninput = () => {
    let isValid;
    
    p.innerHTML = `You have successfully signed in as ${username.value}! You will be redirected to the home page in 4 seconds.`;
    if (username.type === "email") {
        isValid = isValidEmail(username.value);
    } else {
        isValid = isValidUsername(username.value);
    }

    if(isValid){
        dpass[0].classList.remove("error");
        erroR[0].style.display = "none";
    } else {
        dpass[0].classList.add("error");
        erroR[0].style.display = "block";
        if(username.value === ""){
            dpass[0].classList.remove("error");
            erroR[0].innerHTML = "Please add your " + (username.type === "email" ? "email" : "username");
        } else {
            erroR[0].innerHTML = username.type === "email" ? "Valid email required" : "Username must contain only letters";
        }
    }
}



function isValidPassword(password) {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
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
        dpass[1].classList.remove("error");
        erroR[1].style.display = "none";
    } else {
        dpass[1].classList.add("error");
        erroR[1].style.display = "block";
        errors.forEach((error, index) => {
            if(password.value === ""){
                dpass[1].classList.remove("error");
                erroR[1].innerHTML = "Please add your password";
            } else if(password.value.length < 6){
                erroR[1].innerHTML = "Password must be at least 6 characters long";
            } else if(password.value.match(/[a-z]/) === null && password.value.match(/[A-Z]/) === null){
                erroR[1].innerHTML = "Password must contain at least one uppercase letter and one lowercase letter";
            } else if(password.value.match(/[0-9]/g) === null){
                erroR[1].innerHTML = "Password must contain at least one digit";
            } else if(password.value.match(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g) === null){
                erroR[1].innerHTML = "Password must contain at least one special character";
            } else{
                erroR[1].innerHTML = error;
            }
        }); 
    }

}

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const usernameValue = username.value;
    const passwordValue = password.value;

    fetch('/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usernameOrEmail: usernameValue, password: passwordValue }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        } 

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
            return response.json();
        } else if (contentType && contentType.indexOf('text/html') !== -1) {
            return response.text();
        } else {
            throw new Error('Invalid content type');
        }
    })
    .then(data => {
        // Handle the response data here
        //console.log(data);
        document.getElementById("myModal").style.display = "block";
        window.location.href = '/';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});


i[0].onclick = () => {
        if (username.type !== "text") {
            i[0].className = "fa-solid fa-user";
            username.type = "text";
            usn.innerHTML = "Username";
        } else {
            i[0].className = "fa-solid fa-at";
            username.type = "email";
            usn.innerHTML = "Email address";
        }
    }

i[1].onclick = () => {
    if (password.type === "password") {
      i[1].className ="fa-solid fa-eye";
      password.type = "text";
    } else{
      i[1].className ="fa-solid fa-eye-slash";
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