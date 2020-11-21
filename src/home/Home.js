import React, { useState } from 'react'
import './Home.css'
export default function Home(props) {
    let [isDrawerOpen, setDrawerOpen] = useState(false)
    let drawerClass = isDrawerOpen ? "nav-drawer nav-drawer-open" : "nav-drawer nav-drawer-closed"

    return (
        <div className={drawerClass}>
            <div className="nav-drawer-toggle" onClick={(event) => { setDrawerOpen(!isDrawerOpen) }}>
                <div className="nav-drawer-toggle-indicator" />
            </div>
        </div>
    )
}