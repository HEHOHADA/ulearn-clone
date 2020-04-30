import React from 'react'
import {Link} from "react-router-dom";

export const GroupReviewPage = () => {
    return (
        <main className="page">
            <div className="container pt-3">
                <h2 className="pb-3">
                    Пришедшие код
                </h2>
                <div>
                    <li className="list-group-item module">
                        <Link to={'/'}>
                            <div>Название темы</div>
                        </Link>
                        <div>от кого</div>
                        <button type="button" className="btn btn-primary">Изменить</button>
                        <span className="badge badge-primary badge-pill">5/5</span>
                    </li>
                </div>
            </div>
        </main>
    )
}
