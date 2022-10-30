// Import Packages
const express = require('express')
const router = express.Router()

// *** PASTE BACK INTO CONTROLLERS FOLDER WHEN NEEDED ***
const Inventory = require('../models/inventory.js')

const app = express()
let toAdd = [
	
]

// Views
// *** Inventory is pulled from external source (SAP B1) and cannot be updated only read ***
// *** start GET Inventory start ***
router.get('/', async (req, res) => {
  let inventory = await Inventory.create(toAdd)
	console.log('Create Inventory')
	console.log(toAdd)
  res.json(inventory)
})
// *** end GET Inventory end ***

// Export module
module.exports = router
