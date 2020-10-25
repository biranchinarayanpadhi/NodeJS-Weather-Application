const request = require('postman-request')

const geocode = (place, callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(place) + ".json?access_token=pk.eyJ1IjoiYmlpcnUiLCJhIjoiY2tnOHg4cDg1MDh4bjJ6cDk2dHQ4YzhmaCJ9.2YEqnijp4EKkyjyk0vsDFQ&limit=1";

    request({ url: url, json: true }, (error, message, body) => {

        if (error) {
            callback("unable to connect to geolocation service!", undefined);
        }
        else if (body.message || body.features.length==0) {
            callback("There is no API for this Place, Try another one", undefined);
        }
        else {
             
            callback(undefined, {
                
                "latitude": body.features[0].geometry.coordinates[1],
                "longitude": body.features[0].geometry.coordinates[0],
                "location": body.features[0].place_name
            })

        }

    })
}

module.exports = geocode;