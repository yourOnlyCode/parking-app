import React, { Component } from 'react'
import axios from 'axios'
import Map from './Map.js'
import Location from './Location.js'

export default class Home extends Component {

    state = {
        allVehicles: [],
        allPayments: [],
    }

    componentDidMount() {
        this.getVehiclesForDropdown()
        this.getPaymentsForDropdown()
    }

    getVehiclesForDropdown = async () => {
        try {
            const res = await axios.get(`/api/vehicle`)
            const newState = { ...this.state }
            newState.allVehicles = res.data
            this.setState(newState)
        } catch (err) {
            console.log(err)
            console.log('failed to get all vehicles for the dropdown')
        }
    }

    getPaymentsForDropdown = async () => {
        try {
            const res = await axios.get(`/api/payment`)
            const newState = { ...this.state }
            newState.allPayments = res.data
            this.setState(newState)
        } catch (err) {
            console.log(err)
            console.log('failed to get all payments for the dropdown')
        }
    }

    render() {
        return (
            <div className="home-container">
                <h1>Parking App Logo</h1>

                <Location />

                <Map />

                <div className="dropdown-model-container">
                    <label></label>
                    <select>
                        {this.state.allVehicles.map((vehicle) => {
                            return (
                                <option>{vehicle.make} {vehicle.model}</option>
                            )
                        })}
                    </select>
                </div>

                <div className="dropdown-model-container">
                    <label></label>
                    <select>
                        {this.state.allPayments.map((payment) => {
                            return (
                                <option>{payment.name} {payment.cardNumber}</option>
                            )
                        })}
                    </select>
                </div>

                <button className="park-button">PARK!</button>

            </div>
        )
    }
}
