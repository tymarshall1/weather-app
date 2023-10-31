const addTodayCard = (weatherData) => {
  const weatherContainer = document.querySelector(".today-forcast");

  console.log(weatherData);
  const weatherCardToday = document.createElement("div");
  weatherCardToday.classList.add("weather-card-today");

  const conditionContainer = document.createElement("div");
  conditionContainer.classList.add("condition-container");

  const condition = document.createElement("h1");
  condition.textContent = weatherData.current.condition.text;

  const conditionImg = document.createElement("img");
  conditionImg.src = weatherData.current.condition.icon;

  const city = document.createElement("h4");
  city.textContent = weatherData.location.name;

  const date = document.createElement("h4");
  const dateObj = new Date(weatherData.location.localtime);
  date.textContent = `${
    dateObj.getMonth() + 1
  }/${dateObj.getDate()}/${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;

  const temp = document.createElement("h3");
  temp.textContent = `${weatherData.current.temp_f}F`;

  conditionContainer.appendChild(condition);
  conditionContainer.appendChild(conditionImg);

  weatherCardToday.appendChild(conditionContainer);
  weatherCardToday.appendChild(city);
  weatherCardToday.appendChild(date);
  weatherCardToday.appendChild(temp);

  weatherContainer.appendChild(weatherCardToday);
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

getWeatherDataForCity("Bear DE").then((data) => addTodayCard(data));
