import React, { useEffect } from 'react'
import { BASE_URL } from '../config';
import useHotelPagination from './useHotelPagination';
import './HotelPagedList.css'
import PageController from './PageController'
import HotelCardItem from './HotelCardItem';

const mockData = [
    {
        id: 1,
        name: "Hotel1"
    },
    {
        id: 2,
        name: "Hotel2"
    },
    {
        id: 3,
        name: "Hotel3"
    },
    {
        id: 4,
        name: "Hotel4"
    },
    {
        id: 5,
        name: "Hotel5"
    },
    {
        id: 6,
        name: "Hotel6"
    },
    {
        id: 7,
        name: "Hotel7"
    },
    {
        id: 8,
        name: "Hotel8"
    },
    {
        id: 9,
        name: "Hotel9"
    },
    {
        id: 10,
        name: "Hotel10"
    },
    {
        id: 11,
        name: "Hotel11"
    },
    {
        id: 12,
        name: "Hotel12"
    },
    {
        id: 13,
        name: "Hotel13"
    },
    {
        id: 14,
        name: "Hotel14"
    },
    {
        id: 15,
        name: "Hotel15"
    },
    {
        id: 16,
        name: "Hotel16"
    },
    {
        id: 17,
        name: "Hotel17"
    },
    {
        id: 18,
        name: "Hotel18"
    },
    {
        id: 19,
        name: "Hotel19"
    }, {
        id: 20,
        name: "Hotel20"
    },
    {
        id: 21,
        name: "Hotel21"
    },
    {
        id: 22,
        name: "Hotel22"
    },
    {
        id: 23,
        name: "Hotel23"
    },
    {
        id: 24,
        name: "Hotel24"
    },
    {
        id: 25,
        name: "Hotel25"
    },
]
//TODO: Add pagination in useHotel on the backend side
export default function HotePagedlList(props) {
    let url = props.url;

    let [hotels, query, setQuery, page, setPage, pageCount, isLoading, error] = useHotelPagination(`${BASE_URL}/user_hotels`, "", 2)

    useEffect(() => {
        console.log("page count: " + pageCount)
        console.log("page:" + page)
    }, [pageCount, page])
    let hotelCards = []
    if (hotels) {
        hotels.forEach(element => {
            hotelCards.push(
                <HotelCardItem name={element.name} id={element.id} />
            )
        });
    }
    return (
        <div className="hotel-list-container">
            <div className="search-box-container">
                <input className="search-box" type="text" placeholder="Search..." onChange={(event) => { setQuery(event.target.value) }} />
            </div>
            <div className="hotel-list">
                {hotelCards}
            </div>
            <PageController pageCount={pageCount} page={page} onPageChanged={setPage} />
        </div>
    )

}