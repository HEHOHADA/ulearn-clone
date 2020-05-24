import React from 'react'
import {ISubscription} from "../../shared/interface"


interface Props {
    onClick: (id: string) => void,
    text: string
    subscription?: ISubscription[]
}


export const SubscriptionView = (props: Props) => {
    const {onClick, text, subscription = [{price: 12, name: "321321", level: 321321, id: ''}]} = props


    const subscriptionHandler = () => {

        return subscription.map(sub => (
            <div className="clean-pricing-item" key={`${sub.name}-${sub.price}`}>
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
                <button onClick={() => onClick(sub.id!)} className="btn btn-outline-primary btn-block"
                        type="button">{text}</button>
            </div>
        ))

    }


    return (
        <div className="col-md-5 col-lg-4">
            {subscriptionHandler()}
        </div>
    )
}
