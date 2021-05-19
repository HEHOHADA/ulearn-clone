import React, {useCallback} from 'react'
import {Dropzone} from '../../shared/utils/Dropzone'
import {useHttp} from '../../hooks/http.hook'
import {accountRequest} from "../../shared/request"

export const IdentityPicture = () => {
    const {request} = useHttp()
    const onDrop = useCallback(async ([acceptedFiles]) => {
        const formData = new FormData()

        console.log(acceptedFiles)
        formData.append("file", acceptedFiles)

        console.log(formData.getAll("file"))

        fetch(`${accountRequest}/setImage`, {
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0YjhiZTQzOS04Y2VjLTQ2NWQtODZkYS0yMzg2ZGNhODlkYmUiLCJzdWIiOiI2ZDI2OWQ4OS05YWVlLTRhNTQtYmYwNS1iOTIzMDIxZDE1ZGEiLCJuYW1lIjoiQWRtaW4iLCJyb2xlIjoiQWRtaW4iLCJleHAiOjE1OTMwNzgzNDgsImlzcyI6Imh0dHBzOi8vdWxlYXJuQ2xvbmUuY29tIiwiYXVkIjoiaHR0cHM6Ly91bGVhcm5DbG9uZS5jb20ifQ.CstYB6UbQMCw-UJiuClc24NXMVeecJPVzGdrSA4DytM`
            },
            method: 'POST',
            body: formData
        })

        /*const response = await request(`${accountRequest}/setImage`,
            'POST', formData,{'Content-Type':'multipart/form-data; boundary=---------------------------320766478615479559063564873044'})*/

        //console.log(response)
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
