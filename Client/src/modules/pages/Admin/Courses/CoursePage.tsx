import React, { useCallback, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { HomeCourses } from '../../../components/home/HomeCourse/HomeCourses'
import { ICourse } from '../../../shared/interface'
import { Loader } from '../../../components/utils/Loader'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../../../axios/axios'
import { fetchData } from '../../../../store/actions/shared'
import { courseRequest } from '../../../../shared/request'
import { removeAdminDataWithStore } from '../../../../store/actions/admin'

export default () => {
  const dispatch = useDispatch()
  const { courses: fetchedCourses, loading }: any = useSelector((s: any) => s.shared)
  const [load, setLoad] = useState(() => true)
  // const [courses, setCourses] = useState<Array<ICourse>>()
  const fetch = useCallback(async () => {
    if (!fetchedCourses.length) {
      await dispatch(fetchData(courseRequest))
    }
    setLoad(false)
  }, [fetchedCourses, dispatch])
  useEffect(() => {
    const source = axios.CancelToken.source()
    fetch()
    return () => {
      source.cancel()
    }
  }, [fetch])
  const history = useHistory()

  const onClickEditHandler = (course: ICourse) => {
    const link = `${course.id}`
    history.push(`/admin/course/edit/${link}`)
  }

  const onDeleteHandler = async (course: ICourse) => {
    try {
      await dispatch(removeAdminDataWithStore(courseRequest, course.id!))
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      {load || loading ? (
        <Loader />
      ) : (
        <HomeCourses
          onDelete={onDeleteHandler}
          onClick={onClickEditHandler}
          courses={fetchedCourses}
          loading={loading}
        />
      )}
      <Link className={'btn btn-primary mt-4'} to={'/admin/course/create'}>
        Создать курс
      </Link>
    </>
  )
}
