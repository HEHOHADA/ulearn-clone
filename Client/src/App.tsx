import React, {FC} from 'react'
import {BrowserRouter, Switch, Route} from "react-router-dom"
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
import {useTeacherRoute} from "./routes/TeacherRoute"
import {UserContext} from './modules/context/UserContext'
import {useUser} from "./modules/hooks/user.hook"
import {PaymentPage} from "./modules/pages/PaymentPage"
import {ChatRavil} from "./modules/pages/ChatRavil";
import {SubscriptionPage} from "./modules/pages/SubscriptionPage";


const App: FC = () => {
    const {token, login, logout, userId, role} = useAuth()

    const {theme, module, course, chooseTheme} = useUser()

    let isAdmin = role === 'Admin'
    let isAuth = !!token
    let isTeacher = role === 'teacher'
    const teacherRoutes = useTeacherRoute()

    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuth, role
        }}>
            <UserContext.Provider value={{
                theme, module, course, chooseTheme
            }}>
                <BrowserRouter>
                    <Switch>
                        <AppRoute exact path={'/'} component={HomePage} layout={MainLayout}/>
                        <AppRoute exact path={'/pay/:id'} component={PaymentPage} layout={MainLayout}/>
                        <AppRoute path={'/course/:id'} component={UserCoursePage} layout={MainLayout}/>
                        <AppRoute path={'/subscription'} component={SubscriptionPage} layout={MainLayout}/>
                        {isAuth && <AppRoute exact path={'/account'} component={IdentityPage} layout={MainLayout}/>}
                        {isAuth && <AppRoute exact path={'/chat'} component={ChatRavil} layout={MainLayout}/>}
                        {!isAuth && <AppRoute exact path={'/login'} component={LoginPage} layout={AuthLayout}/>}
                        {!isAuth && <AppRoute exact path={'/register'} component={RegisterPage} layout={AuthLayout}/>}
                        {isAdmin && <Route path={'/admin'} component={useAdminRoute}/>}
                        {(isTeacher || isAdmin) && teacherRoutes}
                        {/*<Route path='*' render={() => <Redirect to='/'/>}/>*/}
                    </Switch>
                </BrowserRouter>
            </UserContext.Provider>
        </AuthContext.Provider>
    )
}

export default App

