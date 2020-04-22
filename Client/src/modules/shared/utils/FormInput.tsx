import React from 'react'

interface Props {
    onChange: (event: any) => void
    name: string
    formValue: any
}

export const FormInput = (props: Props) => {

    const {onChange, name, formValue} = props

    return (
        <div className="form-group">
            <label htmlFor={name}>{name}</label>
            <input
                onChange={onChange}
                value={formValue}
                name={name}
                placeholder={name}
                className="form-control item"
                type={name}/>
        </div>
    )
}
