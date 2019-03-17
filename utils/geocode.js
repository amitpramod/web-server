const request = require('request');

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiYW1pdGhwcmFtb2QiLCJhIjoiY2p0MzJvYTA5MXBtcDQ5cGEyNndidjhnaiJ9.ncFZjPQVmfN2gat1HB0f5w';
    request({url, json: true}, (error, {body}={}) => {
        console.log('geocode')
        if(error){
            callback('network connection error', undefined);
        }
        else if(body.features.length === 0){
            callback('place not found', undefined);
        }
        else{
            callback(undefined, {
              latitude: body.features[0].center[1],
              longitude: body.features[0].center[0],
              place: body.features[0].place_name
            })
        }
    })

}

module.exports = geocode;