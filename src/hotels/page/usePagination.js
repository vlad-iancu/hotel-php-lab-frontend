import Axios from 'axios';
import { useState, useEffect } from 'react'
import axios from 'axios'
export default function usePagination(url, q, pageSize, params = {}, getItems) {
    let [isLoading, setLoading] = useState(false);
    let [error, setError] = useState(false);
    let [items, setItems] = useState([])
    let [query, setQuery] = useState(q)
    let [pageCount, setPageCount] = useState();
    let [page, setPage] = useState(1);
    let [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setPage(1)
    }, [query])

    useEffect(() => {
        setLoading(true);
        let cancelToken = axios.CancelToken;
        let source = cancelToken.source()
        params.q = query
        params.page = page
        params.pageSize = pageSize
        axios.get(url, {
            headers: {
                Authorization: "token " + localStorage.getItem("authToken")
            },
            params: params,
            cancelToken: source.token
        })
            .then(result => {
                let body = result.data
                setItems(getItems(result.data));
                setPageCount(body.pages);
                setLoading(false)
                setError(body.status != "ok");
                setHasMore(body.hasMore);
                console.log("Finished requesting page " + page)
                console.log(getItems(result.data))
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

    return [items, hasMore, query, setQuery, page, setPage, pageCount, isLoading, error];

}