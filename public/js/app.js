console.log('Client-side js/app.js working!');

// CLIENT-SIDE JS, fetch() IS NOT ACCESSIBLE IN NODEJS
	// then() IS A promise


const weatherForm = document.querySelector('form');
// const weatherForm = document.getElementById('location');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// MANIPULATE A const W/ .textContent
// messageOne.textContent = 'yo';

// e FOR event
weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const location = search.value;
	const weatherURL = `http://localhost:3000/weather?address=${location}`;

	messageOne.textContent = 'Loading...';
	messageTwo.textContent = '';

	fetch(weatherURL).then( (response) => {
		response.json().then( (data) => {

			if (data.error) {
				// return console.log(data.error);
				messageOne.textContent = data.error;
			} else {
				messageOne.textContent = data.location;
				messageTwo.textContent = data.hourly;
			}
		})
	});
});