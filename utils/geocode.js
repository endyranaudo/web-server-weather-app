const request = require('postman-request')
require('dotenv').config()
// storing api_key in .env
const api_key = process.env.mapbox_api_key

const geocode = (address, callback) => {
  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${api_key}&limit=1`
  
  request({url: geocodeURL, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to location services!', undefined)
    } else if ( body.features.length === 0){
      callback('Unable to find location. Try another search.')
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name
      })
    }
  })
}


module.exports = geocode