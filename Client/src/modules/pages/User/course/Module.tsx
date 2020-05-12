import React from 'react'
import {Link, useHistory} from 'react-router-dom'

interface Props {
    onChooseThema: (data: { thema?: any, module?: any, course?: any }) => void
    course: any
    id: any
}

export const Module = (props: Props) => {

    const array = [
        {id: 1, name: "qq", points: 1, maxPoints: 5},
        {id: 2, name: "qq1", points: 5, maxPoints: 5},
    ]

    const {onChooseThema, course} = props

    const history = useHistory()

    const onClickBackHandler = () => {
        onChooseThema({module: null})
    }

    const onChooseThemaHandler = (id: any) => {
        console.log('course', course)
        onChooseThema({course: course, thema: id})
    }

    const rendereModules = () => {
        return array.map((m, index) => (
            <li key={`${m.id}-${m.name}`} className="list-group-item module">
                <Link to={`/course/${course}/${m.id}`}
                      className="btn btn-link"
                      onClick={() => onChooseThemaHandler(m.id)}>
                    <div>{m.name}</div>
                </Link>
                <span>{m.points}/{m.maxPoints}</span>
            </li>
        ))
    }
    return (
        <div className="col-md-4 col-xs-12">
            <header className="header-standard header-line">
                <button type="button" className="btn btn-link" onClick={onClickBackHandler}>Назад</button>
                <h3>Header</h3>
            </header>
            <div>
                {rendereModules()}
            </div>
        </div>
    )
}
