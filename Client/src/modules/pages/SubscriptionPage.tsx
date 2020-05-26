import React from 'react'
import {SubscriptionView} from "../components/pay/SubscriptionView"
import {subscriptionRequest} from "../shared/request"
import {useFetch} from "../hooks/fetch.hook"
import {ISubscription} from "../shared/interface";
import {useHistory} from 'react-router-dom'

export const SubscriptionPage = () => {
    const {fetched, isBusy} = useFetch<Array<ISubscription>>(subscriptionRequest)
    const history = useHistory()
    const onClickSubscription = (id: number) => {
        history.push(`pay/${id}`)
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
                    <div className="row">
                        {!isBusy &&
                        <SubscriptionView loading={true} subscription={fetched} onClick={onClickSubscription}
                                          text={"Buy now"}/>}
                    </div>
                </div>
            </section>
        </main>
    )
}
