import { ICourse, IGroup, ISubscription } from '../../modules/shared/interface'
import {
  SET_ERROR,
  SHARED_FETCH_SUCCESS,
  SHARED_REMOVE_LOADING,
  SHARED_SET_LOADING
} from '../actions/types'
import { ActionAdminType } from '../actions/admin'
import { ActionSharedType } from '../actions/shared'

export type InitialStateSharedType = {
  courses: ICourse[]
  subscriptions: ISubscription[]
  loading?: boolean
  errors?: null
  groups?: IGroup[]
}

export const initialStateShared: InitialStateSharedType = {
  courses: [],
  subscriptions: [],
  loading: false
}

export default (
  state = initialStateShared,
  action: ActionAdminType | ActionSharedType
): InitialStateSharedType => {
  let newUpdatedData
  let key: keyof InitialStateSharedType
  switch (action.type) {
    case SHARED_REMOVE_LOADING:
      return {
        ...state,
        loading: false
      }
    case 'ADD_DATA_TO_STORE':
      key = Object.keys(action.data)[0] as keyof InitialStateSharedType
      newUpdatedData = [...state[key]]
      newUpdatedData.push(action.data[key])
      return {
        ...state,
        [key]: newUpdatedData
      }
    case 'REMOVE_DATA_FROM_STORE':
      key = Object.keys(action.data)[0] as keyof InitialStateSharedType
      newUpdatedData = [...state[key]].filter((d) => d.id !== action.data[key].id)
      return {
        ...state,
        [key]: newUpdatedData
      }
    case 'UPDATE_DATA_IN_STORE':
      key = Object.keys(action.data)[0] as keyof InitialStateSharedType

      newUpdatedData = [...state[key]].filter((d) => d.id !== action.data[key].id)
      newUpdatedData.push({ ...action.data[key] })
      return {
        ...state,
        [key]: newUpdatedData
      }

    case SHARED_SET_LOADING:
      return {
        ...state,
        loading: true
      }
    case SHARED_FETCH_SUCCESS:
      return {
        ...state,
        ...action.data
      }

    case SET_ERROR:
      return {
        ...state,
        errors: action.errors
      }
    default:
      return state
  }
}
