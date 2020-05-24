import React from 'react'
import {SubscriptionForm} from "../../../components/pay/SubscriptionForm";

export const SubscriptionCreate = () => {

    const submit = (event: any, form: any) => {
        event.preventDefault()
        console.log(form)
    }

    return (
        <SubscriptionForm loading={false} onSubmit={submit}/>
    )
}
