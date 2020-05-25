import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import {groupRequest} from "../../shared/request"
import {useFetch} from "../../hooks/fetch.hook"
import {Loader} from "../../shared/utils/Loader"
import {IGroup} from "../../shared/interface";

export const GroupsPage = () => {

    const {fetched, loading} = useFetch<Array<IGroup>>(groupRequest)
    const history = useHistory()
    if (loading) {
        return <Loader/>
    }
    const onEditGroup = (group: number) => {
        history.push(`/group/edit${group}`)
    }
    return (
        <main className="page">
            <div className="container pt-5">
                {
                    fetched && fetched.map((g: any) => (
                        <div key={g.id + g.name}>
                            <Link to={`/group/${g.id}`}>{g.name}</Link>
                            <span onClick={() => onEditGroup(g.id)}>Изменить группу</span>
                        </div>
                    ))

                }
            </div>
        </main>
    )
}
