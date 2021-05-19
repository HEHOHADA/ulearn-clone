import React, {useContext, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {Module} from "./Module"
import {Theme} from './Theme'
import {Course} from "./Course"
import {UserContext} from "../../../context/UserContext"
import {useFetch} from "../../../hooks/fetch.hook"
import {api, courseRequest, moduleRequest} from "../../../shared/request"
import {ICourse, IModule} from "../../../shared/interface";
import {useHttp} from "../../../hooks/http.hook";

export const UserCoursePage = () => {

    const {module, chooseTheme, theme, course} = useContext(UserContext)

    const {request, loading} = useHttp()
    const {id} = useParams()
    const history = useHistory()
    const location = history.location.pathname
    const themeId = location.split('/')[3]

    const {fetched: courseItem, isBusy: isBusyCourse, loading: courseLoading} = useFetch<ICourse>(`${courseRequest}/${id}`)
    const {fetched: moduleItem, isBusy: isBusyModule, loading: moduleLoading} = useFetch<IModule>(`${moduleRequest}/${module}`)

    useEffect(() => {
        const themeFetch = async () => {
            if (themeId) {
                if (!theme) {
                    const splits = themeId.split('-')
                    const response = await request(`${api}/${splits[1]}/${splits[0]}`)
                    chooseTheme({theme: response})
                }
            }
        }
        themeFetch()
    }, [themeId])
    return (
        <main className="page">
            <div className="container">
                <div className="row">
                    {module ?
                        !isBusyModule &&
                        <Module loading={moduleLoading} theme={moduleItem} id={module} course={course ? course : id}
                                onChooseTheme={chooseTheme}/> :
                        !isBusyCourse && <Course course={courseItem!} onChooseModule={chooseTheme}/>}
                    <div className="col-md-8 col-xs-12">
                        <div className="container">
                            <Theme loading={loading} theme={theme} nextThema={chooseTheme}/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
