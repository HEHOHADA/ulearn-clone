import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CreditCard } from '../components/pay/CreditCard'
import { ISubscription } from '../shared/interface'
import { RouteComponentProps } from 'react-router'
import { fetchDataById, getCourseSub } from '../../store/actions/shared'
import { Loader } from '../components/utils/Loader'
import { subscriptionRequest } from '../../shared/request'

export default (props: RouteComponentProps) => {
  const { id } = useParams()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [load, setLoad] = useState(true)
  const { history } = props
  const dispatch = useDispatch()
  const [subscription, setSubscription] = useState<ISubscription | any>()
  const { loading } = useSelector((s: any) => s.shared)

  useEffect(() => {
    const fetched = async () => {
      setSubscription(await dispatch(fetchDataById(subscriptionRequest, id)))
    }
    fetched()
    setLoad(false)
  }, [dispatch, id])

  const changeFormHandler = useCallback(
    async (form: any) => {
      if (form.cvc !== '') {
        await dispatch(getCourseSub(form))
        history.push('/')
      }
    },
    [history, dispatch]
  )

  return (
    <main className="page payment-page">
      <section className="clean-block payment-form dark">
        <div className="container">
          <div className="block-heading">
            <h2 className="text-info">Payment</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec
              auctor in, mattis vitae leo.
            </p>
          </div>
          <form
            onSubmit={async (event) => {
              event.preventDefault()
              setIsSubmitting(true)
            }}
          >
            {load || loading ? (
              <Loader />
            ) : !subscription ? (
              <p className="center">Нет подписок</p>
            ) : (
              <div className="products">
                <h3 className="title">Checkout</h3>
                <div className="item">
                  <span className="price">{subscription.price}</span>
                  <p className="item-name">{subscription.name}</p>
                  <p className="item-description">{subscription.level}</p>
                </div>
                <div className="total">
                  <span>Total</span>
                  <span className="price">{subscription.price}</span>
                </div>
              </div>
            )}
            <CreditCard
              product={parseInt(id!)}
              isSubmitting={isSubmitting}
              changeFormHandler={changeFormHandler}
            />
          </form>
        </div>
      </section>
    </main>
  )
}
