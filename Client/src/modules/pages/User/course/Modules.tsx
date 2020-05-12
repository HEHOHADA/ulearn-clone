import React from 'react'
import {useHistory} from "react-router-dom";

interface Props {
    onChooseModule: any
}

export const Modules = (props: Props) => {

    // const {onChooseModule} = props
    const history = useHistory()

    const onClickBackHandler = () => {
        history.goBack()
    }

    const onChooseModuleHandler = () => {

    }

    return (
        <div className="col-md-4 col-xs-12">
            <header className="header-standard header-line">
                <button type="button" className="btn btn-link" onClick={onClickBackHandler}>Назад</button>
                <h3>Header</h3>
            </header>
            <div>
                <li className="list-group-item module">
                    <button className="btn btn-link" onClick={onChooseModuleHandler}>
                        <div>название</div>
                    </button>
                    <span>5/5</span>
                </li>
            </div>
        </div>
    )
}
