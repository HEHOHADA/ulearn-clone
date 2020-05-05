import React, {FC} from 'react'
import {RegisterModel} from "../shared/interface";
import {useHttp} from "../hooks/http.hook";
import {useHistory} from 'react-router-dom'
import {useForm} from "../hooks/form.hook";


export const RegisterPage: FC = () => {

    const history = useHistory()
    const initialValues = {
        email: '',
        username: '',
        password: ''
    }
    const {loading, request} = useHttp()

    const {form, generateInputs} = useForm<RegisterModel>(initialValues)


    const registerHandler = async () => {
        try {
            await request('api/auth/register', "POST", {form})
            history.push('/login')
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <>
            <div className="block-heading">
                <h2 className="text-info">Регистрация</h2>
                <p>Пожалуйста зарегистрируйтесь</p>
            </div>
            <form>
                {generateInputs( (key: string) => {
                    if (key === 'password') {
                        return 'password'
                    }
                    return 'text'
                })}

                <button
                    disabled={loading}
                    onSubmit={registerHandler}
                    className="btn btn-primary btn-block" type="submit">Register
                </button>
            </form>
        </>
    )
}
