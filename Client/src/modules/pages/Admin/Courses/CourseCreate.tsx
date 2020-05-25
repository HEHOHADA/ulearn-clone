import React from 'react'
import {CourseForm, IVisibleCourse} from "../../../components/Admin/course/CourseForm";
import {useHttp} from "../../../hooks/http.hook";
import {ICourse, ISubscription} from "../../../shared/interface";
import {courseRequest, subscriptionRequest} from "../../../shared/request";
import {SubscriptionForm} from "../../../components/pay/SubscriptionForm";


export const CourseCreate = () => {
    const {request} = useHttp()

    const submit = async (event: any, form: IVisibleCourse) => {
        event.preventDefault()
        form.subscriptionId = parseInt(String(form.subscriptionId))
        await request(courseRequest, 'POST', {...form})
    }

    return (
        <CourseForm title={"Create"} onSubmit={submit}/>
    )
}

