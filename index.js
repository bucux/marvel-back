

import express from 'express'
import cors from 'cors'
const app = express() // cette ligne doit être placée avant les requires des routes, car fileUpload dans offer.js ferait planter le serveur

import routerCharacters from './routes/characters.js';
import routerComics from './routes/comics.js';
const PORT = process.env.PORT ? process.env.PORT : 3000

app.use(cors())
app.use(express.json())
app.use(routerComics)
app.use(routerCharacters)
// app.use(routerLogin)
// app.use(routerFavoris)

app.all('*', (req, res)=>{
  res.status(404).json({message: 'page inexistante'})
})

app.listen(PORT, ()=>{console.log(`server ok sur port ${PORT}`)})
