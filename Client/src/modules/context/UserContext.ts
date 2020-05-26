import {createContext} from "react"

function noop() {
}

interface IUserContext {
    theme: any | string | null
    module: string | null
    course: string | null
    chooseTheme: (data: { theme?: any, module?: any, course?: any }) => void
}


export const UserContext = createContext<IUserContext>({
    theme: null,
    module: null,
    course: null,
    chooseTheme: noop
})
