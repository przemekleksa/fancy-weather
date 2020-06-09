/* eslint-disable */

describe('What date is it?', () => {
	test('it should return a date', () => {
		const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		const lang = 'en'
		const day = 1
		const date = new Date()
		const output = days[date.getDay() + day] + ' ' + (date.getDate() + day) + ' ' + months[date.getMonth()] +' 2020'

		expect(updateDate(lang, day)).toEqual(output)
	}) 
})

describe('What date is it?', () => {
	test('it should return a date', () => {
		const polishDays = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota']
		const polishMonths = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']
		const lang = 'pl'
		const day = 0
		const date = new Date()
		const output = polishDays[date.getDay() + day] + ' ' + (date.getDate() + day) + ' ' + polishMonths[date.getMonth()] +' 2020'

		expect(updateDate(lang, day)).toEqual(output)
	}) 
})

const updateDate = (lang, extraDay = 0) => {
	const now = new Date()
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	const polishDays = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota']
	const polishMonths = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']
	let date

	if (localStorage.getItem('currentLang') === 'en' || lang === 'en') {
		date = [days[now.getDay() + extraDay],
			now.getDate() + extraDay,
			months[now.getMonth()]].join(' ')
	}
	if (localStorage.getItem('currentLang') === 'pl' || lang === 'pl') {
		date = [polishDays[now.getDay() + extraDay],
			now.getDate() + extraDay,
			polishMonths[now.getMonth()]].join(' ')
	}
	
	let day = `${date} ${(new Date().getFullYear()).toString()}`
	return day

}


describe('What time is it?', () => {
	test('it should return a time in english', () => {
		const input = []
		const output = ''

		expect(updateClock(input)).toEqual(output.length = 8)
	}) 
})

function updateClock() {
	const utcTime = new Date().toUTCString().substr(17, 8)
	let hms = utcTime.split(':').map((item) => parseInt(item, 0))
	if (typeof tz === 'number') {
		hms[0] += tz / 60 / 60
	}

	if (hms[0] >= 24) {
		hms[0] -= 24
		console.log('zmiana daty')
		updateDate(localStorage.getItem('currentLang'), 1)
	}
	hms = hms.map((item) => (item.toString().length === 2 ? item : `0${item}`))
	return `${hms[0]}:${hms[1]}:${hms[2]}`.length
	setTimeout(updateClock, 1000)
}

describe('got location?', () => {
	test('it should return a location', () => {
		const input = []
		const output = 'Geolocation is not supported by this browser.'

		expect(getLocation(input)).toEqual(output)
	}) 
})

describe('got error in location?', () => {
	test('it should return an error', () => {
		const input = []
		const output = 'Geocoder failed.'

		expect(geoError(input)).toEqual(output)
	}) 
})

function geoError() {
	// alert('Geocoder failed.') // unnecessary alert bugging on first launch
	return 'Geocoder failed.'
}

function getLocation() {
	if (navigator.geolocation) {
		return navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
	} else {
		return 'Geolocation is not supported by this browser.'
	}
}


describe('Latitude, longitude string', () => {
	test('it should return an string with lat an lot of position', () => {
		const input = 50.02344747075329 
		const input2 = 19.985175919290537
		const output = 'Latitude: 50°02<br/>Longitude: 19°99'

		expect(geoSuccess(input, input2)).toEqual(output)
	}) 
})

describe('Latitude, longitude string', () => {
	test('it should return an string with lat an lot of position', () => {
		const input = 40.71
		const input2= -74.01
		const output = 'Latitude: 40°71<br/>Longitude: -74°01'

		expect(geoSuccess(input, input2)).toEqual(output)
	}) 
})

function geoSuccess(latitude, longitude) {
	// const coord = `Latitude: ${lat}<br/>Longitude: ${long}`
	const coord = `Latitude: ${latitude.toFixed(2).split('.').join('°')}<br/>Longitude: ${longitude.toFixed(2).split('.').join('°')}`
	console.log(coord)
	return coord
	getLanLon(latitude, longitude, currentLanguage)
	getFutureWeather(latitude, longitude)
	drawMap(latitude, longitude)
}