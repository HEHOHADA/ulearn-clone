import React, { useCallback, useEffect, useState } from 'react'
import { ICourse } from '../../../shared/interface'
import { useHistory, useParams } from 'react-router-dom'
import { Loader } from '../../../components/utils/Loader'
import { CourseForm } from '../../../components/Admin/course/CourseForm'
import { useDispatch, useSelector } from 'react-redux'
import { updateAdminDataWithStore } from '../../../../store/actions/admin'
import { fetchData, fetchDataById } from '../../../../store/actions/shared'
import { courseRequest, subscriptionRequest } from '../../../../shared/request'
import { AppStateType } from '../../../../store/store'

export default () => {
    const {id} = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const {loading, subscriptions, courses} = useSelector((s: AppStateType) => s.shared)
    const [load, setLoad] = useState<any>(true)
    const [course, setCourses] = useState<any>()
    const fetch = useCallback(async () => {
        if (!subscriptions.length) {
            dispatch(fetchData(subscriptionRequest))
        }
        if (!courses.length) {
            setCourses(await dispatch(fetchDataById(courseRequest, id)))
        } else {
            setCourses(courses.find((c: any) => c.id === parseInt(id)))
        }
    }, [id, courses, subscriptions, dispatch])

    useEffect(() => {
        fetch()
        setLoad(false)
    }, [])

    console.log(course, loading, load)
    const submit = async (event: any, form: ICourse) => {
        event.preventDefault()
        await dispatch(updateAdminDataWithStore(courseRequest, {...form}, id))
        history.push('/admin/course/')
    }
    return (
        <>
            {
                load || loading ? <Loader/> : <CourseForm
                    subscriptions={ subscriptions } initialValues={ course }
                    title={ 'Edit' } onSubmit={ submit }/>
            }
        </>
    )
}
