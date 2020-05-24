import React from 'react'
import {CourseForm} from "../../../components/Admin/course/CourseForm";
import {SubscriptionForm} from "../../../components/pay/SubscriptionForm";
import {ICourse} from "../../../shared/interface";
import {courseRequest} from "../../../shared/request";
import {useHttp} from "../../../hooks/http.hook";

const initialValuesMock = {
    name: "mock",
    subscriptionId: 0,
    description: "mock"
}
export const CourseEdit = () => {
    const {request} = useHttp()
    const submit = async (event: any, form: ICourse) => {

        event.preventDefault()
        await request(courseRequest, 'POST', {...form})
    }
    return (
        <CourseForm initialValues={initialValuesMock} title={"Edit"}  onSubmit={submit}/>
    )
}
