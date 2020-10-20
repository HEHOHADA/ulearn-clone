import React from 'react'
import { useHistory } from 'react-router-dom'
import { RegisterModel } from '../shared/interface'
import { useForm } from '../hooks/form.hook'
import { useDispatch } from 'react-redux'
import { auth } from '../../store/actions/auth'

export default () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const initialValues = {
        email: '',
        username: '',
        password: ''
    }

    const {form, generateInputs} = useForm<RegisterModel>(initialValues)

    const registerHandler = async (event: any) => {
        event.preventDefault()
        try {
            await dispatch(auth({...form}, false))
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
            {/*{error &&*/}
            {/*< div className="alert alert-danger" role="alert">*/}
            {/*    <strong>{error || 'Введите правильное значение'}</strong>*/}
            {/*</div>*/}
            {/*}*/}
            <form onSubmit={registerHandler}>
                {generateInputs((key: string) => {
                    if (key === 'password') {
                        return 'password'
                    }
                    return 'text'
                })}
                <button
                    className="btn btn-primary btn-block" type="submit">Register
                </button>
            </form>
        </>
    )
}
