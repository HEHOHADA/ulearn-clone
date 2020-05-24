import React from 'react'
import {CourseForm} from "../../../components/Admin/course/CourseForm";

const initialValuesMock = {
    name: "mock",
    subscriptionType: "mock",
    description: "mock"
}
export const CourseEdit = () => {

    return (
        <CourseForm initialValues={initialValuesMock}/>
    )
}
