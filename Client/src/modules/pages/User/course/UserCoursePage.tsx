import React from 'react'
import {Modules} from "./Modules";
import {Thema} from './Thema';

export const UserCoursePage = () => {
    return (
        <main className="page">
            <div className="container">
                <div className="row">
                    <Modules/>
                    <div className="col-md-8 col-xs-12">
                        <Thema/>
                    </div>
                </div>
            </div>
        </main>
    )
}
