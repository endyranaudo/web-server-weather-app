const request = require('postman-request')
require('dotenv').config()
// storing api_key in .env
const api_key = process.env.weatherstack_api_key 

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${latitude},${longitude}`
  // we destructured response
  request({url: url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error){
      callback('Unable to find location.')
    } else {
      callback( undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degrees`)
    }
  })
}

module.exports = forecast