import React from 'react'
import {useHistory} from 'react-router-dom'
import {HomeCourses} from "../../../components/home/HomeCourse/HomeCourses"
import {ICourse} from "../../../shared/interface"

export const CoursePage = () => {

    const history = useHistory()

    const courses: ICourse[] = [
        {description: "321321321 312 321 312 3123 213 123", id: "1", name: "3"},
        {description: "321321321 312 321 312 3123 213 123", id: "2", name: "3"},
    ]
    const onClickEditHandler = (course: ICourse) => {
        const link = `course/${course.id}`
        history.push(`/admin/${link}`)
    }

    return (
        <HomeCourses onClick={onClickEditHandler} courses={courses} loading/>
    )
}
