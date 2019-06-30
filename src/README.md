## Basic Web Server SETUP

const express = require('express');

const app = express();

// EXAMPLE DOMAIN
	// app.com
	// app.com/help
	// app.com/about
	// app.com/weather

// SETTING UP ROUTES
	// .get('domain/subdir', (req, res) => {})
	// INITIAL VALUE IS url OF server -> '' IS ON DOMAIN W/O SUBDIRz
	// NEXT IS function FOR WHAT TO DO

app.get('', (req, res) => {
	res.send('Hello Express!');
});

app.get('/help', (req, res) => {
	res.send('Help page');
});

app.get('/about', (req, res) => {
	res.send('About page');
});

app.get('/weather', (req, res) => {
	res.send('Weather page');
});

// RUNNING THE SERVER BY 'Listening'
	// .listen(portNumber, () => {})
	// RUNS SERVER; DESIGNATE PORT NUMBER
	// NEXT IS function FOR WHAT TO DO
app.listen(3000, () => {
	console.log('Server is up on 3000');
});