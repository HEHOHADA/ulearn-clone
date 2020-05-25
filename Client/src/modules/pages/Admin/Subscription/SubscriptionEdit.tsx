import React from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {SubscriptionForm} from "../../../components/pay/SubscriptionForm"
import {useFetch} from "../../../hooks/fetch.hook"
import {subscriptionRequest} from "../../../shared/request"
import {Loader} from "../../../shared/utils/Loader"
import {useHttp} from "../../../hooks/http.hook"

export const SubscriptionEdit = () => {

    const {id} = useParams()
    const history = useHistory()
    const {fetched, loading: loading1, isBusy} = useFetch(`${subscriptionRequest}/${id}`)

    const {request, loading} = useHttp()

    const submit = async (event: any, form: any) => {
        event.preventDefault()
        const response = await request(`${subscriptionRequest}/${id}`, 'PUT', {...form})
        if (response) {
            history.push('/admin/subscription')
        }
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
