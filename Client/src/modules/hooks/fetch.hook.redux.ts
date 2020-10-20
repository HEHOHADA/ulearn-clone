import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../store/actions/shared'
import axios from '../../axios/axios'
import { AppStateType } from '../../store/store'

export const useFetch = <T>(url: string) => {
    const {courses: fetchedCourses, loading}: any = useSelector((s: AppStateType) => s.shared)
    const [load, setLoad] = useState(() => true)
    const dispatch = useDispatch()

    const fetch = useCallback(async () => {
        if (!fetchedCourses.length) {
            await dispatch(fetchData(url))
        }
        setLoad(false)
    }, [dispatch])

    useEffect(() => {
        const source = axios.CancelToken.source()
        fetch()
        return () => {
            source.cancel()
        }
    }, [fetch])

    return

}
