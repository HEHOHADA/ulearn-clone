import React from 'react'
import {Link} from 'react-router-dom'
import {IModule} from "../../../shared/interface";

interface Props {
    id?: string
    isActive?: boolean
    onClick?: () => void
    progress?: {
        current: number
        max: number
    }
    title?: string
    header:string
    module?:Array<IModule>
    onChooseModule: (data: { theme?: any, module?: any, course?: any }) => void
}

export const Course = (props: Props) => {

    const {onChooseModule} = props

    const array = [{id: 1, name: '31321', points: 1, maxPoints: 5}]

    const onChooseModuleHandler = (id: any) => {
        console.log('here', id)
        onChooseModule({module: id})
    }
    // const {id} = useParams()
    const renderModules = () => {
        return array.map((m, index) => (
            <li className="list-group-item module" key={`${m.id}-${m.name}`}>
                <button className="btn btn-link" onClick={() => onChooseModuleHandler(m.id)}>
                    <div>{m.name}</div>
                </button>
                <span>{m.points}/{m.maxPoints}</span>
            </li>
        ))
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
