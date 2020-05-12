import React, {useContext, useEffect} from 'react'
import {Modules} from "./Modules";
import {Thema} from './Thema';
import {Course} from "./Course";
import {UserContext} from "../../../context/UserContext";
import {useParams} from 'react-router-dom';

export const UserCoursePage = () => {

    const {module, chooseThema, thema} = useContext(UserContext)
    const {id} = useParams()
    useEffect(() => {
        chooseThema({course: id})
    })
    return (
        <main className="page">
            <div className="container">
                <div className="row">
                    {module ? <Modules onChooseModule={chooseThema}/> : <Course onChooseCourse={chooseThema}/>}
                    <div className="col-md-8 col-xs-12">
                        <Thema id={thema} onChooseThema={chooseThema}/>
                    </div>
                </div>
            </div>
        </main>
    )
}
