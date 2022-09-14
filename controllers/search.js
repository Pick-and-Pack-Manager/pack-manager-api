// Packages
const express = require('express')
const router = express.Router()
// const app = express()

// Views
// Create here a controller that accepts GET requests and renders the "search" page
router.get('/', (req, res) => {
  res.render('search')
})

// Export
module.exports = router
