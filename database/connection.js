const mongoose = require('mongoose')
mongoose.set('debug', true)
let conn = null

function initConnection () {
  if (conn === null) {
    return mongoose.createConnection(process.env.MONGO_URL, {
      bufferCommands: false,
      bufferMaxEntries: 0,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }).then(async connection => {
      conn = connection
      console.log('connected to mongo')
      return conn
    })
  } else {
    console.log('using cached connection')
    return Promise.resolve(conn)
  }
}

module.exports = { initConnection }
