const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=14ecbce20f46ba33bdbdbcc0fc6afbfd&query=" + latitude + "," + longitude;
    
    request({ url: url, json: true }, (error, message, body) => {

        if (error) {
            callback('Not able to connect to Weather Service!', undefined);
        }
        else if (body.error) {
            callback('Not able to find Location!', undefined)
        }
        else {

            const {feelslike:currentTemperature, precip:chanceofRainFall,weather_descriptions:summary,humidity} = body.current
            callback(undefined, {
                'humidity':humidity,
                'summary':summary,
                'temperature': currentTemperature,
                'precipitation': chanceofRainFall,

            })
        }

    })
}

module.exports = forecast;