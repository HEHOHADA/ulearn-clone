import {useHttp} from "../../../hooks/http.hook";
import {useParams, useHistory} from "react-router-dom";
import {useFetch} from "../../../hooks/fetch.hook";
import {courseRequest, moduleRequest, subscriptionRequest} from "../../../shared/request";
import {ICourse, IModule, ISubscription} from "../../../shared/interface";
import React, {useEffect, useState} from "react";

export const ModulePage = () => {
    const {request} = useHttp()
    const {courseId} = useParams()
    const {fetched, isBusy} = useFetch<ICourse>(`${courseRequest}/${courseId}`)

    useEffect(() => {
        if (!isBusy) {
            console.log('fetched', fetched)
            fetched?.modules!.map(module => {
                module.maxPoints = module.codeTasks.map(task => task.points).reduce((a, b) => a + b, 0)
                    + module.testTasks.map(task => task.questions.map(question => question.points).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)
            })
            setModules(fetched?.modules!)
        }
    }, [isBusy])
    const [modules, setModules] = useState<IModule[]>([]);
    const history = useHistory()


    const onCreateModule = () => {
        history.push(`/admin/course/${courseId}/module/create`)
    }
    const onEdit = (moduleId: number) => {
        history.push(`/admin/course/${courseId}/module/edit/${moduleId}`)
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
                        <div className="col-md-5 col-lg-4" key={`${module.name}-${module.maxPoints}`}>
                            <div className="clean-pricing-item">
                                <div className="heading">
                                    <h3>{module.name}</h3>
                                </div>
                                <div className="price">
                                    <h4><small>Макс</small>{module.maxPoints}</h4>
                                </div>
                                <button onClick={() => onEdit(module.id!)}
                                        className="btn btn-outline-primary btn-block"
                                        type="button">{"Изменить"}</button>
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
