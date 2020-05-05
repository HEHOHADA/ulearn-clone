import React from 'react'
import {Course} from "../../../shared/interface";
import {Link} from "react-router-dom";


interface Props {
    courses: Course[]
    onClick: (link: string) => void
    loading: boolean
}

// `course/${course.id}`
export const HomeCourses = (props: Props) => {

    const {courses, onClick, loading} = props

    const courseHandler = (course: Course) =>
        (
            <div className="col-12 col-md-6 col-lg-4" key={`${course.id}`}>
                <div className="clean-product-item">
                    <div className="product-name"><Link to={`course/${course.id}`}>{course.name}</Link>
                    </div>
                    <div className="about">
                        <div className="description">{course.description}</div>
                    </div>
                    <div className="text-body">
                        <div className="">{course.time.toLocaleDateString()}</div>
                    </div>
                    <div className="btn-block">
                        <button disabled={loading} onClick={() => onClick(`course/${course.id}`)}
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
