import React, {useCallback} from 'react'
import {Dropzone} from '../../shared/utils/Dropzone'
import {useHttp} from '../../hooks/http.hook'
import {accountRequest} from "../../shared/request"

export const IdentityPicture = () => {
    const {request} = useHttp()
    const onDrop = useCallback(async ([acceptedFiles]) => {
        const formData = new FormData()

        formData.append('file', acceptedFiles)

        const response = await request(`${accountRequest}/setImage`,
            'POST', formData, {'Content-Type': 'multipart/form-data'})

        console.log(response)
    }, [])

    return (
        <div className="card-body text-center shadow">
            <img alt="/"
                 className="rounded-circle mb-3 mt-4"
                 width="160"
                 height="160"/>
            <div className="mb-3">
                <Dropzone onDrop={onDrop}/>
            </div>
        </div>
    )
}
