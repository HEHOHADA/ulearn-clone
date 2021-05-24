import axios from '../../axios/axios'
import {
  checkForSubscription,
  codeTaskRequest,
  courseRequest,
  groupRequestByUser,
  moduleRequest,
  subscriptionRequest,
  testTaskRequest,
  videoTaskRequest
} from '../../shared/request'
import { SET_ERROR, SHARED_FETCH_SUCCESS, SHARED_REMOVE_LOADING, SHARED_SET_LOADING } from './types'
import { BaseThunkType, InferActionsType } from '../store'

export type fetchingData =
  | typeof courseRequest
  | typeof groupRequestByUser
  | typeof subscriptionRequest
export type fetchingDataById =
  | fetchingData
  | typeof moduleRequest
  | typeof videoTaskRequest
  | typeof codeTaskRequest
  | typeof testTaskRequest
export const mapFetchingData = new Map<string, any>([
  [courseRequest, 'courses'],
  [groupRequestByUser, 'groups'],
  [subscriptionRequest, 'subscriptions']
])

const sharedActions = {
  setLoading: () => ({ type: SHARED_SET_LOADING } as const),
  removeLoading: () => ({ type: SHARED_REMOVE_LOADING } as const),
  setError: (errors: any) => ({ type: SET_ERROR, errors } as const),
  fetchDataSuccess: (data: any) => ({ type: SHARED_FETCH_SUCCESS, data } as const)
}
export type ActionSharedType = InferActionsType<typeof sharedActions>

export const fetchData =
  (request: fetchingData): BaseThunkType<ActionSharedType> =>
  async (dispatch) => {
    dispatch(sharedActions.setLoading())
    try {
      const response = await axios.get(request)
      dispatch(sharedActions.fetchDataSuccess({ [mapFetchingData.get(request)]: response.data }))
    } catch (e) {
      dispatch(sharedActions.setError(e))
    } finally {
      dispatch(sharedActions.removeLoading())
    }
  }

export const fetchDataById =
  (request: fetchingDataById, id: number): BaseThunkType<ActionSharedType> =>
  async (dispatch) => {
    dispatch(sharedActions.setLoading())
    try {
      return (await axios.get(`${request}/${id}`)).data
    } catch (e) {
      dispatch(sharedActions.setError(e))
    } finally {
      dispatch(sharedActions.removeLoading())
    }
  }

export const checkSubscription = (courseId: any) => {
  return async (dispatch: any) => {
    dispatch(sharedActions.setLoading())
    try {
      debugger
      const { data } = await axios.get(`${checkForSubscription}/${courseId}`)
      return { ...data }
    } catch (e) {
      dispatch(sharedActions.setError(e))
    } finally {
      dispatch(sharedActions.removeLoading())
    }
  }
}

export const getCourseSub = (form: any) => {
  return async (dispatch: any) => {
    dispatch(sharedActions.setLoading())
    try {
      await axios.post(subscriptionRequest, { ...form })
    } catch (e) {
      dispatch(sharedActions.setError(e))
    } finally {
      dispatch(sharedActions.removeLoading())
    }
  }
}
