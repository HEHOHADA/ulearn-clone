import React from 'react'
import {ISubscription} from "../../shared/interface"
import {Loader} from "../../shared/utils/Loader"


interface Props {
    onClick: (id: string) => void
    onDelete?: (id: string) => void
    text: string
    subscription?: ISubscription[]
    loading: boolean
}


export const SubscriptionView = (props: Props) => {
    const {
        onClick, text, subscription = [{
            price: 12,
            name: "321321",
            level: 321321,
            id: ''
        }], loading, onDelete
    } = props

    if (loading) {
        return <Loader/>
    }

    const subscriptionHandler = () => {

        return subscription.map(sub => (
            <div className="col-md-5 col-lg-4" key={`${sub.name}-${sub.price}`}>
                <div className="clean-pricing-item">
                    <div className="heading">
                        <h3>{sub.name}</h3>
                    </div>
                    <p>{sub.level}</p>
                    <div className="features">
                        <h4><span className="feature">Duration:&nbsp;</span><span>121</span></h4>
                    </div>
                    <div className="price">
                        <h4>{sub.price}</h4>
                    </div>
                    <button onClick={() => onClick(sub.id!)}
                            className="btn btn-outline-primary btn-block"
                            type="button">{text}</button>
                    {onDelete && <button onClick={() => onDelete(sub.id!)}
                                         className="btn btn-outline-primary btn-block"
                                         type="button">Delete</button>}
                </div>
            </div>
        ))

    }


    return (
        <>
            {subscriptionHandler()}
        </>
    )
}
