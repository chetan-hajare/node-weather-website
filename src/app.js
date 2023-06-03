const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialViewPath = path.join(__dirname, '../templates/partials')

const app = express()

// Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialViewPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Chetan Hajare'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Chetan Hajare',
        message: 'This is help page'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Chetan Hajare'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, place}) => {
        if (error) {
            return console.log(error)
        }
        forecast({latitude, longitude}, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }
            res.send({
                forecast: forecastData,
                location: place,
                address: req.query.address 
            })
        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chetan Hajare',
        errorMessage: 'Help page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chetan Hajare',
        errorMessage: '404 Error page'
    })
})

app.listen(3000, () => {
    console.log('Server is up')
})