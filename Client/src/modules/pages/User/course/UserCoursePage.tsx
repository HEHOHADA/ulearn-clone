import React, {useContext} from 'react'
import {useParams, useHistory, Link} from 'react-router-dom'
import {Module} from "./Module"
import {Theme} from './Theme'
import {Course} from "./Course"
import {UserContext} from "../../../context/UserContext"
import {useHttp} from "../../../hooks/http.hook"
import {useFetch} from "../../../hooks/fetch.hook"
import {courseRequest, moduleRequest} from "../../../shared/request"

export const UserCoursePage = () => {

    const {module, chooseTheme, theme, course} = useContext(UserContext)

    const {id} = useParams()
    const {request} = useHttp()

    const history = useHistory()
    const {fetched: courseItem} = useFetch(`${courseRequest}/${id}`)
    const {fetched: moduleItem} = useFetch(`${moduleRequest}/${module}`)
    let moduleItems: any = []
    let headerCourse: any = ''
    let themas: any = ''
    // const themeUrl = history.location.pathname.split('/')[3]
    //
    // useEffect(() => {
    //     chooseTheme({theme: themeUrl})
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [themeUrl])

    // const fetchModule = useCallback(async () => {
    //     try {
    //         const data = await request(`${moduleRequest}/${module}`)
    //         themas = data
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }, [module])
    //
    // const fetchCourse = useCallback(async () => {
    //     try {
    //         const data = await request(`${courseRequest}/${id}`)
    //         moduleItems = data.modules
    //         headerCourse = data.name
    //
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }, [id])
    //
    // useEffect(() => {
    //     fetchCourse()
    //     fetchModule()
    // }, [id, module])

    return (
        <main className="page">
            <div className="container">
                <div className="row">
                    {module ?
                        <Module theme={moduleItem} id={module} course={course ? course : id}
                                onChooseTheme={chooseTheme}/> :
                        <Course course={courseItem} onChooseModule={chooseTheme}/>}
                    <div className="col-md-8 col-xs-12">
                        <div className="container">
                            <Theme theme={theme} nextThema={chooseTheme}/>
                            <div className="d-flex flex-nowrap m-3">
                                {theme && <Link to={' asd'} className="btn btn-primary btn-block m-1">Назад</Link>}
                                {theme && <Link to={''} className="btn btn-primary btn-block m-1">След</Link>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
