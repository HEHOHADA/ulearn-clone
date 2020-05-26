import React from 'react'
import {Link} from 'react-router-dom'
import {ICourse, IModule} from '../../../shared/interface'
import {Loader} from "../../../shared/utils/Loader"

interface Props {
    course: ICourse
    id?: string
    isActive?: boolean
    loading?: boolean
    onClick?: () => void
    progress?: {
        current: number
        max: number
    }
    title?: string
    header?: string
    module?: Array<IModule>
    onChooseModule: (data: { theme?: any, module?: any, course?: any }) => void
}

export const Course = (props: Props) => {

    const {onChooseModule, course, loading} = props

    const onChooseModuleHandler = (id: any) => {
        console.log('here', id)
        onChooseModule({module: id})
    }

    const renderModules = () => {
        return course.modules!.map((m, index) => (
            <li className="list-group-item module" key={`${m.id}-${m.name}`}>
                <button className="btn btn-link" onClick={() => onChooseModuleHandler(m.id)}>
                    <div>{m.name}</div>
                </button>
                <span>{m.maxPoints}</span>
            </li>
        ))
    }
    if (loading) {
        return <Loader/>
    }
    return (
        <div className="col-md-4 col-xs-12">
            <header className="header-standard header-line">
                <Link to="/" type="button" className="btn btn-link">Назад</Link>
                <h3>Header</h3>
            </header>
            <div>
                {renderModules()}
            </div>
        </div>
    )
}
