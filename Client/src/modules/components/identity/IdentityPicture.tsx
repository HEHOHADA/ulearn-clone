import React, { useCallback, useState } from 'react'
import { Dropzone } from '../utils/Dropzone'
import { accountRequest, fileDownloadRequest } from '../../../shared/request'

interface IProps {
    initialValue: string
}

export const IdentityPicture = (props: IProps) => {
    const {initialValue} = props
    const [imageSrc, setImageSrc] = useState<string>(initialValue);

    const onDrop = useCallback(async ([acceptedFiles]) => {
        const formData = new FormData()
        formData.append("file", acceptedFiles)

        const token = JSON.parse(localStorage.getItem("userData")!).token
        console.log(token)
        await fetch(`${accountRequest}/setImage`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            method: 'POST',
            body: formData
        }).then(async (resp: any) => {
            const a = await resp.json()
            setImageSrc(`${fileDownloadRequest}?filename=${a.fileName}`)
        })
    }, [])

    return (
        <div className="card-body text-center shadow">
            <img src={imageSrc}
                 alt="/"
                 className="rounded-circle mb-3 mt-4"
                 width="160"
                 height="160"/>
            <div className="mb-3">
                <Dropzone onDrop={onDrop}/>
            </div>
        </div>
    )
}
