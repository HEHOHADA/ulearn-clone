import React from 'react'
import {ISubscription} from "../../shared/interface";
import {useForm} from "../../hooks/form.hook";


interface Props {
    initialValues?: ISubscription
    onSubmit: (event: any, form: any) => void
    loading: boolean
}

export const defaultSubscriptionFormValues = {
    price: 0,
    benefits: '',
    name: ''
}

export const SubscriptionForm = (props: Props) => {
    const {initialValues = defaultSubscriptionFormValues, onSubmit, loading} = props

    const {form, generateInputs} = useForm<ISubscription>(initialValues)

    return (
        <form
            onSubmit={(event) => onSubmit(event, form)}
        >
            {generateInputs((key: string) => {
                if (key === "price") return 'number'
                return 'text'
            })}
            <button
                disabled={loading}
                className="btn btn-primary btn-block" type="submit">Edit
            </button>
        </form>
    )
}
