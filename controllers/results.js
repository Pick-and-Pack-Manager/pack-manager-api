// Import Packages
// *** FIRST DAY TEST START ***
const express = require('express')
const router = express.Router()
// *** FIRST DAY TEST END ***
// Create POST controller
// *** FIRST DAY TEST START ***

router.get('/', (req, res) => {
  // *** RESULTS TEST ARRAY START ***
  let results = [
    {
      title: 'JS tutorials',
      description: 'The best JavaScript tutorials in the galaxy!',
      url: 'https://www.w3schools.com',
      links: [
        {
          title: 'JS for Beginners',
          url: 'https://www.w3schools.com/js'
        },
        {
          title: 'JS for the Web',
          url: 'https://www.w3schools.com/js'
        }
      ]
    },
    {
      title: 'Tortuga Coders',
      description: 'F&#k it!, Its Real!',
      url: 'https://www.Tortuga Coders.com',
      links: [
        {
          title: 'JS for Beginners',
          url: 'https://www.TC.com/js'
        },
        {
          title: 'JS for the Web',
          url: 'https://www.TCs.com/CSS'
        },
        {
          title: 'Kyles TEST',
          url: 'https://www.TCs.com/CSS'
        }
      ]
    },
    {
      title: 'Wikipedia',
      description: 'Wiki is real',
      url: 'https://www.wikipedia.com',
      links: [
        {
          title: 'JS for Beginners',
          url: 'https://www.w3schools.com/js'
        },
        {
          title: 'JS for the Web Cool!',
          url: 'https://www.w3schools.com/js'
        }
      ]
    }
  ]
  // *** RESULTS TEST ARRAY END ***
  res.render('results', { results })
})
// *** FIRST DAY TEST END ***
// Export module
// *** FIRST DAY TEST START ***
module.exports = router
// *** FIRST DAY TEST END ***
