import React, {useRef} from 'react'
import {ISubscription} from "../../shared/interface";
import {useForm} from "../../hooks/form.hook";


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
        clearForm(defaultSubscriptionFormValues)

        console.log(form)
    }

    const {initialValues = defaultSubscriptionFormValues} = props

    const {
        form, generateInputs, clearForm
    }
        = useForm<ISubscription>(initialValues)


    return (
        <form
            onSubmit={submit}

        >
            {generateInputs((key: string) => {
                if (key === "price") return 'number'
                return 'text'
            })}
            <button
                onSubmit={submit}
                className="btn btn-primary btn-block" type="submit">Edit
            </button>
        </form>
    )
}
