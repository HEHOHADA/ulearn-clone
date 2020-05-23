import React from 'react'
import {GroupCreateForm} from "../../components/teacher/Group/GroupCreateForm";
import {useHttp} from "../../hooks/http.hook";

export const GroupCreatePage = () => {
    const {request} = useHttp()
    const onSubmit = (event: any, form: any) => {
        event.preventDefault()

        const response = request('api/groups/create', 'POST', form)
    }

    return (
        <main className="page">
            <div className="container pt-5">
                <GroupCreateForm onSubmit={onSubmit}/>
            </div>
        </main>
    )
}
