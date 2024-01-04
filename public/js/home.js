$(document).ready(function(){
    $(".fa-house").click(function(){
        $(".nav i").replaceWith('<img src="/images/img_avatar.png" width="32" height="32" alt="FeetBook Logo">');
        $("#home").show();
        $("#chat-page").hide();
        $("#explore-page").hide();
        $("main").show();
        $("nav").show();
        $(".hero").show();
        $("footer").show();
        $("#settings-page").hide();
    });

    $(".fa-magnifying-glass").click(function(){
        $("#explore-page").show();
        $("#home").hide();
        $(".hero").hide();
        $("#chat-page").hide();
        $("#settings-page").hide();
    });

    $(".fa-comment").click(function(){
        $("#chat-page").show();
        $("#explore-page").hide();
        $("#home").hide();
        $(".hero").hide();
        $("#settings-page").hide();
    });

    $(".fa-gear").click(function(){
        $(".nav img").replaceWith('<i class="fa-solid fa-chevron-left"></i>');
        $("#explore-page").hide();
        $("#home").hide();
        $("#settings-page").show();
        $(".settings-content").addClass("settings-slide-up");
        $(".hero").hide();
        $("#chat-page").hide();
    });

    $(".nav").on('click', 'i', function(){
        $(".nav i").replaceWith('<img src="/images/img_avatar.png" width="32" height="32" alt="FeetBook Logo">');
        $("#home").show();
        $("#settings-page").hide();
        $("nav").show();
        $(".hero").show();
    });

    $(".fa-solid").click(function(){
        $(".fa-solid").removeClass("active");
        $(this).addClass("active");
    });
});
var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();

// Function to update the time
function updateTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    const greetingElement = document.querySelector('.hero-text h2');

    let greeting;
    if (hours < 12) {
        greeting = 'Good Morning!';
    } else if (hours < 18) {
        greeting = 'Good Afternoon!';
    } else {
        greeting = 'Good Evening!';
    }

    greetingElement.textContent = greeting;

    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12;
    // Convert '0' to '12'
    hours = hours ? hours : 12;

    // Format time as 2-digit numbers
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Display the time
    document.getElementById('clock').textContent = hours + ":" + minutes + ":" + seconds + " " + ampm;
}

// Function to update the countdown
function updateCountdown() {
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in an element with id="countdown"
    document.getElementById("countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerHTML = "EXPIRED";
    }
}

// Update the time and countdown immediately, then update them every second
updateTime();
updateCountdown();
setInterval(updateTime, 1000);
var countdownInterval = setInterval(updateCountdown, 1000);

// JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const w_input = document.querySelector("#weatherinput");
    let weatherInterval;

    w_input.addEventListener('input', function() {
        const apiKey = 'a235c7c68e5b0e456d4d5dce005cadf8'; // Replace with your API key
        const city = w_input.value.toUpperCase();

        // Clear the previous interval if there is one
        if (weatherInterval) {
            clearInterval(weatherInterval);
        }

        // Set up a new interval to fetch weather data every 5 minutes
        weatherInterval = setInterval(fetchWeather, 5 * 60 * 1000);

        // Fetch the weather data immediately
        fetchWeather();

        function fetchWeather() {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    displayWeather(data);
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                });
        }

        // JavaScript
        function displayWeather(data) {
            const weatherContainer = document.getElementById('weather-info');

            const temperature = data.main.temp;
            const temperatureFahrenheit = temperature * 9/5 + 32;
            const description = data.weather[0].description;
            const icon = data.weather[0].icon; // Get the icon code from the API
            const country = data.sys.country;

            // Get the current date and time
            const now = new Date();
            const date = now.toLocaleDateString();
            const time = now.toLocaleTimeString();

            let weatherHTML = '';
            if (w_input.value.trim() !== '') {
                weatherHTML = `
                    <p>City: ${city}, ${country}</p>
                    <!--<p>Date: ${date}, Time: ${time}</p>-->
                    <p style="margin-bottom: 0;">Temperature: ${temperature}°C or ${temperatureFahrenheit.toFixed(2)}°F</p>
                    <div style="display: flex; justify-content: flex-start; align-items: center;"
                    <p>Description: ${description}</p>
                    <img src="http://openweathermap.org/img/w/${icon}.png" alt="${description}"> 
                    </div>
                `;
            }

            weatherContainer.innerHTML = weatherHTML;
        }
    });
});