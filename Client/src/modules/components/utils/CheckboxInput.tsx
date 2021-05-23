import React from 'react'
import { IAnswer } from '../../shared/interface'

interface Props {
    name: string
    options: Array<IAnswer>
    onChange: (event: any) => void
    classes: Map<string, string>
}

export const CheckboxInput = ({onChange, options, name, classes}: Props) => (
    <div>
        { options.map((option, index) => {
            const id = `${ name }-${ index }`
            const inputClass = classes && classes.get(option.text) ? classes.get(option.text) : ''
            return (
                <div className={ `checkbox ${ inputClass }` } key={ id }>
                    <label htmlFor={ id }>
                        <input
                            type="checkbox"
                            name={ name }
                            value={ option.text }
                            onChange={ onChange }
                            id={ id }
                        />
                        <span> { option.text }</span>
                    </label>
                </div>
            )
        })
        }
    </div>
)
