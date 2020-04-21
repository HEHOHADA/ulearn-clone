import React, {useState} from 'react'
import {ISubscription} from "../../../shared/interface";
import {FormInput} from "../../../shared/utils/FormInput";


interface Props {
    initialValues?: ISubscription
}

export const defaultSubscriptionFormValues = {
    price: 0,
    benefits: '',
    name: ''
}

export const SubscriptionForm = (props: Props) => {

    const submit = (event: any) => {
        event.preventDefault()
        console.log(form)
    }
    const {initialValues = defaultSubscriptionFormValues} = props

    const [form, setForm] = useState<ISubscription>(initialValues)

    const changeHandler = (event: any) => {
        setForm({...form, [event.target.name]: event.target.value})
    }


    return (
        <form>
            <FormInput onChange={changeHandler} name={"name"} formValue={form.name}/>
            <FormInput onChange={changeHandler} name={"Price"} formValue={form.price}/>
            <FormInput onChange={changeHandler} name={"Benefits"} formValue={form.benefits}/>
            <button
                onSubmit={submit}
                className="btn btn-primary btn-block" type="submit">Edit
            </button>
        </form>
    )
}
