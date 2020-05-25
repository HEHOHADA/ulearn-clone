import React from 'react'
import {Link} from 'react-router-dom'
import {groupRequest} from "../../shared/request"
import {useFetch} from "../../hooks/fetch.hook"
import {Loader} from "../../shared/utils/Loader"

export const GroupsPage = () => {

    const {fetched, loading} = useFetch(groupRequest)

    if (loading) {
        return <Loader/>
    }
    const onEditGroup = () => {

    }
    return (
        <main className="page">
            <div className="container pt-5">
                {
                    fetched && fetched.map((g: any) => (
                        <div key={g.id + g.name}>
                            <Link to={`/group/${g.id}`}>{g.name}</Link>
                            <span onClick={onEditGroup}>Изменить группу</span>
                        </div>
                    ))

                }
            </div>
        </main>
    )
}
