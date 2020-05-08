import {useCallback, useState} from "react";


export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [role, setRole] = useState(null)


    const login = useCallback((jwtToken, id, role) => {
        setToken(jwtToken)
        setUserId(id)
        setRole(role)
    }, [])
    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setRole(null)
    }, [])


    return {login, logout, token, userId, role}
}
