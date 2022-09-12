// Import Packages
// *** FIRST DAY TEST START ***
const express = require('express')
const router = express.Router()
// *** FIRST DAY TEST END ***
// Create POST controller
// *** FIRST DAY TEST START ***
router.get('/', (req, res) => {
  res.render('results')
})
// *** FIRST DAY TEST END ***
// Export module
// *** FIRST DAY TEST START ***
module.exports = router
// *** FIRST DAY TEST END ***
