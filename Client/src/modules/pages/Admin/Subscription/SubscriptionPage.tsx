import React, { useCallback, useEffect, useState } from 'react'
import { SubscriptionView } from '../../../components/pay/SubscriptionView'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../../hooks/form.hook'
import { Loader } from '../../../components/utils/Loader'
import axios from '../../../../axios/axios'
import { subscriptionRequest } from '../../../../shared/request'
import { fetchData } from '../../../../store/actions/shared'
import { removeAdminDataWithStore } from '../../../../store/actions/admin'

export default () => {
  const history = useHistory()
  const [sort, setSort] = useState<number>(0)
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()
  const { loading, subscriptions } = useSelector((s: any) => s.shared)

  useEffect(() => {
    const fetch = async () => {
      if (!subscriptions.length) {
        dispatch(fetchData(subscriptionRequest))
      }
      setSubs(subscriptions)
    }
    fetch()
  }, [subscriptions, dispatch])
  const onEditHandler = useCallback(
    (id: number) => {
      history.push(`/admin/subscription/edit/${id}`)
    },
    [history]
  )

  const onClickCreate = useCallback(() => {
    history.push(`/admin/subscription/create`)
  }, [history])

  const [subs, setSubs] = useState(() => subscriptions)

  const onDeleteHandler = useCallback(
    async (id: number) => {
      await dispatch(removeAdminDataWithStore(subscriptionRequest, id))
    },
    [dispatch]
  )

  const initialValues = {
    fromLevel: 0,
    toLevel: 0,
    fromPrice: 0,
    toPrice: 0
  }

  const { form, generateInputs } = useForm(initialValues)

  const filterHandler = async (sortBy: number, pagee?: number) => {
    try {
      if (sortBy !== -1) {
        setSort(sortBy)
      }
      const response = await axios.get(
        `${subscriptionRequest}?page=${pagee ?? page}&pageSize=${3}&fromLevel=${
          form.fromLevel
        }&toLevel=${form.toLevel}&fromPrice=${form.fromPrice}&toPrice=${
          form.toPrice
        }&sortType=${sort}`
      )
      if (response.data) {
        setSubs(response.data)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="row">
      {loading || !subs.length ? (
        <Loader />
      ) : (
        <SubscriptionView
          subscription={subs}
          loading={loading}
          onDelete={onDeleteHandler}
          onClick={onEditHandler}
          text={'Edit'}
        />
      )}
      <div className="container pt-4">
        <button className="btn btn-primary" onClick={onClickCreate}>
          Создать подписку
        </button>
        <div className="btn-block m-5">
          <button className="btn btn-primary m-1" onClick={() => filterHandler(0)}>
            По убыванию цены
          </button>
          <button className="btn btn-primary m-1" onClick={() => filterHandler(1)}>
            по возрастанию цены
          </button>
          <button className="btn btn-primary m-1" onClick={() => filterHandler(2)}>
            По убыванию левела
          </button>
          <button className="btn btn-primary m-1" onClick={() => filterHandler(3)}>
            по возрастанию левела
          </button>

          <nav>
            <ul className="pagination">
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={async () => {
                    setPage(page - 1)
                    await filterHandler(-1, page - 1)
                  }}
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              <li className="page-item">
                <span className="page-link">{page}</span>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={async () => {
                    setPage(page + 1)
                    await filterHandler(-1, page + 1)
                  }}
                  aria-label="Next"
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="m-5">{generateInputs()}</div>
    </div>
  )
}
