const request = require('request');



const getWeather = ({altitude , latitude , place} = {} , callback) =>{
    const url = `https://api.darksky.net/forecast/e373f124f3da9ff76b3f05d3851d29f6/${altitude},${latitude}?units=si&lang=es`;
    request({url: url , json:true} , (error , response) =>{
        if(error){
            callback(error , null);
        }else{
            const {summary , temperature , precipProbability} = response.body.currently;
            callback(null , {
                location : place,
                weather: summary,
                temperature: temperature,
                precipProbability: precipProbability
            });
            
            //console.log(`${place} , ${summary}, temperatura: ${temperature} C° , porcentaje de lluvia: ${precipProbability}`);
        }
    });
}

module.exports = getWeather;