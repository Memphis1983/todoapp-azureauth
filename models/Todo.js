const mongoose = require('mongoose')

// setting up a new mongoose Schema for our todolist
const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  microsoftId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Todo', TodoSchema)
