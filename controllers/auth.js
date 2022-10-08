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
	console.log(res.data)
  // res.render('login')
})

router.post('/login', async (req, res, next) => {
  try {
    // ** start code **
    // *** start define user ***
		// console.log(req.body)
    let user = {
      email: req.body.user.email,
			password: req.body.user.password
    }
		    // console.log(user)
    if (
      (await Users.findOne(user)) == null
    ) {
      // ** start handle true error ***
      // console.log('BAD!!! NO Matching email or password')
			res.send(
				{
					error: 'Either email or password incorrect. Speak to your Supervisor or Manager',
					loggedIn: false
				})
      {
        throw new Error('Either email or password incorrect')
      }
      // ** end handle true error ***
    } else {
			let loggedUser = await Users.findOne({
        email: user.email,
        password: user.password
      })
			if (loggedUser.permission =='A' || loggedUser.permission == null) {
				res.send(
					{
						error: 'Email and Password correct. But you do not have the correct access. Speak to your Supervisor or Manager',
						loggedIn: false
				})
			} else

				// *** start handle signin ***
				req.login(loggedUser, async err => {
					if (err) {
						throw err
					}
					let userDb = await Users.findById(loggedUser._id)
					// console.log(userDb)
					res.send(
						{user: {
							fullName: userDb.firstName + " " + userDb.lastName,
							firstName: userDb.firstName,
							lastName: userDb.lastName,
							email: userDb.email,
							permission: userDb.permission
						},
						loggedIn: true
				})
				})
				// *** end handle signin ***

			// console.log(loggedUser._id)
		}
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
				res.send(loggedUser)
      })
      // console.log('LOGGED IN USER:  ' + req.user)

      // *** End handle Signup
      // *** end NEW USER ***
    }
  } catch (err) {
    next(err)
  }
})
// *** Signup Page End ***
// *** Logout Page Start ***
router.get('/logout', (req, res, next) => {
	try {
		req.logout(err => {
			if (err) {
				next(err)
			} else {
				req.session.destroy(err => {
					if (err) {
						next(err)
					}
					res.clearCookie('connect.sid')

					// continue coding here
					res.send('yourlogged out')
				})
			}
		})

	} catch (err) {
		next (err)
	}
})
// *** Logout Page End ***
// **** END NESTED ROUTES END ****

// **** END ROUTES END ****

// Export
module.exports = router
