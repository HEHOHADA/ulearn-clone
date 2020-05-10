import React, {FC, useContext, useEffect} from 'react'
import {IData, LoginModel, Token} from "../shared/interface";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import jwt from 'jsonwebtoken'
import {useHistory} from "react-router-dom"
import {useForm} from "../hooks/form.hook";
import {loginRequest} from "../shared/request";
import {validationAuthForm} from "../shared/validation/validationAuthForm";



export const LoginPage: FC = () => {

    const auth = useContext(AuthContext)
    const history = useHistory()
    const {loading, request, error, clearError} = useHttp()
    const initialValues = {
        login: '',
        password: ''
    }

    const {form, generateInputs, validation, errors} = useForm<LoginModel>(initialValues)

    const loginHandler = async (event: any) => {
        event.preventDefault()
        clearError()
        const isValid = validation(validationAuthForm)
        if (errors && !isValid) {
            return
        }


        try {
            const data: IData = await request(loginRequest, 'POST', {...form})
            if (!data) {
                return
            }

            const decoded = jwt.decode(data.token!)
            if (!decoded) {
                return
            }
            const token = decoded as Token
            const role = token.role
            auth.login(data.token, token.sub, role)

            if (role == 'Admin') {
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
            {error &&
            < div className="alert alert-danger" role="alert">
                <strong>{error || 'Введите правильное значение'}</strong>
            </div>
            }
            <form
                onSubmit={loginHandler}
            >
                {generateInputs((key: string) => {
                    if (key === 'password') {
                        return 'password'
                    }
                    return 'text'
                })}
                <button
                    disabled={loading}
                    className="btn btn-primary btn-block" type="submit">Log In
                </button>
            </form>
        </>
    )
}
