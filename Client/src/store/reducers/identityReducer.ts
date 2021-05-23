import { FETCH_IDENTITY_INFO, IDENTITY_REMOVE_LOADING, IDENTITY_SET_LOADING } from '../actions/types'
import { InferActionsType } from '../store'
import { identityActions } from '../actions/identity'

export type InitialStateIdentityType = {
    imageSrc?: string
    loading?: boolean
    lastname?: string
    firstname?: string
    username: string | null
    email: string | null
    errors?: null
}

export const initialStateIdentity: InitialStateIdentityType = {
    username: null,
    email: null
}

type ActionType = InferActionsType<typeof identityActions>

export default (state = initialStateIdentity, action: ActionType): InitialStateIdentityType => {
    switch (action.type) {
        case FETCH_IDENTITY_INFO:
            return {
                ...state,
                ...action.data
            }
        case IDENTITY_REMOVE_LOADING:
            return {
                ...state, loading: false
            }
        case IDENTITY_SET_LOADING:
            return {
                ...state, loading: true
            }
        default:
            return state
    }
}
