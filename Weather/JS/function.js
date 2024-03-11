const temp_span = document.querySelector('#media');
const speed_span = document.querySelector('#speed');
const direction_span = document.querySelector('#mdirection');
const description_span = document.querySelector('#mdescription');
const icon_img = document.querySelector('img');
const url = 'https://api.openweathermap.org/data/2.5/weather';
const icon_url = 'https://openweathermap.org/img/wn/';
const api_key = '82e7bcea18b2c736704157cde569588d';

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            document.querySelector('#lat').innerHTML = position.coords.latitude.toFixed(3) + ', ';
            document.querySelector('#lng').innerHTML = position.coords.longitude.toFixed(3);
            
            getWeather(position.coords.latitude, position.coords.longitude);
        }, (error) => {
            console.error('Error getting location:', error);
        });
    } else {
        alert("Your browser does not support geolocation");
    }
};

const getWeather = (lat, lng) => {
    const address = `${url}?lat=${lat}&lon=${lng}&units=metric&appid=${api_key}`;
    axios.get(address)
        .then(response => {
            const json = response.data;
            temp_span.innerHTML = json.main.temp + '&#8451;';
            speed_span.innerHTML = json.wind.speed + 'm/s';
            direction_span.innerHTML = json.wind.deg + '&#176;';
            const iconImage = `${icon_url}${json.weather[0].icon}@2x.png`;
            icon_img.src = iconImage;
            description_span.innerHTML = json.weather[0].description;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data');
        });
};

getLocation();
