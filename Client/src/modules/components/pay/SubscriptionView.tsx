import React from 'react'
import {ISubscription} from "../../shared/interface";


interface Props {
    onClick: (id:string) => void,
    text: string
}


export const SubscriptionView = (props: Props) => {
    const {onClick, text} = props

    const subscriptionHandler = () => {
        const subs: ISubscription[] = [{price: 12, name: "321321", benefits: "321321"}]

        return subs.map(sub => (
            <div className="clean-pricing-item" key={`${sub.name}-${sub.price}`}>
                <div className="heading">
                    <h3>{sub.name}</h3>
                </div>
                <p>{sub.benefits}</p>
                <div className="features">
                    <h4><span className="feature">Duration:&nbsp;</span><span>121</span></h4>
                </div>
                <div className="price">
                    <h4>{sub.price}</h4>
                </div>
                <button onClick={()=>onClick(sub.name)} className="btn btn-outline-primary btn-block"
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
