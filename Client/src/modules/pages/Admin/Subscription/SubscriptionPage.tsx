import React, { useState} from 'react'
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
    const {fetched} = useFetch(subscriptionRequest)
    // const fetchSubscription = useCallback(async () => {
    //     try {
    //         setSubscriptions(await request(subscriptionRequest))
    //         console.log(subscriptions)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }, [])
    //
    // useEffect(() => {
    //     fetchSubscription()
    // }, [])

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

        }
    }

    return (
        <div className="row">
            <SubscriptionView
                subscription={fetched}
                loading={loading}
                onDelete={onDeleteHandler}
                onClick={onEditHandler}
                text={"Edit"}/>
            <div className="container pt-4">
                <button className="btn btn-primary" onClick={onClickCreate}>Создать подписку</button>
            </div>
        </div>
    )
}
