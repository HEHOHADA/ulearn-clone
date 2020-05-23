import React from 'react'
import {defaultSubscriptionFormValues, SubscriptionForm} from "../../../components/pay/SubscriptionForm";
import {useParams} from 'react-router-dom';
import {useHttp} from "../../../hooks/http.hook";

export const SubscriptionEdit = () => {

    const {id} = useParams()
    const {request, loading} = useHttp()

    const submit = (event: any, form: any) => {
        event.preventDefault()
        console.log(form)
    }

    return (//params find by id
        <SubscriptionForm loading={loading} onSubmit={submit} initialValues={defaultSubscriptionFormValues}/>
    )
}
