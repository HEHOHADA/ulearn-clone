import {useCallback, useEffect, useState} from "react"
import {useHttp} from "./http.hook"

export const useFetch = (url: string) => {
    const [fetched, setFetched] = useState<Array<any>>()
    const {request, loading} = useHttp()
    const fetch = useCallback(async () => {
        try {
            setFetched(await request(url))
        } catch (e) {
            console.log(e)
        }
    }, [])

    useEffect(() => {
        fetch()
    }, [])

    return {fetched, loading}
}
