/* eslint-disable no-tabs */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import { drawMap } from './map.js'
import { updateDate, getTimezone } from './clock.js'


const apiKey = '18c5202b88ce01926c8701685e567bb4'
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?'

const oneCallApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?'

let polishWeatherDescription
let englishWeatherDescription
let latitudeLongitude = []

const polishDays = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela']
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const temperature = [] // storing temp data for today, feels like and future weather

let currentLanguage = 'en' // default language
if (localStorage.getItem('currentLang') === null) {
	localStorage.setItem('currentLang', currentLanguage)
}
if (localStorage.getItem('currentLang') !== currentLanguage) {
	currentLanguage = localStorage.getItem('currentLang')
}

let tempUnit = 'C'// default temp unit
if (localStorage.getItem('tempU') === null) {
	localStorage.setItem('tempU', tempUnit)
}
if (localStorage.getItem('tempU') !== tempUnit) {
	tempUnit = localStorage.getItem('currentLang')
}

const reverse = (lat, lon) => {
	fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=911b3467360e4a0b8d5b7c3677f805e7&language=${localStorage.getItem('currentLang')}`)
		.then((response) => response.json())
		.then((data) => {
			if (data.results[0].components.city === undefined) {
				place.textContent = data.results[0].components.town
			}
			if (data.results[0].components.town === undefined) {
				place.textContent = data.results[0].components.county
			}
			if (data.results[0].components.city !== undefined) {
				place.textContent = data.results[0].components.city
			}
		})
		.catch((err) => console.log('there was an issue withe reserve geocoding', err))
}


export const changeLanguage = (currLanguage) => {
	const description = forecastDetails.innerHTML.split('<br>')
	if (currLanguage === 'en') {
		localStorage.setItem('currentLang', currLanguage)
		description[0] = englishWeatherDescription
		description[1] = description[1].replace('Odczuwalna:', 'Feels like:')
		description[2] = description[2].replace('Wiatr', 'Wind')
		description[3] = description[3].replace('Wilgotność', 'Humidity')
		if (!days.includes(document.getElementById('day-one-name').textContent)) {
			document.getElementById('day-one-name').textContent = days[polishDays.indexOf(document.getElementById('day-one-name').textContent)]
			document.getElementById('day-two-name').textContent = days[polishDays.indexOf(document.getElementById('day-two-name').textContent)]
			document.getElementById('day-three-name').textContent = days[polishDays.indexOf(document.getElementById('day-three-name').textContent)]
		}
		reverse(latitudeLongitude[0], latitudeLongitude[1])
	} else if (currLanguage === 'pl') {
		localStorage.setItem('currentLang', currLanguage)
		description[0] = polishWeatherDescription
		description[1] = description[1].replace('Feels like:', 'Odczuwalna:')
		description[2] = description[2].replace('Wind', 'Wiatr')
		description[3] = description[3].replace('Humidity', 'Wilgotność')
		if (days.includes(document.getElementById('day-one-name').textContent)) {
			document.getElementById('day-one-name').textContent = polishDays[days.indexOf(document.getElementById('day-one-name').textContent)]
			document.getElementById('day-two-name').textContent = polishDays[days.indexOf(document.getElementById('day-two-name').textContent)]
			document.getElementById('day-three-name').textContent = polishDays[days.indexOf(document.getElementById('day-three-name').textContent)]
		}
		reverse(latitudeLongitude[0], latitudeLongitude[1])
	}
	forecastDetails.innerHTML = description.join('<br>')
}


export const changeUnit = () => {
	const feels = forecastDetails.innerHTML.split('<br>')
	const futureTemp = [document.getElementById('day-one-temp'), document.getElementById('day-two-temp'), document.getElementById('day-three-temp')]

	if (tempUnit === 'C') {
		forecastDegrees.textContent = `${Math.round((temperature[0] - 273.15) * (9 / 5) + 32)}°F`
		feels[1] = `Feels like: ${`${Math.round((temperature[1] - 273.15) * (9 / 5) + 32)}°F`}`
		futureTemp[0].innerText = `${Math.round((temperature[2] - 273.15) * (9 / 5) + 32)}°F`
		futureTemp[1].innerText = `${Math.round((temperature[3] - 273.15) * (9 / 5) + 32)}°F`
		futureTemp[2].innerText = `${Math.round((temperature[4] - 273.15) * (9 / 5) + 32)}°F`

		tempUnit = 'F'
		localStorage.setItem('tempU', tempUnit)
	} else {
		forecastDegrees.textContent = `${Math.round(temperature[0] - 273.15)}°C`
		feels[1] = `Feels like: ${`${Math.round(temperature[1] - 273.15)}°C`}`
		futureTemp[0].innerText = `${Math.round(temperature[2] - 273.15)}°C`
		futureTemp[1].innerText = `${Math.round(temperature[3] - 273.15)}°C`
		futureTemp[2].innerText = `${Math.round(temperature[4] - 273.15)}°C`

		tempUnit = 'C'
		localStorage.setItem('tempU', tempUnit)
	}

	forecastDetails.innerHTML = feels.join('<br>')
}


const getLanLon = (lat, lon, currentlyUsedLanguage) => {
	let oppositeLanguage = ''
	if (currentlyUsedLanguage === 'en') {
		oppositeLanguage = 'pl'
	}
	if (currentlyUsedLanguage === 'pl') {
		oppositeLanguage = 'en'
	}

	fetch(`${apiUrl}lat=${lat}&lon=${lon}&apiKey=${apiKey}&lang=${oppositeLanguage}`)
		.then((response) => response.json())
		.then((data) => {
			if (oppositeLanguage === 'en') {
				englishWeatherDescription = data.weather[0].description
			}
			if (oppositeLanguage === 'pl') {
				polishWeatherDescription = data.weather[0].description
			}
		})

	fetch(`${apiUrl}lat=${lat}&lon=${lon}&apiKey=${apiKey}&lang=${currentlyUsedLanguage}`)
		.then((response) => response.json())
		.then((data) => {
			const { timezone } = data
			getTimezone(timezone)
			if (currentlyUsedLanguage === 'en') {
				englishWeatherDescription = data.weather[0].description
			}
			if (currentlyUsedLanguage === 'pl') {
				polishWeatherDescription = data.weather[0].description
			}
			let feelsLike = Math.round(data.main.feels_like - 273.15)
			let temp = Math.round(data.main.temp - 273.15)
			temperature[0] = data.main.temp
			temperature[1] = data.main.feels_like
			if (tempUnit !== 'C') {
				temp = `${Math.round((temp) * (9 / 5) + 32)}°F`
				feelsLike = `${feelsLike + (9 / 5) + 32}°F`
			} else {
				temp += '°C'
				feelsLike += '°C'
			}
			forecastDegrees.textContent = temp
			if (currentLanguage === 'en') {
				forecastDetails.innerHTML = `${data.weather[0].description}<br/>Feels like: ${feelsLike}<br/>Wind: ${data.wind.speed} m/s<br/>Humidity: ${data.main.humidity} %`
			}
			if (currentLanguage === 'pl') {
				forecastDetails.innerHTML = `${data.weather[0].description}<br/>Odczuwalna: ${feelsLike}<br/>Wiatr: ${data.wind.speed} m/s<br/>Wilgotność: ${data.main.humidity} %`
			}
			forecastIcon.innerHTML = `<img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png' alt=${data.weather[0].description}/>`
			const viewportWidth = window.innerWidth || document.documentElement.clientWidth
			if (viewportWidth < 400) {
				forecastIcon.innerHTML = `<img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png' alt=${data.weather[0].description}/>`
			}
		})
		.then(setTimeout(reverse(lat, lon, currentLanguage), 10))
		.catch((err) => console.log('error ', err))
}

const getFutureWeather = (lat, lon) => {
	fetch(`${oneCallApiUrl}lat=${lat}&lon=${lon}&apiKey=${apiKey}`)
		.then((response) => response.json())
		.then((data) => {
			let temps = [Math.round(data.daily[1].temp.day - 273.15),
				Math.round(data.daily[2].temp.day - 273.15), Math.round(data.daily[3].temp.day - 273.15)]
			temperature[2] = (data.daily[1].temp.day)
			temperature[3] = (data.daily[2].temp.day)
			temperature[4] = (data.daily[3].temp.day)
			if (tempUnit !== 'C') {
				temps = temps.map((item) => `${Math.round(item * (9 / 5) + 32)}°F`)
			} else {
				temps = temps.map((item) => `${item}°C`)
			}
			const now = new Date()
			const forecastDays = []
			if (localStorage.getItem('currentLang') === 'pl') {
				if (now.getDay() === 7) {
					forecastDays.push(polishDays[now.getDay()])
					forecastDays.push(polishDays[0])
					forecastDays.push(polishDays[1])
				} else if (now.getDay() === 6) {
					forecastDays.push(polishDays[now.getDay()])
					forecastDays.push(polishDays[0])
					forecastDays.push(polishDays[1])
				} else {
					forecastDays.push(polishDays[now.getDay()])
					forecastDays.push(polishDays[now.getDay() + 1])
					forecastDays.push(polishDays[now.getDay() + 2])
				}
			}
			if (localStorage.getItem('currentLang') === 'en') {
				if (now.getDay() === 7) {
					forecastDays.push(days[now.getDay()])
					forecastDays.push(days[0])
					forecastDays.push(days[1])
				} else if (now.getDay() === 6) {
					forecastDays.push(days[now.getDay()])
					forecastDays.push(days[0])
					forecastDays.push(days[1])
				} else {
					forecastDays.push(days[now.getDay()])
					forecastDays.push(days[now.getDay() + 1])
					forecastDays.push(days[now.getDay() + 2])
				}
			}

			weatherFuture.innerHTML = `<div class='day-one'>
				<div id='day-one-name'>${forecastDays[0]}</div> 
				<div>
					<img src='http://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}.png' alt=${data.daily[1].weather[0].description}/>
				</div>	
				<div id='day-one-temp'>
					${temps[0]}
				</div>
			</div>
			<div class='day-two'>
				<div id='day-two-name'>${forecastDays[1]}</div> 
				<div>
					<img src='http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}.png' alt=${data.daily[2].weather[0].description}/>
				</div>	
				<div id='day-two-temp'>
					${temps[1]}
				</div>
			</div>
			<div class='day-three'>
				<div id='day-three-name'>${forecastDays[2]}</div> 
				<div>
					<img src='http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}.png' alt=${data.daily[2].weather[0].description}/>
				</div>	
				<div id='day-three-temp'>
					${temps[2]}
				</div>
			</div>
			`
		})
		.catch((err) => console.log('Error: ', err))
}

function geoSuccess(position) {
	const { latitude } = position.coords
	const { longitude } = position.coords
	console.log(position.coords)
	latitudeLongitude = [latitude, longitude]
	coord.innerHTML = `Latitude: ${latitude.toFixed(2).split('.').join('°')}'<br/>Longitude: ${longitude.toFixed(2).split('.').join('°')}'`
	getLanLon(latitude, longitude, currentLanguage)
	getFutureWeather(latitude, longitude)
	drawMap(latitude, longitude)
}

function geoError() {
	// alert('Geocoder failed.') // unnecessary alert bugging on first launch
	console.log('Geocoder failed.')
}

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
	} else {
		alert('Geolocation is not supported by this browser.')
	}
}

getLocation()

export const searchWeather = (city) => {
	fetch(`${apiUrl}q=${city}&appid=${apiKey}`)
		.then((response) => response.json())
		.then((data) => {
			if (data.cod === '404') {
				return
			}
			latitudeLongitude = [data.coord.lat, data.coord.lon]
			coord.innerHTML = `Latitude: ${data.coord.lat.toFixed(2).split('.').join('°')}'<br/>Longitude: ${data.coord.lon.toFixed(2).split('.').join('°')}'`
			getLanLon(data.coord.lat, data.coord.lon)
			getFutureWeather(data.coord.lat, data.coord.lon)
			drawMap(data.coord.lat, data.coord.lon)
			updateDate(localStorage.getItem('currentLang'), 0)
		})
		.catch((err) => console.log('Error', err))
}
