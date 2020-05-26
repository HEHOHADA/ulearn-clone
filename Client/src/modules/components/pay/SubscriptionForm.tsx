import React from 'react'
import {ISubscription} from "../../shared/interface"
import {useForm} from "../../hooks/form.hook"
import {Loader} from "../../shared/utils/Loader"


interface Props {
    initialValues?: ISubscription
    onSubmit: (event: any, form: ISubscription) => void
    loading: boolean
    title?: string
}

export const defaultSubscriptionFormValues = {
    price: 0,
    level: 0,
    name: ''
}

export const SubscriptionForm = (props: Props) => {
    const {initialValues = defaultSubscriptionFormValues, onSubmit, loading, title} = props
    // @ts-ignore
    if (initialValues.id) {
        // @ts-ignore
        delete initialValues.id
    }
    const {form, generateInputs} = useForm<ISubscription>(initialValues)
    if (loading) {
        return <Loader/>
    }
    return (
        <form
            onSubmit={(event) => onSubmit(event, form)}
        >
            {generateInputs((key: string) => {
                if (key === 'price' || key === 'level') return 'number'
                return 'text'
            })}

            <button
                disabled={loading}
                className="btn btn-primary btn-block" type="submit">{title}
            </button>
        </form>
    )
}
