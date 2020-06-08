/* eslint-disable no-undef */
/* eslint-disable no-tabs */
/* eslint-disable import/extensions */
import { searchWeather, changeUnit, changeLanguage } from './forecast.js'
import { updateDate } from './clock.js'

refresh.innerHTML = '<button><div id=\'refresh\'><i class="fas fa-sync"></i></div></button>'
language.innerHTML = '<button id=\'en-lang\'>EN</button>'
language2.innerHTML = '<button id=\'pl-lang\'>PL</button>'
degreeUnit.innerHTML = '<button id=\'change-unit\'>C/F</button>'
searchForm.innerHTML = '<input type="search" id=\'search\'><input type=\'submit\' value=\'Search\' id=\'searchBtn\'>'

const btn = document.getElementById('searchBtn')
const searchFM = document.getElementById('search')

const getImages = (random) => {
	fetch('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=bcffbae651feec2b6a7575e7eb3136d5&tags=nature,spring,morning&tag_mode=all&extras=url_h&format=json&nojsoncallback=1')
		.then((response) => response.json())
		.then((data) => {
			console.log(data)
			const rand = Math.floor(Math.random() * 100)
			if (random !== true && data.photos.photo[rand].url_h !== undefined) {
				document.body.style.backgroundImage = `url(${data.photos.photo[rand].url_h})`
			}
			if (data.photos.photo[rand].url_h === null) {
				getImages(true)
			}
			if (random) {
				document.body.style.backgroundImage = `url("${data.photos.photo[rand].url_h}")`
			}
		})
}

getImages()


const refreshAni = () => {
	document.getElementById('refresh').className = 'spin'
	setTimeout(() => document.getElementById('refresh').classList.remove('spin'), 2020)
}

const shake = (id) => {
	document.getElementById(id).classList.add('shake')
	setTimeout(() => document.getElementById(id).classList.remove('shake'), 500)
}


btn.addEventListener('click', (event) => {
	event.preventDefault()
	searchWeather(document.getElementById('search').value)
})

refresh.addEventListener('click', () => {
	getImages(true)
	refreshAni()
})

degreeUnit.addEventListener('click', () => {
	changeUnit()
	shake('change-unit')
})

language.addEventListener('click', () => {
	shake('en-lang')
	changeLanguage('en')
	updateDate('en')
})

language2.addEventListener('click', () => {
	shake('pl-lang')
	changeLanguage('pl')
	updateDate('pl')
})

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

if (SpeechRecognition) {
	console.log('Your Browser supports speech Recognition')
	const recognition = new SpeechRecognition()
	//   recognition.continuous = true;
	recognition.lang = 'pl-PL'

	searchForm.insertAdjacentHTML('beforeend', '<button type="button" id=\'mic\'><i class="fas fa-microphone"></i></button>')

	const micBtn = searchForm.querySelector('button')
	const micIcon = micBtn.firstElementChild

	// eslint-disable-next-line no-inner-declarations
	function micBtnClick() {
		if (micIcon.classList.contains('fa-microphone')) { // Start Voice Recognition
			recognition.start() // First time you have to allow access to mic!
		} else {
			recognition.stop()
		}
	}
	micBtn.addEventListener('click', micBtnClick)

	// eslint-disable-next-line no-inner-declarations
	function startSpeechRecognition() {
		micIcon.classList.remove('fa-microphone')
		micIcon.classList.add('fa-microphone-slash')
		searchFM.focus()
		console.log('Voice activated, SPEAK')
	}
	recognition.addEventListener('start', startSpeechRecognition) // <=> recognition.onstart = function() {...}

	// eslint-disable-next-line no-inner-declarations
	function endSpeechRecognition() {
		micIcon.classList.remove('fa-microphone-slash')
		micIcon.classList.add('fa-microphone')
		searchFM.focus()
		console.log('Speech recognition service disconnected')
	}
	recognition.addEventListener('end', endSpeechRecognition) // <=> recognition.onend = function() {...}

	// eslint-disable-next-line no-inner-declarations
	function resultOfSpeechRecognition(event) {
		const current = event.resultIndex
		const { transcript } = event.results[current][0]
		if (transcript.toLowerCase().trim() === 'stop recording') {
			recognition.stop()
		} else if (!searchFM.value) {
			searchFM.value = transcript
			searchWeather(searchFM.value)
		} else if (transcript.toLowerCase().trim() === 'go') {
			searchForm.submit()
		} else if (transcript.toLowerCase().trim() === 'reset input') {
			searchFM.value = ''
		} else {
			searchFM.value = transcript
			searchWeather(searchFM.value)
		}
	}
	recognition.addEventListener('result', resultOfSpeechRecognition) // <=> recognition.onresult = function(event) {...} - Fires when you stop talking
} else {
	console.log('Your Browser does not support speech Recognition')
}
