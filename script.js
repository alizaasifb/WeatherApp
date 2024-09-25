const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '07becc9f42msh181c0120f27da8ap185eb7jsn1275f180a162',
		'x-rapidapi-host': 'weather-data-api2.p.rapidapi.com'
	}
};

const cooroptions = {
    method: 'GET', 
    headers : {'X-Api-Key':'KsTd0L94udyLwdDNN/nTlA==0yaQxR8vRId48WHU'}
};

async function getCityCoordinates(city) { 
    const response = await fetch('https://api.api-ninjas.com/v1/geocoding?city=' + city, cooroptions);   
    const result = await response.json();
    const lat = result[0].latitude;
    const lon = result[0].longitude;
    console.log(lat, lon);
    return [lat, lon];
}

async function getData(city) {
    if (city != "") {
        city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    }

    cityName.innerHTML = city;
    citySearch.innerHTML = city;

    searchLink.href = "https://en.wikipedia.org/wiki/" + city;                                               
    const [lat, lon] = await getCityCoordinates(city);
    try {
        const response = await fetch('https://weather-data-api2.p.rapidapi.com/weatherData?latitude=' + lat + '&longitude=' + lon, options);
        const result = await response.json();
        console.log(result);
        temp.innerHTML = result.currentWeather.temperature
        windspeed.innerHTML = result.currentWeather.windspeed
        winddirection.innerHTML = result.currentWeather.winddirection

        const weatherImg = document.getElementById('weatherImg');
        const tempVal = result.currentWeather.temperature;
        if (tempVal < 10) {
            weatherImg.src = "cold.jpg";
        } else if (tempVal >= 10 && tempVal <= 25) {
            weatherImg.src = "mild.jpg";
        } else {
            weatherImg.src = "hot.jpg";
        }

    } catch (error) {
        console.error(error);
    }
}

submit.addEventListener("click", (e) => {
    e.preventDefault();
    getData(city.value);
})

getData("Dubai");
