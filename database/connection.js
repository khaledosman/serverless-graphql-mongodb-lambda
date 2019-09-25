const mongoose = require('mongoose')
mongoose.set('debug', true)
let conn = null

function initConnection () {
  return new Promise((resolve, reject) => {
    if (conn === null) {
      mongoose.createConnection(process.env.MONGO_URL, {
        bufferCommands: false,
        bufferMaxEntries: 0,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      }).then(async connection => {
        conn = connection
        console.log('connected to mongo')
        resolve(conn)
      })
    } else {
      console.log('using cached connection')
      resolve(conn)
    }
  })
}

module.exports.initConnection = initConnection
