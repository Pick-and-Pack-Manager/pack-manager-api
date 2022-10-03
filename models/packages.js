const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// *** Packages are a part of this app. Full Control Allowed ***
let packagesModel = mongoose.model('packages', {
// Packages are the smallest Boxes that Items can be packages into. example - bags, boxes
	packType: {
		// this is the type of Package. Can be Bag, Box, NokiaBox, Pallet. (If free added to Manifest they will also be "FreeItem", but "freeItem not an option during Picking/Kitting")
		type: String,
		required: true
	},
	packDescripton: {
		// User entered description of the Package. Could be Box identifier or description of what is in it
		type: String,
	},
	packOrderInfo: {
		// Order information recorded against the Package
		type: ObjectId,
		ref: 'orders',
		required: true
	},
	packPhotos: [{
		photoUrl: {
			type: String
		},
		photoTime: {
			type: Date,
			default: Date.now
		},
		photoUser: {
			// Who took photos
			type: ObjectId,
			ref: 'users'
		}
	}],
	pickedItems: [{
		// Items Picked into this Package
		pickingUser: {
			// ID of user who picked this part
			type: ObjectId,
			ref: 'users'
		},
		pickingDate: {
			type: Date,
			default: Date.now
		},
		lineNum: {
			// This is important as it identifies the line on the Order. Kind of like an ID you that row. Same ItemCode may be on the Order more than once so this identifies that.
			type: Number,
			required: true
		},
		itemCode: {
			type: String,
			required: true
		},
		itemDescription: {
			type: String,
			required: true
		},
		qtyReq: {
			type: Number,
			required: true
		},
		invWhse: {
			// Warehouse Stock is taken from when Picked.
			type: String,
			required: true
		},
		delWhse: {
			type: String,
		},
		issued: {
			// this is whether the Item has been picked. Y for fully Picked. This is where we can close the line for this tool
			type: String,
			default: 'N'
		},
		issuedQty: {
			// amount Picked into this Package. Sales Order could have a different amount
			type: Number,
			required: true
		},
		issuedBalance: {
			// difference between required and Picked (IssuedQty) at time of Picking this package
			type: Number,
			required: true
		}
	}]
})

module.exports = packagesModel
