import React, {FC} from 'react'
import {ICourse} from "../../../shared/interface"
import {useForm} from "../../../hooks/form.hook";

export const defaultCourseValue = {
    name: "",
    subscription:{},
    description: ""
}

interface IProps {
    initialValues?: ICourse
}

export const CourseForm: FC<IProps> = (props: IProps) => {

    const {initialValues = defaultCourseValue} = props


    const {form,generateInputs} = useForm<ICourse>(initialValues)

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
