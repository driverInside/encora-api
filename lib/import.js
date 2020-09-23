import axios from 'axios'
import { MongoClient } from 'mongodb'
const mongoHost = process.env.MONGO_HOST || 'localhost'
const mongoDB = process.env.MONGO_DB || 'quotes'
const mongoPort = process.env.MONGO_PORT || 27017

const mongoURI = `mongodb://${mongoHost}:${mongoPort}/${mongoDB}`
const quotesURI = 'http://www.textfiles.com/humor/TAGLINES/quotes-2.txt'

const transformResponse = (response) => {
  const quotes = response.split('*')
  quotes.shift()
  return quotes.map(q => {
    const quoteBody = q.replace(/(\r\n|\n|\r)/gm, '').split('--')
    const quote = {
      quote: quoteBody[0] || quoteBody
    }

    if (quoteBody[1]) {
      quote.author = quoteBody[1]
    }

    return quote
  })
}

const getQuotes = async () => {
  return axios({
    method: 'GET',
    url: quotesURI,
    responseType: 'text',
    transformResponse
  }).then(res => res.data)
}

const init = async () => {
  const client = new MongoClient(mongoURI)

  const quotes = await getQuotes()
  try {
    await client.connect()
    await client.db().collection('quotes').insertMany(quotes)
    const questCount = await client.db().collection('quotes').find({}).count()

    console.log('-----------')
    console.log(questCount)
    console.log('-----------')
  } catch (err) {
    console.error(err)
  } finally {
    await client.close()
  }
}

Promise.resolve(init())
  .then(result => {
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
