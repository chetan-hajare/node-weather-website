const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiY2hldGFuMzEiLCJhIjoiY2s4aXBsaXlnMDRpYTNodDZyang0aWppYSJ9.l5OdwgdIEvJ-vsllKhaxBw&limit=1'

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Geocode service')
        } else if(body.features.length === 0) {
            callback('Unable to find location')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place: body.features[0].place_name
            })
        }
        
    })
}

module.exports = geocode