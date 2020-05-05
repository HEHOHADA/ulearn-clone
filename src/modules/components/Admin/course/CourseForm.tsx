import React from 'react'
import {FormInput} from "../../../shared/utils/FormInput"
import {ICourse} from "../../../shared/interface"
import {SelectInput} from "../../../shared/utils/SelectInput"
import {useForm} from "../../../hooks/form.hook";

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


    const {form, changeHandler} = useForm<ICourse>(initialValues)

    // const onSelectHandler = ({description}: any) => {
    //     setForm({...form, description})
    // }

    const submit = (event: any) => {
        event.preventDefault()

        console.log(form)
    }

    return (
        <form onSubmit={submit}>
            <FormInput onChange={changeHandler} name={"name"} formValue={form.name}/>
            <SelectInput label={"Subscription type"} onSelect={changeHandler}
                         options={["1"]}
                         name={"subscriptionType"} value={form.subscriptionType}/>
            {/*<Textarea value={form.description} onChange={onSelectHandler}/>*/}

            <button
                className="btn btn-primary btn-block" type="submit">Create
            </button>
        </form>
    )
}
