import { ISubscription } from '../../modules/shared/interface'
import { SET_SUBSCRIPTIONS_ADMIN } from '../actions/types'

export type InitialStateAdminType = {
    sortedSubscriptions: ISubscription[] | ISubscription | null
}

const initialStateAdmin: InitialStateAdminType = {
    sortedSubscriptions: null
}


export default (state = initialStateAdmin, action: any): InitialStateAdminType => {
    switch (action.type) {
        case SET_SUBSCRIPTIONS_ADMIN:
            return {
                ...state, sortedSubscriptions: action.data
            }
        default:
            return state
    }
}
