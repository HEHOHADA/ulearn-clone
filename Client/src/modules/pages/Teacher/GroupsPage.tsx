import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { AppStateType } from '../../../store/store'
import { fetchData } from '../../../store/actions/shared'
import { groupRequest } from '../../../shared/request'
import { Loader } from '../../components/utils/Loader'
import { removeAdminDataWithStore } from '../../../store/actions/admin'

export default () => {
  const history = useHistory()
  const [loading1, setLoading1] = useState(true)
  const dispatch = useDispatch()
  const { groups, loading } = useSelector((s: AppStateType) => s.shared)

  const fetch = useCallback(() => {
    if (!groups?.length) {
      dispatch(fetchData(groupRequest))
    }
    setLoading1(false)
  }, [groups, dispatch])
  useEffect(() => {
    fetch()
  }, [fetch])

  const onEditGroup = (group: number) => {
    history.push(`/group/edit/${group}`)
  }

  const onDeleteGroup = async (groupId: number) => {
    try {
      await dispatch(removeAdminDataWithStore(groupRequest, groupId))
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <main className="page">
      <div className="container pt-5">
        {loading1 || loading ? (
          <Loader />
        ) : !groups?.length ? (
          <p className="center">Нет групп</p>
        ) : (
          groups &&
          groups.map((g: any) => (
            <div key={g.id + g.name} className="card align-content-between d-flex m-3">
              <div className="btn-block">
                <Link className="card-columns mr-5" to={`/group/${g.id}`}>
                  {g.name}
                </Link>
                <div className="d-inline">
                  <button
                    type="button"
                    className="btn btn-outline-primary m-1"
                    onClick={() => onEditGroup(g.id)}
                  >
                    Изменить группу
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => onDeleteGroup(g.id)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        <Link to={`/group/create`} className="btn btn-primary m-1">
          Добавить группу
        </Link>
      </div>
    </main>
  )
}
