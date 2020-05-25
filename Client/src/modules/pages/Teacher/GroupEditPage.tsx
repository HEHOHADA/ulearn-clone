import React, {useEffect} from 'react'
import {GroupCreateForm} from "../../components/teacher/Group/GroupCreateForm"
import {useHttp} from "../../hooks/http.hook"
import {useParams} from 'react-router-dom'
import {groupRequest} from "../../shared/request"
import {useFetch} from "../../hooks/fetch.hook";


export const GroupEditPage = () => {
    const {request} = useHttp()
    const {id} = useParams()

    const {fetched} = useFetch(`${groupRequest}/${id}`)
    const onSubmit = (event: any, form: any) => {
        event.preventDefault()

        const response = request(`${groupRequest}/edit/${id}`, 'PUT', {...form})
    }
    return (
        <main className="page">
            <div className="container pt-5">
                <GroupCreateForm initialValues={fetched} onSubmit={onSubmit}/>
            </div>
        </main>
    )
}
