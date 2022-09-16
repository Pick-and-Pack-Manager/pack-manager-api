const mongoose = require('mongoose')

// Create the results moodel
mongoose.model('results', {
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  links: [
    {
      title: String,
      url: String
    }
  ]
})
