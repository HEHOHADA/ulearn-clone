import React, {FC, useState} from 'react'
import {LoginModel} from "../shared/interface";


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
        <form>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    onChange={changeHandler}
                    value={form.email}
                    name="email"
                    placeholder="Email"
                    className="form-control item"
                    type="email"/>
            </div>
            <div className="form-group">
                <label htmlFor="password">
                    Password
                </label>
                <input
                    onChange={changeHandler}
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={form.password}
                    className="form-control"
                />
            </div>
            <button
                onSubmit={loginHandler}
                className="btn btn-primary btn-block" type="submit">Log In
            </button>
        </form>
    )
}
