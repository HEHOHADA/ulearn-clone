import React from 'react'
import {Options, ThemeForm} from "../../../components/Admin/theme/ThemeForm"
import {useHttp} from "../../../hooks/http.hook";
import {useParams} from "react-router-dom";
import {Question} from "../../../components/Admin/theme/TestForm";
import {api, moduleRequest, testTackRequest} from "../../../shared/request";

export const ThemeCreate = () => {
    const {request} = useHttp()

    const {moduleId} = useParams()
    const submit = async (event: any,
                          name: string,
                          videoHref: string,
                          enteredQuestions: Array<Question>,
                          enteredCode: string,
                          description: string,
                          selectedItem?: string) => {
        event.preventDefault()
        let body: any = {name, moduleId: parseInt(moduleId!), description}
        if (selectedItem) {
            selectedItem === Options.Code
                ? body.codeTask = enteredCode
                : selectedItem === Options.Video
                ? body.video = videoHref
                : body.questions = enteredQuestions
        }
        await request(`${api}/${selectedItem}Task`, 'POST', body)
    }
    return (
        <ThemeForm loading={false} onSubmit={submit} title={"Theme Create"}/>
    )
}
