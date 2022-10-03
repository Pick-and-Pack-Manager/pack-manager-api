// Import Packages
const express = require('express')
const router = express.Router()


const Inventory = require('../models/inventory.js')

// const app = express()

// Views
// Only GET allowed.
// *** start GET Inventory start ***
router.get('/', async (req, res) => {
  let inventory = await Inventory.find({})
	console.log('GET Inventory')
  res.json(inventory)
})
// *** end GET Inventory end ***

// Export module
module.exports = router
