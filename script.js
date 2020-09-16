const WeatherKey = config.WEATHERK;
document.getElementById("run").addEventListener("click", function () {

    getWeatherData();

})

function getWeatherData() {
    let input = document.getElementById('CityName').value;
    console.log(input);


    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + input + '&units=metric&appid=' + WeatherKey)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            document.getElementById('cityDisplay').innerHTML = data.city.name; //shows correct city in text

            let temp1 = data.list[0].main.temp; //gets data from today at 3pm
            console.log(temp1)
            //need to find out how to get the data of each day, dt_txt shows the date and time.
            //each day has several time slots divided by every three hours.
            //shows in celcius at least.
        })

}

