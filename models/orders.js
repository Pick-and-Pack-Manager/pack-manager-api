const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// *** Orders are pulled from external source (SAP B1 in this case) so limited updating allowed  Only Issued, IssuedQty, IssuedDate, IssuedBalance, FreeText, PackageID, ManifaestID***
let ordersModel = mongoose.model('orders', {
	docNum: {
		type: String,
		required: true,
	},
	docDueDate: {
		// Date Order is Due for Delivery (Order closed on/before this date)
		type: Date,
		required: true
	},
	kittingDate: {
		type: Date,
		required: true
	},
	completingDate: {
		type: Date,
		required: true
	},
	orderItems: [{
		// ARRAY of all Items on the Sales Order. RDR1
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
			// amount Picked from this line. Could be more than required and line will be closed. Or Less and Line still open
			type: Number
		},
		issuedBalance: {
			// difference between required and Picked (IssuedQty)
			type: Number
		},
		freeText: {
			type: String,
		},
		shippingType: {
			type: String
		},
		shippingProvider: {
			type: String
		},
		shippingDestination: {
			type: String
		},
		packageId: {
			type: ObjectId,
			ref: 'packages'
		},
		manifestId: {
			type: ObjectId,
			ref: 'manifests'
		}
	}],
	customer: {
		cardCode: {
			// unique identifier for Customers
			type: String,
			required: true
		},
		cardName: {
			// Name of Customer
			type: String,
			required: true
		},
		cardType: {
			type: String,
		},
		cardGroup: {
			type: Number,
		},
	},
	orderComments: {
		type: String
	},
	orderCategory: {
		type: String
	},
	kittingRoute: {
		// this is which area of the Business is Picking. KIT1 = Domestic, KIT2 = Commercial/Export, KIT3 = USA,
		type: String,
		required: true
	},
	completingRoute: {
		// this is which area of the Business is Completing. COM1 = Domestic, COM2 = Commercial/Export, COM3 = USA,
		type: String,
		required: true
	}
})

module.exports = ordersModel
