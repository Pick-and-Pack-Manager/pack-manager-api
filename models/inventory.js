const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

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
			required: true
		}
	},
	active: {
		type: String,
		required: true
		// Y = Active, N = Inactive
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
