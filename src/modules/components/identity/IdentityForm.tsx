import React, {useState} from 'react'
import {FormInput} from "../../shared/utils/FormInput";

interface Props {
    formNames: Array<string>
}

export const IdentityForm = (props: Props) => {

    const {formNames} = props

    const initialValues = formNames.reduce(function (result, item) {
        // @ts-ignore
        result[item] = ''
        return result
    }, {})

    const [form, setForm] = useState<any>(initialValues)

    const changeHandler = (event: any) => {
        setForm({...form, [event.target.name]: event.target.value})
    }



    return (
        <div className="card-body">
            <form onSubmit={()=>{

            }}>
                {formNames.map((formValue, index) => (
                    <div className="col" key={`${formValue}-${index}`}>
                        <FormInput onChange={changeHandler} name={formValue} formValue={form[formValue]}/>
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
