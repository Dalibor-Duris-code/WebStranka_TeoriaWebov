const api = {
    key: "2e6b799d0a79abfffcf270094fe72469",
    base: "http://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);


function setQuery(evt) {
    if (evt.keyCode == 13){
        getResults(searchbox.value);
    }
}

function getResults(querry) {
    fetch(`${api.base}weather?q=${querry}&exclude=daily&lang=sk&lang=en&units=metric&APPID=${api.key}`,)
    .then(weather => weather.json())
    .then(weather => {
      localStorage.setItem(weather.name, JSON.stringify(weather));     
      return weather;
    })
    .then(displayResults)
}

function displayResults(weather){
    console.log(weather);
    let city = document.querySelector('.Poloha .Mesto');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    
    let now = new Date();
    let date = document.querySelector('.Den');
    date.innerText = dateBuilder(now);

    let time = document.querySelector('.Cas');
    time.innerText = timeBuilder(now);

    let temp = document.querySelector('.Current .Teplota');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
    //let weather_el = document.querySelector('.Current .Pocasie');
    //weather_el.innerText = weather.weather[0].main;

    let ikona = document.querySelector(".Current .Icon");
    ikona.src = "https://openweathermap.org/img/wn/" + weather.weather[0].icon + ".png";

    let hilow = document.querySelector('.Current .Naj-Min');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;

    let sunset = document.querySelector('.Current .Pocit');
    sunset.innerText = `Pocitová teplota: ${Math.round(weather.main.feels_like)}°C`;

    let vetor = document.querySelector('.Current .vetor');
    vetor.innerText = `Rýchlosť vetra: ${Math.round(weather.wind.speed)}m/s`;

    let aktual = document.querySelector('.Current .Aktualna');
    aktual.innerText = weather.weather[0].description;
}

function dateBuilder(d){
    let months = ["Január", "Február", "Marec", "April", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"];
    let days = ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} / ${date} / ${month} / ${year}`;
}
function timeBuilder(d){
    let hours = d.getHours();
    let minutes = d.getMinutes();

    return`${hours}:${minutes}`;
}