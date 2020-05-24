import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import {CreditCard} from "../components/pay/CreditCard";
import {ISubscription} from "../shared/interface";


export const PaymentPage = () => {

    const {id} = useParams()
    useEffect(() => {
        //request to api
    }, [id])
    const [isSubmitting, setIsSubmitting] = useState(false)
    let subscription: ISubscription | any = []
    const changeFormHandler = (form: any) => {
        form.product = ''
        console.log(form)
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
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        console.log('here')
                        setIsSubmitting(true)
                    }
                    }>
                        <div className="products">
                            <h3 className="title">Checkout</h3>
                            <div className="item"><span className="price">{subscription.price}</span>
                                <p className="item-name">{subscription.name}</p>
                                <p className="item-description">{subscription.level}</p>
                            </div>
                            <div className="total"><span>Total</span><span className="price">{subscription.price}</span></div>
                        </div>
                        <CreditCard isSubmitting={isSubmitting} changeFormHandler={changeFormHandler}/>

                    </form>
                </div>
            </section>
        </main>
    )
}
