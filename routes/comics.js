


import express from 'express'
import { getAxios } from '../libs/axios.js';
import dotenv from 'dotenv';
dotenv.config();

const routerComics = express.Router()

routerComics.get('/comics', async (req, res) => {
  let suffixe = 'comics?limit=100&skip=' + req.query.skip + '&'
  if(req.query.title){suffixe += ('title=' + req.query.title + '&')}
  const datas = await getAxios(suffixe); 
  res.status(200).json(datas)
})

routerComics.get('/comic/:id', async (req, res) => {
  const datas = await getAxios(`comic/${req.params.id}?`); 
  res.status(200).json(datas)
})

export default routerComics;