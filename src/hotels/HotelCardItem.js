import React from 'react'
import './HotelCardItem.css'

export default function HotelCardItem(props) {
    return (
        <div className="hotel-card-container" key={props.id}>
            <span>{props.name}</span>
        </div>
    )
}