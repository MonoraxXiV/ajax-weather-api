const WeatherKey = config.WEATHERK;
let dateNumber = 0;
let tempDay = 0;
let allReducedDates = [];
let arrayOfAverages = [];
let d = new Date();
let weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";


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

            let temp = data.list[0].main.temp; //gets data from today at 3pm
            //need to find out how to get the data of each day, dt_txt shows the date and time.
            //each day has several time slots divided by every three hours.
            //shows in celcius at least.

            let dataArray = data.list
            let day = 16;
            for (i = 0; i < dataArray.length; i++) {
                //somehow get the days
                let dateFull = data.list[i].dt_txt;
                //slicing the string of days to solely have the number of the day.
                var reducedDate = dateFull.slice(8, 10);
                console.log(reducedDate);
                //so we have day
                //saving reduced data into the array
                data.list[i].reducedDate = reducedDate;
                //putting the string into the array
                allReducedDates.push(reducedDate);


            }
            let setPlz = new Set(allReducedDates)
            console.log(setPlz);
            let compareNumber = [...setPlz]


            for (j = 0; j < compareNumber.length; j++) { //loops 6 times
                for (i = 0; i < dataArray.length; i++) { //loops 40 times
                    //if it notices recuded date= compare number it will log datenumber, to know how much it needs to divide through for averages.

                    if (data.list[i].reducedDate === compareNumber[j]) {

                        dateNumber++

                        tempDay += data.list[i].main.temp;
                        weatherDescription=data.list[i].weather[0].description;
                        document.getElementsByClassName("description")[j].innerHTML =weatherDescription;

                        console.log(weatherDescription)

                    }
                }


                tempDay = tempDay / dateNumber;
                //rounded this, because otherwise you get a lot of numbers after the .
                var roundedTempDay = Math.round(tempDay);
                arrayOfAverages.push(roundedTempDay);

                console.log(arrayOfAverages)
                //emptying numbers to avoid having it stack.
                dateNumber = 0;
                tempDay = 0;
                l = 0;


            }

            for (i = 0; i < arrayOfAverages.length; i++) {
                //shows 6 average temperatures, today+5 next days but vertically

                document.getElementsByClassName("Temperature")[i].innerHTML += arrayOfAverages[i]+"°C";
                //let dayNumber=dayOfWeek
                let dayOfWeek = weekday[4+i];
                document.getElementsByClassName("Day")[i].innerHTML=dayOfWeek;


            }
            //TODO 1: switch from integer time date to weekday
            //todo 2: pass data to forEach


        })

}


