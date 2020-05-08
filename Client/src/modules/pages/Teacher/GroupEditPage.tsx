import React from 'react'
import {GroupCreateForm} from "../../components/teacher/Group/GroupCreateForm";

interface Props {
    id?: string
}

export const GroupEditPage = (props: Props) => {

    return (
        <main className="page">
            <div className="container pt-5">
                <GroupCreateForm/>
            </div>
        </main>
    )
}
