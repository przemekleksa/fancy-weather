// import { currentLanguage } from './forecast.js'
// import { timezone } from './forecast.js'
// console.log(timezone)
let tz
export function getTimezone(timezone) {
	tz = timezone
}
// console.log(localStorage.getItem('currentLang'))

export function updateClock() {

	// console.log(timezone)
	let utcTime = new Date().toUTCString().substr(17,8)
	let hms = utcTime.split(":").map(item => parseInt(item, 0))
	if (typeof tz === 'number') {
		hms[0] += tz/60/60
	}
	

	if(hms[0] >= 24) {
		hms[0] -= 24
		console.log('zmiana daty')
		updateDate(localStorage.getItem('currentLang'), 1)

	}
	// if (hms[0] < 24) {
	// 	updateDate('en', 0)
	// }
	// console.log(localStorage.getItem('currentLang'))

	hms = hms.map(item => {
		// console.log(item.toString().length)
		return item.toString().length === 2 ? item : "0" + item
	})

	// console.log(hms)
		// console.log(new Date().toUTCString().substr(17,8))
			clock.innerHTML = `${hms[0]}:${hms[1]}:${hms[2]}`
			setTimeout(updateClock, 1000)
}

updateClock()



export const updateDate = (lang, extraDay = 0) => {
	let now = new Date(),
		months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
		polishDays = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', ],
		polishMonths = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
		date

		// if (localStorage.getItem('currentLang') === undefined) {
			
		// }
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
		
	day.innerHTML = date + ' ' + (new Date().getFullYear()).toString()
}

updateDate('en')