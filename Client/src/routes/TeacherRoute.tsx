import React from 'react'
import {Redirect, Switch} from 'react-router-dom'

import {AppRoute} from "./AppRoute"
import {ReviewPage} from "../modules/pages/Teacher/ReviewPage"
import {MainLayout} from "../modules/shared/layout/MainLayout"
import {GroupCreatePage} from "../modules/pages/Teacher/GroupCreatePage"
import {GroupReviewPage} from "../modules/pages/Teacher/GroupReviewPage"
import {GroupsPage} from "../modules/pages/Teacher/GroupsPage";


export const useTeacherRoute = () => {
    return (
        <Switch>
            <AppRoute exact path={"/code/:id"} component={ReviewPage} layout={MainLayout}/>
            <AppRoute exact path={"/group/create"} component={GroupCreatePage} layout={MainLayout}/>
            <AppRoute exact path={"/groups"} component={GroupsPage} layout={MainLayout}/>
            <AppRoute exact path={"/group/:id"} component={GroupReviewPage} layout={MainLayout}/>
            <Redirect to="/"/>
        </Switch>
    )
}
