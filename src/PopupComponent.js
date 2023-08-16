import React from "react"
import { Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

function PopupComponent({ sighting }) {
    return (
        <Popup>
            <div>
                <h3>Ghost Sighting</h3>
                <p>Date: {sighting.date}</p>
                <p>Description: {sighting.description}</p>
            </div>
        </Popup>
    )
}

export default PopupComponent