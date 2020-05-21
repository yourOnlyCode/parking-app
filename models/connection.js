const mongoose = require('mongoose')

const connectionString = process.env.MONGODB_URL || 'mongodb://localhost/parking-app'

mongoose.connect(connectionString)
    .then(() => {
        console.log('successfully connected to mongoose')
    })
    .catch((err) => {
        console.log(err)
        console.log('failed to connect to mongoose')
    })

module.exports = mongoose