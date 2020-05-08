import React from 'react'

export const PaymentPage = () => {

    return (
        <main className="page payment-page">
            <section className="clean-block payment-form dark">
                <div className="container">
                    <div className="block-heading">
                        <h2 className="text-info">Payment</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec auctor
                            in, mattis vitae leo.</p>
                    </div>
                    <form>
                        <div className="products">
                            <h3 className="title">Checkout</h3>
                            <div className="item"><span className="price">$200</span>
                                <p className="item-name">Product 1</p>
                                <p className="item-description">Lorem ipsum dolor sit amet</p>
                            </div>
                            <div className="item"><span className="price">$120</span>
                                <p className="item-name">Product 2</p>
                                <p className="item-description">Lorem ipsum dolor sit amet</p>
                            </div>
                            <div className="total"><span>Total</span><span className="price">$320</span></div>
                        </div>
                        <div className="card-details">
                            <h3 className="title">Credit Card Details</h3>
                            <div className="form-row">
                                <div className="col-sm-7">
                                    <div className="form-group"><label htmlFor="card-holder">Card Holder</label><input
                                        className="form-control" type="text" placeholder="Card Holder"/></div>
                                </div>
                                <div className="col-sm-5">
                                    <div className="form-group"><label>Expiration date</label>
                                        <div className="input-group expiration-date"><input className="form-control"
                                                                                            type="text"
                                                                                            placeholder="MM"/><input
                                            className="form-control" type="text" placeholder="YY"/></div>
                                    </div>
                                </div>
                                <div className="col-sm-8">
                                    <div className="form-group"><label htmlFor="card-number">Card Number</label><input
                                        className="form-control" type="text" id="card-number"
                                        placeholder="Card Number"/>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group"><label htmlFor="cvc">CVC</label><input
                                        className="form-control" type="text" id="cvc" placeholder="CVC"/></div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <button className="btn btn-primary btn-block" type="submit">Proceed</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}
