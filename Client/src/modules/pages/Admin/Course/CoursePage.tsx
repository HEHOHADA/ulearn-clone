import React from 'react'
import {HomeCourses} from "../../../components/home/HomeCourse/HomeCourses";
import {Course} from "../../../shared/interface";
import { useHistory } from 'react-router-dom';

export const CoursePage = () => {

    const history = useHistory()

    const courses: Course[] = [
        {description: "321321321 312 321 312 3123 213 123", id: "1", name: "3", time: new Date()},
        {description: "321321321 312 321 312 3123 213 123", id: "2", name: "3", time: new Date()},
    ]
    const onClickEditHandler = (link:string) => {
        history.push(`/admin/${link}`)
    }

    return (
        <HomeCourses onClick={onClickEditHandler} courses={courses}/>
    )
}
