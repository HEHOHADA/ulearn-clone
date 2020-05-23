import React, {useEffect} from 'react'
import {Link, useParams} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";

export const GroupReviewPage = () => {

    const {id} = useParams()
    const {request} = useHttp()

    useEffect(() => {
        // request(`api/groups/${id}`, "GET")
    }, [id])

    const onEditHandler = () => {

    }

    const reviewHandler = () => {
        return (
            <li className="list-group-item module">
                <Link to={'/'}>
                    <div>Название темы</div>
                </Link>
                <div>от кого</div>

                <button type="button" onClick={onEditHandler} className="btn btn-primary">Изменить</button>
                <span className="badge badge-primary badge-pill">5/5</span>
            </li>
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
