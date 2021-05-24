import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CourseForm, IVisibleCourse } from '../../../components/Admin/course/CourseForm'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../../../components/utils/Loader'
import { addAdminDataWIthStore } from '../../../../store/actions/admin'
import { fetchData } from '../../../../store/actions/shared'
import { courseRequest, subscriptionRequest } from '../../../../shared/request'
import { AppStateType } from '../../../../store/store'

export default () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [load, setLoad] = useState(true)
  const { loading, subscriptions } = useSelector((s: AppStateType) => s.shared)

  const fetch = useCallback(() => {
    if (!subscriptions.length) {
      console.log('here')
      dispatch(fetchData(subscriptionRequest))
    }
    setLoad(false)
  }, [subscriptions, dispatch])

  useEffect(() => {
    fetch()
  }, [fetch])

  const submit = useCallback(
    async (event: any, form: IVisibleCourse) => {
      event.preventDefault()
      form.subscriptionId = parseInt(String(form.subscriptionId))
      await dispatch(addAdminDataWIthStore(courseRequest, { ...form }))
      history.push(`/admin/course`)
    },
    [history, dispatch]
  )

  return (
    <>
      {load || loading ? (
        <Loader />
      ) : (
        <CourseForm subscriptions={subscriptions} title={'Create'} onSubmit={submit} />
      )}
    </>
  )
}
