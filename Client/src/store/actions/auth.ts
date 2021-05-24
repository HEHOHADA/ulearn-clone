import jwt from 'jsonwebtoken'
import { AUTH_LOGOUT, AUTH_SUCCESS, SET_ERROR } from './types'
import { loginRequest, registerRequest } from '../../shared/request'
import { LoginModel, RegisterModel, Token } from '../../modules/shared/interface'
import { InitialStateAuthType } from '../reducers/authReducer'
import axios from '../../axios/axios'
import { BaseThunkType, InferActionsType } from '../store'

const localStoreKey = 'userData'

export type ActionAuthType = InferActionsType<typeof authActions>

export const authActions = {
  logout: () => {
    localStorage.removeItem(localStoreKey)
    return { type: AUTH_LOGOUT } as const
  },
  authSuccess: (data: InitialStateAuthType) => ({ type: AUTH_SUCCESS, data } as const),
  setError: (e: any) => ({ type: SET_ERROR, data: e } as const)
}

export const auth =
  (data: LoginModel | RegisterModel, isLogin: boolean): BaseThunkType<ActionAuthType> =>
  async (dispatch) => {
    const url = isLogin ? loginRequest : registerRequest
    try {
      debugger
      const response = await axios.post(url, data)
      const dataFetched = response.data
      const decoded = jwt.decode(dataFetched.token!)
      if (!decoded) {
        return
      }
      const token = decoded as Token
      const role = token.role
      localStorage.setItem(
        'userData',
        JSON.stringify({ token: dataFetched.token, userId: token.sub, role })
      )
      dispatch(authActions.authSuccess({ userId: token.sub, role, token: dataFetched.token }))
    } catch (e) {
      dispatch(authActions.setError(e))
    }
  }

export const autoLogin = (): BaseThunkType<ActionAuthType> => async (dispatch) => {
  const token = localStorage.getItem(localStoreKey)
  if (!token) {
    dispatch(authActions.logout())
  } else {
    dispatch(authActions.authSuccess({ ...JSON.parse(token) }))
  }
}
