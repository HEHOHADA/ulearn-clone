import React from 'react'
import {Switch, Redirect} from 'react-router-dom'
import {ThemeCreate} from "../modules/pages/Admin/Theme/ThemeCreate";
import {AdminLayout} from '../modules/shared/layout/AdminLayout'
import {AppRoute} from './AppRoute'
import {SubscriptionPage} from '../modules/pages/Admin/Subscription/SubscriptionPage'
import {SubscriptionEdit} from '../modules/pages/Admin/Subscription/SubscriptionEdit'
import {SubscriptionCreate} from '../modules/pages/Admin/Subscription/SubscriptionCreate'
import {CoursePage} from '../modules/pages/Admin/Courses/CoursePage'
import {CourseCreate} from '../modules/pages/Admin/Courses/CourseCreate'
import {CourseEdit} from '../modules/pages/Admin/Courses/CourseEdit'
import {ModuleCreate} from '../modules/pages/Admin/Modules/ModuleCreate'
import {Theme} from "../modules/pages/User/course/Theme";


export const useAdminRoute = () => {

    return (
        <Switch>
            <AppRoute exact path={"/admin/subscription"} layout={AdminLayout} component={SubscriptionPage}/>
            <AppRoute exact path={"/admin/course"} layout={AdminLayout} component={CoursePage}/>
            <AppRoute exact path={"/admin/course/create"} layout={AdminLayout} component={CourseCreate}/>
            <AppRoute exact path={"/admin/course/edit/:id"} layout={AdminLayout} component={CourseEdit}/>
            <AppRoute exact path={"/admin/course/:courseId/module/:moduleId/theme/create"} layout={AdminLayout} component={ThemeCreate}/>
            <AppRoute exact path={"/admin/course/:courseId/module/create"} layout={AdminLayout} component={ModuleCreate}/>
            <AppRoute exact path={"/admin/subscription/edit/:id"} layout={AdminLayout} component={SubscriptionEdit}/>
            <AppRoute exact path={"/admin/subscription/create"} layout={AdminLayout} component={SubscriptionCreate}/>
            <Redirect to="/admin/course"/>
        </Switch>
    )
}
