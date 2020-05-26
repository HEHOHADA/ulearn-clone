import React, {useEffect, useState} from 'react'
import {FormInput} from "../../shared/utils/FormInput"
import {useForm} from "../../hooks/form.hook"
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'

interface Props {
    changeFormHandler: (form: any) => void
    isSubmitting: boolean,
    product: number
}

export const CreditCard = (props: Props) => {

    const {isSubmitting, changeFormHandler, product} = props
    const initialValues = {
        cardHolder: '',
        month: '',
        year: '',
        cardNumber: '',
        cVC: '',
        product: product
    }

    const {form, changeHandler} = useForm(initialValues)

    const handleInputFocus = (e: any) => {
        if (e.target.name === "cardHolder") {
            setFocus('name')
        }
        if (e.target.name === "month") {
            setFocus('expiry')
        }
        if (e.target.name === "year") {
            setFocus('expiry')
        }
        if (e.target.name === "cardNumber") {
            setFocus('number')
        }
        if (e.target.name === "cVC") {
            setFocus('cvc')
        }
    }

    useEffect(() => {
        if (isSubmitting) {
            changeFormHandler(form)
        }
        // eslint-disable-next-line
    }, [isSubmitting])

    const [focus, setFocus] = useState<"name" | "number" | "expiry" | "cvc">('name')

    return (
        <div className="card-details">
            <h3 className="title">Credit Card Details</h3>
            <FormInput type="hidden" onChange={changeHandler} name={'product'} formValue={form.product}/>
            <Cards
                cvc={form.cVC}
                expiry={form.year + form.month}
                focused={focus}
                name={form.cardHolder}
                number={form.cardNumber}
            />
            <div className="form-row">
                <div className="col-sm-8">
                    <FormInput onFocus={handleInputFocus} onChange={changeHandler} name={'cardNumber'}
                               formValue={form.cardNumber}/>
                </div>
                <div className="col-sm-4">
                    <FormInput onFocus={handleInputFocus} onChange={changeHandler} name={"cVC"} formValue={form.cVC}/>
                </div>
                <div className="col-sm-6">
                    <FormInput onFocus={handleInputFocus} onChange={changeHandler} name={"month"}
                               formValue={form.month}/>
                </div>
                <div className="col-sm-6">
                    <FormInput onFocus={handleInputFocus} onChange={changeHandler} name={"year"} formValue={form.year}/>
                </div>
                <div className="col-sm-7">
                    <FormInput onFocus={handleInputFocus} onChange={changeHandler} name={"cardHolder"}
                               formValue={form.cardHolder}/>
                </div>
                <div className="col-sm-12">
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" type="submit">Proceed</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
