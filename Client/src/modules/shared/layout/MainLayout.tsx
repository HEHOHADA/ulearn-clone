import React, { useCallback } from 'react'
import { Navbar } from '../../components/Navbar'
import { FooterLinks } from '../../components/footer/FooterLinks'
import classes from './index.module.css'
import { useDispatch, useSelector } from 'react-redux'

import { authActions } from '../../../store/actions/auth'
import { AppStateType } from '../../../store/store'
import { useHistory } from 'react-router-dom'

export default (props: any) => {
  const dispatch = useDispatch()
  const auth = useSelector((s: AppStateType) => s.auth)
  const history = useHistory()
  const logoutHandler = useCallback(() => {
    dispatch(authActions.logout())
    history.push('/')
  }, [dispatch, history])

  return (
    <>
      <div className={classes.MainLayout}>
        <Navbar logout={logoutHandler} isAuth={auth.isAuth} role={auth.role} />
        {props.children}
      </div>
      <FooterLinks />
    </>
  )
}
