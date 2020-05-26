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

                <div className="single-payment">
                    <div className="single-payment-item">Name: {this.state.name}</div>
                    <div className="single-payment-item">Card Num: {this.state.cardNumber}</div>
                    <div className="single-payment-item">Exp Date: {this.state.expirationDate}</div>
                    <div className="single-payment-item">ZIP: {this.state.ZIP}</div>

                    <button
                        className="single-payment-item"
                        onClick={this.onClickDeletePayment}
                    >X</button>
                </div>

            </div>
        )
    }
}
