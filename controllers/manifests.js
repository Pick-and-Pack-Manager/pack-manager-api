// Import Packages
const express = require('express')
const router = express.Router()


const Manifests = require('../models/manifests.js')

// const app = express()

// Views
// *** Manifests are a part of this app. Full Control Allowed ***
// *** start GET Manifests start ***
router.get('/', async (req, res) => {
  let manifests = await Manifests.find({})
	console.log('GET Manifests')
  res.json(manifests)
})
// *** end GET Manifests end ***

// *** start POST Manifests start ***
router.post('/', async (req, res) => {
  // let manifests = await Manifests.find({})
	console.log('POST Manifests')
  res.json(manifests)
})
// *** end POST Manifests end ***

// *** start PATCH Manifests start ***
router.patch('/', async (req, res) => {
  // let manifests = await Manifests.find({})
	console.log('PATCH Manifests')
  res.json(manifests)
})
// *** end PATCH Manifests end ***

// *** start DELETE Manifests start ***
router.delete('/', async (req, res) => {
  // let manifests = await Manifests.find({})
	console.log('DELETE Manifests')
  res.json(manifests)
})
// *** end DELETE Manifests end ***

// Export module
module.exports = router
