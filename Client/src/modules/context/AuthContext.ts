import {createContext} from "react"


function noop() {
}

interface IAuthContext {
    token: string | null
    userId: string | null
    login: (jwtToken: any, id: any, role?: any) => void
    logout: () => void
    isAuth: boolean
    role?: string | null
    subscriptionType?: string | null
}

export const AuthContext = createContext<IAuthContext>({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuth: false,
    role: null,
    subscriptionType: null
})
