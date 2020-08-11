//Modules
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const chalk = require('chalk')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//handlebars engine/views path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Static Directory
app.use(express.static(publicDirectoryPath))

//Page Calls
app.get('', (req, res)=> {
    res.render('index', {
        title: 'WEATHER APP',
        name: 'Jesse Moses'
      })
})

app.get('/about', (req, res)=> {

    res.render('about', {
        title: 'About Me',
        name: 'Jesse Moses'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'How can i  help you?',
        title: 'Help',
        image:'/public/img/weather.png',
        name: 'Jesse Moses'
    })
})
app.get('/weather', (req, res)=> {

    if(!req.query.address){
        return res.send({ error: "Enter a search term!" })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {  }) => {
        if(error) { return res.send({ error }) }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) { return res.send({ error }) }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.adress
            })
        })
    })
    
})

app.get('/help/*', (req, res)=> {
    res.render('404', {
        title: '404 Page',
        name: 'Jesse Moses',
        errorMessage: 'Help article not found'

    })
})

app.get('*', (req, res)=> {
    res.render('404', {
        title: '404 Page',
        name: 'Jesse Moses',
        errorMessage: 'Page Not Found'

    })
})

app.listen(port, () => {
    console.log('Sever up on port: ' + '3000')
})