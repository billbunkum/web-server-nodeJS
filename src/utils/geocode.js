const request = require('request');

const geocode = (address, callback) => {
	const mapboxKEY = 'pk.eyJ1IjoiYmlsbGJ1bmt1bSIsImEiOiJjanZjeGt5cXAxZmNzNDNyeGZpOGVucTltIn0.7UCD_eQUDmoI1fRJnWrGJw';
	const mapboxURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmlsbGJ1bmt1bSIsImEiOiJjanZjeGt5cXAxZmNzNDNyeGZpOGVucTltIn0.7UCD_eQUDmoI1fRJnWrGJw&limit=1';

	request( {url: mapboxURL, json: true}, (error, res) => {
		if (error) {
			callback('Connection issue', undefined);
		} else if (res.body.length === 0 || !res.body.features[0]) {
			callback('Unable to find location, try another', undefined);
		} else {
			callback(undefined, {
				latitude: res.body.features[0].center[1],
				longitude: res.body.features[0].center[0],
				location: res.body.features[0].place_name
			});
		}
	});
};

module.exports = geocode;