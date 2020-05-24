import React from 'react'
import {SubscriptionForm} from "../../../components/pay/SubscriptionForm"
import {useHttp} from "../../../hooks/http.hook"
import {subscriptionRequest} from "../../../shared/request"
import {ISubscription} from "../../../shared/interface"

export const SubscriptionCreate = () => {
    const {request} = useHttp()
    const submit = async (event: any, form: ISubscription) => {

        event.preventDefault()
       await request(subscriptionRequest, 'POST', {...form})
    }

    return (
        <SubscriptionForm title={"Create"} loading={false} onSubmit={submit}/>
    )
}
