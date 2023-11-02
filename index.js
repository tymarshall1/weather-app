const addTodayCard = (weatherData) => {
  const dateObj = new Date(weatherData.location.localtime);

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
  ).textContent = `${weatherData.current.temp_f} °F `;

  document.getElementById(
    "feelsLike"
  ).textContent = `${weatherData.current.feelslike_f} °F`;

  document.getElementById(
    "humidity"
  ).textContent = `${weatherData.current.humidity} %`;

  document.getElementById(
    "RainChance"
  ).textContent = `${weatherData.forecast.forecastday[0].day.daily_chance_of_rain} %`;

  document.getElementById(
    "WindSpeed"
  ).textContent = `${weatherData.current.wind_mph} mph`;
};

const weekCard = (weatherData) => {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const card = document.createElement("div");
  card.classList.add("weather-card");

  const day = document.createElement("h2");
  const parts = weatherData.date.split("-");
  const formattedDate = `20${parts[0]}-${parts[1]}-${parts[2]}`;
  const dateObject = new Date(formattedDate);
  day.textContent = weekdays[dateObject.getDay()];

  const tempHigh = document.createElement("h1");
  tempHigh.textContent = `${weatherData.day.maxtemp_f} °F`;

  const tempLow = document.createElement("h4");
  tempLow.textContent = `${weatherData.day.mintemp_f} °F`;

  const icon = document.createElement("img");
  icon.src = weatherData.day.condition.icon;

  card.appendChild(day);
  card.appendChild(tempHigh);
  card.appendChild(tempLow);
  card.appendChild(icon);
  return card;
};

const addWeekCards = (forcastArray) => {
  const weeklyForcastContainer = document.querySelector(
    ".weekly-forcast-container"
  );
  forcastArray.forEach((day) =>
    weeklyForcastContainer.appendChild(weekCard(day))
  );
};

async function getForcastForCity(city, daysOut) {
  const key = "5f00a6e30df84fa4961200459233110";
  const url = `http://api.weatherapi.com/v1/forecast.json?q=${city}&days=${daysOut}&key=${key}`;
  const response = await fetch(url);
  const weatherJson = await response.json();
  return weatherJson;
}

const populateDefaultData = () => {
  getForcastForCity("Bear, Delaware", 5).then((data) => {
    addTodayCard(data);
    addWeekCards(data.forecast.forecastday);
  });
};

const clearSearchError = () => {
  document.getElementById("error").textContent = "";
};

const handleSearchError = () => {
  document.getElementById("error").textContent =
    "Couldn't find City. Try something like <Buffalo, New York>, <Buffalo>, or <Zip Code>.";
};

const handleSearch = () => {
  clearSearchError();
  document.querySelector(".weekly-forcast-container").innerHTML = "";
  getForcastForCity(document.getElementById("cityInp").value, 5)
    .then((data) => {
      addTodayCard(data);
      addWeekCards(data.forecast.forecastday);
    })
    .catch(() => handleSearchError());
};

document
  .getElementById("searchIcon")
  .addEventListener("click", () => handleSearch());

document.getElementById("cityInp").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
});

populateDefaultData();
