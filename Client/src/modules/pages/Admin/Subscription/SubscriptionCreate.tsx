import React, { useCallback } from 'react'
import { SubscriptionForm } from '../../../components/pay/SubscriptionForm'
import { ISubscription } from '../../../shared/interface'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addAdminDataWIthStore } from '../../../../store/actions/admin'
import { subscriptionRequest } from '../../../../shared/request'

export default () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const submit = useCallback(async (event: any, form: ISubscription) => {
        event.preventDefault()
        await dispatch(addAdminDataWIthStore(subscriptionRequest, {...form}))
        history.push('/admin/subscription')
    }, [dispatch, history])

    return (
        <SubscriptionForm title={ 'Create' } onSubmit={ submit }/>
    )
}
