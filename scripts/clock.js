/* eslint-disable no-undef */
/* eslint-disable no-tabs */
let tz
export function getTimezone(timezone) {
	tz = timezone
}

export const updateDate = (lang, extraDay = 0) => {
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
	if (localStorage.getItem('currentLang') === 'pl') {
		date = [polishDays[now.getDay() + extraDay],
			now.getDate() + extraDay,
			polishMonths[now.getMonth()]].join(' ')
	}

	day.innerHTML = `${date} ${(new Date().getFullYear()).toString()}`
}

updateDate('en')

export function updateClock() {
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
	clock.innerHTML = `${hms[0]}:${hms[1]}:${hms[2]}`
	setTimeout(updateClock, 1000)
}

updateClock()
