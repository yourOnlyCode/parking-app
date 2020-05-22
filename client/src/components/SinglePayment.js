import React, { Component } from 'react'
import axios from 'axios'

export default class SinglePayment extends Component {

    state = {
        name: "",
        cardNumber: "",
        expirationDate: "",
        CVV: Number,
        ZIP: Number,
    }

    componentDidMount() {
        this.getSinglePayment()
    }

    getSinglePayment = async (paymentId) => {
        try {
            const paymentId = this.props.match.params.paymentId
            const res = await axios.get(`/api/payment/${paymentId}`)
            console.log('paymentId', paymentId)
            this.setState(res.data)
            console.log(res.data)
        } catch (err) {
            console.log('failed to get single payment')
            console.log(err)
        }
    }

    render() {
        return (
            <div>
                <h1>Payment</h1>
                <div>Name: {this.state.name}</div>
                <div>Card Num: {this.state.cardNumber}</div>
                <div>Exp Date: {this.state.expirationDate}</div>
                <div>ZIP: {this.state.ZIP}</div>
            </div>
        )
    }
}
