import {useCallback, useState} from "react";


export const useUser = () => {
    const [theme, setTheme] = useState(null)
    const [module, setModule] = useState(null)
    const [course, setCourse] = useState(null)
    console.log({course, theme: theme, module})
    const chooseTheme = useCallback((data: { theme?: any, module?: any, course?: any }) => {
            const {theme, module, course} = data
            console.log(theme, module, course)
            course !== undefined && setCourse(course)
            module !== undefined && setModule(module)
            theme !== undefined && setTheme(theme)
        }, [],
    )

    return { theme, module, course, chooseTheme}

}
