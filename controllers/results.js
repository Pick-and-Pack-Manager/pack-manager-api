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
      url: 'https://tortugacoders.com/',
      links: [
        {
          title: 'Apply',
          url: 'https://tortugacoders.com/apply'
        },
        {
          title: 'Wed Dev Courses',
          url: 'https://tortugacoders.com/courses'
        }
      ]
    },
    {
      title: 'Wikipedia',
      description:
        'JavaScript is a high-level, often just-in-time compiled language that conforms to the ECMAScript standard.',
      url: 'https://en.wikipedia.org/wiki/JavaScript',
      links: [
        {
          title: 'Javascript Syntax',
          url: 'https://en.wikipedia.org/wiki/JavaScript_syntax'
        },
        {
          title: 'JS for the Web Cool!',
          url: 'https://www.w3schools.com/js'
        }
      ]
    },
    {
      title: 'Code Wars',
      description:
        'Improve your development skills · by training with your peers on code kata that continuously challenge and push your coding practice',
      url: 'https://www.codewars.com/',
      links: [
        {
          title: 'Log In',
          url: 'https://www.codewars.com/users/sign_in'
        },
        {
          title: 'Basic Python',
          url: 'https://www.codewars.com/collections/basic-python'
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
