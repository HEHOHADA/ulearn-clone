import {createContext} from "react"

function noop() {
}

interface IUserContext {
    thema: string | null
    module: string | null
    course: string | null
    chooseThema: (data:{thema?: any, module?: any, course?: any}) => void
}


export const UserContext = createContext<IUserContext>({
    thema: null,
    module: null,
    course: null,
    chooseThema: noop
})
