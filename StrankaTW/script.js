const api = {
    key: "2e6b799d0a79abfffcf270094fe72469",
    base: "http://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13){
        getResults(searchbox.value);
        console.log(searchbox.value);
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
}