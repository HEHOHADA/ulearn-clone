import {useCallback, useState} from "react";


export const useUser = () => {
    const [thema, setThema] = useState(null)
    const [module, setModule] = useState(null)
    const [course, setCourse] = useState(null)
    console.log({course, thema, module})
    const chooseThema = useCallback((data: { thema?: any, module?: any, course?: any }) => {
            const {thema, module, course} = data
            console.log(thema, module, course)
            course !== undefined && setCourse(course)
            module !== undefined && setModule(module)
            thema !== undefined && setThema(thema)
        }, [],
    )

    return {thema, module, course, chooseThema}

}
