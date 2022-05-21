# Weather-Dashboard

## Description

This project was created to show the user the weather outlook for multiple cities so that they can plan a trip accordingly. This is done by fulfilling the following requirements:
* When the start button is clicked, the timer starts and the first question is shown.
* When the user searches for a city, they are presented with current and future conditions for that city and it is added to the search history.
* When the user views the current weather conditions for a city, they are presented with the city name, the date, an icon representation of the weather conditions, the temperature, the humidity, the wind speed, and the UV index.
* When the user views the UV index, they are presented with a color that tells them if the conditions are favorable, moderate, or severe.
* When the user views future weather conditions for a city, they are presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity.
* When the user clicks on a city in the search history, they are again presented with current and future conditions for that city (NOT MET).

Copy-pasted
The boilerplate HTML was created first for both the index and highscores pages. Then hard coded content (which would be removed later dynamically for the index page) was coded. The CSS styling sheets were both coded to reflect the colors/style of the VS code theme Night Owl. Each styling sheet is organized by where each element appears in the HTML code and is then organized by element and then by class.
## Table of Contents (Optional)
- [Installation](#installation)
- [Links](#links)
- [Usage](#usage)
- [Creation](#creation)
- [Credits](#credits)
- [License](#license)
- [Project-status](#project-status)

## Installation

The repository, Weather-Dashboard, was created and cloned from GitHub. An index.html file was created and coded to contain the site content (without any weather information displaying). A folder, assets, was created to house three folders, css, images, and js. The css folder contains the style sheet, style.css, which was created and coded to contain the site formatting and design. The images folder contains a screenshot of the live site, a screenshot of the mockup, and an additional folder, icons, for all of the weather icons. The js folder contains the script sheet, script.js, which was created and coded to allow the site to be dynamic.

## Links
- [GitHub Repository](https://github.com/amklenk/Weather-Dashboard)
- [GitHub Pages Site](https://amklenk.github.io/Weather-Dashboard/)

## Usage

Below is a screenshot of the live site, with three searched cities shown:
![Site screenshot]()

The site should be navigable via clicking the submit button and then each city button to see the current and 5-day forecast for each respective city.

## Creation
Each of the requirements were fulfilled:
* When the start button is clicked, the timer starts and the first question is shown.
* When the user searches for a city, they are presented with current and future conditions for that city and it is added to the search history.
* When the user views the current weather conditions for a city, they are presented with the city name, the date, an icon representation of the weather conditions, the temperature, the humidity, the wind speed, and the UV index.
* When the user views the UV index, they are presented with a color that tells them if the conditions are favorable, moderate, or severe.
* When the user views future weather conditions for a city, they are presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity.
* When the user clicks on a city in the search history, they are again presented with current and future conditions for that city.

Once the repository was stored locally, the html, css, and js files were created in their respective folders.


Plan:

1. Create WireBoard -Done on Figma
2. Create basic HTML and what will be dynamic - Done
3. Code CSS - Done
   4.Comment out dynamic to save information but not show on page
4. JS
- fetch api DONE
- Submission handler DONE
- display function for main box and cards
  - city name (from first api) and date (moment) icon?
- local storage
