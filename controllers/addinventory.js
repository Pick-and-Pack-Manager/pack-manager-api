// Import Packages
const express = require('express')
const router = express.Router()

// *** PASTE BACK INTO CONTROLLERS FOLDER WHEN NEEDED ***
const Inventory = require('../models/inventory.js')

const app = express()
let toAdd = [
	{itemCode: '24X23HFB',description: 'Hatch Flooring - Part B - for 2.4 x 2.3 Platform',itemProperties: {itemGroup: 'Admin', groupCode: 114, qryGroup64: 'Y'},inactive: 'N',inventoryItem: 'Y',inventoryAmounts: []},
	{itemCode: '24X23HFB38.005',description: 'Hatch Flooring - Part B - for 2.4 x 2.3 Platform - STDA-PLT-38-005',itemProperties: {itemGroup: 'Admin', groupCode: 114, qryGroup64: 'Y'},inactive: 'N',inventoryItem: 'Y',inventoryAmounts: []},
	{itemCode: '24X23HFC',description: 'Hatch Flooring - Part C - for 2.4 x 2.3 Platform',itemProperties: {itemGroup: 'Admin', groupCode: 114, qryGroup64: 'Y'},inactive: 'N',inventoryItem: 'Y',inventoryAmounts: []},

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
