// Import Packages
const express = require('express')
const router = express.Router()


const Packages = require('../models/packages.js')

// const app = express()

// Views
// *** start GET Packages start ***
router.get('/', async (req, res) => {
  let packages = await Packages.find({})
	console.log('GET Packages')
  res.json(packages)
})
// *** end GET Packages end ***

// Export module
module.exports = router
