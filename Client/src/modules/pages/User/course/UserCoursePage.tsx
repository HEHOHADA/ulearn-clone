import React, {useContext, useEffect} from 'react'
import {Module} from "./Module";
import {Thema} from './Thema';
import {Course} from "./Course";
import {UserContext} from "../../../context/UserContext";
import {useParams, useHistory, Link} from 'react-router-dom';

export const UserCoursePage = () => {

    const {module, chooseTheme, theme, course} = useContext(UserContext)

    const {id} = useParams()

    const history = useHistory()

    const themaUrl = history.location.pathname.split('/')[3]

    useEffect(() => {
        chooseTheme({theme: themaUrl})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [themaUrl])

    useEffect(() => {
        //
    }, [id])

    return (
        <main className="page">
            <div className="container">
                <div className="row">
                    {module ? <Module id={module} course={course ? course : id} onChooseTheme={chooseTheme}/> :
                        <Course onChooseModule={chooseTheme}/>}
                    <div className="col-md-8 col-xs-12">
                        <div className="container">
                            <Thema id={theme} nextThema={chooseTheme}/>
                            <div className="d-flex flex-nowrap m-3">
                                {theme && <Link to={' asd'} className="btn btn-primary btn-block m-1    ">Назад</Link>}
                                {theme && <Link to={''} className="btn btn-primary btn-block m-1">След</Link>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
