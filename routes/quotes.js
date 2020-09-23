import express from 'express'
import { ObjectId } from 'mongodb'
import client from '../db'

const router = express.Router()

router
  .get('/random', async (req, res) => {
    const randomQuote = await client.db().collection('quotes').aggregate([
      {
        $sample: { size: 1 }
      }
    ]).toArray()
    res.send({
      message: randomQuote
    })
  })

  .get('/', async function (req, res, next) {
    const quotes = await client.db().collection('quotes').find({}).toArray()
    res.send({
      quotes
    })
  })

  .get('/:id', async function (req, res, next) {
    const id = req.params.id

    const quotes = await client.db().collection('quotes').findOne({
      _id: ObjectId(id)
    })

    res.send({
      quotes
    })
  })

  .post('/', async function (req, res, next) {
    const { quote } = req.body

    const newQuote = await client.db().collection('quotes').insertOne(quote)

    res.status(201)
    res.send({
      _id: newQuote.insertedId
    })
  })

module.exports = router
