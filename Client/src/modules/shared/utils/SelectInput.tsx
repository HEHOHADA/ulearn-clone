import React, {useState} from 'react'

interface Props {
    onSelect: (event: any) => void
    data: Array<any>
    label: string
    name: string
    value: any
    optionName?: Array<string>
}

export const SelectInput = (props: Props) => {
    const onChange = (func: (label: string) => void, event: any) => {
        console.log(event.target.selectedOptions)
        const chosenOpt = event.target.selectedOptions[0].value
        func(chosenOpt)
        setSelected(chosenOpt)
    }
    const {onSelect, data, name, value, optionName} = props
    const [selected, setSelected] = useState(value)
    const htmlFor = `${props.label}-${Math.random()}`
    return (
        <div>
            <label htmlFor={htmlFor}>{props.label}</label>
            <select
                value={selected}
                name={name}
                className="custom-select custom-select-lg mb-3"
                id={htmlFor}
                onChange={(event: any) => onChange(onSelect, event)}
            >
                {data && data.map((option, index) => {
                    return <option
                        key={option + index}
                        value={option}>
                        {(optionName && optionName[index]) ? optionName[index] : option}
                    </option>
                })}
            </select>
        </div>
    )
}


