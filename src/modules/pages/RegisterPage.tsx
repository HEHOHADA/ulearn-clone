import React, {FC, useState} from 'react'
import {RegisterModel} from "../shared/interface";
import {FormInput} from "../shared/utils/FormInput";


export const RegisterPage: FC = () => {

    const [form, setForm] = useState<RegisterModel>({
        username: '',
        email: '',
        password: ''
    })


    const changeHandler = (event: any) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            //Login with api
        } catch (e) {

        }
    }

    return (
        <>
            <div className="block-heading">
                <h2 className="text-info">Регистрация</h2>
                <p>Пожалуйста зарегистрируйтесь</p>
            </div>
            <form>
                <FormInput onChange={changeHandler} name={"username"} formValue={form.username}/>
                <FormInput onChange={changeHandler} name={"email"} formValue={form.email}/>
                <FormInput onChange={changeHandler} type={"password"} name={"password"} formValue={form.password}/>

                <button
                    onSubmit={registerHandler}
                    className="btn btn-primary btn-block" type="submit">Register
                </button>
            </form>
        </>
    )
}
