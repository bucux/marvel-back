

import mongoose from '../libs/mongo.js' // une instance unique et déjà connectée de moogoose

const User = mongoose.model('User', {
  email: String,
  account: {
    username: String,
    avatar: Object, 
  },
  token: String,
  hash: String,
  salt: String,
})

export default User