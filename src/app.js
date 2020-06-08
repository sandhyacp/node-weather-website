const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and Views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)

hbs.registerPartials(partialsPath)

// Setup static directoty to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=>{
    res.render('index', {
        title:'Weather App',
        name: 'Sandhya'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sandhya'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Sandhya",
        message: 'This is some helpful text!'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send ({
            error: "You must provide an address in the URL"
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
        if(error) {
            return res.send ({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
          })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Sandhya",
        errorMessage: "Help Article Not Found!"
    })
})

app.get('*',(req, res)=>{
    res.render('404', {
        title: "404",
        name: "Sandhya",
        errorMessage: "Page Not Found!"
    })
})

app.listen(3000, () => {
    console.log('App is running at port 3000.')
})