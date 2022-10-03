// Import Packages
const express = require('express')
const router = express.Router()


const Orders = require('../models/orders.js')

// const app = express()

// Views
// *** Orders are pulled from external source (SAP B1 in this case) so limited updating allowed  Only Issued, IssuedQty, IssuedDate, IssuedBalance, FreeText, PackageID, ManifaestID***
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
