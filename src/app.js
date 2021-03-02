const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

// We load express after requiring it
const app = express()
// for Heroku
const port = process.env.PORT || 3000

// Defines paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public') // STATIC
const viewsPath = path.join(__dirname, '../templates/views') // DYNAMIC (custom)
const partialsPath = path.join(__dirname, '../templates/partials') // PARTIALS (custom)

// Setup handlebars enginee and views location
app.set('view engine','hbs')
app.set('views', viewsPath) // dynamic
hbs.registerPartials(partialsPath) // partials

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//In the lines below we render DYNAMIC pages from /templates
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Endy'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Endy'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'Here you can find some useful articles',
    title: 'Help',
    name: 'Endy'
  })
})

// CREATING THE WEATHER END-POINT
app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send ({
      error: 'You must provide an address'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({ error })
    }
    forecast(latitude, longitude, (error, forecastData)=> {
      if (error) {
        return res.send({ error })
      }
  
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
  
  
  app.get('/help/*', (req, res) => {
    res.render('404', {
      title: '404',
      name: 'Endy',
      errorMessage: 'Help article not found'
    })
  })

})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Endy',
    errorMessage: 'Page not found'
  })
})

// Heroku
app.listen( port, () => {
    console.log('Server is up on port: ' + port)
})