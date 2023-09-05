import Mongo from 'mongodb'
import Dotenv from 'dotenv'

Dotenv.config()

const DB_USER = process.env.DB_USER ?? 'unknown'
const DB_PASS = process.env.DB_PASS ?? 'unknown'

const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.voup7iz.mongodb.net/?retryWrites=true&w=majority`

const client = new Mongo.MongoClient(uri, {useNewUrlParser: true,useUnifiedTopology: true, serverApi: Mongo.ServerApiVersion.v1 })

export default function queryDatabase(queryCallBack, databaseName) {
  queryCallBack(client.db(databaseName))
    .catch(err => {
      console.error('Failed to query database')
      console.error(err)
    })
}
