import React, { Component } from 'react'
import axios from 'axios'

export default class Location extends Component {

    state = {
        newLocation: {
            lat: null,
            lng: null,
        }
    }

    componentDidMount() {
        this.getLocation()
        this.setPosition()
    }

    showPosition = (position) => {
        console.log('Lat:', position.coords.latitude)
        console.log('Lng:', position.coords.longitude)
    }

    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition)
        } else {
            console.log('Geolocation is not supported')
        }
    }

    setPosition = async (position) => {
        try {
            await axios.post(`/api/location`, this.state.newLocation)
            this.setState({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div>
                <div>Location</div>
            </div>
        )
    }
}
