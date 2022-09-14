// *** TEST ARRAY START***
let resultsTest = [
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
// *** TEST ARRAY END ***

// *** TEST FILTER START ***
// *** FILTER START ***
const filterResults = (array, search) => {
  let newArray = []
  array.forEach((obj, ind) => {
    if (obj.title.includes(search)) {
      newArray.push(obj)
    }
  })
  let resultQty = newArray.length
  return newArray
}

const resultQty = (array, search) => {
  let newArray = []
  array.forEach((obj, ind) => {
    if (obj.title.includes(search)) {
      newArray.push(obj)
    }
  })
  let resultQty = newArray.length
  if (resultQty == 0 || resultQty > 1) {
    return resultQty + ' Results'
  } else {
    return resultQty + ' Result'
  }
}
// *** FILTER END ***
// *** TEST FILTER END ***

// Import Packages
const express = require('express')
const router = express.Router()
// Create POST controller
router.post('/', (req, res) => {
  let searched = req.body.search
  res.render('results', {
    resultsData: filterResults(resultsTest, searched),
    resultAmount: resultQty(resultsTest, searched)
  })
})

router.get('/', (req, res) => {
  // res.render('results', { results })
})
// Export module
module.exports = router
