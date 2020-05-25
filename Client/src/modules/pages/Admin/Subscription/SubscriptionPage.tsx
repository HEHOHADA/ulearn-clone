import React, {useEffect, useState} from 'react'
import {SubscriptionView} from "../../../components/pay/SubscriptionView"
import {useHistory} from 'react-router-dom'
import {useHttp} from "../../../hooks/http.hook"
import {subscriptionRequest} from "../../../shared/request"
import {ISubscription} from "../../../shared/interface"
import {useFetch} from "../../../hooks/fetch.hook";

export const SubscriptionPage = () => {

    const history = useHistory()
    const {request, loading} = useHttp()
    const [subscriptions, setSubscriptions] = useState<Array<ISubscription>>()
    const {fetched, isBusy} = useFetch<Array<ISubscription>>(subscriptionRequest)

    useEffect(() => {
        if (!isBusy) {
            console.log('fetched', fetched)
            setSubscriptions(fetched)
        }
    }, [isBusy])

    const onEditHandler = (id: number) => {
        history.push(`/admin/subscription/edit/${id}`)
    }

    const onClickCreate = () => {
        history.push(`/admin/subscription/create`)
    }

    const onDeleteHandler = async (id: number) => {
        try {
            const deleted = await request(`${subscriptionRequest}/${id}`, 'DELETE')
            const newSubs = subscriptions!.filter((sub: ISubscription) => sub.id !== deleted.id)
            setSubscriptions(newSubs)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="row">
            {!isBusy && <SubscriptionView
                subscription={subscriptions}
                loading={loading}
                onDelete={onDeleteHandler}
                onClick={onEditHandler}
                text={"Edit"}/>}
            <div className="container pt-4">
                <button className="btn btn-primary" onClick={onClickCreate}>Создать подписку</button>
            </div>
        </div>
    )
}
