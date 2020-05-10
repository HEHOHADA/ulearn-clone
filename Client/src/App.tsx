import React, {FC} from 'react'
import {BrowserRouter, Switch, Route,} from "react-router-dom"
import {MainLayout} from "./modules/shared/layout/MainLayout"
import {AppRoute} from "./routes/AppRoute"
import {HomePage} from "./modules/pages/HomePage"
import {LoginPage} from "./modules/pages/LoginPage"
import {AuthLayout} from "./modules/shared/layout/AuthLayout"
import {RegisterPage} from "./modules/pages/RegisterPage"
import {useAdminRoute} from "./routes/AdminRoute"
import {IdentityPage} from "./modules/pages/IdentityPage"
import {UserCoursePage} from "./modules/pages/User/course/UserCoursePage"
import {AuthContext} from "./modules/context/AuthContext"
import {useAuth} from "./modules/hooks/auth.hook"
import {useTeacherRoute} from "./routes/TeacherRoute";
import {LogoutPage} from "./modules/pages/LogoutPage";

const App: FC = () => {
    const {token, login, logout, userId, role} = useAuth()

    let isAdmin = true
    let isAuth = !!token
    let isTeacher = role === "teacher"
    const adminRoutes = useAdminRoute()
    const teacherRoutes = useTeacherRoute()
    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuth, role
        }}>
            <BrowserRouter>
                <Switch>
                    <AppRoute exact path={"/"} component={HomePage} layout={MainLayout}/>
                    <AppRoute exact path={"/course/:id"} component={UserCoursePage} layout={MainLayout}/>
                    <AppRoute exact path={"/account"} component={IdentityPage} layout={MainLayout}/>
                    {!isAuth && <AppRoute exact path={"/login"} component={LoginPage} layout={AuthLayout}/>}
                    {!isAuth && <AppRoute exact path={"/register"} component={RegisterPage} layout={AuthLayout}/>}
                    {isAuth &&<Route exact path={"/logout"} component={LogoutPage} />}
                    {isAdmin && adminRoutes}
                    {(isTeacher || isAdmin) && teacherRoutes}
                </Switch>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App
