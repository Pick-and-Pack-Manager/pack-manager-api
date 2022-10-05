// Import Packages
const express = require('express')
const router = express.Router()

// *** PASTE BACK INTO CONTROLLERS FOLDER WHEN NEEDED ***
const Orders = require('../models/orders.js')

const app = express()
let toAdd = [

]

// Views
// *** Orders are pulled from external source (SAP B1 in this case) so limited updating allowed  Only Issued, IssuedQty, IssuedDate, IssuedBalance, FreeText, PackageID, ManifaestID***

// *** start GET Orders start ***
router.get('/', async (req, res) => {
  let orders = await Orders.create(toAdd)
	console.log('Adding Orders')
	console.log(toAdd)
  res.json(orders)
})
// *** end GET Orders end ***

// Export module
module.exports = router
