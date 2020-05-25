import React from 'react'
import {Link} from "react-router-dom"
import {ICourse} from "../../../shared/interface"


interface Props {
    courses: ICourse[]
    onClick: (course: ICourse) => void
    loading: boolean
}

// `course/${course.id}`
export const HomeCourses = (props: Props) => {

    const {courses, onClick, loading} = props

    const courseHandler = (course: ICourse) =>
        (
            <div className="col-12 col-md-6 col-lg-4" key={`${course.id}`}>
                <div className="clean-product-item">
                    <div className="product-name"><Link to={`course/${course.id}`}>{course.name}</Link>
                    </div>
                    <div className="about">
                        <div className="description">{course.description}</div>
                    </div>
                    <div className="btn-block">
                        <button disabled={loading} onClick={() => onClick(course)}
                                className="btn btn-primary">Перейти
                        </button>
                    </div>
                </div>
            </div>
        )
    return (
        <>
            {(courses.map(c => courseHandler(c)))}
        </>
    )

// let courses:any = []
//     useEffect(() => {
//         courses = props.courses
//     }, props)

}
