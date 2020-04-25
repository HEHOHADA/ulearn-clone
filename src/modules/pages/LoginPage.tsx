import React, {FC, useState} from 'react'
import {LoginModel} from "../shared/interface";
import {FormInput} from "../shared/utils/FormInput";


export const LoginPage: FC = () => {

    const [form, setForm] = useState<LoginModel>({
        email: '',
        password: ''
    })


    const changeHandler = (event: any) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async () => {
        try {
            //Login with api
        } catch (e) {

        }
    }


    return (
        <>
            <div className="block-heading">
                <h2 className="text-info">Вход</h2>
                <p>Пожауйста войдите в систему</p>
            </div>
            <form>
                <FormInput onChange={changeHandler} name={"email"} formValue={form.email}/>
                <FormInput onChange={changeHandler} type={"password"} name={"password"} formValue={form.password}/>
                <button
                    onSubmit={loginHandler}
                    className="btn btn-primary btn-block" type="submit">Log In
                </button>
            </form>
        </>
    )
}
