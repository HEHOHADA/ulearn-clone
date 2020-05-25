import React from 'react'
import {Options, ThemeForm} from "../../../components/Admin/theme/ThemeForm"
import {useHttp} from "../../../hooks/http.hook";
import {useParams} from "react-router-dom";
import {Question} from "../../../components/Admin/theme/TestForm";
import {api, moduleRequest, testTackRequest} from "../../../shared/request";

export const ThemeCreate = () => {
    const {request} = useHttp()

    const {moduleId} = useParams()
    const submit = async (event: any, name: string, videoHref: string, test: Array<Question>, code: string, description: string, selectedItem?: string) => {
        event.preventDefault()
        let task: any
        if (selectedItem) {
            selectedItem === Options.Code ? task = code : selectedItem === Options.Video ? task = videoHref : task = test
        }
        await request(`${api}/${selectedItem}Task?moduleId=${moduleId}`, 'POST', {name,description,task})
        console.log(name, description, selectedItem, task,`${api}/${selectedItem}Task?moduleId=${moduleId}`)
    }
    return (
        <ThemeForm loading={false} onSubmit={submit} title={"Theme Create"}/>
    )
}
