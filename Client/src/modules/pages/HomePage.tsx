import React, { useCallback, useEffect, useState } from 'react'
import { HomeCourses } from '../components/home/HomeCourse/HomeCourses'
import { ICourse } from '../shared/interface'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchData } from '../../store/actions/shared'
import { Loader } from '../components/utils/Loader'
import { AppStateType } from '../../store/store'
import { courseRequest } from '../../shared/request'

export default () => {
  const dispatch = useDispatch()
  const [loading1, setLoading1] = useState(() => true)
  const { courses, loading } = useSelector((s: AppStateType) => s.shared)

  const history = useHistory()
  const auth = useSelector((s: AppStateType) => s.auth)

  const onClickHandler = useCallback(
    async (course: ICourse) => {
      if (!auth.isAuth) {
        history.push('/login')
      }
      const id = course.id
      const link = `course/${id}`

      // const data: any = await dispatch(checkSubscription(id))
      // //if have subscription redirect to course page
      // if (data.hasAccess) {
      //     dispatch(userActions.choseItem({course: id}))
      history.push(link)
      // } else {
      //     if (data.subscriptionId) {
      //         history.push(`pay/${ data.subscriptionId }`)
      //     }
      //     // redirect to payment page
      // }
    },
    [auth.isAuth, dispatch, history]
  )

  const fetch = useCallback(() => {
    if (!courses.length) {
      dispatch(fetchData(courseRequest))
    }
    setLoading1(false)
  }, [courses, dispatch])

  useEffect(() => {
    fetch()
  }, [fetch])

  return (
    <main className="page catalog-page">
      <section className="clean-block clean-catalog dark">
        <div className="container">
          <div className="block-heading">
            <h2 className="text-info">Course Page</h2>
            <p>Вы зашли на образовательную страницу для школьников и школьниц</p>
          </div>
          <div className="content">
            <div className="row">
              <div className="col-md-12">
                <div className="products">
                  <div className="row no-gutters">
                    {loading || loading1 ? (
                      <Loader />
                    ) : !courses.length ? (
                      <p className="center">Нет курсов</p>
                    ) : (
                      <HomeCourses courses={courses} onClick={onClickHandler} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
