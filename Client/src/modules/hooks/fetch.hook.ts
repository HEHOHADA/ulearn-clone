import {useCallback, useEffect, useState} from "react"
import {useHttp} from "./http.hook"

export const useFetch = (url: string) => {
    const [fetched, setFetched] = useState<any | Array<any>>()
    const [isBusy, setIsBusy] = useState(false)
    const {request, loading} = useHttp()
    const fetch = useCallback(async () => {
        setIsBusy(true)
        try {
            console.log("here")
            setFetched(await request(url))
            setIsBusy(false)
        } catch (e) {
            console.log(e)
        }
    }, [])

    useEffect(() => {
        fetch().finally(() => console.log(fetched))
    }, [])

    return {fetched, loading, isBusy}
}
