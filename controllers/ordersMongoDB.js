// Import Packages
const express = require('express')
const router = express.Router()
const moment = require('moment')


const Orders = require('../models/orders.js')

// const app = express()

// Views
// *** Orders are pulled from external source (SAP B1 in this case) so limited updating allowed  Only Issued, IssuedQty, IssuedDate, IssuedBalance, FreeText, PackageID, ManifaestID***
// *** start GET orders start ***
router.post('/', async (req, res, next) => {
	try {
		if (req.isAuthenticated()) {
			console.log(req.body)
			// DELETE NULL FROM body
			if (req.body.kittingRoute == "all" || req.body.kittingRoute == null || req.body.kittingRoute == undefined) {
				delete req.body.kittingRoute
			}
			// DELETE NULL FROM body
			if (req.body.completingRoute == "all" || req.body.completingRoute == null || req.body.completingRoute == undefined) {
				delete req.body.completingRoute
			}
			// DELETE NULL FROM body
			if (req.body.despatchRoute == "all" || req.body.despatchRoute == null || req.body.despatchRoute == undefined || req.body.despatchRoute == 'DESP1') {
				delete req.body.despatchRoute
			}
			if (req.body.kittingDate == "all" || req.body.kittingDate == null || req.body.kittingDate == undefined) {
				delete req.body.kittingDate
			} else {
      req.body.kittingDate = {
				$gte: moment(req.body.kittingDate).format('YYYY-MM-DD'),
				$lt: moment(req.body.kittingDate).add(1, "days").format('YYYY-MM-DD')
			}
		}	if (req.body.completingDate == "all" || req.body.completingDate == null || req.body.completingDate == undefined) {
						delete req.body.completingDate
					} else {
						req.body.completingDate = {
							$gte: moment(req.body.completingDate).format('YYYY-MM-DD'),
							$lt: moment(req.body.completingDate).add(1, "days").format('YYYY-MM-DD')
						}
		}	if (req.body.despatchDate == "all" || req.body.despatchDate == null || req.body.despatchDate == undefined) {
						delete req.body.despatchDate
					} else {
						req.body.despatchDate = {
							$gte: moment(req.body.despatchDate).format('YYYY-MM-DD'),
							$lt: moment(req.body.despatchDate).add(1, "days").format('YYYY-MM-DD')
						}
				}
			let orders = await Orders.find(req.body)
			console.log(orders)
			let sortedOrders = orders.sort((a, b) => new Date(a.docDueDate) - new Date(b.docDueDate))
			console.log(orders)

			res.json(sortedOrders)
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
			console.log(res)
			res.json({errorMessage: 'LOGGED IN USER NOT AUTHENTICATED!!! Log out and try again'})
			throw new Error('Not Logged In')
		}
	} catch (err) {next(err)}
})
// *** end PATCH orders end ***

// Export module
module.exports = router
