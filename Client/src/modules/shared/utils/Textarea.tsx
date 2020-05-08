import React from 'react'


export const Textarea = (props: any) => {
    const {name, formValue, onChange} = props
    return (
        <div className="form-group">
            <textarea className="md-textarea form-control" value={formValue} name={name} onChange={onChange} rows={3}/>
        </div>
    )
}
