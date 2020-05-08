import React from 'react'
import {SubscriptionView} from "../components/pay/SubscriptionView";

export const SubscriptionPage = () => {

    const onClickSubscription = (subName:string) => {

    }

    return (
        <main className="page pricing-table-page">
            <section className="clean-block clean-pricing dark">
                <div className="container">
                    <div className="block-heading">
                        <h2 className="text-info">Pricing Table</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec auctor
                            in, mattis vitae leo.</p>
                    </div>
                    <div className="row justify-content-center">
                        <SubscriptionView onClick={onClickSubscription} text={"Buy now"}/>
                    </div>
                </div>
            </section>
        </main>
    )
}
