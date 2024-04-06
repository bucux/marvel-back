



import express from 'express';
import { getAxios } from '../libs/axios.js';
import dotenv from 'dotenv';
dotenv.config();

const routerCharacters = express.Router();

routerCharacters.get('/characters', async (req, res) => {
  let suffixe = 'characters?limit=100&skip=' + req.query.skip + '&'
  if(req.query.name){suffixe += ('name=' + req.query.name + '&')}
  const datas = await getAxios(suffixe); 
  res.status(200).json(datas)
})

routerCharacters.get('/character/:id', async (req, res) => {
  const datas = await getAxios(`character/${req.params.id}?`); 
  res.status(200).json(datas)
})


export default routerCharacters;