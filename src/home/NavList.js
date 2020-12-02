import React from 'react'
import { useHistory } from 'react-router-dom'
import './NavList.css'
import NavListItem from "./NavListItem";

export default function NavList(props) {
    let history = useHistory();
    let destinations = props.destinations;
    let result = []
    destinations.forEach(element => {
        result.push(
            <NavListItem icon={element.icon} text={element.text} path={element.path} />
        )
    });
    result.push(
        <div className="nav-list-item">
            <div id="logout-icon" />
            <span className="nav-menu-item" onClick={() => {
                localStorage.removeItem("authToken");
                localStorage.removeItem("refreshToken");
                history.push("/login")
            }}>Logout</span>
        </div>
    )
    return (
        <div className="nav-list">
            {result}
        </div>
    )
}