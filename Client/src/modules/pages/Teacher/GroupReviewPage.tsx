import React, {useEffect} from 'react'
import {Link, useParams} from "react-router-dom"
import {useHttp} from "../../hooks/http.hook"
import {useFetch} from "../../hooks/fetch.hook"
import {groupReviewRequest} from "../../shared/request"

export const GroupReviewPage = () => {

    const {id} = useParams()
    const {request} = useHttp()

    useEffect(() => {
        // request(`api/groups/${id}`, "GET")
    }, [id])
    const {fetched} = useFetch<any>(`${groupReviewRequest}/${id}`)
    const onEditHandler = () => {

    }

    const reviewHandler = () => {
        return (
            fetched && fetched.map((code: any) => (
                <li className="list-group-item module" key={code.id}>
                    <Link to={'/'}>
                        <div>{code.task}</div>
                    </Link>
                    <div>{}</div>

                    <button type="button" onClick={onEditHandler} className="btn btn-primary">Изменить</button>
                    <span className="badge badge-primary badge-pill">5/5</span>
                </li>
            ))

        )
    }

    return (
        <main className="page">
            <div className="container pt-3">
                <h2 className="pb-3">
                    Пришедшие код
                </h2>
                <div>
                    <ul>
                        {reviewHandler()}
                    </ul>
                </div>
            </div>
        </main>
    )
}
