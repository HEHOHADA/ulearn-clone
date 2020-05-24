import React, {useCallback, useEffect} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {Link} from 'react-router-dom';
import {groupRequest} from "../../shared/request";

export const GroupsPage = () => {

    const {request} = useHttp()

    let groups: any = []
    const fetchGroups = useCallback(async () => {
        try {
            const response = await request(groupRequest)

        } catch (e) {
            console.log(e)
        }
    }, [])

    useEffect(() => {
        fetchGroups()
    }, [])

    const onEditGroup = () => {

    }
    return (
        <main className="page">
            <div className="container pt-5">
                {
                    groups.map((g: any) => (
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
