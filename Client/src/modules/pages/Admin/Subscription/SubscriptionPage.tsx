import React from 'react'
import {SubscriptionView} from "../../../components/pay/SubscriptionView";
import {useHistory} from 'react-router-dom';

export const SubscriptionPage = () => {

    const history = useHistory()

    const onEditHandler = (id: string) => {
        history.push(`/admin/subscription/edit/${id}`)
    }

    const onClickCreate = () => {
        history.push(`/admin/subscription/create`)
    }

    return (
        <>
            <SubscriptionView onClick={onEditHandler} text={"Edit"}/>
            <div className="container align-items-center pt-4">
                <button className="btn btn-primary" onClick={onClickCreate}>Создать подписку</button>
            </div>

        </>)
}
