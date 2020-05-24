import React, {useCallback} from 'react'
import {Dropzone} from '../../shared/utils/Dropzone'
import {useHttp} from '../../hooks/http.hook'
import {URL} from "../../shared/request"

export const IdentityPicture = () => {
    const {request} = useHttp()
    const onDrop = useCallback(async ([acceptedFiles]) => {
        const reader = new FileReader()
        const formData = new FormData()
        // reader.onload = () => {
        //     const binaryStr = reader.result
        //     console.log(binaryStr)
        formData.append('file', acceptedFiles)
        // }

        // reader.readAsArrayBuffer(acceptedFiles)
        const response = await request(URL, 'POST', formData, {'Content-Type': 'multipart/form-data'})
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
