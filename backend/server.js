const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5017

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {
  useNewUrlParser: true,
})

const connection = mongoose.connection
connection.once('open', () => {
  console.log('mongodb connection established successfully')
})

const userRouter = require('./routes/user')
const hobbyRouter = require('./routes/hobby')
const markerRouter = require('./routes/marker')

app.use('/user', userRouter)
app.use('/hobby', hobbyRouter)
app.use('/marker', markerRouter)

app.listen(port, () => {
  console.log(`server is running on port: ${port}`)
})
