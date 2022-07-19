const mongoose = require('mongoose')


mongoose.connection.on('connected', () => {
  console.log('db is connected')
})

mongoose.connection.on('error', (err) => {
  console.log(`cannot connect to db ${err}`)
  process.exit(1)
})

exports.connect = async (mongoURL = 'mongodb://127.0.0.1:27017/auth') => {
  mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  return mongoose.connection
}
