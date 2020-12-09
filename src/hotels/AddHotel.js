import React, { useRef, useState } from 'react'
import './AddHotel.css'
import axios from 'axios'
import { BASE_URL } from '../config';
export default function AddHotel(props) {
    let [isFormVisible, setFormVisible] = useState(false);
    let [hotelName, setHotelName] = useState("");
    let nameBox = useRef()
    let [loading, setLoading] = useState(false)
    let [error, setError] = useState(false)
    let formClass = isFormVisible ? "add-hotel-form-visible" : "add-hotel-form-invisible";

    function exitForm() {
        setError(false)
        setLoading(false)
        setFormVisible(false)
        setHotelName("")
        nameBox.current.value = ""
    }

    function addHotel(name) {
        setLoading(true)
        axios.post(`${BASE_URL}/hotel`, {
            name: name
        }, {
            headers: {
                Authorization: `token ${localStorage.getItem("authToken")}`
            }
        }).then(result => {
            let status = result.data.status
            if (status == "ok") {
                exitForm()
            }
            else {
                setError(true)
            }
        }).catch(reason => {
            setError(true)
            setLoading(false)
        })
    }

    return (
        <div>
            <span className="add-hotel-button" onClick={() => setFormVisible(true)}>+ Add new Hotel</span>
            <div className={formClass}>
                <input className="hotel-name-input" ref={nameBox} type="text" onChange={(event) => { setHotelName(event.target.value) }} placeholder="Hotel name" />
                {/* <div className="hotel-name-input">Text</div> */}
                {loading && <div className="progress-bar"></div>}
                {error && <span className="error-text">Could not add the hotel</span>}
                <div className="cancel-button" onClick={() => {
                    exitForm()
                }}>
                </div>
                <div className="ok-button" onClick={() => {
                    addHotel(hotelName)
                }}>
                </div>
            </div>
        </div>

    )

}