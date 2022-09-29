// Require Packages
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const hbs = require('hbs')
const hbsUtils = require('hbs-utils')(hbs)
const methodOverride = require('method-override')
require('dotenv').config()
var cors = require('cors')

// Build the App
const app = express()
app.use(cors())
// View Engine (Handlebars)
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'hbs')
// app.set('view options', { layout: 'layouts/main' })
// hbs.registerPartials(__dirname + '/views/partials', err => {})
// hbsUtils.registerWatchedPartials(__dirname + '/views/partials')

// Middleware
app.use(logger('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

// Database
mongoose.connect(
  process.env.MONGODB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    console.log('Connected to MongoDB')
  }
)

// Routes
// Create route for search
// app.use('/', require('./controllers/search'))
app.use('/results', require('./controllers/results'))

module.exports = app
