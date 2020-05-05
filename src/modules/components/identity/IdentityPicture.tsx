import React, {useCallback} from 'react'
import {Dropzone} from "../../shared/utils/Dropzone";
import {Picture} from "../../shared/interface";

export const IdentityPicture = () => {

    const onDrop = useCallback(([acceptedFiles]: [Picture]) => {
        console.log(acceptedFiles.lastModified)
    }, [])

    return (
        <div className="card-body text-center shadow"><img alt="/"
                                                           className="rounded-circle mb-3 mt-4"
                                                           width="160"
                                                           height="160"/>
            <div className="mb-3">
                <Dropzone onDrop={onDrop}/>
            </div>
        </div>
    )
}
