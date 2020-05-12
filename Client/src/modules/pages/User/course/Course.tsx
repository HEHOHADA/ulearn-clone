import React from 'react'

interface Props {
    id?: string
    isActive?: boolean
    onClick?: () => void
    progress?: {
        current: number
        max: number
    }
    title?: string
    onChooseCourse: (data: { thema?: any, module?: any, course?: any }) => void
}

export const Course = (props: Props) => {
    const {onChooseCourse} = props
    // const {id} = useParams()

    return (
        <div className="col-md-4 col-xs-12">
            <header className="header-standard header-line">
                <button type="button" className="btn btn-link">Назад</button>
                <h3>Header</h3>
            </header>
            <div>
                <li className="list-group-item module">
                    <button className="btn btn-link" onClick={() => onChooseCourse({module: '1'})}>
                        <div>название</div>
                    </button>
                </li>
            </div>
        </div>
    )
}
