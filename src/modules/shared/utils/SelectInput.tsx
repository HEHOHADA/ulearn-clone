import React from 'react'

interface Props {
    onSelect: (event:any) => void
    options: [{
        value: string
        text: string
    }]

    label: string
    value: string
}

export const SelectInput = (props: Props) => {
    const {onSelect, options} = props
    const htmlFor = `${props.label}-${Math.random()}`
    return (
        <div>
            <label htmlFor={htmlFor}>{props.label}</label>
            <select
                className="custom-select custom-select-lg mb-3"
                id={htmlFor}
                value={props.value}
                onChange={onSelect}
            >
                {options.map((option, index) => {
                    return <option
                        key={option.value + index}
                        value={option.value}>
                        {option.text}
                    </option>
                })}
            </select>
        </div>
    )
}


