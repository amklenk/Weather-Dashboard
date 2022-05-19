//global variables (selected containers and moment current date);
var userFormEl = document.querySelector("#weather-form");
var userInputEl = document.querySelector("#city-name");
var searchBtnEl = document.querySelector("#search-btn");
var cityDivEl = document.querySelector("#city-list");
var weatherDivEl = document.querySelector("#weather-div");
var m = moment().format('L');

//functions
//function that handles user submission and calls on lat/lon api
var formSubmitHandler = function (event) {
    event.preventDefault();
    // get value from input element
    var cityName = userInputEl.value.trim();
    if (cityName) {
        inputCity(cityName);
        var city = cityName;
        userInputEl.value = "";
    } else {
        alert("Please enter a city name.");
    }
};
userFormEl.addEventListener("submit", formSubmitHandler);

//function that fetches from api to get lat and lon from city name
var inputCity = function (city) {
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=eb850d2c4486fceb7521b3ec8f51fc59"
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    var lat = data[0].lat;
                    var lon = data[0].lon;
                    getWeatherInfo(lat, lon, city);
                });
            } else {
                alert("Error: City Not Found");
            }
        })
        .catch(function (error) {
            alert("Unable to connect to OpenWeather");
        });
};

//function that displays current weather using info from inputCity and current weather api
var getWeatherInfo = function (lat, lon, city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=eb850d2c4486fceb7521b3ec8f51fc59";
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                //    var icon = data.current.weather.icon;
                //    console.log(icon);
                var temp = data.current.temp;
                var wind = data.current.wind_speed;
                var humid = data.current.humidity;
                var uvi = data.current.uvi;
                var dailyForecast = data.daily;
                displayWeather(city, temp, wind, humid, uvi, dailyForecast);
            });
        } else {
            alert("Error: Data Not Found");
        }
    })
        .catch(function (error) {
            alert("Unable to connect to OpenWeather");
        });
};

var displayWeather = function (city, temp, wind, humid, uvi, dailyForecast) {
    weatherDivEl.innerHTML = "";

    var titleDivEl = document.createElement("div");
    titleDivEl.setAttribute("class", "card forecast col-12");
    weatherDivEl.append(titleDivEl);

    var weatherTitle = document.createElement("h3");
    weatherTitle.setAttribute("class", "card-header today-date");
    weatherTitle.textContent = city + " (" + m + ")";
    titleDivEl.append(weatherTitle);

    var weatherInfoDivEl = document.createElement("div");
    weatherInfoDivEl.setAttribute("class", "card-body");
    titleDivEl.appendChild(weatherInfoDivEl);

    //(Kelvin − 273.15) × 9/5 + 32
    var temp = Math.floor((parseInt(temp) - 273.15) * (9 / 5) + 32);
    var infoArray = ["Temp: " + temp + "°F", "Wind: " + wind + " MPH", "Humidity: " + humid + " %", "UV Index: " + uvi];
    for (var i = 0; i < infoArray.length; i++) {
        var infoItem = document.createElement("p");
        infoItem.setAttribute("class", "card-text");
        infoItem.innerHTML = infoArray[i]; //thought about adding span here just around variable, but not sure how to do that
        weatherInfoDivEl.appendChild(infoItem);
        //    if (parseInt(uvi) < 3) {

        //    }
    }

    var fiveDayHeaderDivEl = document.createElement("div");
    fiveDayHeaderDivEl.setAttribute("class", "col-12 mt-20");
    fiveDayHeaderDivEl.innerHTML = "<h4 class='five-day-header'>Five-Day Forecast:</h4>"
    weatherDivEl.appendChild(fiveDayHeaderDivEl);

    for (var i = 1; i< dailyForecast.length - 2; i++){
        var cardDivEl = document.createElement("div");
        cardDivEl.setAttribute("class", "card col-2");
        weatherDivEl.appendChild(cardDivEl);

        var forecastDate = document.createElement("h4");
        forecastDate.setAttribute("class", "card-header");
        forecastDate.textContent = "Date Plus" + [i];
        // var newM = moment().format('L').add([i], "days");
        // console.log(newM);
        cardDivEl.append(forecastDate);

        var forecastInfoDiv = document.createElement("div");
        forecastInfoDiv.setAttribute("class", "card-body");
        cardDivEl.appendChild(forecastInfoDiv);
        
        var tempF = Math.floor((parseInt(dailyForecast[i].temp.day) - 273.15) * (9 / 5) + 32);
        var windF = dailyForecast[i].wind_speed;
        var humidF = dailyForecast[i].humidity;
        var infoArrayForecast = ["Temp: " + tempF + "°F", "Wind: " + windF + " MPH", "Humidity: " + humidF + " %"];
        console.log(infoArrayForecast);
        for (var j = 0; j < infoArrayForecast.length; j++) {
            var infoItemForecast = document.createElement("p");
            infoItemForecast.setAttribute("class", "card-text");
            infoItemForecast.innerHTML = infoArrayForecast[j];
            forecastInfoDiv.appendChild(infoItemForecast);
    }
};
}