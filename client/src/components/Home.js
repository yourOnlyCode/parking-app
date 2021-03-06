import React, { Component } from 'react'
import axios from 'axios'
import Timer from './Timer.js'

export default class Home extends Component {

    state = {
        allVehicles: [],
        allPayments: [],
        newLocation: {
            lat: null,
            lng: null,
        },
        allLocations: [
            {
                name: "Charlotte",
                lat: 35.2271,
                lng: -80.8431,
            },
            {
                name: "Kansas City",
                lat: 39.0997,
                lng: -94.5786,
            },
            {
                name: "Atlanta",
                lat: 33.7490,
                lng: -84.3880,
            },
            {
                name: "Downtown Columbia",
                lat: 34.0007,
                lng: -81.0348,
            },
            {
                name: "Forest Acres Columbia",
                lat: 34.024013,
                lng: -80.989778,
            },
            {
                name: "USC Campus Columbia",
                lat: 33.997107,
                lng: -81.025120
            },
        ],
        closestLocations: [],
        distanceInKm: 10,
        parkTime: 60,
        carParked: false,
    }

    componentDidMount() {
        this.getVehiclesForDropdown()
        this.getPaymentsForDropdown()
        this.getCurrentLocation()
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

    // Create methods for location here instead of the location component. Move the coordinate function in that file to here and have them work with the state. Get the closest zone to your coordinates.

    showPosition = (position) => {
        console.log('working position')
        console.log('Lat:', position.coords.latitude)
        console.log('Lng:', position.coords.longitude)
    }

    getCurrentLocation = () => {
        if (navigator.geolocation) {
            console.log('working geolocation')
            navigator.geolocation.getCurrentPosition(this.createPosition)
        } else {
            console.log('Geolocation is not supported')
        }
    }

    createPosition = async (position) => {
        const newLat = position.coords.latitude || 0
        const newLng = position.coords.longitude || 0
        try {
            await axios.post(`/api/location`, this.state.newLocation)
            const newState = { ...this.state }
            newState.newLocation = {
                lat: newLat,
                lng: newLng,
            }
            this.setState(newState)
            await this.getClosestLocationFromCurrentPosition()
        } catch (err) {
            console.log(err)
        }
    }

    getDistance = (lat1, lon1, lat2, lon2, unit) => {
        var radlat1 = Math.PI * lat1 / 180
        var radlat2 = Math.PI * lat2 / 180
        var theta = lon1 - lon2
        var radtheta = Math.PI * theta / 180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist)
        dist = dist * 180 / Math.PI
        dist = dist * 60 * 1.1515
        if (unit === "K") { dist = dist * 1.609344 }
        if (unit === "N") { dist = dist * 0.8684 }
        return dist
    }

    getClosestLocationFromCurrentPosition = () => {
        var data = this.state.allLocations
        // var html = "";

        for (var i = 0; i < data.length; i++) {

            // if this location is within 0.1KM of the user, add it to the list
            if (this.getDistance(this.state.newLocation.lat, this.state.newLocation.lng, data[i].lat, data[i].lng, "K") <= this.state.distanceInKm) {
                // html += '<p>' + data[i].location + ' - ' + data[i].code + '</p>';
                console.log('Closest Locations:', data[i].name)
                const newState = { ...this.state }
                newState.closestLocations.push(data[i])
                this.setState(newState)
            }
        }
    }

    // PARK TIME && SUBMIT

    onChangeParkingTimer = (evt) => {
        const newState = { ...this.state }
        newState.parkTime[evt.target.name] = evt.target.value
        this.setState(newState)
    }

    onSubmitParkCar = (evt) => {
        evt.preventDefault()
        this.setState({ carParked: true })
        console.log('car parked:', this.state.carParked)
        this.timerCountDown()
    }

    timerCountDown = () => {
        console.log('park time:', this.state.parkTime)
        console.log('timer running')
        this.myInterval = setInterval(() => {
            this.setState({ parkTime: this.state.parkTime - 1 })
        }, 1000)
    }

    // timerAtZero = () => {
    //     console.log('my interval', this.state.parkTime)
    //     if (this.myInterval < 1) {
    //         console.log('timer ran out')
    //         this.setState({ carParked: false })
    //         this.setState({ parkTime: null })
    //         clearInterval(this.myInterval)
    //     }
    // }

    onClickCheckout = () => {
        console.log('checking out')
        console.log('car parked:', this.state.carParked)
        console.log(this.state.parkTime)
        clearInterval(this.myInterval)
        this.setState({ parkTime: 60 })
        this.setState({ carParked: false })
    }


    render() {
        return (
            <div>
                <img
                    className="logo"
                    src="../images/logo.png"
                    alt="parkpal parkpalapp parkapp parking"
                />



                <div className="home-container">

                    {this.state.carParked === false

                        ? <form onSubmit={this.onSubmitParkCar}>
                            <div className="dropdown-model-container">
                                <label></label>
                                <select>
                                    {this.state.closestLocations.map((locations) => {
                                        return (
                                            <option>{locations.name}</option>
                                        )
                                    })}
                                </select>
                            </div>

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

                            <div className="dropdown-model-container">
                                <input
                                    type="number"
                                    pattern="[0-9]"
                                    name="parkTime"
                                    value={this.state.parkTime}
                                />
                            </div>

                            <input
                                type="submit"
                                className="park-button"
                                name="parkTime"
                                value="PARK!"
                            />
                        </form>

                        : <div className="timer-page">
                            <Timer
                                parkTime={this.state.parkTime}
                                carParked={this.state.carParked}
                                timerCountDown={this.timerCountDown}
                                timerAtZero={this.timerAtZero}
                            />

                            <button
                                className="checkout"
                                onClick={this.onClickCheckout}
                            >Checkout Early</button>
                        </div>
                    }

                </div>
            </div>
        )
    }
}
