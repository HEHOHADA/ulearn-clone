import {useCallback, useEffect, useState} from "react"
import {useHttp} from "./http.hook"

export const useFetch = (url: string) => {

    const [fetched, setFetched] = useState<any>()
    const [isBusy, setIsBusy] = useState(false)
    const {request, loading} = useHttp()
    const fetch = useCallback(async () => {
        setIsBusy(true)
        try {
            setFetched(await request(url))
            setIsBusy(false)
        } catch (e) {
            console.log(e)
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        fetch().finally(() => console.log(fetched))
        // eslint-disable-next-line
    },[])

    return {fetched, loading, isBusy}
}
