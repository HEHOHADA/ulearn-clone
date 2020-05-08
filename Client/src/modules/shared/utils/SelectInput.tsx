import React from 'react'

interface Props {
    onSelect: (event: any) => void
    options: Array<string>
    label: string
    name: string,
    value:string
}

export const SelectInput = (props: Props) => {
    const {onSelect, options, name,value} = props
    const htmlFor = `${props.label}-${Math.random()}`
    return (
        <div>
            <label htmlFor={htmlFor}>{props.label}</label>
            <select
                value={value}
                name={name}
                className="custom-select custom-select-lg mb-3"
                id={htmlFor}
                onChange={onSelect}
            >
                {options && options.map((option, index) => {
                    return <option
                        key={option + index}
                        value={option}>
                        {option}
                    </option>
                })}
            </select>
        </div>
    )
}


