import React, { useEffect } from 'react'
import { SubscriptionView } from '../components/pay/SubscriptionView'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../components/utils/Loader'
import { fetchData } from '../../store/actions/shared'
import { subscriptionRequest } from '../../shared/request'

export default () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchData(subscriptionRequest))
  }, [dispatch])

  const { loading, subscriptions }: any = useSelector<any>((s) => s.shared)
  const history = useHistory()
  const onClickSubscription = (id: number) => {
    history.push(`pay/${id}`)
  }

  return (
    <main className="page pricing-table-page">
      <section className="clean-block clean-pricing dark">
        <div className="container">
          <div className="block-heading">
            <h2 className="text-info">Pricing Table</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec
              auctor in, mattis vitae leo.
            </p>
          </div>
          <div className="row">
            {loading && <Loader />}

            <SubscriptionView
              subscription={subscriptions}
              onClick={onClickSubscription}
              text={'Buy now'}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
