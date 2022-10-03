// Import Packages
const express = require('express')
const router = express.Router()


const Packages = require('../models/packages.js')

// const app = express()

// Views
// *** Packages are a part of this app. Full Control Allowed ***
// *** start GET Packages start ***
router.get('/', async (req, res) => {
  let packages = await Packages.find({})
	console.log('GET Packages')
  res.json(packages)
})
// *** end GET Packages end ***

// *** start POST Packages start ***
router.post('/', async (req, res) => {
  let packages = await Packages.find({})
	console.log('POST Packages')
  res.json(packages)
})
// *** end POST Packages end ***

// *** start PATCH Packages start ***
router.patch('/', async (req, res) => {
  let packages = await Packages.find({})
	console.log('PATCH Packages')
  res.json(packages)
})
// *** end PATCH Packages end ***

// *** start DELETE Packages start ***
router.delete('/', async (req, res) => {
  let packages = await Packages.find({})
	console.log('DELETE Packages')
  res.json(packages)
})
// *** end DELETE Packages end ***

// Export module
module.exports = router
