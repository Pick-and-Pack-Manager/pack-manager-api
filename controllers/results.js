// Import Packages
const express = require('express')
const router = express.Router()

const Results = require('../models/results.js')
// Create POST controller
router.post('/', async (req, res) => {
  console.log(req.body.search)
  let results = await Results.find({
    title: { $regex: req.body.search }
  })
  // *** Results Qty ***
  // const qtyText = async () => {
  //   let qtyRes = await Results.countDocuments({
  //     title: { $regex: req.body.search }
  //   })
  //   return qtyRes == 1 ? qtyRes + ' Result' : qtyRes + ' Results'
  // }
  // *** Results Qty ***

  // *** Search Qty Text ***
  const qtyText = () => {
    return results.length == 1
      ? results.length + ' Result'
      : results.length + ' Results'
  }
  // *** Search Qty Text ***
  console.log(results)
  res.render('results', {
    results,
    qtyText: qtyText()
  })
})

router.get('/', (req, res) => {
  // res.render('results', { results })
})
// Export module
module.exports = router
