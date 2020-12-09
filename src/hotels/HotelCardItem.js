import React from 'react'
import { useHistory } from 'react-router-dom'
import './HotelCardItem.css'

export default function HotelCardItem(props) {
    let history = useHistory();
    return (
        <div className="hotel-card-container" key={props.id} onClick={() => history.push(`/home/hotel/${props.id}`)}>
            <span>{props.name}</span>
        </div>
    )
}