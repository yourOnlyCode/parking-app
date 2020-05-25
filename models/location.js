const mongoose = require('./connection.js')

const LocationSchema = new mongoose.Schema({
    lat: Number,
    lng: Number,
})

const locationModel = mongoose.model('location', LocationSchema)

// GET ALL
const getAllLocations = () => {
    return locationModel.find({})
}

// GET ONE

const getOneLocation = (locationId) => {
    return locationModel.findById(locationId)
}

// CREATE ONE
const createLocation = (locationData) => {
    return locationModel.create(locationData)
}

// UPDATE ONE
const updateLocation = (locationId, locationData) => {
    return locationModel.findByIdAndUpdate(locationId, locationData)
}

// DELETE ONE
const deleteLocation = (locationId) => {
    return locationModel.findByIdAndDelete(locationId)
}

module.exports = {
    getAllLocations,
    getOneLocation,
    createLocation,
    updateLocation,
    deleteLocation,
}