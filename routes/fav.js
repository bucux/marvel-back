

import express from 'express'
import User from '../models/User.js';
import isAuth from '../middles/auth.js';

const routerFav = express.Router()

routerFav.get('/fav/comics', isAuth, async (req, res) => { // cette route va renvoyer la liste complète des comics favoris de l'user
  try {
    const user = await User.findById(req.user._id)
    res.status(200).json(user.idComics)
  } catch (error) { res.status(500).json({message: error.message}) }
})

routerFav.get('/fav/heros', isAuth, async (req, res) => { // cette route va renvoyer la liste complète des heros favoris de l'user
  try {
    const user = await User.findById(req.user._id)
    res.status(200).json(user.idHeros)
  } catch (error) { res.status(500).json({message: error.message}) }
})

routerFav.get('/fav/comic/:id', isAuth, async (req, res) => { // cette route va toggle le comic dans les favoris de l'user
  try {
    const user = await User.findById(req.user._id)
    const id = req.params.id
    const index = user.idComics.indexOf(id)
    if (index > -1) { user.idComics.splice(index, 1) }// Si l'ID est trouvé, retirer le comic des favoris      
    else { user.idComics.push(id) } // Sinon, ajouter l'ID du comic aux favoris
    await user.save(); // Sauvegarder les modifications dans la base de données
    res.status(200).json(user.idComics)
  } catch (error) { res.status(500).json({message: error.message}) }
})

routerFav.get('/fav/hero/:id', isAuth, async (req, res) => { // cette route va toggle le hero dans les favoris de l'user
  try {
    const user = await User.findById(req.user._id)
    const id = req.params.id
    const index = user.idHeros.indexOf(id)
    if (index > -1) { user.idHeros.splice(index, 1) }// Si l'ID est trouvé, retirer le héro des favoris      
    else { user.idHeros.push(id) } // Sinon, ajouter l'ID du hero aux favoris
    await user.save(); // Sauvegarder les modifications dans la base de données
    res.status(200).json(user.idHeros)
  } catch (error) { res.status(500).json({message: error.message}) }
})

export default routerFav