import React from 'react'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api'

const libraries = ['maps']
const mapContainerStyle = {
    width: "100vw",
    height: "100vh"
}
const center = {
    lat: 33.7490,
    lng: -84.3880,
}

export default function Map() {

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.AIzaSyDeO_odNtED92_TDNWTbXw9gMJCIFwB7EQ,
        libraries,
    })

    if (loadError) return "Error loading maps"
    if (isLoaded) return 'loading maps'

    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}></GoogleMap>
        </div>
    )
}
