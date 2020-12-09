import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useInfiniteScrollPagination(url, q, page, pageSize, params = {}, getItems) {
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(false);
    let [items, setItems] = useState([])
    let [query, setQuery] = useState(q)
    let [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        params.q = query
        params.page = page
        params.pageSize = pageSize
        setLoading(true)
        setError(false)
        let canceler
        axios.get(url, {
            headers: {
                Authorization: "token " + localStorage.getItem("authToken")
            },
            params: params,
            cancelToken: new axios.CancelToken((c) => canceler = c)
        })
            .then((result) => {
                let body = result.data
                setLoading(false)
                setHasMore(body.hasMore)
                setItems((prevItems) => prevItems.concat(getItems(body)))
                console.log("We have appended the following items " + result.data.rooms)
            }).catch((err) => {
                setLoading(false)
                if (axios.isCancel(err)) {
                    console.log("The request was canceled")
                    return
                }
                setError(true)
            })
    }, [query, page])


    return [items, loading, error, hasMore]


}