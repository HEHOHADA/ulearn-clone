import React from 'react'
import {SubscriptionForm} from "../../../components/pay/SubscriptionForm"
import {useHttp} from "../../../hooks/http.hook"
import {subscriptionRequest} from "../../../shared/request"
import {ISubscription} from "../../../shared/interface"
import {useHistory} from 'react-router-dom'

export const SubscriptionCreate = () => {
    const {request,loading} = useHttp()
    const history = useHistory()
    const submit = async (event: any, form: ISubscription) => {

        event.preventDefault()
        const subscription = await request(subscriptionRequest, 'POST', {...form})
        if (subscription) {
            history.push('/admin/subscription')
        }
    }

    return (
        <SubscriptionForm title={"Create"} loading={loading} onSubmit={submit}/>
    )
}
