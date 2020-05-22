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

    render() {
        return (
            <div>
                <h1>Vehicle</h1>
                <div>Make: {this.state.make}</div>
                <div>Model: {this.state.model}</div>
                <div>License Plate: {this.state.licensePlate}</div>
                <div>Location: {this.state.stateAndCountry}</div>
            </div>
        )
    }
}
