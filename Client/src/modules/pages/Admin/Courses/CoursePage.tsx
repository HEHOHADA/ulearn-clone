import React, {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {HomeCourses} from "../../../components/home/HomeCourse/HomeCourses"
import {ICourse} from "../../../shared/interface"
import {useFetch} from "../../../hooks/fetch.hook"
import {courseRequest, subscriptionRequest} from "../../../shared/request"
import {useHttp} from "../../../hooks/http.hook"
import {Loader} from "../../../shared/utils/Loader"

export const CoursePage = () => {

    const history = useHistory()
    const {request, loading} = useHttp()
    const [courses, setCourses] = useState<Array<ICourse>>()
    const {fetched, isBusy} = useFetch(courseRequest)

    // const courses: ICourse[] = [
    //     {description: "321321321 312 321 312 3123 213 123", id: "1", name: "3"},
    //     {description: "321321321 312 321 312 3123 213 123", id: "2", name: "3"},
    // ]
    useEffect(() => {
        setCourses(fetched)
    }, [isBusy])

    const onClickEditHandler = (course: ICourse) => {
        const link = `course/${course.id}`
        history.push(`/admin/course/${link}`)
    }

    const onDeleteHandler = async (course: ICourse) => {
        try {
            const deleted = await request(`${courseRequest}/${course.id}`, 'DELETE')
            const newSubs = courses!.filter((sub: ICourse) => sub.id !== deleted.id)
            setCourses(newSubs)
        } catch (e) {
            console.log(e)
        }
    }

    if (loading || isBusy) {
        return <Loader/>
    }

    return (
        <>
            {!isBusy && <HomeCourses
                onDelete={onDeleteHandler}
                onClick={onClickEditHandler}
                courses={courses}
                loading={loading}/>
            }
            <Link className={"btn btn-primary mt-4"}
                  to={"/admin/course/create"}>Создать курс</Link>
        </>
    )
}
