const express = require('express')
const locationModel = require('../models/location.js')

const locationRouter = express.Router()

// GET ALL
locationRouter.get('/', async (req, res) => {
    try {
        const allLocations = await locationModel.getAllLocations()
        res.json(allLocations)
    } catch (err) {
        console.log('failed to get all locations from location controller')
        res.status(500).json(err)
    }
})

// GET ONE
locationRouter.get('/:locationId', async (req, res) => {
    try {
        const singleLocation = await locationModel.getOneLocation(req.params.locationId)
        res.json(singleLocation)
    } catch (err) {
        console.log('failed to get one location from location controller')
        res.status(500).json(err)
    }
})

// CREATE
locationRouter.post('/', async (req, res) => {
    try {
        await locationModel.createLocation(req.body)
        res.json('ok')
    } catch (err) {
        console.log('failed to create location from location controller')
        res.status(500).json(err)
    }
})

// EDIT LOCATION
locationRouter.put('/:locationId', async (req, res) => {
    try {
        await locationModel.updateLocation(req.params.locationId, req.body)
        res.json('ok')
    } catch (err) {
        console.log('failed to update location from location controller')
        res.status(500).json(err)
    }
})

// DELETE LOCATION
locationRouter.delete('/:locationId', async (req, res) => {
    try {
        await locationModel.deleteLocation(req.params.locationId)
        res.json('ok')
    } catch (err) {
        console.log('failed to delete location from location controller')
        res.status(500).json(err)
    }
})

module.exports = locationRouter