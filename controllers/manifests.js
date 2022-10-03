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

// Export module
module.exports = router
