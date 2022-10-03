const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

let manifestModel = mongoose.model('manifests', {
// This is where Items are added to a Shipment. Common types = Container, Trailer, Pallet.
	manifestType: {
		// this is the type of Package. Common types = Container, Trailer, Pallet.
		type: String,
		required: true
	},
	manifestDescripton: {
		// User entered description of the Package. Could be Box identifier or description of what is in it like Truck Number
		type: String,
	},
	manifestOrderInfo: {
		// Order information recorded against the Manifest
		type: ObjectId,
		ref: 'orders',
		required: true
	},
	manifestPhotos: [{
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
		// Items Picked into this Manifest. These will all be in a Package. If the Item was not previously added to a package and selected to be added to this Manifest. 1st - FreeItem type created in Packages and then that ID added to Manifest
		manifestUser: {
			// ID of user who picked this package
			type: ObjectId,
			ref: 'users'
		},
		manifestDate: {
			type: Date,
			default: Date.now
		},
		package: {
			type: ObjectId,
			ref: 'packages',
			required: true
		}
	}]
})

module.exports = manifestsModel
