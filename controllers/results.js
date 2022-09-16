// Import Packages
const express = require('express')
const router = express.Router()
// Create POST controller
router.post('/', (req, res) => {
  let searched = req.body.search
  res.render('results', {
    resultsData: filterResults(resultsTest, searched),
    resultAmount: resultQty(resultsTest, searched)
  })
})

router.get('/', (req, res) => {
  // res.render('results', { results })
})
// Export module
module.exports = router
