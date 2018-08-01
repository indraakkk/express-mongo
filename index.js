const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const bodyParser = require('body-parser')
const dbConfig = require('./config/dbConfig')
const jwt = require('jsonwebtoken')
const app = express()

// app.set('impactbyte', 'nodeRestApi')
mongoose.connect(dbConfig.url)

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

require('./routes/user')(app)

app.listen(3000)
console.log('Listen on port 3000');
