import React from 'react'
import { Redirect, Switch } from 'react-router-dom'
import { AppRoute } from './AppRoute'
import AdminLayout from '../modules/shared/layout/AdminLayout'

const ThemeCreate = React.lazy(() => import('../modules/pages/Admin/Theme/ThemeCreate'))

const SubscriptionPage = React.lazy(
  () => import('../modules/pages/Admin/Subscription/SubscriptionPage')
)
const SubscriptionEdit = React.lazy(
  () => import('../modules/pages/Admin/Subscription/SubscriptionEdit')
)
const SubscriptionCreate = React.lazy(
  () => import('../modules/pages/Admin/Subscription/SubscriptionCreate')
)
const CoursePage = React.lazy(() => import('../modules/pages/Admin/Courses/CoursePage'))
const CourseCreate = React.lazy(() => import('../modules/pages/Admin/Courses/CourseCreate'))
const CourseEdit = React.lazy(() => import('../modules/pages/Admin/Courses/CourseEdit'))
const ModuleCreate = React.lazy(() => import('../modules/pages/Admin/Modules/ModuleCreate'))
const ModulePage = React.lazy(() => import('../modules/pages/Admin/Modules/ModulePage'))
const ThemePage = React.lazy(() => import('../modules/pages/Admin/Theme/ThemePage'))

export const AdminRoute = () => {
  return (
    <Switch>
      <AppRoute
        exact
        path={'/admin/subscription'}
        layout={AdminLayout}
        component={SubscriptionPage}
      />
      <AppRoute exact path={'/admin/course'} layout={AdminLayout} component={CoursePage} />
      <AppRoute exact path={'/admin/course/create'} layout={AdminLayout} component={CourseCreate} />
      <AppRoute exact path={'/admin/course/edit/:id'} layout={AdminLayout} component={CourseEdit} />
      <AppRoute
        exact
        path={'/admin/course/:courseId/module/:moduleId/theme/create'}
        layout={AdminLayout}
        component={ThemeCreate}
      />
      <AppRoute
        exact
        path={'/admin/course/:courseId/module/:moduleId/theme'}
        layout={AdminLayout}
        component={ThemePage}
      />
      <AppRoute
        exact
        path={'/admin/course/:courseId/module/create'}
        layout={AdminLayout}
        component={ModuleCreate}
      />
      <AppRoute
        exact
        path={'/admin/course/:courseId/module/edit/:moduleId'}
        layout={AdminLayout}
        component={ModuleCreate}
      />
      <AppRoute
        exact
        path={'/admin/course/:courseId/module'}
        layout={AdminLayout}
        component={ModulePage}
      />
      <AppRoute
        exact
        path={'/admin/subscription/edit/:id'}
        layout={AdminLayout}
        component={SubscriptionEdit}
      />
      <AppRoute
        exact
        path={'/admin/subscription/create'}
        layout={AdminLayout}
        component={SubscriptionCreate}
      />
      <Redirect to="/admin/course" />
    </Switch>
  )
}
