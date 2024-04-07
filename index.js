

import express from 'express'
import cors from 'cors'
const app = express() 
import routerCharacters from './routes/characters.js';
import routerComics from './routes/comics.js';
import routerUser from './routes/user.js';
import routerFav from './routes/fav.js';
const PORT = process.env.PORT ? process.env.PORT : 3000

app.use(cors())
app.use(express.json())
app.use(routerComics)
app.use(routerCharacters)
app.use(routerUser)
app.use(routerFav)

app.all('*', (req, res)=>{
  res.status(404).json({message: 'page inexistante'})
})

app.listen(PORT, ()=>{console.log(`server ok sur port ${PORT}`)})
