const mongoose = require('mongoose')
// setting up our User Schema, each user will have a microsoftID and displayName associated with their login account, which is saved in our DB
const UserSchema = new mongoose.Schema({
  microsoftId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('User', UserSchema)
