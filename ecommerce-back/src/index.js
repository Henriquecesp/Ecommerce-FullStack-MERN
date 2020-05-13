const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const expressValidator = require('express-validator')
require('dotenv').config()
// import routes
const authRoutes = require('./app/routes/auth')
const userRoutes = require('./app/routes/user')
const categoryRoutes = require('./app/routes/category')
const productRoutes = require('./app/routes/product')
const braintreeRoutes = require('./app/routes/braintree')
const orderRoutes = require('./app/routes/order')

// app
const app = express()

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connected'))

mongoose.connection.on('error', (err) => {
  console.log(`DB connection error: ${err.message}`)
})

//middleware
app.use(morgan('dev'))
app.use(bodyparser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())
// routes
app.use('/api/v1/', authRoutes)
app.use('/api/v1/', userRoutes)
app.use('/api/v1/', categoryRoutes)
app.use('/api/v1/', productRoutes)
app.use('/api/v1/', braintreeRoutes)
app.use('/api/v1/', orderRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Server started on port: ${port}`)
})
