import React from 'react'
import {IVisibleModule, ModuleForm} from "../../../components/Admin/module/ModuleForm"
import {useHttp} from "../../../hooks/http.hook";
import {moduleRequest} from "../../../shared/request";
import {useParams, useHistory} from "react-router-dom";

export const ModuleCreate = () => {
    const {request} = useHttp()

    const history = useHistory();
    const {courseId} = useParams()
    const submit = async (event: any, form: IVisibleModule) => {
        event.preventDefault()
        history.push(`/admin/course/${courseId}/module`)
    }
    return (
        <ModuleForm loading={false} onSubmit={submit} title={"Module Create"}/>
    )
}
