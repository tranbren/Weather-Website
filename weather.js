const apiKey = "af68708a159a8a2a3210c8030b11de3b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.getElementById("searchButton");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    console.log(data);

    if (data.cod && data.cod !== 200) {
        alert("City not found. Please Enter a Valid City Name.");
        return;
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°F";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerhtml = data.wind.speed + "km/h";

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
        document.querySelector(".card").style.background = "linear-gradient(135deg, #989894, #444740)";
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
        document.querySelector(".card").style.background = "linear-gradient(135deg, #cfd249, #949529)";
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
        document.querySelector(".card").style.background = "linear-gradient(135deg, #392eb1, #1e3fd3)";
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
        document.querySelector(".card").style.background = "llinear-gradient(135deg, #39ded8, #2484ae)";
    } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
        document.querySelector(".card").style.background = "linear-gradient(135deg, #5dcbb3, #f0f1ed)";
    } else if (data.weather[0].main == "Snow") {
        weatherIcon.src = "images/snow.png";
        document.querySelector(".card").style.background = "linear-gradient(135deg, #b8dee2, #7ccbdf)";
    }

    document.querySelector(".weather").style.display = "block";
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

function updateDateTime() {
    const currentDateElement = document.getElementById("current-date");
    const currentTimeElement = document.getElementById("current-time");

    const currentDate = new Date();
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    currentDateElement.textContent = currentDate.toLocaleDateString(undefined, options);

    const currentTime = currentDate.toLocaleTimeString();
    currentTimeElement.textContent = currentTime;
}

updateDateTime();
setInterval(updateDateTime, 1000);
