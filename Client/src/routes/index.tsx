import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {AuthLayout} from "../modules/shared/layout/AuthLayout"
import {LoginPage} from "../modules/pages/LoginPage"
import {HomePage} from "../modules/pages/HomePage"
import {RegisterPage} from "../modules/pages/RegisterPage"


export const userRoutes = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <AuthLayout name="Login">
                <Route exact path="/login" component={LoginPage}/>
            </AuthLayout>
            <AuthLayout name="Register">
                <Route exact path="/register" component={RegisterPage}/>
            </AuthLayout>
        </Switch>
    )
}
