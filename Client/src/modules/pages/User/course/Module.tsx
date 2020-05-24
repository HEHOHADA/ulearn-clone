import React from 'react'
import {Link} from 'react-router-dom'

interface Props {
    onChooseTheme: (data: { theme?: any, module?: any, course?: any }) => void
    course: any
    id: any
    theme?: any
}

export const Module = (props: Props) => {

    const array = [
        {id: 1, name: "qq", points: 1, maxPoints: 5},
        {id: 2, name: "qq1", points: 5, maxPoints: 5},
    ]

    const {onChooseTheme, course, theme = array} = props


    const onClickBackHandler = () => {
        onChooseTheme({module: null})
    }

    const onChooseThemaHandler = (id: any) => {
        console.log('course', course)
        console.log(theme, 'theme')
        const current = theme.filter((t: any) => t.id === id)[0]
        console.log(current)
        onChooseTheme({course: course, theme: current})
    }

    const renderModules = () => {
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
                {renderModules()}
            </div>
        </div>
    )
}
