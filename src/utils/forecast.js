const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/65e1ec0ef3f151ad415fec9f9289dcef/' + latitude + ',' + longitude
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect to Weather Service!", undefined)
        } else if (body.error) {
            callback("Unable to find the location!", undefined)
        } else {
            callback(undefined, body.daily.data[0].summary +" It is currently "+ body.currently.temperature +" degrees out. There is a "+ body.currently.precipProbability +"% chance of rain.")
        }
    })
}

module.exports = forecast