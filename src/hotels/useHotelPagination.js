import Axios from 'axios';
import { useState, useEffect } from 'react'
import axios from 'axios'
export default function useHotelPagination(url, q, pageSize) {
    let [isLoading, setLoading] = useState(false);
    let [error, setError] = useState(false);
    let [hotels, setHotels] = useState([])
    let [query, setQuery] = useState(q)
    let [pageCount, setPageCount] = useState();
    let [page, setPage] = useState(1)

    useEffect(() => {
        setPage(1)
    }, [query])

    useEffect(() => {
        setLoading(true);
        let cancelToken = axios.CancelToken;
        let source = cancelToken.source()
        axios.get(url, {
            headers: {
                Authorization: "token " + localStorage.getItem("authToken")
            },
            params: {
                q: query,
                page: page,
                pageSize: pageSize
            },
            cancelToken: source.token
        })
            .then(result => {
                let body = result.data
                setHotels(body.hotels);
                setPageCount(body.pages);
                setLoading(false)
                setError(body.status != "ok");
                console.log("User hotel request succeded")
            })
            .catch(reason => {
                setLoading(false);
                setError(true);
            })
        return () => {
            console.log("Canceling request request");
            source.cancel("Request was canceled")
        }

    }, [q, page, query])

    return [hotels, query, setQuery, page, setPage, pageCount, isLoading, error];

}