import { AUTH_LOGOUT, AUTH_SUCCESS, SET_ERROR } from '../actions/types'
import { ActionAuthType } from '../actions/auth'

export type InitialStateAuthType = {
  token: string | null
  userId: string | number | null
  role?: string | null
  subscriptionType?: string | number | null
  isAuth?: boolean
  errors?: any
}

const initialStateAuth: InitialStateAuthType = {
  token: null,
  userId: null,
  isAuth: false
}

export default (state = initialStateAuth, action: ActionAuthType): InitialStateAuthType => {
  switch (action.type) {
    case AUTH_LOGOUT:
      return {
        ...state,
        ...initialStateAuth,
        role: null,
        subscriptionType: null
      }
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.data.token,
        userId: action.data.userId,
        isAuth: true,
        role: action.data.role ?? null,
        subscriptionType: action.data.subscriptionType ?? null
      }
    case SET_ERROR:
      return {
        ...state,
        errors: action.data
      }
    default:
      return state
  }
}
