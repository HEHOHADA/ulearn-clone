import React from 'react'
import {FormInput} from "../../shared/utils/FormInput"
import {useForm} from "../../hooks/form.hook"
import {ObjectKeys} from "../../shared/interface"
import {getKeyValue} from "../../shared/utils/getKeyValue"
import {Loader} from "../../shared/utils/Loader";
import {validationForm} from "../../shared/validation/validationAuthForm";

interface Props {
    formNames: Array<string>
    submit: (event: any, form: any) => void
    loading: boolean
    initialValues?: any
    error?: any
}


export const IdentityForm = (props: Props) => {

    const initial = props.formNames.reduce(function (result: ObjectKeys, item: string) {
        result[item] = ''
        return result
    }, {})

    const {submit, loading, initialValues = initial} = props
    const {form, changeHandler, validation, errors} = useForm(initialValues)
    if (loading) {
        return <Loader/>
    }

    return (
        <div className="card-body">
            <form onSubmit={(event) => {
                event.preventDefault()
                if (form.password) {
                    const isValid = validation(validationForm)
                    if (errors && !isValid) {
                        return
                    }
                }
                submit(event, form)
            }}>

                {props.formNames.map((formValue, index) => {
                    let type = 'text'
                    if (formValue.toLowerCase().includes('password') || formValue === 'current') {
                        type = 'password'
                    }
                    return (
                        <div className="col" key={`${formValue}-${index}`}>
                            {errors && <span className="alert-warning">{errors[formValue]}</span>}
                            <FormInput type={type} onChange={changeHandler} name={formValue}
                                       formValue={getKeyValue<ObjectKeys, string>(formValue)(form)}/>
                        </div>
                    )
                })}

                <div className="form-group">
                    <button className="btn btn-primary btn-sm" disabled={loading} type="submit">Save
                        Settings
                    </button>
                </div>
            </form>
        </div>
    )
}
