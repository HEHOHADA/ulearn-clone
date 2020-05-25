import React from 'react'
import {IVisibleModule, ModuleForm} from "../../../components/Admin/module/ModuleForm"
import {useHttp} from "../../../hooks/http.hook";
import {IVisibleCourse} from "../../../components/Admin/course/CourseForm";
import {courseRequest, moduleRequest} from "../../../shared/request";
import {useParams} from "react-router-dom";

export const ModuleCreate = () => {
    const {request} = useHttp()

    const {courseId} = useParams()
    const submit = async (event: any, form: IVisibleModule) => {
        event.preventDefault()
        await request(moduleRequest, 'POST', {...form,courseId:parseInt(courseId!)})
    }
    return (
        <ModuleForm loading={false} onSubmit={submit} title={"Module Create"} />
    )
}
