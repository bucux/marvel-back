

import mongoose from '../libs/mongo.js' // une instance unique et déjà connectée de moogoose

const User = mongoose.model('User', {
  email: String,
  username: String,
  token: String,
  hash: String,
  salt: String,
  idHeros: {
    type: [String],
    default: [''] 
  },
  idComics: {
    type: [String],
    default: [''] 
  },
})

export default User
