import {useCallback, useEffect, useState} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [role, setRole] = useState(null)

    const login = useCallback((jwtToken, id, role?) => {
        setToken(jwtToken)
        setUserId(id)
        setRole(role)
        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, role
        }))
    }, [])
    const logout = useCallback(() => {
        debugger
        setToken(null)
        setUserId(null)
        setRole(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName) as string)
        if (data && data.token) {
            login(data.token, data.userId, data.role ? data.role : null)
        }
    }, [login])

    return {login, logout, token, userId, role}
}
