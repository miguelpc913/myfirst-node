const path = require('path');
const express = require('express');
const app = express();
const hbs = require("hbs");

const getCoordinates = require('./utils/geocode');
const getWeather = require('./utils/getWeather');

//Setup Express
app.use(express.static(path.join(__dirname, './public')));

//Port

const port = process.env.PORT || 3000;


//Setup handlebars
app.set('view engine' , 'hbs');
app.set('views' , path.join(__dirname, './templates/views'));
hbs.registerPartials(path.join(__dirname, './templates/partials'));

app.get('' , (req , res) =>{
    res.render( 'index' ,{
        title: 'Weather',
        information: 'Created by me!'
    })
})

app.get('/about' , (req, res) =>{
    res.render('about' , {

        title:'About',
        information: path.join(__dirname, './public/css')
    })
});

app.get('/help' , (req , res) =>{
    res.render('help' , {
        title:'Help',
        infomation:'This is the help page'
    })
})

app.get('/weather' , (req, res) =>{
    if(!req.query.address){
        return res.render('error' , {
            title: 'Provide a search location'
        })
    }
    getCoordinates(req.query.address , (error , data) =>{
        if(error){
            res.send({error})
        }else{
            getWeather(data , (error , weather) =>{
                res.send(weather);
            });
        }
    });
    
    
    
})

app.get('/help/*' , (req, res) =>{
    res.render('error' , {
        title:'Help page not found'
    })
})

app.get('*' , (req, res) =>{
    res.render('error' , {
        title:'Page not found'
    })
})



app.listen(port);