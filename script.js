const WeatherKey = config.WEATHERK;
document.getElementById("run").addEventListener("click", function () {

    getWeatherData();

})

function getWeatherData() {
     let input = document.getElementById('CityName').value;
     console.log(input);
     document.getElementById('cityDisplay').innerHTML = input;

    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' +input + '&units=metric&appid=' +WeatherKey)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
}

