import React from 'react'
import {FormInput} from "../../shared/utils/FormInput"
import {useForm} from "../../hooks/form.hook"
import {ObjectKeys} from "../../shared/interface"
import {getKeyValue} from "../../shared/utils/getKeyValue"

interface Props {
    formNames: Array<string>
    submit: (event: any, form: any) => void
    loading: boolean
}


export const IdentityForm = (props: Props) => {

    const {formNames, submit, loading} = props

    const initialValues = formNames.reduce(function (result: ObjectKeys, item: string) {
        result[item] = ''
        return result
    }, {})


    const {form, changeHandler} = useForm(initialValues)


    return (
        <div className="card-body">
            <form onSubmit={(event) => submit(event, form)}>
                {formNames.map((formValue, index) => (
                    <div className="col" key={`${formValue}-${index}`}>
                        <FormInput onChange={changeHandler} name={formValue}
                                   formValue={getKeyValue<ObjectKeys, string>(formValue)(form)}/>
                    </div>
                ))}

                <div className="form-group">
                    <button className="btn btn-primary btn-sm" disabled={loading} type="submit">Save
                        Settings
                    </button>
                </div>
            </form>
        </div>
    )
}
