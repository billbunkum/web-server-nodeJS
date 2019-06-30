const request = require('request');

const forecast = (latitude, longitude, callback) => {
	darkskyAPIKEY = '297842be681beeba3e18b115c8bab523';
	darkskyURL = `https://api.darksky.net/forecast/${darkskyAPIKEY}/` + `${latitude},${longitude}`;
	request( {url: darkskyURL}, (error, res) => {
		if (error) {
			callback('Cannot connect', undefined);
		} else if (res.body.code === 400) {
			callback('Location invalid, try another', undefined);
		} else {
			callback(undefined, res.body);
		}
	});
};

module.exports = forecast;