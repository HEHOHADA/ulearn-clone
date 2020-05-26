import React from 'react'
import {ReviewCode} from "./Review/ReviewCode";
import {CodeEditor} from "../../shared/utils/CodeEditor"


export const ReviewPage = () => {
    // const {id} = useParams()
    // const {request} = useHttp()
    // const{fetched} = useFetch(`code/${id}`)

    const propsCode = {
        readOnly: true
    }
    return (
        <main className="page">
            <div className="container">
                <h2 className="text-center">Название темы</h2>
                <span className="text-lg-left mt-2">Имя ученика</span>
                <CodeEditor code={'dasdasdasda'} {...propsCode}/>
                <ReviewCode/>
            </div>
        </main>
    )
}
