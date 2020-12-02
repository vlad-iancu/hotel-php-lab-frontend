import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../config'
import './Home.css'
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom'
import HotelPagedlList from '../hotels/HotePagedlList'
import NavList from './NavList'
import hotelIcon from '../images/home/hotel.svg'

const destinations = [
    { path: "/home/user_hotels", text: "Your hotels", icon: hotelIcon }
]

export default function Home() {
    let [isDrawerOpen, setDrawerOpen] = useState(false)
    let [userName, setUserName] = useState("")
    let [email, setEmail] = useState("")
    let [authStatus, setAuthStatus] = useState(true);
    let { path, url } = useRouteMatch();
    let drawerClass = isDrawerOpen ? "nav-drawer nav-drawer-open" : "nav-drawer nav-drawer-closed"
    let contentClass = isDrawerOpen ? "home-content-tilt" : "home-content"
    let history = useHistory();
    useEffect(() => {
        let authToken = localStorage.getItem("authToken");
        if (!authToken) {
            setAuthStatus(false);
        }
        else {
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
                .catch(reason => {
                    setAuthStatus(false)
                })
        }
        return () => {
            if (!authStatus) {
                localStorage.removeItem("authToken");
                localStorage.removeItem("refreshToken");
            }
        }
    }, [authStatus])

    console.log("authStatus = " + authStatus)
    return (
        <div className="home-container">
            <div className={drawerClass}>
                <div className="nav-drawer-toggle" onClick={(event) => { setDrawerOpen(!isDrawerOpen) }}>
                    <div className="nav-drawer-toggle-indicator" />
                </div>
                <div className="auth-info-container">
                    <span className="text-large">{userName}</span>
                    <span className="text-small">{email}</span>
                </div>
                <NavList destinations={destinations} />
                {!authStatus && <Redirect to="login" />}

            </div>
            <div className={contentClass}>
                <Switch>
                    <Route exact path={path}>
                        <span className="home-content">This is the default content of the home page, here will be the hotel list with a search bar</span>
                    </Route>
                    <Route path={`${path}/user_hotels`}>
                        <HotelPagedlList url={`${BASE_URL}/user_hotels`} />
                    </Route>
                </Switch>
            </div>

        </div>

    )
}