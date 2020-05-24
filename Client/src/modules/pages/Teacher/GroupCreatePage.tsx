import React from 'react'
import {GroupCreateForm} from "../../components/teacher/Group/GroupCreateForm";
import {useHttp} from "../../hooks/http.hook";
import {groupRequest} from "../../shared/request";

export const GroupCreatePage = () => {
    const {request} = useHttp()
    const onSubmit = async (event: any, form: any) => {
        event.preventDefault()

        const response = await request(groupRequest, 'POST', {...form})
        console.log(response)
    }

    return (
        <main className="page">
            <div className="container pt-5">
                <GroupCreateForm onSubmit={onSubmit}/>
            </div>
        </main>
    )
}
