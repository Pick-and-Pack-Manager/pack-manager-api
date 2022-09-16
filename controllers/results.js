// Import Packages
const express = require('express')
const router = express.Router()

const Results = require('../models/results.js')
// Create POST controller
router.post('/', async (req, res) => {
  console.log(req.body.search)
  let results = await Results.find({})
  console.log(results)
  res.render('results', {
    // resultsData: filterResults(resultsTest, searched),
    // resultAmount: resultQty(resultsTest, searched)
  })
})

router.get('/', (req, res) => {
  // res.render('results', { results })
})
// Export module
module.exports = router
