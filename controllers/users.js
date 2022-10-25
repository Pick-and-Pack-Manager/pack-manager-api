// Import Packages
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')


const Users = require('../models/users.js')

// const app = express()

// Views
// *** Users are a part of this app. Full control allowed ***
// Need POST and GET. Can build PATCH and Delete later
// *** start POST Users start ***
router.post('/', async (req, res) => {
  let users = await Users.find({})
	console.log('POST Users')
  res.json(users)
})
// *** end POST Users end ***

// *** start GET Users start ***
router.post('/finduser', async (req, res) => {
	console.log('REQUESTED GET USER')
	console.log(req.body)
	let findUserById = null
	if (req.body.selectedUser._id == null) {
		findUserById = req.body.selectedUser.id
	} else findUserById = req.body.selectedUser._id
	console.log(findUserById)
  let user = await Users.findById(findUserById)
	console.log(user)
	res.json({user: {
		id: user._id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		storedAccess: user.permission,
		userName: user.userName,
		password: user.password,
		supervisor: user.userSupervisor,
	}})
})
// *** end GET Users end ***

// *** start GET Users start ***
router.get('/supervisors', async (req, res) => {
	console.log('GetSuper')
	// console.log(req.body)
  let users = await Users.find({permission: {
  						$gte: 'D'
						}})
  res.send(users)
})
// *** end GET Users end ***

// *** start GET Staff start ***
router.get('/staff', async (req, res) => {
  let staffUsers = await Users.find({})
	console.log(staffUsers)
  res.send(staffUsers)
})
// *** end GET Staff end ***

// *** start PATCH Users start ***
router.patch('/', async (req, res) => {
	console.log('PATCHUSER')
	console.log(req.body)
	let userSupervisorCheck = req.body.user.userSupervisor == undefined || req.body.user.userSupervisor == null? req.body.user.id : req.body.user.userSupervisor
	let update = await Users.findByIdAndUpdate({_id: req.body.user.id}, {
			_id: req.body.user.id,
 			firstName: req.body.user.firstName,
 			lastName: req.body.user.lastName,
 			email: req.body.user.email,
 			userName: req.body.user.userName,
 			password: req.body.user.password,
 			permission: req.body.user.accessLevel,
 			userSupervisor: this.userSupervisorCheck
	})
	// console.log(req.body)
	console.log(update)
  res.json({user: {
		id: update._id,
		firstName: update.firstName,
		lastName: update.lastName,
		email: update.email,
		storedAccess: update.permission,
		userName: update.userName,
		password: update.password,
		supervisor: update.userSupervisor,
	}})
})
// *** end PATCH Users end ***

// Export module
module.exports = router
