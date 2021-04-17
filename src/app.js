let now = new Date();
let months=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let month = months[now.getMonth()];
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day=days[now.getDay()];
let date=now.getDate();
let hour = now.getHours ();
if ( hour<10) {
  hours = `0${hour}`
}
let minutes=now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`
}
let currentDate=document.querySelector("#date");
currentDate.innerHTML=`${day}, ${month} ${date} , ${hour}:${minutes}`

function formatForecastDate (timestamp) {
  let forecastDate = new Date (timestamp * 1000);
  let day = forecastDate.getDay ();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[day];
}

function displayTemperature(response){
    let temperatureElement=document.querySelector("#current-temp");
    let cityElement=document.querySelector("#city");
    let descriptionElement=document.querySelector("#description")
    let humidityElement=document.querySelector("#humidity");
    let windElement=document.querySelector("#wind");
    let feelsLikeElement=document.querySelector("#real-feel");
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    cityElement.innerHTML=response.data.name;
    descriptionElement.innerHTML=response.data.weather[0].description;
humidityElement.innerHTML=response.data.main.humidity;
windElement.innerHTML=Math.round( response.data.wind.speed);
feelsLikeElement.innerHTML=Math.round( response.data.main.feels_like);
}
let apiKey="28b27ebaad82f0c7bf800ff3fcd47399";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=Galati&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);