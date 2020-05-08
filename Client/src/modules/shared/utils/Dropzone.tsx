import React from 'react'
import {useDropzone} from 'react-dropzone'


export const Dropzone = (props: any) => {
    const {onDrop} = props
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        multiple: false,
        onDrop: onDrop,
        accept: "image/jpeg, image/png"
    })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} className="form-control-file"/>
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drop file to change photo or click here</p>
            }
        </div>
    )
}
