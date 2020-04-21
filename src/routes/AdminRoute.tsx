import React from 'react'
import {AdminLayout} from "../modules/shared/layout/AdminLayout"
import {AppRoute} from "./AppRoute"
import {SubscriptionPage} from "../modules/pages/Admin/Subscription/SubscriptionPage"
import {SubscriptionEdit} from "../modules/pages/Admin/Subscription/SubscriptionEdit"
import {SubscriptionCreate} from "../modules/pages/Admin/Subscription/SubscriptionCreate"
import {CreatePage} from "../modules/pages/Admin/CreatePage";
import {CoursePage} from "../modules/pages/Admin/Course/CoursePage";
import {CourseCreate} from "../modules/pages/Admin/Course/CourseCreate";


export const useAdminRoute = () => {
    return (
        <>
            {/*<AppRoute layout={AdminLayout} component={CreatePage} exact={true} path={"/admin/create"} />*/}
            <AppRoute exact path={"/admin/"} layout={AdminLayout} component={CreatePage}/>
            <AppRoute exact path={"/admin/subscription"} layout={AdminLayout} component={SubscriptionPage}/>
            <AppRoute exact path={"/admin/course"} layout={AdminLayout} component={CoursePage}/>
            <AppRoute exact path={"/admin/course/create"} layout={AdminLayout} component={CourseCreate}/>
            {/*<AppRoute exact path={"/admin/course/:id"} layout={AdminLayout} component={}/>*/}
            <AppRoute exact path={"/admin/subscription/edit/:id"} layout={AdminLayout} component={SubscriptionEdit}/>
            <AppRoute exact path={"/admin/subscription/create"} layout={AdminLayout} component={SubscriptionCreate}/>
        </>
    )
}
