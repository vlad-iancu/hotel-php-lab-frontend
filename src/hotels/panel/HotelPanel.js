import React, { useEffect, useRef, useState, useCallback } from 'react'
import './HotelPanel.css'
import usePagination from '../page/usePagination'
import { BASE_URL } from '../../config'
import { useParams } from 'react-router-dom'
import useInfiniteScrollPagination from '../page/useInfiniteScrollPagination'
import BottomFabs from './BottomFabs'
export default function HotelPanel(props) {
    console.log("Rendering panel component")
    let { hotelId } = useParams();
    let [query, setQuery] = useState("")
    let [page, setPage] = useState(1)
    let observer = useRef()
    let [showNav, setShowNav] = useState(true)
    let [scroll, setCurrentScroll] = useState(0)
    let [scrollDiff, setScrollDiff] = useState(0)
    let [rooms, loading, error, hasMore] = useInfiniteScrollPagination(`${BASE_URL}/rooms`, query, page, 15, { id: hotelId }, (data) => data.rooms)
    let loadingElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) {
            observer.current.disconnect();
        }
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setTimeout(() => setPage((prevPage) => prevPage + 1), 500)
            }
        })
        if (node) {
            observer.current.observe(node)
        }
    }, [loading, hasMore])
    /* function handleScroll() {
        

    } */
    const handleScroll = useCallback(() => {
        let prevScroll = scroll
        const currentScroll = window.pageYOffset
        let currentScrollDiff = currentScroll - prevScroll
        if (Math.abs(currentScrollDiff) < 5) return
        let prevScrollDiff = scrollDiff
        console.log("Current Scroll diff " + prevScrollDiff)
        console.log("Current scroll:" + currentScroll + ";Prev scroll:" + prevScroll)
        if (currentScrollDiff >= 0) {
            if (prevScrollDiff < 0) {
                setScrollDiff(currentScrollDiff)
            }
            else {
                if (prevScrollDiff >= 150) {
                    setShowNav(false)
                }
                prevScrollDiff += currentScrollDiff
                console.log("New scroll diff:" + prevScrollDiff)
                setScrollDiff(prevScrollDiff)
            }
        }
        else {
            if (prevScrollDiff >= 0) {
                setScrollDiff(currentScrollDiff)
            }
            else {
                if (prevScrollDiff <= -150) {
                    setShowNav(true)
                }
                prevScrollDiff += currentScrollDiff
                console.log("New scroll diff:" + prevScrollDiff)
                setScrollDiff(prevScrollDiff)
            }
        }
        setCurrentScroll(currentScroll)
    })
    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [handleScroll])


    //console.log(rooms)
    console.log("Panel component re-rendered")
    console.log("Should we show the nav?" + showNav)
    let navClass = showNav ? "search-box search-box-show" : "search-box search-box-collapse"
    return (
        <div>
            <div className={navClass} type="text">
                <input className="search-input" type="text" placeholder="Search..." />
            </div>

            <div className="grid-view">
                {rooms.map(room => {
                    return <div className="room-grid-item" key={room.id}>{room.name}</div>
                })}
                {hasMore && <div className="loading-card" ref={loadingElementRef}>
                    <div className="loading-card-suspension"></div>
                    <div className="loading-card-suspension"></div>
                    <div className="loading-card-suspension"></div>
                </div>}
            </div>
            <BottomFabs />
        </div>

    )
}
