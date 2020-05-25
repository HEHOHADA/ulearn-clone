import {useHttp} from "../../../hooks/http.hook";
import {useHistory, useParams} from "react-router-dom";
import {useFetch} from "../../../hooks/fetch.hook";
import {ICourse, IModule} from "../../../shared/interface";
import {courseRequest, moduleRequest} from "../../../shared/request";
import React, {useEffect, useState} from "react";

export const ThemePage = () => {
    /*const {request} = useHttp()
    const {moduleId} = useParams()
    const {fetched, isBusy} = useFetch<IModule>(`${moduleRequest}/${moduleId}`)
    useEffect(() => {
        if (!isBusy) {
            console.log('fetched', fetched)
            const tasks = fetched.
            setModule(fetched)
        }
    }, [isBusy])
    const [module, setModule] = useState<IModule>();
    const history = useHistory()
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

    )*/
}
