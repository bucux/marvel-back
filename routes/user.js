
import express from 'express'
import sha256 from 'crypto-js/sha256.js'
import encBase64 from 'crypto-js/enc-base64.js'
import uid2 from 'uid2'
import User from '../models/User.js'
import isAuth from '../middles/auth.js'

const routerUser = express.Router()

routerUser.get('/user', async (req, res) => { // liste complète des users
  try{
    const liste = await User.find()
    res.status(200).json(liste)
  }catch (error){res.status(500).json({error: error.message})}
})

routerUser.get('/user/handshake', isAuth, async (req, res) => { // vérification du cookie sans attendre le login, et communication de l'username si ok
  res.status(200).json(req.user) // req.user est fourni par isAuth
})

routerUser.post('/user/signup', async (req, res) => { // inscription des users
  try{
    const {username, email, password} = req.body
    if(username && email && password){
      const user = await User.findOne({email})
      if(!user){
        const salt = uid2(16)
        const hash = sha256(password + salt).toString(encBase64)
        const token = uid2(16)
        const newUser  = new User({
          email,
          username,
          token,
          hash, 
          salt
        })
        await newUser.save()
        res.status(200).json({
          _id: newUser._id,
          token,
          username,
        })
      }else{throw new Error ('Cet email existe déjà.')}
    } else{throw new Error ("Email, username et password requis.")}
  } catch(error){res.status(500).json(error.message)}
})

routerUser.post('/user/login', async (req, res) => { // connextion des users
  try{
    const {email, password} = req.body
    if(email && password){
      const user = await User.findOne({email})
      if(user){
        const {salt, hash, token, _id, username} = user
        const hash2 = sha256(password + salt).toString(encBase64)
        if(hash2 === hash){
          const token2 = uid2(16)  
          user.token = token2 // on renouvelle le token de l'utilisateur
          await user.save()
          res.status(200).json({
            _id: user._id,
            token: token2,
            username
          })
        }else{throw new Error ("Password incorrect")}
      }else{throw new Error ("Cet email n'existe pas, veuillez vous signup.")}
    } else{throw new Error ("Email et password requis.")}
  } catch(error){res.status(500).json(error.message)}
})

export default routerUser