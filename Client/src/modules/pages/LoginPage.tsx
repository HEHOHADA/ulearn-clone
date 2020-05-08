import React, {FC, useContext} from 'react'
import {LoginModel} from "../shared/interface";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import jwt from 'jsonwebtoken'
import {useHistory} from "react-router-dom"
import {useForm} from "../hooks/form.hook";

export const LoginPage: FC = () => {

    const auth = useContext(AuthContext)
    const history = useHistory()
    const {loading, request} = useHttp()
    const initialValues = {
        email: '',
        password: ''
    }

    const {form, generateInputs} = useForm<LoginModel>(initialValues)

    const loginHandler = async () => {
        try {
            let role = ''
            const data = await request('/api/auth/login', 'POST', {form})
            jwt.verify(data.token,
                process.env.ACCESS_TOKEN_KEY as string,
                function (err: any, decoded: any) {
                    if (err) {
                        return null
                    }
                    if (decoded) {

                        role = decoded.role
                    }
                })
            auth.login(data.token, data.userId, role)
            if (auth.role === 'admin') {
                history.push('/admin/')
            } else history.push('/')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className="block-heading">
                <h2 className="text-info">Вход</h2>
                <p>Пожауйста войдите в систему</p>
            </div>
            <form>
                {generateInputs((key: string) => {
                    if (key === 'password') {
                        return 'password'
                    }
                    return 'text'
                })}
                <button
                    disabled={loading}
                    onSubmit={loginHandler}
                    className="btn btn-primary btn-block" type="submit">Log In
                </button>
            </form>
        </>
    )
}
