/*
It should log ALL requests received to the console.
It should also serve static pages from a local folder called public
*/
import Express, { query } from 'express'
import fs from 'fs'

import queryDatabase from '../data/mongoController.js'

try {
  queryDatabase(async db => {
    const data = await db.collection('Games').find({}).toArray()
    console.log('Games retrieved:', data.length)
  }, 'boardGameGeek')
} catch(err) {
  console.error('Failed to connect to database')
  console.error(err)
}

const gameRouter = new Express.Router()

// const rawJSON = fs.readFileSync('./server/games.json', { encoding: 'utf-8' })
// const fourHundoGames = JSON.parse(rawJSON)

gameRouter.use(Express.json())

// get endpoint for All Games
gameRouter.get('/bggGames', (req, res) => {

  queryDatabase(async db => {
    const data = await db.collection('Games').find({}).project(
      {_id:0, id:1, name:1, rating:1, year:1, thumb:1, publisher:1}
    ).toArray()
    res.json(data)
  }, 'boardGameGeek')
})

// get endpoint for singular game
gameRouter.get('/bggGames/:gameID', (req, res) => {
  const gameID = parseInt(req.params.gameID)

  queryDatabase(async db => {
    const data = await db.collection('Games').find({id: gameID}).toArray()

    if (Array.isArray(data) && data.length > 0) {

      res.json(data)
    } else {

      res.status(404).json({ error: true, message: `Game Id ${gameID} not found` })
    }
  }, 'boardGameGeek')
})

// put endpoint to accept a new game object
gameRouter.put('/add', (req, res) => {
  const reqbody = req.body
  let valid = false

  if (typeof (reqbody.id) === 'number' && typeof (reqbody.name) === 'string' &&
    typeof (reqbody.year) === 'number' && typeof (reqbody.desc) === 'string' &&
    typeof (reqbody.minplayers) === 'number' && typeof (reqbody.maxplayers) === 'number' &&
    typeof (reqbody.minPlayTime) === 'number' && typeof (reqbody.maxPlayTime) === 'number' &&
    typeof (reqbody.minage) === 'number' &&
    typeof (reqbody.weight) === 'number' && typeof (reqbody.rating) === 'number' &&
    typeof (reqbody.designer) === 'object' && typeof (reqbody.artist) === 'object' &&
    typeof (reqbody.publisher) === 'object' && typeof (reqbody.thumb) === 'string' &&
    typeof (reqbody.poster) === 'string') {
    valid = true
  }

    queryDatabase(async db => {
      const data = await db.collection('Games').find({id: reqbody.id}).toArray()
      if (data.length == 0 && valid) {
        const result = await db.collection('Games').insertOne({
          id: reqbody.id,
          name: reqbody.name,
          year: reqbody.year,
          desc: reqbody.desc,
          minplayers: reqbody.minplayers,
          maxplayers: reqbody.maxplayers,
          playTime: reqbody.maxPlayTime,
          minPlayTime: reqbody.minPlayTime,
          maxPlayTime: reqbody.maxPlayTime,
          minage: reqbody.minage,
          weight: parseFloat(parseFloat(reqbody.weight).toFixed(2)),
          rating: parseFloat(parseFloat(reqbody.rating).toFixed(1)),
          designer: reqbody.designer,
          artist: reqbody.artist,
          publisher: reqbody.publisher,
          thumb: reqbody.thumb,
          poster: reqbody.poster
        })

        res.status(200).json({ success: true, id: `${reqbody.id}`, message: `${reqbody.id} inserted into array` })
      }
      else {res.status(400).json({error: true, message: 'type mismatch error, check types are correct'})}
    }, "boardGameGeek")
  }
)

// delete endpoint
gameRouter.delete('/bggGames/:gameID', (req, res) => {
  const gameID = req.params.gameID

  queryDatabase(async db => {

    const result = await db.collection('Games').deleteOne({id:parseInt(gameID)})
    if (result.deletedCount > 0) {
      res.json({ success: true, id: `${gameID}`, message: `${gameID} found and deleted` })
    } else {
      res.status(404).json({error: true, message: 'not found'})
    }
  }, "boardGameGeek")
})

export default gameRouter
