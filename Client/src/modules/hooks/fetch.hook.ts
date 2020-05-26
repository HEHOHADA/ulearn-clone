import {useCallback, useEffect, useState} from "react"
import {useHttp} from "./http.hook"

export const useFetch = <T>(url: string) => {
    const [fetched, setFetched] = useState<T>()

    const [isBusy, setIsBusy] = useState(true)

    const {request, loading} = useHttp()

    const fetch = useCallback(async () => {
        setIsBusy(true)
        try {
            setFetched(await request(url))
        } catch (e) {
            console.log(e)
        } finally {
            setIsBusy(false)
        }
        // eslint-disable-next-line
    }, [url])

    useEffect(() => {
        let mount = true
        fetch().finally(() => {

        })
        return () => {
            mount = false
        }
        // eslint-disable-next-line
    }, [])

    return {fetched, loading, isBusy}
}
