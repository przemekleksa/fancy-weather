let body = document.getElementsByName('BODY')

// let node = document.createTextNode("This is new.");
// let switches = document.createElement('p')
// switches.appendChild(node);

const container = document.createElement('div')
container.classList.add('container')


let dashboard = document.createElement('div')
dashboard.classList.add('dashboard')
const refresh = document.createElement('div')
refresh.classList.add('refresh')
const language = document.createElement('div')
language.classList.add('language')
const degreeUnit = document.createElement('div')
degreeUnit.classList.add('degree-unit')

dashboard.appendChild(refresh)
dashboard.appendChild(language)
dashboard.appendChild(degreeUnit)

const search = document.createElement('div')
search.classList.add('search')
const searchForm = document.createElement('form')
search.appendChild(searchForm)


dashboard.appendChild(search)
document.body.appendChild(dashboard)

const weatherNow = document.createElement('div')
weatherNow.classList.add('weather-now')
const place = document.createElement('h2')
place.classList.add('place')
const clock = document.createElement('p')
clock.classList.add('clock')
weatherNow.appendChild(place)
weatherNow.appendChild(clock)

const forecast = document.createElement('div')
forecast.classList.add('forecast')
const forecastDegrees = document.createElement('div')
const forecastIcon = document.createElement('div')
const forecastDetails = document.createElement('div')
forecastDegrees.classList.add('forecast-degrees')
forecastIcon.classList.add('forecast-icon')
forecastDetails.classList.add('forecast-details')

forecast.appendChild(forecastDegrees)
const forecastIconAndDetails = document.createElement('div')
forecastIconAndDetails.classList.add('forecast-icon-and-details')
forecastIconAndDetails.appendChild(forecastIcon)
forecastIconAndDetails.appendChild(forecastDetails)
forecast.appendChild(forecastIconAndDetails)
weatherNow.appendChild(forecast)

const weatherFuture = document.createElement('div')
weatherFuture.classList.add('future-weather')
weatherFuture.appendChild(document.createElement('div'))
weatherFuture.appendChild(document.createElement('div'))
weatherFuture.appendChild(document.createElement('div'))
weatherNow.appendChild(weatherFuture)

const map = document.createElement('div')
map.classList.add('map')
map.setAttribute('id', 'map')
const coord = document.createElement('div')
coord.classList.add('coord')
// map.appendChild(document.createElement('div'))
// map.appendChild(coord)

const weatherAndMap = document.createElement('div')

weatherAndMap.classList.add('container')

weatherAndMap.appendChild(weatherNow)
const mapAndCoord = document.createElement('div')
mapAndCoord.classList.add('map-and-coord')

mapAndCoord.appendChild(map)
mapAndCoord.appendChild(coord)

weatherAndMap.appendChild(mapAndCoord)


document.body.appendChild(weatherAndMap)

