import React, {useContext, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {Module} from "./Module"
import {Theme} from './Theme'
import {Course} from "./Course"
import {UserContext} from "../../../context/UserContext"
import {useFetch} from "../../../hooks/fetch.hook"
import {api, courseRequest} from "../../../shared/request"
import {ICourse} from "../../../shared/interface"
import {useHttp} from "../../../hooks/http.hook"

export const UserCoursePage = () => {

    const {module, chooseTheme, theme, course} = useContext(UserContext)

    const {request, loading} = useHttp()
    const {id} = useParams()
    const history = useHistory()
    const location = history.location.pathname
    const themeId = location.split('/')[3]

    const {fetched: courseItem, isBusy: isBusyCourse, loading: courseLoading} = useFetch<ICourse>(`${courseRequest}/${id}`)


    useEffect(() => {
        const themeFetch = async () => {
            if (themeId) {
                const splits = themeId.split('-')

                const result = await request(`${api}/${splits[1]}result/${splits[0]}`)
                let response
                if (!theme) {
                    response = await request(`${api}/${splits[1]}/${splits[0]}`)

                }
                const theme1 = {theme: {...response ?? theme, receivedPoints: result?.points ?? 0}}
                // eslint-disable-next-line
                const _ = splits[1] === "codeTask" && result?.usersCode
                    ? theme1.theme.initailCode = result.usersCode
                    : splits[1] === "testTask" && result?.answers ? theme1.theme.questions = result.answers : {}
                chooseTheme(theme1)
            }
        }
        themeFetch()
        // eslint-disable-next-line
    }, [themeId])
    return (
        <main className="page">
            <div className="container">
                <div className="row">
                    {module ?
                        <Module id={module} course={course ? course : id}
                                onChooseTheme={chooseTheme}/> :
                        !isBusyCourse &&
                        <Course loading={courseLoading} course={courseItem!} onChooseModule={chooseTheme}/>}
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
