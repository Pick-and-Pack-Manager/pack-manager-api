// Import Packages
const express = require('express')
const router = express.Router()


const Orders = require('../models/orders.js')

// const app = express()

// Views
// *** start GET orders start ***
router.get('/', async (req, res) => {
  let orders = await Orders.find({
    // title: { $regex: req.query.search || '' }
  })
	console.log(req.query.search)
  res.json(orders)
})
// *** end GET orders end ***

// *** start POST orders start ***
router.post('/', async (req, res) => {
  let orders = await Orders.find({
    // title: { $regex: req.query.search || '' }
  })
	console.log(req.query.search)
  res.json(orders)
})
// *** end POST orders end ***

// Export module
module.exports = router
