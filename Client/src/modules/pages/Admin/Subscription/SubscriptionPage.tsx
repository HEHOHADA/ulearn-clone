import React, {useCallback, useEffect, useState} from 'react'
import {SubscriptionView} from "../../../components/pay/SubscriptionView";
import {useHistory} from 'react-router-dom';
import {useHttp} from "../../../hooks/http.hook";
import {subscriptionRequest} from "../../../shared/request";

export const SubscriptionPage = () => {

    const history = useHistory()
    const {request, loading} = useHttp()
    const [subscriptions, setSubscriptions] = useState()

    const fetchSubscription = useCallback(async () => {
        try {
            setSubscriptions(await request(subscriptionRequest))
            console.log(subscriptions)
        } catch (e) {
            console.log(e)
        }
    }, [])

    useEffect(() => {
        fetchSubscription()
    }, [])

    const onEditHandler = (id: string) => {
        history.push(`/admin/subscription/edit/${id}`)
    }

    const onClickCreate = () => {
        history.push(`/admin/subscription/create`)
    }

    const onDeleteHandler = async (id: string) => {
        try {
            await request(`${subscriptionRequest}/${id}`, 'DELETE')
        } catch (e) {

        }
    }

    return (
        <div className="row">
            <SubscriptionView
                subscription={subscriptions}
                loading={loading}
                onDelete={onDeleteHandler}
                onClick={onEditHandler}
                text={"Edit"}/>
            <div className="container align-items-center pt-4">
                <button className="btn btn-primary" onClick={onClickCreate}>Создать подписку</button>
            </div>
        </div>
    )
}
