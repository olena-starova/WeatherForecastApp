function formatDate(date) {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "Julay",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentMonth = months[now.getMonth()];
  let currentDate = now.getDate();
  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = now.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let present = document.querySelector("p");
  present.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}, ${currentHour}:${currentMinutes}`;

  return date;
}
formatDate();

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#actual-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#icon").innerHTML = response.data.weather[0].icon;
}

function searchCity(city) {
  let apiKey = "d5c0155cd147c2d7c821980db5dc591e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}
searchCity("Kharkiv");

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#actual-city").value;
  searchCity(city);
}

function showGeo(position) {
  let apiKey = "d5c0155cd147c2d7c821980db5dc591e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentGeo(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showGeo);
}

function showTempF(event) {
  event.preventDefault();
  let tempC = document.querySelector("#actual-temp").value;
  document.querySelector("#actual-temp").innerHTML = Math.round(
    (tempC * 1, 8) + 32
  );
}

function showTempC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#actual-temp");
  temperatureElement.innerHTML = Math.round("#actual-temp");
}

let form = document.querySelector("#city-name");
form.addEventListener("submit", submitCity);

let currentLocationButton = document.querySelector("#current");
currentLocationButton.addEventListener("click", getCurrentGeo);

let buttonF = document.querySelector("#fahrenheit");
buttonF.addEventListener("click", showTempF);

let buttonC = document.querySelector("#celsius");
buttonF.addEventListener("click", showTempC);
