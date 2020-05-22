const express = require('express')
const paymentModel = require('../models/payment.js')

const paymentRouter = express.Router()

// GET ALL
paymentRouter.get('/', async (req, res) => {
    try {
        const allPayments = await paymentModel.getAllPayments()
        res.json(allPayments)
    } catch (err) {
        console.log('failed to get all payments from payment controller')
        res.status(500).json(err)
    }
})

// GET ONE
paymentRouter.get('/:paymentId', async (req, res) => {
    try {
        const singlePayment = await paymentModel.getOnePayment(req.params.paymentId)
        res.json(singlePayment)
    } catch (err) {
        console.log('failed to get one payment from payment controller')
        res.status(500).json(err)
    }
})

// CREATE
paymentRouter.post('/', async (req, res) => {
    try {
        await paymentModel.createPayment(req.body)
        res.json('ok')
    } catch (err) {
        console.log('failed to create payment from payment controller')
        res.status(500).json(err)
    }
})

// EDIT PAYMENT
paymentRouter.put('/:paymentId', async (req, res) => {
    try {
        await paymentModel.updatePayment(req.params.paymentId, req.body)
        res.json('ok')
    } catch (err) {
        console.log('failed to update payment from payment controller')
        res.status(500).json(err)
    }
})

// DELETE PAYMENT
paymentRouter.delete('/:paymentId', async (req, res) => {
    try {
        await paymentModel.deletePayment(req.params.paymentId)
        res.json('ok')
    } catch (err) {
        console.log('failed to delete payment from payment controller')
        res.status(500).json(err)
    }
})

module.exports = paymentRouter