import React from 'react'
// import {useHistory, useParams} from 'react-router-dom'
import {defaultSubscriptionFormValues, SubscriptionForm} from "../../../components/pay/SubscriptionForm";

export const SubscriptionEdit = () => {

    // const history = useHistory()
    // const query = useParams()



    return (//params find by id
        <SubscriptionForm  initialValues={defaultSubscriptionFormValues}/>
    )
}
