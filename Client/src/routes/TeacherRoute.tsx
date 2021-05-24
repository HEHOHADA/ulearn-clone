import React from 'react'
import { Redirect, Switch } from 'react-router-dom'

import { AppRoute } from './AppRoute'
import MainLayout from '../modules/shared/layout/MainLayout'

const ReviewPage = React.lazy(() => import('../modules/pages/Teacher/ReviewPage'))
const GroupCreatePage = React.lazy(() => import('../modules/pages/Teacher/GroupCreatePage'))
const GroupsPage = React.lazy(() => import('../modules/pages/Teacher/GroupsPage'))
const GroupEditPage = React.lazy(() => import('../modules/pages/Teacher/GroupEditPage'))
const GroupReviewPage = React.lazy(() => import('../modules/pages/Teacher/GroupReviewPage'))

export const useTeacherRoute = () => {
  return (
    <Switch>
      <AppRoute exact path={'/code/:id'} component={ReviewPage} layout={MainLayout} />
      <AppRoute exact path={'/group/create'} component={GroupCreatePage} layout={MainLayout} />
      <AppRoute exact path={'/group/edit/:id'} component={GroupEditPage} layout={MainLayout} />
      <AppRoute exact path={'/groups'} component={GroupsPage} layout={MainLayout} />
      <AppRoute exact path={'/group/:id'} component={GroupReviewPage} layout={MainLayout} />
      <Redirect to="/" />
    </Switch>
  )
}
