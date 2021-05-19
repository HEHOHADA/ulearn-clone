import React from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {ReviewCode} from "./Review/ReviewCode"
import {CodeEditor} from "../../shared/utils/CodeEditor"
import {useFetch} from "../../hooks/fetch.hook"
import {useHttp} from "../../hooks/http.hook"
import {codeDoReviewRequest, codeReviewRequest} from "../../shared/request"


export const ReviewPage = () => {
    const {id} = useParams()
    const history = useHistory()
    const {request} = useHttp()
    const {fetched, isBusy} = useFetch<any>(`${codeReviewRequest}/${id}`)

    const propsCode = {
        readOnly: true
    }

    const onSubmit = async (event: any, form: any) => {
        event.preventDefault()
        try {
            await request(`${codeDoReviewRequest}/${id}`, 'POST', {...form})
            history.push('/groups')
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <main className="page">
            <div className="container">
                <h2 className="text-center">Название темы</h2>
                {!isBusy &&
                <div>
                    <span className="text-lg-left mt-2">{fetched.email}</span>
                    <CodeEditor code={fetched.code} {...propsCode}/>
                    <ReviewCode maxPoints={fetched.points} onSubmit={onSubmit}/>
                </div>
                }
            </div>
        </main>
    )
}
