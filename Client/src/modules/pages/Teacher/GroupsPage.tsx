import React from 'react'
import {useHttp} from "../../hooks/http.hook";
import {Link} from 'react-router-dom';

export const GroupsPage = () => {

    const {} = useHttp()
    const onEditGroup = () => {

    }
    return (
        <main className="page">
            <div className="container pt-5">
                <Link to={`/group/${1}`}>название группы</Link>
                <span onClick={onEditGroup}>Изменить группу</span>
            </div>
        </main>
    )
}
