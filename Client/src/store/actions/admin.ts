import axios from '../../axios/axios'
import { ADD_DATA_TO_STORE, REMOVE_DATA_FROM_STORE, UPDATE_DATA_IN_STORE } from './types'
import { BaseThunkType, InferActionsType } from '../store'
import { fetchingData, mapFetchingData } from './shared'

export type ActionAdminType = InferActionsType<typeof adminActions>

export const adminActions = {
  updateStore: (data: any) => ({ type: UPDATE_DATA_IN_STORE, data } as const),
  addToStore: (data: any) => ({ type: ADD_DATA_TO_STORE, data } as const),
  removeFromStore: (data: any) => ({ type: REMOVE_DATA_FROM_STORE, data } as const)
}

export const addAdminDataWIthStore =
  (request: fetchingData, form: any): BaseThunkType<ActionAdminType> =>
  async (dispatch) => {
    try {
      const response = await axios.post(request, { ...form })
      debugger
      dispatch(adminActions.addToStore({ [mapFetchingData.get(request)]: response.data }))
    } catch (e) {
      console.log(e)
    }
  }

export const updateAdminDataWithStore =
  (request: fetchingData, form: any, id: number): BaseThunkType<ActionAdminType> =>
  async (dispatch) => {
    try {
      const response = await axios.put(`${request}/${id}`, { ...form })
      dispatch(adminActions.updateStore({ [mapFetchingData.get(request)]: response.data }))
    } catch (e) {
      console.log(e)
    }
  }

export const removeAdminDataWithStore =
  (request: fetchingData, id: number): BaseThunkType<ActionAdminType> =>
  async (dispatch) => {
    try {
      const response = await axios.delete(`${request}/${id}`)
      dispatch(adminActions.removeFromStore({ [mapFetchingData.get(request)]: response.data }))
    } catch (e) {
      console.log(e)
    }
  }
//
// export const addData = (request: any, form: any): BaseThunkType => dispatch => {
//     try {
// const response
//     } catch (e) {
//         console.log(e)
//     }
// }
