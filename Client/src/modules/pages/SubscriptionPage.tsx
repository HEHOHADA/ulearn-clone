import React from 'react'
import {SubscriptionView} from "../components/pay/SubscriptionView"
import {useHttp} from "../hooks/http.hook";
import {subscriptionRequest} from "../shared/request";
import {useFetch} from "../hooks/fetch.hook";

export const SubscriptionPage = () => {
    const {request} = useHttp()
    const {fetched} = useFetch(subscriptionRequest)
    // let subscription: ISubscription | any = []
    // const fetchSubscription = useCallback(async () => {
    //     try {
    //         const response = await request(subscriptionRequest)
    //
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }, [])
    //
    // useEffect(() => {
    //     fetchSubscription()
    // }, [])
    const onClickSubscription = (id: number) => {

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
                        <SubscriptionView loading={true} subscription={fetched} onClick={onClickSubscription}
                                          text={"Buy now"}/>
                    </div>
                </div>
            </section>
        </main>
    )
}
