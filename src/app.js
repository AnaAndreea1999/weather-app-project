function displayTemperature(response){
    console.log(response.data);
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