const request = require('request')

const forecast = ({latitude, longitude}, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=51489281a5a65a931604ef760c18a855&query=' + latitude + ',' + longitude + '?units=si&lang=en'

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback("Unable to connect weather service")
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            //callback(body.currently)
            const temperature = body.current.temperature
            const precipitaion = body.current.feelslike
            const dailyData = body.current.weather_descriptions
    
            callback(undefined, dailyData[0] + ' It is currently ' + temperature + ' degrees out and feels like ' + precipitaion)
        }
    })
}

module.exports = forecast