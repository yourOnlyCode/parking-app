import React, { Component } from 'react'
import axios from 'axios'

export default class SingleVehicle extends Component {

    state = {
        make: "",
        model: "",
        licensePlate: "",
        stateAndCountry: "",
    }

    componentDidMount() {
        this.getSingleVehicle()
    }

    getSingleVehicle = async (vehicleId) => {
        try {
            const vehicleId = this.props.match.params.vehicleId
            const res = await axios.get(`/api/vehicle/${vehicleId}`)
            console.log('vehicleId', vehicleId)
            this.setState(res.data)
            console.log(res.data)
        } catch (err) {
            console.log('failed to get single vehicle')
            console.log(err)
        }
    }

    onClickDeleteVehicle = (vehicleId) => {
        console.log('attempting to delete')
        axios.delete(`/api/payment/${vehicleId}`)
            .then(() => {
                this.getSingleVehicle()
            })
    }

    render() {
        return (
            <div>
                <h1 className="single-vehicle-title">{this.state.make} {this.state.model}</h1>

                <div className="single-vehicle">
                    <div className="single-vehicle-item">License Plate: {this.state.licensePlate}</div>
                    <div className="single-vehicle-item">Location: {this.state.stateAndCountry}</div>

                    <button
                        className="single-payment-item"
                        onClick={this.onClickDeleteVehicle}
                    >X</button>
                </div>
            </div>
        )
    }
}
