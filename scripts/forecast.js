const apiKey = '18c5202b88ce01926c8701685e567bb4'
const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?'

let tempUnit = 'C'

function getLocation() {
    if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
        } else {
            alert("Geolocation is not supported by this browser.")
        }
	}
	
function geoSuccess(position) {
    var latitude = position.coords.latitude
	var longitude = position.coords.longitude
	// latitude = 50.062308
	// longitude = 19.937187
	coord.innerHTML = `Latitude: ${latitude.toFixed(2).split('.').join('°')}'<br/>Longitude: ${longitude.toFixed(2).split('.').join('°')}'`
	getLanLon(latitude, longitude)
	getFutureWeather(latitude, longitude)
    // alert("lat:" + latitude + " lng:" + longitude)
}

function geoError() {
    alert("Geocoder failed.");
}



const getLanLon = (lat, lon) => {
	fetch(apiUrl + 'lat=' + lat + '&lon=' + lon +'&apiKey=' + apiKey)
	.then((response) => response.json())
	.then(data => {
		console.log(data)
		place.textContent = data.name
		let feelsLike = Math.round(data.main.feels_like - 273.15)
		let temp = Math.round(data.main.temp - 273.15)
		if (tempUnit !== 'C') {
			temp = Math.round((temp) * (9/5) + 32) + '°F'
			feelsLike = feelsLike +(9/5) + 32 + '°F'
		} else {
			temp += '°C'
			feelsLike +='°C'
		}
		forecastDegrees.textContent = temp
		forecastDetails.innerHTML = `${data.weather[0].main}<br/>Feels like: ${feelsLike}<br/>Wind: ${data.wind.speed} m/s<br/>Humidity: ${data.main.humidity} %`

		forecastIcon.innerHTML = `<img src='http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png' alt=${data.weather[0].description}/>`
	})
	.catch((err) => console.log('error ', err))
}

getLocation()


const oneCallApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?'
const getFutureWeather = (lat, lon) => {
	fetch(oneCallApiUrl + 'lat=' + lat + '&lon=' + lon +'&apiKey=' + apiKey)
	.then((response) => response.json())
	.then(data =>{
		console.log(data)
		let temps = [Math.round(data.daily[1].temp.day - 273.15), Math.round(data.daily[2].temp.day - 273.15), Math.round(data.daily[3].temp.day - 273.15)]
		if (tempUnit !== 'C') {
			console.log('tu')
			temps = temps.map(item => Math.round(item * (9/5) + 32) + '°F')
			console.log(temps)
		} else {
			temps = temps.map(item => item + '°C')
		}

		let now = new Date()
		let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
		days[now.getDay()]

		let forecastDays = []
		if (now.getDay() === 7) {
			forecastDays.push(days[now.getDay()])
			forecastDays.push(days[1])
			forecastDays.push(days[2])
		} else if (now.getDay() === 6) {
			forecastDays.push(days[now.getDay()])
			forecastDays.push(days[now.getDay() + 1])
			forecastDays.push(days[1])
		} else {
			forecastDays.push(days[now.getDay()])
			forecastDays.push(days[now.getDay() + 1])
			forecastDays.push(days[now.getDay() + 2])
		}

		console.log(forecastDays)

		weatherFuture.innerHTML = 
			`<div class='day-one'>
				<div>
					${forecastDays[0]}
				</div> 
				<div>
					<img src='http://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}.png' alt=${data.daily[1].weather[0].description}/>
				</div>	
				<div>
					${temps[0]}
				</div>
			</div>
			<div class='day-two'>
				<div>
					${forecastDays[1]}
				</div> 
				<div>
					<img src='http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}.png' alt=${data.daily[2].weather[0].description}/>
				</div>	
				<div>
					${temps[0]}
				</div>
			</div>
			<div class='day-three'>
				<div>
					${forecastDays[2]}
				</div> 
				<div>
					<img src='http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}.png' alt=${data.daily[2].weather[0].description}/>
				</div>	
				<div>
					${temps[0]}
				</div>
			</div>
			`
	})
}


// const getImages = () => {
// 	fetch('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=bcffbae651feec2b6a7575e7eb3136d5&tags=nature,spring,morning&tag_mode=all&extras=url_h&format=json&nojsoncallback=1')
// 	.then(response => response.json())
// 	.then(data => {
// 		console.log(data)
// 	})
// }

// getImages()