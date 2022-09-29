// Packages
const express = require('express')
const router = express.Router()
const Results = require('../models/results.js')
// const app = express()

// Views
// Create here a controller that accepts GET requests and renders the "search" page
router.get('/', async (req, res) => {
  let results = await Results.find({})
	console.log(results)
  res.send(results)
})

// Export
module.exports = router
