import React, {FC, useEffect, useState} from 'react'
import {ISubscription} from "../../../shared/interface"
import {useForm} from "../../../hooks/form.hook";
import {useHttp} from "../../../hooks/http.hook";
import {subscriptionRequest} from "../../../shared/request";
import {SelectInput} from "../../../shared/utils/SelectInput";
import {useFetch} from "../../../hooks/fetch.hook";

export const defaultCourseValue = {
    name: "",
    description: "",
    subscriptionId: 0
}

interface IProps {
    initialValues?: IVisibleCourse,
    onSubmit: (event: any, form: IVisibleCourse) => void
    title?: string
}

export interface IVisibleCourse {
    name: string,
    description: string,
    subscriptionId: number
}

const subscriptionNames = (subscriptions: Array<ISubscription>) => {
    return subscriptions.map(s => `${s.name} lvl:${s.level}`)
}

export const CourseForm: FC<IProps> = (props: IProps) => {
    const {loading} = useHttp()
    const {request} = useHttp()
    const [subscriptions, setSubscriptions] = useState<Array<ISubscription>>([])
    const {fetched, isBusy} = useFetch<Array<ISubscription>>(subscriptionRequest)
    useEffect(() => {
        if (!isBusy) {
            setSubscriptions(fetched!)
        }
    }, [isBusy])


    const {initialValues = defaultCourseValue, onSubmit, title} = props

    const {form, generateInputs, setForm} = useForm<IVisibleCourse>(initialValues)
    return (
        <form
            onSubmit={(event) => onSubmit(event, form)}
        >
            {generateInputs(undefined, ["name",
                "description"])}
            <SelectInput
                optionName={subscriptionNames(subscriptions)}
                name={'courseName'}
                onSelect={(selectedItem: any) => {
                    setForm({...form, subscriptionId: selectedItem})
                }}
                value={form.subscriptionId}
                data={subscriptions.map(x => x.id)}
                label={'chose course'}/>
            <button
                disabled={loading}
                className="btn btn-primary btn-block" type="submit">{title}
            </button>
        </form>
    )
}
