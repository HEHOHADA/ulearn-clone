import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Module } from './Module'
import { Theme } from './Theme'
import { Course } from './Course'
import { AppStateType } from '../../../../store/store'
import { Loader } from '../../../components/utils/Loader'
import { fetchUserDataById, userActions } from '../../../../store/actions/user'
import { api, courseRequest, moduleRequest } from '../../../../shared/request'

export default () => {
  const { id } = useParams()
  const history = useHistory()
  const location = history.location.pathname
  const themeId = location.split('/')[3]
  const dispatch = useDispatch()
  const [load, setLoad] = useState(true)

  const { courses, loading } = useSelector((s: AppStateType) => s.shared)
  const { course, module, theme, loading: userLoading } = useSelector((s: AppStateType) => s.user)

  const choseItems = useCallback(
    (data: any) => {
      dispatch(userActions.choseItem({ ...data }))
    },
    [dispatch]
  )

  const fetchModule = useCallback(
    async (id) => {
      if (!course) {
        await dispatch(fetchUserDataById(moduleRequest, id))
      } else {
        dispatch(
          userActions.choseItem({ module: course!.modules?.find((c) => c.id === parseInt(id)) })
        )
      }
      setLoad(false)
    },
    [course, dispatch]
  )

  const choseModules = useCallback(
    async (id) => {
      await fetchModule(id)
    },
    [fetchModule]
  )

  const fetchCourse = useCallback(
    async (id) => {
      if (!course) {
        if (!courses.length) {
          await dispatch(fetchUserDataById(courseRequest, id))
        } else {
          dispatch(userActions.choseItem({ course: courses.find((c) => c.id === parseInt(id)) }))
        }
      }
    },
    [course, courses, dispatch]
  )

  const fetchTheme = useCallback(
    async (id) => {
      if (!theme) {
        if (id) {
          const splits = id.split('-')
          console.log(splits[1])
          await dispatch(fetchUserDataById(`${api}/${splits[1]}`, splits[0]))
        }
      }
    },
    [theme, dispatch]
  )

  useEffect(() => {
    fetchCourse(id)
    setLoad(false)
  }, [id])

  useEffect(() => {
    fetchTheme(themeId)
    setLoad(false)
  }, [themeId])

  // console.log(loading, load, course, localCourse, module)
  // useEffect(() => {
  //     const themeFetch = async () => {
  //         if (themeId) {
  //             const splits = themeId.split('-')
  //
  //             const result = await request(`${ api }/${ splits[1] }result/${ splits[0] }`)
  //             let response
  //             if (!theme) {
  //                 response = await request(`${ api }/${ splits[1] }/${ splits[0] }`)
  //
  //             }
  //             const theme1: any = {theme: {...response ?? theme, receivedPoints: result?.points ?? 0}}
  //             splits[1] === 'codeTask' && result?.usersCode
  //                 ? theme1.theme.initailCode = result.usersCode
  //                 : splits[1] === 'testTask' && result?.answers ? theme1.theme.questions = result.answers : theme1.checked = true
  //             chooseTheme(theme1)
  //         }
  //     }
  //     const timeout = setTimeout(() => themeFetch(), 400)
  //     return () => {
  //         clearTimeout(timeout)
  //     }
  //     // eslint-disable-next-line
  // }, [themeId])
  console.log(course, module, theme)
  return (
    <main className="page">
      <div className="container">
        <div className="row">
          {loading || load || userLoading ? (
            <Loader />
          ) : module ? (
            <Module module={module} onChooseTheme={choseItems} />
          ) : (
            course && (
              <Course
                loading={loading || load || userLoading}
                course={course}
                onChooseModule={choseModules}
              />
            )
          )}
          <div className="col-md-8 col-xs-12">
            <div className="container">
              {theme && (
                <Theme loading={userLoading || load} theme={theme} nextThema={choseItems} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
