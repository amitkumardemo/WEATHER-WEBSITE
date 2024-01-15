//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


const weatherApi = {
    key: "efa592e72fb75ab15937095c3f09e3bc",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

const searchInputBox = document.getElementById('input-box');

// Event Listener Function on keypress
searchInputBox.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);

    }
});

// Get Weather Report 
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => {
            return weather.json();
        })
        .then(showWeatherReport);

}


// Show Weather Report 
function showWeatherReport(weather) {
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.floor(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if (weatherType.textContent == 'clear') {
        document.body.style.backgroundImage = "url('images/Free-Download-Weather-Wallpaper.jpg')";
    } else if (weatherType.textContent == 'cloudy') {
        document.body.style.backgroundImage = "url('images/weather-checking.jpg')";
    } else if (weatherType.textContent == 'windy') {
        document.body.style.backgroundImage = "url('images/Windy-weather.jpg')";
    } else if (weatherType.textContent == 'haze') {
        document.body.style.backgroundImage = "url('images/8juvAu0.jpg')";
    } else if (weatherType.textContent == 'rain') {
        document.body.style.backgroundImage = "url('images/Why-It’s-Important-to-Save-for-a-Rainy-Day.jpg')";
    }
    

//Date Manage 
function dateManage(dateArg) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    
    // Corrected from getDate() to getDay()

    return `${date} ${month} (${day}), ${year}`;
}
}
