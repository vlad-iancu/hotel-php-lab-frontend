import React from 'react'
import './NavList.css'
import { useHistory } from 'react-router-dom'

function getNavListIconStyle(iconRes) {
    return {
        display: "inline-block",
        backgroundImage: `url("${iconRes}")`,
        width: "20px",
        height: "20px",
        marginLeft: "20px",
        marginRight: "7px",
        backgroundRepeat: "no-repeat",
        resize: "both"
    }
}

export default function NavListItem(props) {
    let history = useHistory();
    console.log("Path is:" + props.path)
    return (
        <div className="nav-list-item">
            <div style={getNavListIconStyle(props.icon)}></div>
            <span className="nav-menu-item" onClick={() => history.push(props.path)}>{props.text}</span>
        </div>
    )
}