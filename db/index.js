import { MongoClient } from 'mongodb'
const mongoHost = process.env.MONGO_HOST || 'localhost'
const mongoDB = process.env.MONGO_DB || 'quotes'
const mongoPort = process.env.MONGO_PORT || 27017

const mongoURI = `mongodb://${mongoHost}:${mongoPort}/${mongoDB}`

const client = new MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

client.connect()
  .then(() => {
    console.log('-----------')
    console.log('database connected')
    console.log('-----------')
  })
  .catch(err => {
    console.error(err)
  })

export default client
