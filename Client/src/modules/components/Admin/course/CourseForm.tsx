import React, {FC} from 'react'
import {FormInput} from "../../../shared/utils/FormInput"
import {ICourse} from "../../../shared/interface"
import {SelectInput} from "../../../shared/utils/SelectInput"
import {useForm} from "../../../hooks/form.hook";
import {CourseViewModel} from "../../../view-models/CourseViewModel";

export const defaultCourseValue = {
    name: "",
    subscriptionType: "",
    description: ""
}

interface IProps {
    initialValues?: ICourse
}

export const CourseForm: FC<IProps> = (props: IProps) => {

    const {initialValues = defaultCourseValue} = props


    const {form, changeHandler,generateInputs} = useForm<ICourse>(initialValues)

    const submit = (event: any) => {
        event.preventDefault()

        console.log(form)
    }

    return (

        <form onSubmit={submit}>
            {/*<Textarea value={form.description} onChange={onSelectHandler}/>*/}

            {
                generateInputs()
            }
            <button
                className="btn btn-primary btn-block" type="submit">Create
            </button>
        </form>
    )
}
