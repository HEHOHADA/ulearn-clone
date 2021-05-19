import React from 'react'
import {CourseForm} from "../../../components/Admin/course/CourseForm";
import {ICourse} from "../../../shared/interface";
import {courseRequest} from "../../../shared/request";
import {useHttp} from "../../../hooks/http.hook";
import {useFetch} from "../../../hooks/fetch.hook";
import {useParams} from 'react-router-dom';

export const CourseEdit = () => {
    const {request} = useHttp()
    const {id} = useParams();
    const {fetched,isBusy} = useFetch<ICourse | any>(`${courseRequest}/${id}`)
    if (fetched) {
        fetched.subscriptionId = fetched.subscription.id
        delete fetched.subscription
    }

    const submit = async (event: any, form: ICourse) => {
        event.preventDefault()
        await request(courseRequest, 'POST', {...form})
    }
    return (
          !isBusy&&<CourseForm initialValues={fetched} title={"Edit"} onSubmit={submit}/>
    )
}
