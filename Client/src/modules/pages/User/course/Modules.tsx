import React from 'react'
import {Link, useHistory} from "react-router-dom";

export const Modules = () => {

    const history = useHistory()

    const onClickHandler = () => {
        history.goBack()
    }
    return (
        <div className="col-md-4 col-xs-12">
            <header className="header-standard header-line">
                <button type="button" className="btn btn-link" onClick={onClickHandler}>Назад</button>
                <h3>Header</h3>
            </header>
            <div>
                <li className="list-group-item module">
                    <Link to={'/'}>
                        <div>название</div>
                    </Link>
                    <span>5/5</span>
                </li>
            </div>
        </div>
    )
}
