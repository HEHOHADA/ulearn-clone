import React, { FC, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AppRoute } from './routes/AppRoute'
import { AuthLayout } from './modules/shared/layout/AuthLayout'
import { AdminRoute } from './routes/AdminRoute'
import { AuthContext } from './modules/context/AuthContext'
import { useAuth } from './modules/hooks/auth.hook'
import { useTeacherRoute } from './routes/TeacherRoute'
import { UserContext } from './modules/context/UserContext'
import { useUser } from './modules/hooks/user.hook'
import MainLayout from './modules/shared/layout/MainLayout'
import { useDispatch } from 'react-redux'
import { autoLogin } from './store/actions/auth'

const HomePage = React.lazy(() => import('./modules/pages/HomePage'))
const LoginPage = React.lazy(() => import('./modules/pages/LoginPage'))
const RegisterPage = React.lazy(() => import('./modules/pages/RegisterPage'))
const IdentityPage = React.lazy(() => import('./modules/pages/IdentityPage'))
const UserCoursePage = React.lazy(() => import('./modules/pages/User/course/UserCoursePage'))
const PaymentPage = React.lazy(() => import('./modules/pages/PaymentPage'))
const ChatRavil = React.lazy(() => import('./modules/pages/ChatRavil'))
const SubscriptionPage = React.lazy(() => import('./modules/pages/SubscriptionPage'))


const App: FC = () => {
    const {token, login, logout, userId, role} = useAuth()

    const {theme, module, course, chooseTheme} = useUser()
    const dispatch = useDispatch()
    let isAdmin = role === 'Admin'
    let isAuth = !!token
    let isTeacher = role === 'Teacher'
    const teacherRoutes = useTeacherRoute()

    useEffect(() => {
        dispatch(autoLogin())
    }, [dispatch])

    return (
        <AuthContext.Provider value={ {
            token, login, logout, userId, isAuth, role
        } }>
            <UserContext.Provider value={ {
                theme, module, course, chooseTheme
            } }>
                <BrowserRouter>
                    <Switch>
                        <AppRoute exact path={ '/' } component={ HomePage } layout={ MainLayout }/>
                        <AppRoute exact path={ '/pay/:id' } component={ PaymentPage } layout={ MainLayout }/>
                        <AppRoute path={ '/course/:id' } component={ UserCoursePage } layout={ MainLayout }/>
                        <AppRoute path={ '/subscription' } component={ SubscriptionPage } layout={ MainLayout }/>
                        { isAuth &&
                        <AppRoute exact path={ '/account' } component={ IdentityPage } layout={ MainLayout }/> }
                        { isAuth && <AppRoute exact path={ '/chat' } component={ ChatRavil } layout={ MainLayout }/> }
                        { !isAuth && <AppRoute exact path={ '/login' } component={ LoginPage } layout={ AuthLayout }/> }
                        { !isAuth &&
                        <AppRoute exact path={ '/register' } component={ RegisterPage } layout={ AuthLayout }/> }
                        { isAdmin && <Route path={ '/admin' } component={ AdminRoute }/> }
                        { (isTeacher || isAdmin) && teacherRoutes }
                    </Switch>
                </BrowserRouter>
            </UserContext.Provider>
        </AuthContext.Provider>
    )
}

export default App

