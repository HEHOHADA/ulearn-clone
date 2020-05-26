import React from 'react'
import {CourseForm, IVisibleCourse} from "../../../components/Admin/course/CourseForm";
import {useHttp} from "../../../hooks/http.hook";
import {courseRequest} from "../../../shared/request";
import {useHistory} from 'react-router-dom';


export const CourseCreate = () => {
    const {request} = useHttp()
    const history = useHistory()
    const submit = async (event: any, form: IVisibleCourse) => {
        event.preventDefault()
        form.subscriptionId = parseInt(String(form.subscriptionId))
        await request(courseRequest, 'POST', {...form})
        history.push(`/admin/course`)
    }

    return (
        <CourseForm title={"Create"} onSubmit={submit}/>
    )
}

