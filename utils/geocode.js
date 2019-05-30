const request = require('request');

const getCoordinates = (address , callback) =>{
    const map = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWlndWVscGMiLCJhIjoiY2p2azF4ZHNrMGdtODQ5cWwyZ28ybzFzbCJ9.cvQcRiMWYAFsAKbwZ706vg&limit=1';
    request({url: map , json:true} , (error , response) =>{
        if(error){
            callback(error , null);
        }else if(response.body.features.length < 1){
            callback("Not valid search term" , null);
        }else{
            
            const {place_name: place} = response.body.features[0]
            const [latitude , altitude] = response.body.features[0].center;
            const coordinates = {
                altitude,
                latitude, 
                place
            }
            callback(null , coordinates);
        }
        
    });
}

module.exports = getCoordinates;