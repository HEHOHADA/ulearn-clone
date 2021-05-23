import React from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/fetch.hook'
import { groupReviewRequest } from '../../../shared/request'

export default () => {

    const {id} = useParams()
    const history = useHistory()
    const {fetched} = useFetch<any>(`${ groupReviewRequest }/${ id }`)

    const onEditHandler = (id: any) => {
        history.push(`/code/${ id }`)
    }

    const reviewHandler = () => {
        return (
            fetched && fetched.map((code: any) => (
                <li className="list-group-item module" key={ code.id }>
                    <Link to={ '/' }>
                        <div>{ code.name }</div>
                    </Link>
                    <div>{ code.email }</div>

                    <button type="button" onClick={ () => onEditHandler(code.id) } className="btn btn-primary">Изменить
                    </button>
                    <span className="badge badge-primary badge-pill">{ code.points }</span>
                </li>
            ))

        )
    }

    return (
        <main className="page">
            <div className="container pt-3">
                <h2 className="pb-3">
                    Пришедший код
                </h2>
                <div>
                    <ul>
                        { reviewHandler() }
                    </ul>
                </div>
            </div>
        </main>
    )
}
