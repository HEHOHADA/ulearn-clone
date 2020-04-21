import React from 'react'


export const Textarea = (props: any) => {
    const {description, onChange} = props
    return (
        <textarea value={description} onChange={onChange} cols={40} rows={10}/>
    )
}
