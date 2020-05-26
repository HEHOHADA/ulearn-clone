import React, {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {groupRequest} from "../../shared/request"
import {useFetch} from "../../hooks/fetch.hook"
import {Loader} from "../../shared/utils/Loader"
import {IGroup} from "../../shared/interface";
import {useHttp} from "../../hooks/http.hook";

export const GroupsPage = () => {

    const {fetched, loading, isBusy} = useFetch<Array<IGroup>>(groupRequest)
    const {request} = useHttp()
    const [groups, setGroups] = useState<Array<IGroup>>()
    const history = useHistory()


    useEffect(() => {
        if (!isBusy) {
            setGroups(fetched)
        }
    }, [isBusy, fetched])

    const onEditGroup = (group: number) => {
        history.push(`/group/edit/${group}`)
    }

    const onDeleteGroup = async (groupId: number) => {
        try {
            const deleted = await request(`${groupRequest}/${groupId}`, 'DELETE')
            const newGroups = groups!.filter((sub: IGroup) => sub.id !== deleted.id)
            setGroups(newGroups)
        } catch (e) {
            console.log(e)
        }
    }
    if (loading) {
        return <Loader/>
    }
    return (
        <main className="page">
            <div className="container pt-5">
                {
                    groups && groups.map((g: any) => (
                        <div key={g.id + g.name} className="card align-content-between d-flex m-3">

                            <div className="btn-block">
                                <Link className="card-columns mr-5" to={`/group/${g.id}`}>{g.name}</Link>
                                <div className="d-inline">
                                    <button type="button"
                                            className="btn btn-outline-primary m-1"
                                            onClick={() => onEditGroup(g.id)}>Изменить группу
                                    </button>
                                    <button type="button"
                                            className="btn btn-outline-primary"
                                            onClick={() => onDeleteGroup(g.id)}>
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))

                }
                <Link to={`/group/create`}
                      className="btn btn-primary m-1"
                >Добавить группу
                </Link>
            </div>
        </main>
    )
}
