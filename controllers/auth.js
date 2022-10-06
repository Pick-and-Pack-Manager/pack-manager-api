// Packages
const express = require('express')
const router = express.Router()

// Models
const Users = require('../models/users.js')

// Routes
// **** START ROUTES START ****
// **** START NESTED ROUTES START ****
// *** Login Page Start ***
router.get('/login', (req, res) => {
	console.log(req.body)
  res.render('login')
})

router.post('/login', async (req, res, next) => {
  try {
    // ** start code **
    // *** start define user ***
		console.log(req.body)
    let user = {
      email: req.body.user.email,
			password: req.body.user.password
    }
		    console.log(user)
    if (
      (await Users.findOne(user)) == null
    ) {
      // ** start handle true error ***
      console.log('BAD!!! NO Matching email or password')
			console.log(user)
      {
        throw new Error('Either email or password incorrect')
      }
      // ** end handle true error ***
    } else {
      let loggedUser = await Users.findOne({
        email: req.body.user.email,
        password: req.body.user.password
      })
      // *** start handle signin ***
      req.login(loggedUser, err => {
        if (err) {
          throw err
        }
      })
      console.log('LOGGED IN USER:  ' + req.body)
      res.redirect('/orders')
      // *** End handle Signin ***
    }
    // *** start find database user ***
    let userDatabase = await Users.findOne({
      email: req.body.email,
      password: req.body.password
    })
    console.log(userDatabase)
    // *** end find database user ***
    // *** end define user ***
    // ** end code **
  } catch (err) {
    next(err)
  }
})
// *** Login Page End ***

// *** Signup Page Start ***
router.get('/signup', (req, res) => {
  res.render('signup')
})

router.post('/signup', async (req, res, next) => {
  try {
    // *** start define user ***
    let user = {
      avatar: req.body.profilePicture,
      email: req.body.profileEmail,
      name: req.body.profileFullname,
      password: req.body.profilePassword
    }
    // *** end define user ***
    // *** start USER EXISTS ***
    // *** Start check if user already ***
    if ((await Users.countDocuments({ email: user.email })) > 0) {
      console.log(
        'BAD!!! MATCHING USER FOUND' +
          ' Num Found: ' +
          ((await Users.countDocuments({ email: user.email })) +
            ' User Email: ' +
            user.email)
      )
      {
        throw new Error(
          'User with this email already exists' +
            'BAD!!! MATCHES FOUND' +
            ' - Num Found: ' +
            ((await Users.countDocuments({ email: user.email })) +
              ' User Email: ' +
              user.email)
        )
      }
      // *** end USER EXISTS ***
    } else {
      // *** start NEW USER ***
      console.log('USER TO CREATE')
      // *** Start handle signup ***
      let userCreate = await Users.create(user)
      let loggedUser = await Users.findOne({ email: user.email })
      req.login(loggedUser, err => {
        if (err) {
          throw err
        }
      })
      console.log('LOGGED IN USER:  ' + req.user)
      res.redirect('/houses')
      // *** End handle Signup
      // *** end NEW USER ***
    }
  } catch (err) {
    next(err)
  }
})
// *** Signup Page End ***
// *** Logout Page Start ***
router.get('/logout', (req, res) => {
  req.logout()
  req.session.destroy(err => {
    if (err) {
      next(err)
    }
    res.clearCookie('connect.sid')
    // continue coding here
    res.redirect('login')
    console.log('USER LOGGED OUT')
  })
})
// *** Logout Page End ***
// **** END NESTED ROUTES END ****

// **** END ROUTES END ****

// Export
module.exports = router
