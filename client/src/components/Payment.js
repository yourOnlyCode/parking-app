import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Payment extends Component {

    state = {
        newPayment: {
            name: "",
            cardNumber: "",
            expirationDate: "",
            CVV: Number,
            ZIP: Number,
        },
        allPayments: [],
        togglePaymentForm: true,
    }

    componentDidMount() {
        this.getAllPayments()
    }

    getAllPayments = async () => {
        try {
            const res = await axios.get(`/api/payment`)
            const newState = { ...this.state }
            newState.allPayments = res.data
            this.setState(newState)
        } catch (err) {
            console.log(err)
            console.log('Failed to get all payments')
        }
    }

    onChange = (evt) => {
        const newState = { ...this.state }
        newState.newPayment[evt.target.name] = evt.target.value
        this.setState(newState)
    }

    onPaymentSubmit = async (evt) => {
        evt.preventDefault()
        try {
            await axios.post(`/api/payment`, this.state.newPayment)
            console.log('Payment Created', this.state.newPayment)
            this.getAllPayments()
            this.setState({ togglePaymentForm: !this.state.togglePaymentForm })
        } catch (err) {
            console.log(err)
            console.log('Failed to create payment')
        }
    }

    onClickToggleForm = () => {
        this.setState({ togglePaymentForm: !this.state.togglePaymentForm })
    }

    onClickDeletePayment = (paymentId) => {
        console.log('attempting to delete')
        axios.delete(`/api/payment/${paymentId}`)
            .then(() => {
                this.getAllPayments()
            })
    }



    render() {
        return (
            <div>
                <h1>All Payments</h1>
                <div className="payment-page">

                    {this.state.togglePaymentForm === true

                        ? <div className="payment-list">
                            {this.state.allPayments.map((payment) => {
                                return (
                                    <div>
                                        <Link className="payment-link" to={`/payment/${payment._id}`} >
                                            <div className="single-payment">{payment.name} {payment.cardNumber}</div>
                                        </Link>
                                        <button onClick={this.onClickDeletePayment}>delete</button>
                                    </div>
                                )

                            })}

                            <button
                                className="add-payment"
                                onClick={this.onClickToggleForm}>Add New</button>
                        </div>

                        : <form onSubmit={this.onPaymentSubmit}>

                            <div className="payment-form">
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={this.state.newPayment.name}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="payment-form">
                                <label htmlFor="cardNumber">Card:</label>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={this.state.newPayment.cardNumber}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="payment-form">
                                <label htmlFor="expirationDate">Exp Date:</label>
                                <input
                                    type="text"
                                    name="expirationDate"
                                    value={this.state.newPayment.expirationDate}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="payment-form">
                                <label htmlFor="CVV">CVV:</label>
                                <input
                                    type="number"
                                    name="CVV"
                                    value={this.state.newPayment.CVV}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="payment-form">
                                <label htmlFor="ZIP">ZIP Code:</label>
                                <input
                                    type="number"
                                    name="ZIP"
                                    value={this.state.newPayment.ZIP}
                                    onChange={this.onChange}
                                />
                            </div>

                            <input className="add-payment" type="submit" value="Add Payment" />

                            <button
                                className="add-payment"
                                onClick={this.onClickToggleForm}>Cancel</button>
                        </form>
                    }
                </div>

            </div>
        )
    }
}
