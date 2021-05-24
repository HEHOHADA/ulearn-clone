import React from 'react'
import { useHistory } from 'react-router-dom'
import { LoginModel } from '../shared/interface'
import { useForm } from '../hooks/form.hook'
import { validationAuthForm } from '../shared/validation/validationAuthForm'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../../store/actions/auth'
import { AppStateType } from '../../store/store'

export default () => {
  const dispatch = useDispatch()
  const { role } = useSelector((s: AppStateType) => s.auth)
  const history = useHistory()
  const initialValues = {
    login: '',
    password: ''
  }
  const { form, generateInputs, validation, errors } = useForm<LoginModel>(initialValues)

  const loginHandler = async (event: any) => {
    event.preventDefault()
    const isValid = validation(validationAuthForm)
    if (errors && !isValid) {
      return
    }
    try {
      await dispatch(auth({ ...form }, true))
      if (role === 'Admin') {
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
      {/*{ error &&*/}
      {/*<div className="alert alert-danger" role="alert">*/}
      {/*    <strong>{ error || 'Введите правильное значение' }</strong>*/}
      {/*</div>*/}
      {/*}*/}
      <form onSubmit={loginHandler}>
        <div className="form-group">
          {generateInputs((key: string) => {
            if (key === 'password') {
              return 'password'
            }
            return 'text'
          })}

          <button className="btn btn-primary btn-block" type="submit">
            Log In
          </button>
        </div>
      </form>
    </>
  )
}
