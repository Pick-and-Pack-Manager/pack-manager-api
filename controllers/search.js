// Packages
const express = require('express')
const router = express.Router()
// const app = express()

// Views
// Create here a controller that accepts GET requests and renders the "search" page

// *** SEARCH BEFORE CLASS TEST START ***
router.get('/', (req, res) => {
  res.render('search')
})
// *** SEARCH BEFORE CLASS TEST END ***

// Export
module.exports = router
