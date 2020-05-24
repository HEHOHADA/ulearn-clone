import React, {useEffect} from 'react'
import {GroupCreateForm} from "../../components/teacher/Group/GroupCreateForm";
import {useHttp} from "../../hooks/http.hook";
import {useParams} from 'react-router-dom';


export const GroupEditPage = () => {
    const {request} = useHttp()
    const {id} = useParams()

    useEffect(() => {
        //const data = request(`api/groups/${id}`,'GET')
    }, [id])

    const onSubmit = (event: any, form: any) => {
        event.preventDefault()

        const response = request('api/groups/edit', 'POST', form)
    }
    return (
        <main className="page">
            <div className="container pt-5">
                <GroupCreateForm onSubmit={onSubmit}/>
            </div>
        </main>
    )
}
