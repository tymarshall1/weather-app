const addTodayCard = (weatherData) => {
  const dateObj = new Date(weatherData.location.localtime);
  console.log(weatherData);

  document.getElementById("condition").textContent =
    weatherData.current.condition.text;

  document.getElementById("conditionImg").src =
    weatherData.current.condition.icon;

  document.getElementById("city").textContent = weatherData.location.name;

  document.getElementById("date").textContent = `${
    dateObj.getMonth() + 1
  }/${dateObj.getDate()}/${dateObj.getFullYear()}`;

  document.getElementById(
    "time"
  ).textContent = `${dateObj.getHours()}:${dateObj.getMinutes()}`;

  document.getElementById(
    "temp"
  ).textContent = `${weatherData.current.temp_f}F`;

  document.getElementById(
    "feelsLike"
  ).textContent = `${weatherData.current.feelslike_f} F`;

  document.getElementById(
    "humidity"
  ).textContent = `${weatherData.current.humidity} %`;

  document.getElementById("RainChance").textContent = "x";

  document.getElementById(
    "WindSpeed"
  ).textContent = `${weatherData.current.wind_mph} mph`;
};

const weekCard = () => {};

const addWeekCards = () => {};

async function getWeatherDataForCity(city) {
  const key = "5f00a6e30df84fa4961200459233110";
  const url = `http://api.weatherapi.com/v1/current.json?q=${city}&key=${key}`;
  const response = await fetch(url);
  const weatherJson = await response.json();
  return weatherJson;
}

getWeatherDataForCity("england").then((data) => addTodayCard(data));
