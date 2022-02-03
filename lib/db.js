'use strict'

const { MongoClient } = require('mongodb')
const {
  DB_USER,
  DB_PASSWD,
  DB_HOST,
  DB_NAME
} = process.env

const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
let connection

async function connectDB () { // return connection
  if (connection) return connection

  let client
  try {
    client = await MongoClient.connect(mongoUrl, {
      useNewUrlParser: true
    })
    connection = client.db(DB_NAME)
    console.log("Connect successfly to mongoDb");
  } catch (error) {
    console.error('Could not connect to db', mongoUrl, error)
    process.exit(1)
  }

  return connection
}

module.exports = connectDB



// [
//   {
//     "title": "Mi titulo",
//     "teacher": "Mi profesor",
//     "description": "una descripcion",
//     "topic": "programcion"
//   },
//   {
//     "title": "Mi titulo 2",
//     "teacher": "Mi profesor2",
//     "description": "una descripcion2",
//     "topic": "programcion2"
//   },
//   {
//     "title": "Mi titulo 3",
//     "teacher": "Mi profesor3",
//     "description": "una descripcion3",
//     "topic": "programcion3"
//   }
// ]