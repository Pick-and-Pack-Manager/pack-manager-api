const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// *** Users are a part of this app. Full control allowed ***
let usersModel = mongoose.model('users', {
  email: {
    type: String,
    required: true
  },
	password: {
    type: String,
    required: true
  },
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	createdDate: {
		type: Date,
		default: Date.now
	},
	createdBy: {
    type: ObjectId,
    ref: 'users'
  },
	permission: {
		type: String,
		default: 'A'
		// A - No Access, B - Basic Access, C - Supervisor. If A or Null no Access
	},


})
module.exports = usersModel
