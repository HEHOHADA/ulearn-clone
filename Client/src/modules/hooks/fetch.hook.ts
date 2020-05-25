import {useCallback, useEffect, useState} from "react"
import {useHttp} from "./http.hook"

export const useFetch = (url: string) => {
    const [fetched, setFetched] = useState<any | Array<any>>()

    const [isBusy, setIsBusy] = useState(true)

    const {request, loading} = useHttp()

    const fetch = useCallback(async () => {
        setIsBusy(true)
        try {
            console.log("here")
            setFetched(await request(url))

        } catch (e) {
            console.log(e)
        } finally {
            setIsBusy(false)
        }
        // eslint-disable-next-line
    }, [url])

    useEffect(() => {
        fetch().finally(() => console.log(fetched))
        // eslint-disable-next-line
    }, [])

    return {fetched, loading, isBusy}
}
