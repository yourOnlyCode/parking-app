const mongoose = require('./connection.js')

const PaymentSchema = new mongoose.Schema({
    name: String,
    cardNumber: Number,
    expirationDate: Number,
    CVV: Number,
    ZIP: Number,
})

const paymentModel = mongoose.model('payment', PaymentSchema)

// GET ALL
const getAllPayments = () => {
    return paymentModel.find({})
}

// GET ONE

const getOnePayment = (paymentId) => {
    return paymentModel.findById(paymentId)
}

// CREATE ONE
const createPayment = (paymentData) => {
    return paymentModel.create(paymentData)
}

// UPDATE ONE
const updatePayment = (paymentId, paymentData) => {
    return paymentModel.findByIdAndUpdate(paymentId, paymentData)
}

// DELETE ONE
const deletePayment = (paymentId) => {
    return paymentModel.findByIdAndDelete(paymentId)
}

module.exports = {
    getAllPayments,
    getOnePayment,
    createPayment,
    updatePayment,
    deletePayment,
}