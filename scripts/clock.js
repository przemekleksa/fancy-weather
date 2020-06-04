function updateClock() {
	let now = new Date(),
		months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
		time = (new Date()).toString().substr(11,13),
		date = [now.getDate(), 
				days[now.getDay()],
                months[now.getMonth()]].join(' ')
	    clock.innerHTML = [date, time].join(' ')
		setTimeout(updateClock, 1000)
}
updateClock(); 