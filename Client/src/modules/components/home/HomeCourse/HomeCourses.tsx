import React from 'react'
import { Link } from 'react-router-dom'
import { ICourse } from '../../../shared/interface'

interface Props {
  courses: ICourse[]
  onClick: (course: ICourse) => void
  loading?: boolean
  onDelete?: (course: ICourse) => void
}

// `course/${course.id}`
export const HomeCourses = (props: Props) => {
  const { courses, onClick, loading, onDelete } = props
  const courseHandler = (course: ICourse) => (
    <div className="col-12 col-md-6 col-lg-4" key={`${course.id}`}>
      <div className="clean-product-item m-2">
        <div className="product-name">
          <Link to={`course/${course.id}`}>{course.name}</Link>
        </div>
        <div className="about">
          <div className="description">{course.description}</div>
        </div>
        <div className="btn-block">
          <button
            disabled={loading}
            onClick={() => onClick(course)}
            className="btn btn-primary m-1"
          >
            Перейти
          </button>
          {onDelete && (
            <button
              disabled={loading}
              className="btn btn-primary m-1"
              onClick={() => onDelete(course)}
            >
              Удалить
            </button>
          )}
          {onDelete && (
            <Link to={`/admin/course/${course.id}/module/create`} className="btn btn-primary m-1">
              Добавить модуль
            </Link>
          )}
          {onDelete && (
            <Link to={`/admin/course/${course.id}/module`} className="btn btn-primary m-1">
              Модули
            </Link>
          )}
        </div>
      </div>
    </div>
  )
  return <>{courses.map((c) => courseHandler(c))}</>
}
