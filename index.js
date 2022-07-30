const weatherApi = {
  key: "7ecaae129c2d5a81eddc83bc6b7198f5",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};
const searchInputBox = document.getElementById("search-bar");
const button = document.getElementById("btn");

// Event listener function on keypress
button.addEventListener("click", () => {
  getWeatherReport(searchInputBox.value);
});
searchInputBox.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    getWeatherReport(searchInputBox.value);
  }
});

// Get weather report

function getWeatherReport(city) {
  fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeatherReport);
}

// show weather Report
function showWeatherReport(weather) {
  console.log(weather);

  let city = document.getElementById("city");
  city.innerText = `${weather.name},${weather.sys.country}`;

  let temperature = document.getElementById("temp");
  temperature.innerHTML = `${Math.round(weather.main.temp - 273.15)}&deg;c`;

  let discription = document.getElementById("discription");
  discription.innerText = `${weather.weather[0].main}`;

  let min_max = document.getElementById("min-max");
  min_max.innerHTML = `${Math.floor(
    weather.main.temp_max - 273.15
  )}&deg;c (max) /${Math.floor(weather.main.temp_min - 273.15)}&deg;c (min)`;

  let humidity = document.getElementById("humidity");
  humidity.innerText = `Humidity:${weather.main.humidity}%`;

  let wind_speed = document.getElementById("wind");
  wind_speed.innerText = `wind-speed:${Math.floor(
    weather.wind.speed * 3.6
  )}km/hr`;

  const icon = document.querySelector('#icon');
    icon.setAttribute('src', `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`)

    document.body.style.backgroundImage ="url('https://source.unsplash.com/1900x1000/? " + weather.main.name +  "')";
 
}
