// Import Packages
const express = require('express')
const router = express.Router()


const Users = require('../models/users.js')

// const app = express()

// Views
// Need POST and GET. Can build PATCH and Delete later
// *** start POST orders start ***
router.post('/', async (req, res) => {
  let users = await Users.find({
    // title: { $regex: req.query.search || '' }
  })
	console.log('POST Users')
  res.json(users)
})
// *** end POST orders end ***

// *** start GET orders start ***
router.post('/', async (req, res) => {
  let users = await Users.find({
    // title: { $regex: req.query.search || '' }
  })
	console.log('GET Users')
  res.json(users)
})
// *** end GET orders end ***

// *** start PATCH orders start ***
router.patch('/', async (req, res) => {
  let users = await Users.find({
    // title: { $regex: req.query.search || '' }
  })
	console.log('PATCH Users')
  res.json(users)
})
// *** end PATCH orders end ***

// Export module
module.exports = router
