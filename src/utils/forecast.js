const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8070babe98562be042241b2d0a710a19&query=' + latitude + ',' + longitude + '&units=m'
   
    request({ url, json: true}, (error, {body}) => {
        if (error) {
           callback('Internet Needed!', undefined)

        } else if (body.error||!body.current) {
          callback('Enter Correct Locations!', undefined)

        } else {
            callback(undefined, 'It is currenty: ' + body.current.temperature + ' degrees outside.' + ' There is a '+ body.current.precip + '% chance of rain ' + 'Observation Time: ' + body.current.observation_time)
        }  
    })
}
module.exports = forecast