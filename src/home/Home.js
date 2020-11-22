import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../config'
import './Home.css'
import { Redirect } from 'react-router-dom'

export default function Home() {
    let [isDrawerOpen, setDrawerOpen] = useState(false)
    let [userName, setUserName] = useState("")
    let [email, setEmail] = useState("")
    let [authStatus, setAuthStatus] = useState(null);
    let drawerClass = isDrawerOpen ? "nav-drawer nav-drawer-open" : "nav-drawer nav-drawer-closed"
    console.log("Entered home component")
    useEffect(() => {
        let authToken = localStorage.getItem("authToken");
        if (authToken == null || authToken == undefined) {
            setAuthStatus(false);
        }
        axios.get(`${BASE_URL}/user`, {
            headers: {
                Authorization: `token ${authToken}`
            }
        }).then((value) => {
            let response = value.data
            setAuthStatus(response.status == "ok")
            if (response.status == "ok") {
                setUserName(response.user_name)
                setEmail(response.email)
            }
        })
    }, [])
    if (authStatus == false) {
        console.log("Login failed, going to login page")
        return <Redirect to="login" />
    }
    return (
        <div className={drawerClass}>
            <div className="nav-drawer-toggle" onClick={(event) => { setDrawerOpen(!isDrawerOpen) }}>
                <div className="nav-drawer-toggle-indicator" />
            </div>
            <div>
                {userName}
            </div>
            <div>
                {email}
            </div>
        </div>
    )
}