import {useCallback, useState} from "react";


export const useUser = () => {
    const [thema, setThema] = useState(null)
    const [module, setModule] = useState(null)
    const [course, setCourse] = useState(null)

    const chooseThema = useCallback((thema?, module?, course?) => {
            setCourse(course)
            setModule(module)
            setThema(thema)
        }, [],
    )

    return {thema, module, course, chooseThema}

}
