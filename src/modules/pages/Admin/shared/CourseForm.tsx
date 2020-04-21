import React, {useState} from 'react'
import {FormInput} from "../../../shared/utils/FormInput"
import {ICourse} from "../../../shared/interface"
import {Textarea} from "../../../shared/utils/Textarea"
import {SelectInput} from "../../../shared/utils/SelectInput"
import {defaultSubscriptionFormValues} from "./SubscriptionForm";

export const defaultCourseValue = {
    name: "",
    subscriptionType: "",
    description: ""
}

interface Props {
    initialValues?: ICourse
}

export const CourseForm = (props: Props) => {

    const {initialValues = defaultCourseValue} = props

    const [form, setForm] = useState<ICourse>(initialValues)

    const changeHandler = (event: any) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const onSelectHandler = ({description}: any) => {
        setForm({...form, description})
    }

    const submit = (event: any) => {
        event.preventDefault()

        console.log(form)
    }

    return (
        <form onSubmit={submit}>
            <FormInput onChange={changeHandler} name={"name"} formValue={form.name}/>
            <SelectInput label={"Subscription type"} onSelect={changeHandler}
                         options={[{value: "1", text: "1"}]}
                         value={form.subscriptionType}/>
            <Textarea value={form.description} onChange={onSelectHandler}/>

            <button
                className="btn btn-primary btn-block" type="submit">Create
            </button>
        </form>
    )
}
