// Import Packages
const express = require('express')
const router = express.Router()


const Orders = require('../models/orders.js')

// const app = express()

// Views
// *** Orders are pulled from external source (SAP B1 in this case) so limited updating allowed  Only Issued, IssuedQty, IssuedDate, IssuedBalance, FreeText, PackageID, ManifaestID***
// *** start GET orders start ***
router.post('/', async (req, res, next) => {
	try {
		if (req.isAuthenticated()) {
			// DELETE NULL FROM body
			if (req.body.kittingRoute == "all" || req.body.kittingRoute == null || req.body.kittingRoute == undefined) {
				delete req.body.kittingRoute
			}
			// DELETE NULL FROM body
			if (req.body.completingRoute == "all" || req.body.completingRoute == null || req.body.completingRoute == undefined) {
				delete req.body.completingRoute
			}
			// DELETE NULL FROM body
			if (req.body.despatchRoute == "all" || req.body.despatchRoute == null || req.body.despatchRoute == undefined) {
				delete req.body.despatchRoute
			}
			let orders = await Orders.find(req.body)
			console.log('POST Orders')
			console.log(req.body)
			res.json(orders)
		} else {
			console.log('User not logged in')
			res.json({errorMessage: 'LOGGED IN USER NOT AUTHENTICATED!!! Log out and try again'})
			throw new Error('Not Logged In')
		}


	} catch (err) {next(err)}
})
// *** end GET orders end ***

// *** start PATCH orders start ***
router.patch('/', async (req, res, next) => {
	try {
		if (req.isAuthenticated()) {
			console.log('PATCH Orders')
			let updateOrder = await Orders.findByIdAndUpdate({_id: req.body.order._id}, {
					orderItems: req.body.order.orderItems,
			})
			console.log(updateOrder)
			res.json(updateOrder)
		} else {
			console.log('User not logged in')
			res.json({errorMessage: 'LOGGED IN USER NOT AUTHENTICATED!!! Log out and try again'})
			throw new Error('Not Logged In')
		}
	} catch (err) {next(err)}
})
// *** end PATCH orders end ***

// Export module
module.exports = router
