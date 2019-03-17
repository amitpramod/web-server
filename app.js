const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const publicDirPath = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get('',(req, res) => {
    res.render('index',{
        title:'amith pramod',
        footer:'main details'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'amith pramod',
        footer: 'about the author'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title : 'amith pramod',
        footer: 'help from the author'
    })
})

app.get('/products', (req, res) => {
    console.log(req.query.search)
    if(!req.query.search){
        return res.send({
            error: 'search keword empty'
        })
    }
    res.send({
        products: []
    })
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'address not found'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, place} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        else{
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({
                        error
                    })
                }
                else{
                    console.log(forecastData);
                    return res.send([
                        {
                            forecast: forecastData,
                            location: {
                                lat: latitude,
                                long: longitude,
                                place
                            },
                            address: req.query.address
                        }
                    ]);
                }
            })
        }
    });

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error:'Help article not found'
    })
})

app.get('*',(req, res) => {
    res.render('404',{
        error: 'page not found'
    })
})

app.listen(3000, () => {
    console.log('server running on 3000');
})