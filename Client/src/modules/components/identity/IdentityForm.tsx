import React from 'react'
import {FormInput} from "../../shared/utils/FormInput";
import {useForm} from "../../hooks/form.hook";
import {ObjectKeys} from "../../shared/interface";
import {getKeyValue} from "../../shared/utils/getKeyValue";

interface Props {
    formNames: Array<string>
}


export const IdentityForm = (props: Props) => {

    const {formNames} = props

    const initialValues = formNames.reduce(function (result: ObjectKeys, item: string) {
        result[item] = ''
        return result
    }, {})


    const {form, changeHandler} = useForm(initialValues)


    return (
        <div className="card-body">
            <form onSubmit={() => {

            }}>
                {formNames.map((formValue, index) => (
                    <div className="col" key={`${formValue}-${index}`}>
                        <FormInput onChange={changeHandler} name={formValue}
                                   formValue={getKeyValue<ObjectKeys, string>(formValue)(form)}/>
                    </div>
                ))}

                <div className="form-group">
                    <button className="btn btn-primary btn-sm" type="submit">Save
                        Settings
                    </button>
                </div>
            </form>
        </div>
    )
}
