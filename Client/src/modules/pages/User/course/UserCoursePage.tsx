import React, {useContext} from 'react'
import {Link, useParams} from 'react-router-dom'
import {Module} from "./Module"
import {Theme} from './Theme'
import {Course} from "./Course"
import {UserContext} from "../../../context/UserContext"
import {useFetch} from "../../../hooks/fetch.hook"
import {courseRequest, moduleRequest} from "../../../shared/request"
import {ICourse, IModule} from "../../../shared/interface";

export const UserCoursePage = () => {

    const {module, chooseTheme, theme, course} = useContext(UserContext)

    const {id} = useParams()

    const {fetched: courseItem, isBusy: isBusyCourse} = useFetch<ICourse>(`${courseRequest}/${id}`)
    const {fetched: moduleItem, isBusy: isBusyModule} = useFetch<IModule>(`${moduleRequest}/${module}`)

    return (
        <main className="page">
            <div className="container">
                <div className="row">
                    {module ?
                        !isBusyModule && <Module theme={moduleItem} id={module} course={course ? course : id}
                                                 onChooseTheme={chooseTheme}/> :
                        !isBusyCourse && <Course course={courseItem!} onChooseModule={chooseTheme}/>}
                    <div className="col-md-8 col-xs-12">
                        <div className="container">
                            <Theme theme={theme} nextThema={chooseTheme}/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
