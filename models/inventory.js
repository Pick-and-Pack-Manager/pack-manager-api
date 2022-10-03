const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// *** Inventory is pulled from external source (SAP B1) and cannot be updated only read ***
let inventoryModel = mongoose.model('inventory', {
  itemCode: {
    type: String,
    required: true
  },
	description: {
    type: String,
  },
	itemProperties: {
		itemGroup: {
			type: String,
			required: true
		},
		itemCode: {
			type: Number,
		}
	},
	inactive: {
		type: String,
		required: true
		// Y = inactive, N = active
	},
	inventoryItem: {
		type: String,
		required: true
		// Y = Inventory Item (Stock Tracking), N = Non-Inventory (Text or descriotive - No Stock Tracking)
	},
	inventoryAmounts: [{
		whseCode: String,
		onHand: Number
	}],
})

module.exports = inventoryModel
