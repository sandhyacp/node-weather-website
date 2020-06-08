const request = require("request")

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FuZGh5YWNwIiwiYSI6ImNrOGY0NXh1OTAwZm0zbW8yaXI0c210bWMifQ.Zy4fh_nI9Lr7-yCvUWBveQ&limit=1'
    request({url, json:true}, (error, {body}) =>{
        if(error)
        {
            callback("Unable to connect to Geocoding Service!", undefined)
        } else if (body.features.length === 0) {
            callback("Unable to find the location, try another search!", undefined)
        } else {
            callback(undefined, {
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports = geocode