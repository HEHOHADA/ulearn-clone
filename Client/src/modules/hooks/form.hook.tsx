import React, {useState} from "react";
import {FormInput} from "../shared/utils/FormInput";
import {getKeyValue} from "../shared/utils/getKeyValue";

export const useForm = <T extends {}>(initialValues: T) => {
    const [form, setForm] = useState<T>(initialValues)
    const keys = Object.keys(initialValues)


    const generateInputs = (condition?: (key: string) => string, array: Array<string> = keys) =>
        array.map((key, index) => {

            let type = "text"
            if (condition) type = condition(key)
            return (
                <FormInput key={`${key}-${index}`} onChange={changeHandler} name={key} type={type}
                           formValue={getKeyValue<T, any>(key)(form)}/>
            )
        })


    const changeHandler = (event: any) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const clearForm = () => {
    }

    return {form, changeHandler, generateInputs, setForm, clearForm}
}
