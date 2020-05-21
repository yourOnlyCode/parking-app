const express = require('express')
const vehicleModel = require('../models/vehicle.js')

const vehicleRouter = express.Router()

// GET ALL
vehicleRouter.get('/', async (req, res) => {
    try {
        const allVehicles = await vehicleModel.getAllVehicles()
        res.json(allVehicles)
    } catch (err) {
        console.log('failed to get all vehicles from vehicle controller')
        res.status(500).json(err)
    }
})

// GET ONE
vehicleRouter.get('/:vehicleId', async (req, res) => {
    try {
        const singleVehicle = await vehicleModel.getOneVehicle(req.params.vehicleId)
        res.json(singleVehicle)
    } catch (err) {
        console.log('failed to get one vehicle from vehicle controller')
        res.status(500).json(err)
    }
})

// CREATE
vehicleRouter.post('/', async (req, res) => {
    try {
        await vehicleModel.getOneVehicle(req.body)
        res.json('ok')
    } catch (err) {
        console.log('failed to create vehicle from vehicle controller')
        res.status(500).json(err)
    }
})

// EDIT VEHICLE
vehicleRouter.put('/:vehicleId', async (req, res) => {
    try {
        await vehicleModel.getOneVehicle(req.params.vehicleId, req.body)
        res.json('ok')
    } catch (err) {
        console.log('failed to update vehicle from vehicle controller')
        res.status(500).json(err)
    }
})

// DELETE VEHICLE
vehicleRouter.delete('/:vehicleId', async (req, res) => {
    try {
        await vehicleModel.getOneVehicle(req.params.vehicleId)
        res.json('ok')
    } catch (err) {
        console.log('failed to delete vehicle from vehicle controller')
        res.status(500).json(err)
    }
})

module.exports = vehicleRouter