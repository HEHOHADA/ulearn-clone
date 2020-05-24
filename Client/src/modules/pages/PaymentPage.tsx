import React, {useEffect, useState} from 'react'
import {useForm} from "../hooks/form.hook";
import {useParams} from 'react-router-dom';
import {CreditCard} from "../components/pay/CreditCard";


export const PaymentPage = () => {

    const {id} = useParams()
    useEffect(() => {
        //request to api
    }, [id])
    const [isSubmitting, setIsSubmitting] = useState(false)

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
                            <div className="item"><span className="price">$200</span>
                                <p className="item-name">Product 1</p>
                                <p className="item-description">Lorem ipsum dolor sit amet</p>
                            </div>
                            <div className="total"><span>Total</span><span className="price">$320</span></div>
                        </div>
                        <CreditCard isSubmitting={isSubmitting} changeFormHandler={changeFormHandler}/>

                    </form>
                </div>
            </section>
        </main>
    )
}
