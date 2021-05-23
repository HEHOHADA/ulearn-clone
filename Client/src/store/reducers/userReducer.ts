import { CHOOSE_ITEM, SET_RESULTS, USER_REMOVE_LOADING, USER_SET_LOADING } from '../actions/types'
import { ActionUserType } from '../actions/user'
import { CodeTask, ICourse, IModule, TestTask, VideoTask } from '../../modules/shared/interface'

export type InitialStateUserType = {
    theme: VideoTask | CodeTask | TestTask | null,
    course: ICourse | null,
    module: IModule | null,
    currentResults?: any,
    currentChecked?: false,
    loading?: boolean
}

export const initialStateUser: InitialStateUserType = {
    course: null,
    module: null,
    theme: null
}


export default (state = initialStateUser, action: ActionUserType): InitialStateUserType => {
    switch (action.type) {
        case CHOOSE_ITEM:
            console.log(action)
            return {
                ...state, ...action.data,
                currentChecked: true
            }
        case USER_REMOVE_LOADING:
            return {
                ...state, loading: false
            }
        case USER_SET_LOADING:
            return {
                ...state, loading: true
            }
        case SET_RESULTS:
            return {
                ...state, currentResults: action.data
            }
        default:
            return state
    }
}
