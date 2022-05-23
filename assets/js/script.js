//global variables (selected containers and moment current date);
var userFormEl = document.querySelector("#weather-form");
var userInputEl = document.querySelector("#city-name");
var searchBtnEl = document.querySelector("#search-btn");
var cityDivEl = document.querySelector("#city-list");
var weatherDivEl = document.querySelector("#weather-div");
var m = moment().format('L');
var cityButtonEl;

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
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=eb850d2c4486fceb7521b3ec8f51fc59"
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

//function that uses the latitude and longitude to obtain the current data and 5-day forecast data
var getWeatherInfo = function (lat, lon, city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=eb850d2c4486fceb7521b3ec8f51fc59";
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
               var icon = data.current.weather[0].icon;
                var temp = data.current.temp;
                var wind = data.current.wind_speed;
                var humid = data.current.humidity;
                var uvi = data.current.uvi;
                var dailyForecast = data.daily;
                displayWeather(city, icon, temp, wind, humid, uvi, dailyForecast);
            });
        } else {
            alert("Error: Data Not Found");
        }
    })
        .catch(function (error) {
            alert("Unable to connect to OpenWeather");
        });
};

//function that renders the current weather and 5-day forecast
var displayWeather = function (city, icon, temp, wind, humid, uvi, dailyForecast) {
    weatherDivEl.innerHTML = "";

    cityButtonRepeatEl = document.getElementById(city);
    if (!cityButtonRepeatEl){
    cityButtonEl = document.createElement("button");
    cityButtonEl.setAttribute("class", "city-btn");
    cityButtonEl.setAttribute("id", city);
    cityButtonEl.textContent = city;
    cityDivEl.appendChild(cityButtonEl);
    saveCity(city);
};

    var titleDivEl = document.createElement("div");
    titleDivEl.setAttribute("class", "card forecast col-12");
    weatherDivEl.append(titleDivEl);

    var weatherTitle = document.createElement("h3");
    weatherTitle.setAttribute("class", "card-header card-head-back today-date");
    weatherTitle.innerHTML = city + " (" + m + ")" + " <img class = 'icon-image' src = './assets/images/icons/" + icon + ".png' >";
    titleDivEl.append(weatherTitle);

    var weatherInfoDivEl = document.createElement("div");
    weatherInfoDivEl.setAttribute("class", "card-body");
    titleDivEl.appendChild(weatherInfoDivEl);

    //(Kelvin − 273.15) × 9/5 + 32
    var temp = Math.floor((parseInt(temp) - 273.15) * (9 / 5) + 32);
    var infoArray = ["Temp: " + temp + "°F", "Wind: " + wind + " MPH", "Humidity: " + humid + " %"];
    for (var i = 0; i < infoArray.length; i++) {
        var infoItem = document.createElement("p");
        infoItem.setAttribute("class", "card-text");
        infoItem.innerHTML = infoArray[i];
        weatherInfoDivEl.appendChild(infoItem);
    }
    var infoItemUV = document.createElement("p");
    infoItemUV.innerHTML = "UV Index: " + "<span>" + uvi + "</span>";
    infoItemUV.setAttribute("class", "card-text");
    weatherInfoDivEl.appendChild(infoItemUV);
    var spanUV = document.querySelector("span");
    //these don't work all of the time, not sure why
    if (uvi < "3") {
        spanUV.setAttribute("id", "low-uv");
    } else if (uvi >= "3" && uvi <= "5"){
        spanUV.setAttribute("id", "mod-uv");
    } else if (uvi >= "6" && uvi <= "7") {
        spanUV.setAttribute("id", "high-uv");
    } else if (uvi >= "8" && uvi <= "10"){
        spanUV.setAttribute("id", "vhigh-uv");
    } else if (uvi >= "11"){
        spanUV.setAttribute("id", "extreme-uv");
    };

    var fiveDayHeaderDivEl = document.createElement("div");
    fiveDayHeaderDivEl.setAttribute("class", "col-12 mt-20");
    fiveDayHeaderDivEl.innerHTML = "<h4 class='five-day-header'>Five-Day Forecast:</h4>"
    weatherDivEl.appendChild(fiveDayHeaderDivEl);

    for (var i = 1; i< dailyForecast.length - 2; i++){
        var cardDivEl = document.createElement("div");
        cardDivEl.setAttribute("class", "card col-sm-12 col-lg-2 mb-2");
        weatherDivEl.appendChild(cardDivEl);

        var forecastDate = document.createElement("h4");
        forecastDate.setAttribute("class", "card-header card-head-back forecast-head px-auto");
        var newM = moment().add([i], "d").format('L');
        forecastDate.textContent = newM;
        cardDivEl.append(forecastDate);

        var forecastInfoDiv = document.createElement("div");
        forecastInfoDiv.setAttribute("class", "card-body");
        cardDivEl.appendChild(forecastInfoDiv);

        var iconF = dailyForecast[i].weather[0].icon;
        var forecastImg = document.createElement("img");
        forecastImg.setAttribute("class", "icon-image");
        forecastImg.setAttribute("src", "./assets/images/icons/" + iconF + ".png");
        forecastInfoDiv.append(forecastImg);

        var tempF = Math.floor((parseInt(dailyForecast[i].temp.day) - 273.15) * (9 / 5) + 32);
        var windF = dailyForecast[i].wind_speed;
        var humidF = dailyForecast[i].humidity;
        var infoArrayForecast = ["Temp: " + tempF + "°F", "Wind: " + windF + " MPH", "Humidity: " + humidF + " %"];
        for (var j = 0; j < infoArrayForecast.length; j++) {
            var infoItemForecast = document.createElement("p");
            infoItemForecast.setAttribute("class", "card-text");
            infoItemForecast.innerHTML = infoArrayForecast[j];
            forecastInfoDiv.appendChild(infoItemForecast);
    }
};
};

//function that saves the city names to an array in local storage
var saveCity = function (city) {
var cityArray= JSON.parse(window.localStorage.getItem("cityArray")) || [];
var cityName = city;
if (!cityArray.includes(cityName)){
 cityArray.push(cityName);
}
localStorage.setItem("cityArray", JSON.stringify(cityArray));
};

//the function that takes the array out of local storage and calls on the inputCity function to render the city buttons and weather
var loadCity = function () {
    cityDivEl.innerHTML = " ";
    var savedCities = JSON.parse(localStorage.getItem("cityArray")) || [];
    for (var i = 0; i < savedCities.length; i++) {
        inputCity(savedCities[i])
};
};
loadCity();

//click event that takes the name from the city button and feeds that name through the inputCity function
//had to use jQuery here to target each button
$("body").on("click",".city-btn", function(){
    console.log("click!");
    var buttonText = $(this).text();
    console.log(buttonText);
    inputCity(buttonText);
});
