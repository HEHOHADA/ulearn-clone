import React, {FC, useState} from 'react'
import { RegisterModel} from "../shared/interface";


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
        <form>
            <div className="form-group">
                <label htmlFor="userName">Username</label>
                <input
                    onChange={changeHandler}
                    value={form.username}
                    name="userName"

                    placeholder="Username"
                    className="form-control item"
                    type="userName"/></div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    onChange={changeHandler}
                    value={form.email}
                    name="email"

                    placeholder="Email"
                    className="form-control item"
                    type="email"/></div>
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
                onSubmit={registerHandler}
                className="btn btn-primary btn-block" type="submit">Log In
            </button>
        </form>
    )
}
