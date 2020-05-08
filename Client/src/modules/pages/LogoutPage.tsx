import React, {useContext, useEffect} from 'react'
import {AuthContext} from "../context/AuthContext";
import {useHistory} from 'react-router-dom';

export const LogoutPage = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()
    useEffect(() => {
        auth.logout()
        history.push('/')
    })
    return (
        <div/>
    )
}
