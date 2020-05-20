const mongoose = require('mongoose')

const connectionString = process.env.MONGO_URL || 'mongodb://localhost/parking-app'

mongoose.connect(connectionString)
    .then(() => {
        console.log('succesfully connected to mongoose')
    })
    .catch((err) => {
        console.log('failed to connect to mongoose')
    })

module.exports = mongoose