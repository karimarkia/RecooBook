const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const config = require('./config/config').get(process.env.NODE_ENV)
const app = express()

// routers
const user = require('./routes/user')
const book = require('./routes/book')

mongoose.connect(config.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
 
// MIDDLEWARE //
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api/users', user)
app.use('/api/books', book)

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Server running at ${port}`))
