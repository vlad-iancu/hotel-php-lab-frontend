import React, { useEffect } from 'react'
import { BASE_URL } from '../config';
import usePagination from './page/usePagination';
import './HotelPagedList.css'
import PageController from './page/PageController'
import HotelCardItem from './HotelCardItem';
import AddHotel from './AddHotel';

//TODO: Add pagination in useHotel on the backend side
export default function HotelPagedlList(props) {
    let url = props.url;

    let [hotels, hasMore, query, setQuery, page, setPage, pageCount, isLoading, error] = usePagination(`${BASE_URL}/user_hotels`, "", 2, {}, (data) => data.hotels)

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
                <input className="search-box-input" type="text" placeholder="Search..." onChange={(event) => { setQuery(event.target.value) }} />
            </div>
            <div className="hotel-list">
                {hotelCards}
            </div>
            <PageController pageCount={pageCount} page={page} onPageChanged={setPage} />
            <AddHotel />
        </div>
    )

}