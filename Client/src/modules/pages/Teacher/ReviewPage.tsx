import React from 'react'
import {useParams} from 'react-router-dom'
import {ReviewCode} from "./Review/ReviewCode"
import {CodeEditor} from "../../shared/utils/CodeEditor"
import {useFetch} from "../../hooks/fetch.hook"
import {useHttp} from "../../hooks/http.hook"
import {codeReviewRequest} from "../../shared/request";


export const ReviewPage = () => {
    const {id} = useParams()
    const {request} = useHttp()
    const {fetched, isBusy} = useFetch<any>(`${codeReviewRequest}/${id}`)

    const propsCode = {
        readOnly: true
    }
    const onSubmit = async (event: any, form: any) => {
        try {
            const response = await request(`${codeReviewRequest}/${id}`, 'POST', {...form})
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <main className="page">
            <div className="container">
                <h2 className="text-center">Название темы</h2>
                <span className="text-lg-left mt-2">Имя ученика</span>
                {!isBusy && <CodeEditor code={fetched.code} {...propsCode}/>}
                <ReviewCode onSubmit={onSubmit}/>
            </div>
        </main>
    )
}
