import {useCallback, useEffect, useState} from "react";
import axios from "axios";

export const useFetchData = (url, initialState) => {

    const [data, setData] = useState(initialState)

    const fetchData = useCallback(async () => {
        const response = await axios.get(url)
        setData(response.data)
    },[url])

    useEffect(() => {
        fetchData().then()
    }, [fetchData])

    return [data, fetchData];
}