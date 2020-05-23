import React, {useState} from "react";
import {FormInput} from "../shared/utils/FormInput";
import {getKeyValue} from "../shared/utils/getKeyValue";
import {ObjectKeys} from "../shared/interface";

interface Some<T> {
    array: Array<{
        keys?: keyof T | any
        component: JSX.Element | any
        type?: string
        changeInput?: (e: any) => void
    }>
    initialValues: T
}

export interface Any<T> {
    key: keyof T
    component?: any
}

export const useForm = <T extends {}>(initialValues: T) => {

    const [form, setForm] = useState<T>(initialValues)

    const objectKeys = Object.keys(initialValues)

    const keys = objectKeys as Array<keyof T>

    const [errors, setErrors] = useState(keys.reduce(function (result: ObjectKeys, item: string) {
        result[item] = ''
        return result
    }, {}))

    // const newArray: Array<Some<T>> = [{
    //     values: '', component: "", defaultValues: () => {
    //     }
    // }]

    // const generate = () => {
    //     return array.map(({keys, component: Component, type, changeInput = changeHandler}, index) => {
    //         return (<Component key={`${keys}-${index}`} onChange={changeInput}
    //                            name={keys}
    //                            type={type} formValue={getKeyValue<T, any>(keys)(form)}
    //             />
    //
    //         )
    //     })
    // }


    const generateInputs = (condition?: (key: string) => string, array: Array<keyof T> = keys) =>

        array.map((key, index) => {

            let type = "text"
            if (condition) type = condition(key)
            return (
                <div key={`${key}-${index}`}>
                    {errors[key] &&
                    <div className="alert alert-danger" role="alert">
                        <strong>    {errors[key] || 'Введите правильное значение'}</strong>
                    </div>
                    }
                    <FormInput onChange={changeHandler} name={key} type={type}
                               formValue={getKeyValue<T, any>(key)(form)}/>
                </div>
            )
        })

    const validation = (validate: (values: any) => {}) => {
        const newErrors = validate(form)
        setErrors({...newErrors})
        return Object.values(newErrors).every(v => !v)
    }

    const changeHandler = (event: any) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const clearForm = (defaultValues: T) => {
        setForm({...defaultValues})
    }

    return {form, changeHandler, generateInputs, setForm, clearForm, validation, errors}
}
