import React, {useEffect, useState} from "react"

import {useHttp} from "../../../hooks/http.hook"
import {useHistory, useParams} from "react-router-dom"
import {useFetch} from "../../../hooks/fetch.hook"
import {courseRequest, moduleRequest} from "../../../shared/request"
import {ICourse, IModule} from "../../../shared/interface"

export const ModulePage = () => {
    const {request} = useHttp()
    const {courseId} = useParams()
    const {fetched, isBusy} = useFetch<ICourse>(`${courseRequest}/${courseId}`)

    useEffect(() => {
        if (!isBusy) {
            console.log('fetched', fetched)
            fetched?.modules!.map(module => {
                module.maxPoints = module.codeTasks.map(task => task.points).reduce((a, b) => a + b, 0)
                    + module.testTasks.map(task => task.points!).reduce((a, b) => a + b, 0)
            })
            setModules(fetched?.modules!)
        }
    }, [isBusy])
    const [modules, setModules] = useState<IModule[]>([]);
    const history = useHistory()


    const onCreateModule = () => {
        history.push(`/admin/course/${courseId}/module/create`)
    }
    const onViewThemes = (moduleId: number) => {
        history.push(`/admin/course/${courseId}/module/${moduleId}/theme`)
    }
    const onDelete = async (moduleId: number) => {
        try {
            const deleted = await request(`${moduleRequest}/${moduleId}`, 'DELETE')
            const newModules = modules.filter(module => module.id !== deleted.id)
            setModules(newModules)
        } catch (e) {
            console.log(e)
        }
    }
    const onAddTheme = (moduleId: number) => {
        history.push(`/admin/course/${courseId}/module/${moduleId}/theme/create`)
    }
    return (
        <div>
            {
                modules.map((module, index) => {
                    return (
                        <div className="col-md-5 col-lg-4" key={`${module.name}-${module.id}`}>
                            <div className="clean-pricing-item">
                                <div className="heading">
                                    <h3>{module.name}</h3>
                                </div>
                                <div className="price">
                                </div>
                                <button onClick={() => onViewThemes(module.id!)}
                                        className="btn btn-outline-primary btn-block"
                                        type="button">{"Модули"}</button>
                                <button onClick={() => onAddTheme(module.id!)}
                                        className="btn btn-outline-primary btn-block"
                                        type="button">{"Добавить тест"}</button>
                                <button onClick={() => onDelete(module.id!)}
                                        className="btn btn-outline-primary btn-block"
                                        type="button">{"Удалить"}</button>
                            </div>
                        </div>
                    )

                })
            }
            <button className="btn btn-outline-primary btn-block" type={"button"}
                    onClick={onCreateModule}>{"Создать модуль"}</button>
        </div>

    )

}
