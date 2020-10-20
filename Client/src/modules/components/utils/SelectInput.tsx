import React, { useCallback, useMemo, useState } from 'react'

interface Props {
    onSelect: (event: any) => void
    data: Array<any>
    label: string
    name: string
    value: any
    optionName?: Array<string>
}

export const SelectInput = (props: Props) => {

    const {onSelect, data, name, value, optionName, label} = props
    const onChange = useCallback((func: (label: string) => void, event: any) => {
        const chosenOpt = event.target.selectedOptions[0].value
        func(chosenOpt)
        setSelected(chosenOpt)
    }, [])


    const [selected, setSelected] = useState(() => value)
    const htmlFor = useMemo(() => `${ label }-${ name }`, [label, name])
    return (
        <div>
            <label htmlFor={ htmlFor }>{ label }</label>
            <select
                value={ selected }
                name={ name }
                className="custom-select custom-select-lg mb-3"
                id={ htmlFor }
                onChange={ (event: any) => onChange(onSelect, event) }
            >
                { data && data.map((option, index) => {
                    return <option
                        key={ option + index }
                        value={ option }>
                        { (optionName && optionName[index]) ? optionName[index] : option }
                    </option>
                }) }
            </select>
        </div>
    )
}


