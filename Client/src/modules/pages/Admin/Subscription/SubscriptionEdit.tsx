import React, {useCallback, useEffect, useState} from 'react'
import {SubscriptionForm} from "../../../components/pay/SubscriptionForm"
import {useParams} from 'react-router-dom'
import {useFetch} from "../../../hooks/fetch.hook";
import {subscriptionRequest} from "../../../shared/request";
import {Loader} from "../../../shared/utils/Loader";
import {useHttp} from "../../../hooks/http.hook";

export const SubscriptionEdit = () => {

    const {id} = useParams()
    // const [data, setData] = useState()
    // const {request, loading} = useHttp()
    const {fetched, loading: loading1, isBusy} = useFetch(`${subscriptionRequest}/${id}`)
    // useEffect(() => {
    //     setData(fetched)
    // }, [loading, fetched])
    // const [fetched, setFetched] = useState()
    // const [isBusy, setIsBusy] = useState(false)
    const {request, loading} = useHttp()
    // const fetch = useCallback(async () => {
    //     try {
    //         setFetched(await request(`${subscriptionRequest}/${id}`))
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }, [])

    // useEffect(() => {
    //     setIsBusy(true)
    //     const fetch = (async () => {
    //         try {
    //             setFetched(await request(`${subscriptionRequest}/${id}`))
    //             setIsBusy(false)
    //         } catch (e) {
    //             console.log(e)
    //         }
    //     })
    //     fetch()
    //
    // }, [])

    const submit = async (event: any, form: any) => {
        event.preventDefault()
        console.log(form)
    }
    if (loading) {
        return <Loader/>
    }

    return (
        <>
            {!isBusy ? <SubscriptionForm
                loading={loading || loading1}
                onSubmit={submit}
                title={"Edit"}
                initialValues={fetched}/> : <Loader/>}
        </>
    )
}
