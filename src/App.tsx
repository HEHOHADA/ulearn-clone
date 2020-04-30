import React, {FC} from 'react'
import {BrowserRouter, Switch,} from "react-router-dom"
import {MainLayout} from "./modules/shared/layout/MainLayout"
import {AppRoute} from "./routes/AppRoute"
import {HomePage} from "./modules/pages/HomePage"
import {LoginPage} from "./modules/pages/LoginPage"
import {AuthLayout} from "./modules/shared/layout/AuthLayout";
import {RegisterPage} from "./modules/pages/RegisterPage";
import {useAdminRoute} from "./routes/AdminRoute";
import {IdentityPage} from "./modules/pages/User/IdentityPage";
import {UserCoursePage} from "./modules/pages/User/course/UserCoursePage";
import {GroupReviewPage} from "./modules/pages/Teacher/GroupReviewPage";

const App: FC = () => {
    let isAdmin = true
    let isAuth = false
    let isTeacher = true
    const routes = useAdminRoute()

    return (
            <BrowserRouter>
                <Switch>
                    <AppRoute exact path={"/"} component={HomePage} layout={MainLayout}/>
                    <AppRoute exact path={"/course/:id"} component={UserCoursePage} layout={MainLayout}/>
                    <AppRoute exact path={"/account"} component={IdentityPage} layout={MainLayout}/>
                    {isTeacher && <AppRoute exact path={"/group/:id"} component={GroupReviewPage} layout={MainLayout}/>}
                    {!isAuth && <AppRoute exact path={"/login"} component={LoginPage} layout={AuthLayout}/>}
                    {!isAuth && <AppRoute exact path={"/register"} component={RegisterPage} layout={AuthLayout}/>}
                    {isAdmin && routes}
                </Switch>
            </BrowserRouter>
    )
}

export default App
