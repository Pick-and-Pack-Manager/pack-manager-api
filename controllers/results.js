// Import Packages
const express = require('express')
const router = express.Router()

const Results = require('../models/results.js')
// const app = express()

// Views
// Create here a controller that accepts GET requests and renders the "search" page
router.get('/', async (req, res) => {
  let results = await Results.find({
    title: { $regex: req.query.search || '' }
  })
	console.log(results)
  res.json(results)
})

// Export module
module.exports = router
