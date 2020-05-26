import React, {FC, useContext} from 'react'
import jwt from 'jsonwebtoken'
import {useHistory} from 'react-router-dom'
import {IData, RegisterModel, Token} from "../shared/interface"
import {useHttp} from "../hooks/http.hook"
import {useForm} from "../hooks/form.hook"
import {AuthContext} from "../context/AuthContext"
import {registerRequest} from "../shared/request"
import {validationAuthForm} from "../shared/validation/validationAuthForm"

export const RegisterPage: FC = () => {

    const history = useHistory()

    const initialValues = {
        email: '',
        username: '',
        password: ''
    }

    const {loading, request, error, clearError} = useHttp()
    const auth = useContext(AuthContext)
    const {form, generateInputs, validation, errors} = useForm<RegisterModel>(initialValues)


    const registerHandler = async (event: any) => {
        event.preventDefault()
        clearError()
        const isValid = validation(validationAuthForm)
        if (errors && !isValid) {
            return
        }
        try {
            const data: IData = await request(registerRequest, "POST", {...form})
            if (!data) {
                return
            }

            const decoded = jwt.decode(data.token!)
            if (!decoded) {
                return
            }
            const token = decoded as Token

            auth.login(data.token, token.sub)

            history.push('/')

        } catch (e) {
            console.log('HERE ERROR', e)
        }
    }


    return (
        <>
            <div className="block-heading">
                <h2 className="text-info">Регистрация</h2>
                <p>Пожалуйста зарегистрируйтесь</p>
            </div>
            {error &&
            < div className="alert alert-danger" role="alert">
                <strong>{error || 'Введите правильное значение'}</strong>
            </div>
            }
            <form
                onSubmit={registerHandler}
            >
                {generateInputs((key: string) => {
                    if (key === 'password') {
                        return 'password'
                    }
                    return 'text'
                })}

                <button
                    disabled={loading}

                    className="btn btn-primary btn-block" type="submit">Register
                </button>
            </form>
        </>
    )
}
