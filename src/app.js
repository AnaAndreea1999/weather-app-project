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

function displayForecast(response){
      let forecastElem = document.querySelector("#forecast");
      let days=["Mon", "Tue","Wed","Thu","Fri","Sat"] 
      let forecastHTML=`<div class="row">`;
     
      days.forEach(function(day){
            forecastHTML=forecastHTML +  `
                <div class="col-2">
                  <div class="weather-forecast-date">${day}</div>
                  <img
                    src="http://openweathermap.org/img/wn/50d@2x.png"
                    alt=""
                    width="40px"
                  />
                  <div class="weather-forecast-temp">
                    <span class="weather-forecast-temp-max"> 18°</span>
                    <span class="weather-forecast-temp-min"> 12°</span>
                  </div>
                </div>
                `; 
      });
    

              forecastHTML=forecastHTML + `</div>`;
       forecastElem.innerHTML=forecastHTML;
  

}



function displayTemperature(response){
    let temperatureElement=document.querySelector("#current-temp");
    let cityElement=document.querySelector("#city");
    let descriptionElement=document.querySelector("#description")
    let humidityElement=document.querySelector("#humidity");
    let windElement=document.querySelector("#wind");
    let feelsLikeElement=document.querySelector("#real-feel");

        let iconElement=document.querySelector("#icon");
celsiusTemperature=response.data.main.temp;
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    cityElement.innerHTML=response.data.name;
    descriptionElement.innerHTML=response.data.weather[0].description;
    humidityElement.innerHTML=response.data.main.humidity;
    windElement.innerHTML=Math.round( response.data.wind.speed);
    feelsLikeElement.innerHTML=Math.round( response.data.main.feels_like);
    iconElement.setAttribute ("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

}
 function search(city){
              let apiKey="28b27ebaad82f0c7bf800ff3fcd47399";
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature); 
}

function handelSubmit(event ){
    event.preventDefault();
   let cityInputElement=document.querySelector("#city-input");    
   search(cityInputElement.value);
}

function displayFahrenheitTemperature(event){
    event.preventDefault();
    let fahrenheitTemperature=(celsiusTemperature * 9 / 5) + 32;
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement=document.querySelector("#current-temp")
    
    temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
    
}
function displayCelsiusTemperature(event){
        event.preventDefault();
        celsiusLink.classList.add("active");
        fahrenheitLink.classList.remove("active");
        temperatureElement=document.querySelector("#current-temp");
temperatureElement.innerHTML=Math.round(celsiusTemperature);
}


let celsiusTemperature=null;

let form=document.querySelector("#search-form");
form.addEventListener("submit", handelSubmit);

let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Basel");
displayForecast();