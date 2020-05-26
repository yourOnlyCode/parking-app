const express = require('express')

const app = express()

const vehicleRouter = require('./controllers/vehicle.js')
const paymentRouter = require('./controllers/payment.js')
const locationRouter = require('./controllers/location.js')

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(`${__dirname}/client/build`))

app.use('/api/vehicle', vehicleRouter)
app.use('/api/payment', paymentRouter)
app.use('/api/location', locationRouter)

app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, (req, res) => {
    console.log(`Application started on port ${PORT}`)
})