import React from 'react'
import {AdminLayout} from "../modules/shared/layout/AdminLayout"
import {AppRoute} from "./AppRoute"
import {SubscriptionPage} from "../modules/pages/Admin/Subscription/SubscriptionPage"
import {SubscriptionEdit} from "../modules/pages/Admin/Subscription/SubscriptionEdit"
import {SubscriptionCreate} from "../modules/pages/Admin/Subscription/SubscriptionCreate"
import {CoursePage} from "../modules/pages/Admin/Courses/CoursePage";
import {CourseCreate} from "../modules/pages/Admin/Courses/CourseCreate";


export const useAdminRoute = () => {

    return (
        <>
            <AppRoute exact path={"/admin/subscription"} layout={AdminLayout} component={SubscriptionPage}/>
            <AppRoute exact path={"/admin/course"} layout={AdminLayout} component={CoursePage}/>
            <AppRoute exact path={"/admin/course/create"} layout={AdminLayout} component={CourseCreate}/>
            <AppRoute exact path={"/admin/subscription/edit/:id"} layout={AdminLayout} component={SubscriptionEdit}/>
            <AppRoute exact path={"/admin/subscription/create"} layout={AdminLayout} component={SubscriptionCreate}/>
        </>
    )
}
