const request = require('request');

const forecast = (lat, long, callback) =>{
    const url = 'https://api.darksky.net/forecast/cc5110df759767f7c77115c285cf65d6/'+lat+','+ long+ '?units=si';

    request({url, json: true}, (error, {body} = {}) => {
        console.log('forecast');
        if(error){
            callback('unable to connect to the network', undefined);
        }
        else if(body.error){
            callback('search with different keywords', undefined);
        }
        else{
            callback(undefined, 
                 body.daily.data[0].summary +" it is currently "+body.currently.temperature +" degrees out. There is "+body.currently.precipProbability +"% chance of rain."
            )
        }
    })
}

module.exports = forecast;