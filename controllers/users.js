// Import Packages
const express = require('express')
const router = express.Router()


const Users = require('../models/users.js')

// const app = express()

// Views
// *** Users are a part of this app. Full control allowed ***
// Need POST and GET. Can build PATCH and Delete later
// *** start POST Users start ***
router.post('/', async (req, res) => {
  let users = await Users.find({
    // title: { $regex: req.query.search || '' }
  })
	console.log('POST Users')
  res.json(users)
})
// *** end POST Users end ***

// *** start GET Users start ***
router.get('/', async (req, res) => {
  let users = await Users.find(req.body)
  res.send(users)
})
// *** end GET Users end ***

// *** start PATCH Users start ***
router.patch('/', async (req, res) => {
  let users = await Users.find({
    // title: { $regex: req.query.search || '' }
  })
	console.log('PATCH Users')
  res.json(users)
})
// *** end PATCH Users end ***

// Export module
module.exports = router
