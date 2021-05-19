import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {CreditCard} from "../components/pay/CreditCard"
import {ICourse, ISubscription} from "../shared/interface"
import {useHttp} from "../hooks/http.hook"
import {RouteComponentProps} from "react-router"
import {useFetch} from "../hooks/fetch.hook";
import {courseRequest, paySubscription, subscriptionRequest} from "../shared/request";
import {FormInput} from "../shared/utils/FormInput";


export const PaymentPage = (props: RouteComponentProps) => {

    const {id} = useParams()
    useEffect(() => {
        //request to api

    }, [id])
    const {request} = useHttp()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {fetched, isBusy} = useFetch<ISubscription>(subscriptionRequest+'/'+id)
    const {history} = props

    // const {isBusy, fetched, loading} = useFetch('')
    let subscription: ISubscription | any = []
    const changeFormHandler = async (form: any) => {
        console.log(form)
        if(form.cvc!== ''){
            const data = await request(paySubscription, 'POST', form)
            console.log("data" + data)
            history.push('/login')
        }
    }
    return (
        <main className="page payment-page">
            <section className="clean-block payment-form dark">
                <div className="container">
                    <div className="block-heading">
                        <h2 className="text-info">Payment</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec auctor
                            in, mattis vitae leo.</p>
                    </div>
                    <form onSubmit={async (event) => {
                        event.preventDefault()
                        setIsSubmitting(true)
                    }
                    }>
                        {
                            !isBusy &&
                            <div className="products">
                                <h3 className="title">Checkout</h3>
                                <div className="item"><span className="price">{fetched ? fetched.price : subscription.price}</span>
                                    <p className="item-name">{fetched ? fetched.name : subscription.name}</p>
                                    <p className="item-description">{fetched ? fetched.level : subscription.level}</p>
                                </div>
                                <div className="total"><span>Total</span><span className="price">{fetched ? fetched.price : subscription.price}</span>
                                </div>
                            </div>
                        }
                            <CreditCard product={parseInt(id!)} isSubmitting={isSubmitting} changeFormHandler={changeFormHandler}/>


                    </form>
                </div>
            </section>
        </main>
    )
}
