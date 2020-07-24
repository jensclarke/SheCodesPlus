//⏰Feature #1
//In your project, display the current date and time using
//JavaScript: Tuesday 16:00
let now = new Date();

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
if (minutes < 10) {
  let h3 = document.querySelector("#today-date");
  h3.innerHTML = `${day} ${hours}:0${minutes}`;
} else {
  let h3 = document.querySelector("#today-date");
  h3.innerHTML = `${day} ${hours}:${minutes}`;
}

//🕵️‍♀️Feature #2
//Add a search engine, when searching for a city (i.e. Paris),
//display the city name on the page after the user submits the
//form.

function displayWeather(response) {
  console.log(response.data);
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let temperatureNow = document.querySelector("#today-temperature");
  temperatureNow.innerHTML = `${temperature}°C`;
}
function handleSubmit(event) {
  event.preventDefault();
  let input = document.querySelector("#search-field");
  let city = input.value;
  console.log(city);
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${city}`;
  let apiKey = "1237a76339639c809c46007ab0cd8b59";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

//🙀Bonus Feature
//Display a fake temperature (i.e 17) in Celsius and add a
//link to convert it to Fahrenheit. When clicking on it,
//it should convert the temperature to Fahrenheit.
//When clicking on Celsius, it should convert it back to
//Celsius.

let celsius = 25;
let fahrenheit = 77;

function celsiusFormat(event) {
  event.preventDefault();
  let celsius = 25;
  let tempFormat = document.querySelector("#today-temperature");
  tempFormat.innerHTML = `${celsius}°C`;
  let celsiusLink = document.querySelector("#celsius");
  celsiusLink.innerHTML = `<strong>°C </strong>`;
  let fahrenheitLink = document.querySelector("#fahrenheit");
  fahrenheitLink.innerHTML = ` °F`;
}

let temperatureCelsius = document.querySelector("#celsius");
temperatureCelsius.addEventListener("click", celsiusFormat);

function fahrenheitFormat(event) {
  let fahrenheit = 77;
  event.preventDefault();
  let tempFormat = document.querySelector("#today-temperature");
  tempFormat.innerHTML = `${fahrenheit}°F`;
  let celsiusLink = document.querySelector("#celsius");
  celsiusLink.innerHTML = `°C `;
  let fahrenheitLink = document.querySelector("#fahrenheit");
  fahrenheitLink.innerHTML = `<strong> °F</strong>`;
}

let temperatureFahrenheit = document.querySelector("#fahrenheit");
temperatureFahrenheit.addEventListener("click", fahrenheitFormat);

//Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display
//and the city and current temperature using the OpenWeather API.

function displayCurrentWeather(response) {
  console.log(response.data);
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let temperatureNow = document.querySelector("#today-temperature");
  let currentLocation = response.data.name;
  let currentLocationNow = document.querySelector("h2");
  currentLocationNow.innerHTML = `${currentLocation}`;
  temperatureNow.innerHTML = `${temperature}°C`;
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "1237a76339639c809c46007ab0cd8b59";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentLocationSubmit = document.querySelector("#header-currentcity");
currentLocationSubmit.addEventListener("click", displayCurrentLocation);
