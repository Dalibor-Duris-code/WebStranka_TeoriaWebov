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
    fetch(`${api.base}weather?q=${querry}&units=metric&APPID=${api.key}`)
    .then(weather=> {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather){
    console.log(weather);
    let city = document.querySelector('.Poloha .Mesto');
    city.innerText = `${weather.name}, ${weather.sys.country}`;


    let now = new Date();
    let date = document.querySelector('.Poloha .Den');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.Current .Teplota');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  
    let weather_el = document.querySelector('.Current .Pocasie');
    weather_el.innerText = weather.weather[0].main;
  
    let hilow = document.querySelector('.Current .Naj-Min');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(d){
    let months = ["Január", "Február", "Marec", "April", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"];
    let days = ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
}