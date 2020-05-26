import React from 'react'
import {Link} from 'react-router-dom'
import {useFetch} from "../../../hooks/fetch.hook";
import {IModule} from "../../../shared/interface";
import {moduleRequest} from "../../../shared/request";
import {Loader} from "../../../shared/utils/Loader";

interface Props {
    onChooseTheme: (data: { theme?: any, module?: any, course?: any }) => void
    course?: any
    id?: any
    theme?: any
    loading?: boolean
}

type typeTasks = "codeTasks" | "videoTasks" | "testTasks"
export const Module = (props: Props) => {

    const {onChooseTheme, course, id, loading} = props
    const {fetched, isBusy} = useFetch<IModule>(`${moduleRequest}/${id}`)

    const onClickBackHandler = () => {
        onChooseTheme({module: null})
    }

    const onChooseThemaHandler = (theme: any) => {

        onChooseTheme({course: course, module: id, theme: theme})
    }

    const renderModules = (type: typeTasks) => {
        return fetched && (fetched[type] as any).map((m: any) => (
            <li key={`${m.id}-${m.name}`} className="list-group-item module">
                <Link to={`/course/${course}/${m.id}-${type.slice(0, type.length - 1)}`}
                      className="btn btn-link"
                      onClick={() => onChooseThemaHandler(m)}>
                    <div>{m.name}</div>
                </Link>
                <span>{m.points}</span>
            </li>
        ))
    }
    if (loading || isBusy) {
        return <Loader/>
    }
    return (
        <div className="col-md-4 col-xs-12">
            <header className="header-standard header-line">
                <button type="button" className="btn btn-link" onClick={onClickBackHandler}>Назад</button>
                <h3>Header</h3>
            </header>
            <div>
                {renderModules("testTasks")}
                {renderModules("codeTasks")}

                {renderModules("videoTasks")}
            </div>
        </div>
    )
}
