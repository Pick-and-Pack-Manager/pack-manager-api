// Import Packages
const express = require('express')
const router = express.Router()


const Orders = require('../models/orders.js')

// const app = express()

// Views
// Only GET and PATCH allowed. Cannot delete or add
// *** start GET orders start ***
router.get('/', async (req, res) => {
  let orders = await Orders.find({
    // title: { $regex: req.query.search || '' }
  })
	console.log('GET Orders')
  res.json(orders)
})
// *** end GET orders end ***

// *** start PATCH orders start ***
router.patch('/', async (req, res) => {
  let orders = await Orders.find({
    // title: { $regex: req.query.search || '' }
  })
	console.log('PATCH Orders')
  res.json(orders)
})
// *** end PATCH orders end ***

// Export module
module.exports = router
