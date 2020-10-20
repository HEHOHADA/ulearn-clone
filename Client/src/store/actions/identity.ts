import { FETCH_IDENTITY_INFO, IDENTITY_REMOVE_LOADING, IDENTITY_SET_LOADING } from './types'
import axios from '../../axios/axios'
import { accountRequest } from '../../shared/request'


export const identityActions = {
    fetchIdentitySuccess: (identityInfo: any) => ({
        type: FETCH_IDENTITY_INFO,
        data: identityInfo
    } as const),
    setLoading: () => ({
        type: IDENTITY_SET_LOADING
    } as const),
    removeLoading: () => ({
        type: IDENTITY_REMOVE_LOADING
    } as const),
}


export const fetchIdentity = () => {
    return async (dispatch: any) => {
        dispatch(identityActions.setLoading())
        try {
            const response = await axios.get(accountRequest)
            dispatch(identityActions.fetchIdentitySuccess(response.data))
        } catch (e) {

        } finally {
            dispatch(identityActions.removeLoading())
        }
    }
}


export const updatePassword = (data: any) => {
    return async (dispatch: any) => {
        dispatch(identityActions.setLoading())
        try {
            await axios.post(`${ accountRequest }/changePassword`, data)
        } catch (e) {

        } finally {
            dispatch(identityActions.removeLoading())
        }
    }
}
export const updateData = (data: any) => {
    return async (dispatch: any) => {
        dispatch(identityActions.setLoading())
        try {
            await axios.put(`${ accountRequest }/UpdateData`, data)
        } catch (e) {

        } finally {
            dispatch(identityActions.removeLoading())
        }
    }
}



