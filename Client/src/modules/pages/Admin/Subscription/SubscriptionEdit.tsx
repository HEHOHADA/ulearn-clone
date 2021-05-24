import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { SubscriptionForm } from '../../../components/pay/SubscriptionForm'
import { Loader } from '../../../components/utils/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataById } from '../../../../store/actions/shared'
import { updateAdminDataWithStore } from '../../../../store/actions/admin'
import { subscriptionRequest } from '../../../../shared/request'

export default () => {
  const { id } = useParams()
  const history = useHistory()
  const [subscription, setSubscription] = useState<any>()
  const { loading, subscriptions } = useSelector((s: any) => s.shared)
  const dispatch = useDispatch()
  useEffect(() => {
    const fetch = async () => {
      if (!subscriptions.length) {
        setSubscription(await dispatch(fetchDataById(subscriptionRequest, id)))
      } else {
        setSubscription(subscriptions.find((c: any) => c.id === parseInt(id)))
      }
    }
    fetch()
  }, [dispatch, id, subscriptions])

  const submit = async (event: any, form: any) => {
    event.preventDefault()
    await dispatch(updateAdminDataWithStore(subscriptionRequest, { ...form }, id))
    history.push('/admin/subscription')
  }

  return (
    <>
      {loading || !subscription ? (
        <Loader />
      ) : (
        <SubscriptionForm
          loading={loading}
          onSubmit={submit}
          title={'Edit'}
          initialValues={subscription}
        />
      )}
    </>
  )
}
