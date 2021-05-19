import React, {useEffect} from 'react'
import {FormInput} from "../../shared/utils/FormInput"
import {useForm} from "../../hooks/form.hook"

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

    useEffect(() => {
        changeFormHandler(form)
        // eslint-disable-next-line
    }, [isSubmitting])


    return (
        <div className="card-details">
            <h3 className="title">Credit Card Details</h3>
            <div className="form-row">
                <FormInput type="hidden" onChange={changeHandler} name={'product'} formValue={form.product}/>
                <div className="col-sm-8">
                    <FormInput onChange={changeHandler} name={'cardNumber'} formValue={form.cardNumber}/>
                </div>
                <div className="col-sm-4">
                    <FormInput onChange={changeHandler} name={"cVC"} formValue={form.cVC}/>
                </div>
                <div className="col-sm-6">
                    <FormInput onChange={changeHandler} name={"month"} formValue={form.month}/>
                </div>
                <div className="col-sm-6">
                    <FormInput onChange={changeHandler} name={"year"} formValue={form.year}/>
                </div>
                <div className="col-sm-7">
                    <FormInput onChange={changeHandler} name={"cardHolder"} formValue={form.cardHolder}/>
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
