refresh.innerHTML = `<button onclick="getImages(true)"><i class="fas fa-sync"></i></button>`
language.innerHTML = '<button>EN</button>'
degreeUnit.innerHTML = '<button>Change degree unit</button>'
searchForm.innerHTML = `<input type="text"><input type="submit" value="Search">`
// searchBtn.textContent = 'search'

const getImages = (random) => {
	fetch('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=bcffbae651feec2b6a7575e7eb3136d5&tags=nature,spring,morning&tag_mode=all&extras=url_h&format=json&nojsoncallback=1')
	.then(response => response.json())
	.then(data => {
		console.log(data)
		if (random !== true) {
			document.body.style.backgroundImage = `url(${data.photos.photo[Math.floor(Math.random() * 100)].url_h}})`
		} else {
			setTimeout(document.body.style.backgroundImage = `url(${data.photos.photo[Math.floor(Math.random() * 100)].url_h})`, 330)
			
		}
		
	})
}

getImages()

