import { CHOOSE_ITEM, SET_RESULTS, USER_REMOVE_LOADING, USER_SET_LOADING } from './types'
import axios from '../../axios/axios'
import {
  codeDoReviewRequest,
  courseRequest,
  moduleRequest,
  testTaskRequest
} from '../../shared/request'
import { BaseThunkType, InferActionsType } from '../store'
import { fetchingDataById } from './shared'

export enum ThemeEnum {
  codeTaskRequest,
  videoTaskRequest,
  testTaskRequest
}

export const mapFetchingData = new Map<any, any>([
  [courseRequest, 'course'],
  [moduleRequest, 'module'],
  [ThemeEnum, 'theme']
])

export const userActions = {
  choseItem: (data: any) => ({ type: CHOOSE_ITEM, data } as const),
  setLoading: () =>
    ({
      type: USER_SET_LOADING
    } as const),
  removeLoading: () =>
    ({
      type: USER_REMOVE_LOADING
    } as const),
  setResults: (data: any) =>
    ({
      type: SET_RESULTS,
      data
    } as const)
}

export type ActionUserType = InferActionsType<typeof userActions>

export const sendTask = (data: any) => {
  return async (dispatch: any) => {
    const url = data.code ? codeDoReviewRequest : `${testTaskRequest}result/confirm`
    dispatch(userActions.setLoading())
    try {
      await axios.post(url, { ...data })
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(userActions.removeLoading())
    }
  }
}

export const fetchResults = (id: any, type: any) => {
  return async (dispatch: any) => {
    dispatch(userActions.setLoading())
    try {
      const url = (type = 'CODE' ? 'result' : 'result')
      const response = await axios.get(`${url}/${id}`)
      dispatch(userActions.setResults(response.data))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(userActions.removeLoading())
    }
  }
}

export const fetchUserDataById =
  (request: fetchingDataById, id: any): BaseThunkType<ActionUserType> =>
  async (dispatch) => {
    dispatch(userActions.setLoading())
    try {
      const data = (await axios.get(`${request}/${id}`)).data
      dispatch(userActions.choseItem({ [mapFetchingData.get(request)]: data }))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(userActions.removeLoading())
    }
  }
