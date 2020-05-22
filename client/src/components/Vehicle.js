import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


export default class Vehicle extends Component {

    state = {
        newVehicle: {
            make: "",
            model: "",
            licensePlate: "",
            stateAndCountry: "",
        },
        allVehicles: [],
        toggleVehicleForm: true,
    }

    componentDidMount() {
        this.getAllVehicles()
    }

    getAllVehicles = async () => {
        try {
            const res = await axios.get(`/api/vehicle`)
            const newState = { ...this.state }
            newState.allVehicles = res.data
            this.setState(newState)
        } catch (err) {
            console.log(err)
            console.log('Failed to get all vehicles')
        }
    }

    onChange = (evt) => {
        const newState = { ...this.state }
        newState.newVehicle[evt.target.name] = evt.target.value
        this.setState(newState)
    }

    onVehicleSubmit = async (evt) => {
        evt.preventDefault()
        try {
            await axios.post(`/api/vehicle`, this.state.newVehicle)
            console.log('Vehicle Created', this.state.newVehicle)
            this.getAllVehicles()
            this.setState({ toggleVehicleForm: !this.state.toggleVehicleForm })
        } catch (err) {
            console.log(err)
            console.log('Failed to create vehicle')
        }
    }

    onClickToggleForm = () => {
        this.setState({ toggleVehicleForm: !this.state.toggleVehicleForm })
    }


    render() {
        return (
            <div>
                <h1>All Vehicles</h1>

                {this.state.toggleVehicleForm === true

                    ? <div>
                        {this.state.allVehicles.map((vehicle) => {
                            return (
                                <Link to={`/vehicle/${vehicle._id}`} >
                                    <div>{vehicle.make} {vehicle.model}</div>
                                </Link>
                            )
                        })}

                        <button
                            className="new-form-button"
                            onClick={this.onClickToggleForm}>Add New Vehicle</button>
                    </div>

                    : <form onSubmit={this.onVehicleSubmit}>

                        <div className="vehicle-form">
                            <label htmlFor="name">Make:</label>
                            <input
                                type="text"
                                name="make"
                                value={this.state.newVehicle.make}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="vehicle-form">
                            <label htmlFor="model">Model:</label>
                            <input
                                type="text"
                                name="model"
                                value={this.state.newVehicle.model}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="vehicle-form">
                            <label htmlFor="licensePlate">License Plate:</label>
                            <input
                                type="text"
                                name="licensePlate"
                                value={this.state.newVehicle.licensePlate}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="vehicle-form">
                            <label htmlFor="stateAndCountry">State / Country:</label>
                            <input
                                type="text"
                                name="stateAndCountry"
                                value={this.state.newVehicle.stateAndCountry}
                                onChange={this.onChange}
                            />
                        </div>

                        <input type="submit" value="Add Vehicle" />

                        <button
                            className="new-form-button"
                            onClick={this.onClickToggleForm}>Cancel</button>
                    </form>
                }

            </div>
        )
    }
}
