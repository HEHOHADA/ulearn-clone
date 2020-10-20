import { Action, applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'
import authReducer from './reducers/authReducer'
import sharedReducer from './reducers/sharedReducer'
import userReducer from './reducers/userReducer'
import identityReducer from './reducers/identityReducer'
import adminReducer from './reducers/adminReducer'


const rootReducer = combineReducers({
    auth: authReducer,
    shared: sharedReducer,
    user: userReducer,
    identity: identityReducer,
    admin: adminReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
