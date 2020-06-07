import { searchWeather, changeUnit, changeLanguage } from './forecast.js'
// import { updateClock } from './clock.js';
import { updateDate} from './clock.js';

refresh.innerHTML = `<button><div id='refresh'><i class="fas fa-sync"></i></div></button>`
language.innerHTML = `<button id='en-lang'>EN</button>`
language2.innerHTML = `<button id='pl-lang'>PL</button>`
degreeUnit.innerHTML = `<button id='change-unit'>C/F</button>`
searchForm.innerHTML = `<input type="search" id='search'><input type='submit' value='Search' id='searchBtn'>`
// searchBtn.textContent = 'search'

let btn = document.getElementById('searchBtn')
let searchFM = document.getElementById('search')
// let city = document.getElementsByTagName('search')

btn.addEventListener('click', function(event) {
	event.preventDefault()
	searchWeather(document.getElementById('search').value)
})



refresh.addEventListener('click', (e) => {
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
	// updateClock('en')
	updateDate('en')
})
language2.addEventListener('click', () => {
	shake('pl-lang')
	changeLanguage('pl')
	// updateClock('pl')
	updateDate('pl')
})


const getImages = (random) => {
	fetch('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=bcffbae651feec2b6a7575e7eb3136d5&tags=nature,spring,morning&tag_mode=all&extras=url_h&format=json&nojsoncallback=1')
	.then(response => response.json())
	.then(data => {
		console.log(data)
		if (random !== true && data.photos.photo[Math.floor(Math.random() * 100)].url_h !== undefined) {
			document.body.style.backgroundImage = `url(${data.photos.photo[Math.floor(Math.random() * 100)].url_h})`
			// data.photos.photo
			console.log(`url(${data.photos.photo[Math.floor(Math.random() * 100)].url_h})`)
		} 
		if (data.photos.photo[Math.floor(Math.random() * 100)].url_h === undefined) {
			getImages(true)
		}
		if (random) {
			console.log(`url(${data.photos.photo[Math.floor(Math.random() * 100)].url_h})`)
			setTimeout(document.body.style.backgroundImage = `url('${data.photos.photo[Math.floor(Math.random() * 100)].url_h}')`, 330)
		}
		
	})
}

getImages()


const refreshAni = () => {
	document.getElementById('refresh').className ='spin';
	setTimeout(() => document.getElementById('refresh').classList.remove('spin'), 2020)
  }

const shake = (id) => {
	document.getElementById(id).classList.add('shake')
	setTimeout(() => document.getElementById(id).classList.remove('shake'), 500)
}


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined

if(SpeechRecognition) {
  console.log("Your Browser supports speech Recognition");
  
  const recognition = new SpeechRecognition();
//   recognition.continuous = true;
	recognition.lang = "pl-PL";
	// if(localStorage.getItem('currentLang') === 'en') {
	// 	recognition.lang = "en-US";
	// }
	// if(localStorage.getItem('currentLang') === 'pl') {
	// 	recognition.lang = "pl-PL";
	// }

  searchForm.insertAdjacentHTML("beforeend", '<button type="button" id=\'mic\'><i class="fas fa-microphone"></i></button>');
  console.log(searchForm)
//   searchFormInput.style.paddingRight = "50px";

//   const micBtn = searchForm.querySelector("button");
  const micBtn = searchForm.querySelector("button");
  const micIcon = micBtn.firstElementChild;

  micBtn.addEventListener("click", micBtnClick);
  function micBtnClick() {
    if(micIcon.classList.contains("fa-microphone")) { // Start Voice Recognition
      recognition.start(); // First time you have to allow access to mic!
    }
    else {
      recognition.stop();
    }
  }

  recognition.addEventListener("start", startSpeechRecognition); // <=> recognition.onstart = function() {...}
  function startSpeechRecognition() {
    micIcon.classList.remove("fa-microphone");
    micIcon.classList.add("fa-microphone-slash");
    searchFM.focus();
    console.log("Voice activated, SPEAK");
  }

  recognition.addEventListener("end", endSpeechRecognition); // <=> recognition.onend = function() {...}
  function endSpeechRecognition() {
    micIcon.classList.remove("fa-microphone-slash");
    micIcon.classList.add("fa-microphone");
    searchFM.focus();
    console.log("Speech recognition service disconnected");
  }

  recognition.addEventListener("result", resultOfSpeechRecognition); // <=> recognition.onresult = function(event) {...} - Fires when you stop talking
  function resultOfSpeechRecognition(event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    
    if(transcript.toLowerCase().trim()==="stop recording") {
	  recognition.stop();
    }
    else if(!searchFM.value) {
		searchFM.value = transcript;
		searchWeather(searchFM.value)
    }
    else {
      if(transcript.toLowerCase().trim()==="go") {
		searchForm.submit();
      }
      else if(transcript.toLowerCase().trim()==="reset input") {
		searchFM.value = "";
      }
      else {
		searchFM.value = transcript;
		searchWeather(searchFM.value)
      }
    }
    // searchFormInput.value = transcript;
    // searchFormInput.focus();
    // setTimeout(() => {
    //   searchForm.submit();
    // }, 500);
  }
  
//   info.textContent = 'Voice Commands: "stop recording", "reset input", "go"';
  
}
else {
  console.log("Your Browser does not support speech Recognition");
//   info.textContent = "Your Browser does not support Speech Recognition";
}