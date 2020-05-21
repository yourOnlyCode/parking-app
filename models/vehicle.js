const mongoose = require('./connection.js')

const VehicleSchema = new mongoose.Schema({
    make: String,
    model: String,
    licensePlate: String,
    stateAndCountry: String,
})

const vehicleModel = mongoose.model('vehicle', VehicleSchema)

// GET ALL
const getAllVehicles = () => {
    return vehicleModel.find({})
}

// GET ONE

const getOneVehicle = (vehicleId) => {
    return vehicleModel.findById(vehicleId)
}

// CREATE ONE
const createVehicle = (vehicleData) => {
    return vehicleModel.create(vehicleData)
}

// UPDATE ONE
const updateVehicle = (vehicleId, vehicleData) => {
    return vehicleModel.findByIdAndUpdate(vehicleId, vehicleData)
}

// DELETE ONE
const deleteVehicle = (vehicleId) => {
    return vehicleModel.findByIdAndDelete(vehicleId)
}

module.exports = {
    getAllVehicles,
    getOneVehicle,
    createVehicle,
    updateVehicle,
    deleteVehicle,
}