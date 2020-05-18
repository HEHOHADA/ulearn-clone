import React, {useContext} from 'react'
import {IdentityForm} from "../components/identity/IdentityForm";
import {IGroup} from "../shared/interface";
import {Link} from "react-router-dom";
import {IdentityPicture} from "../components/identity/IdentityPicture";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";


interface settings {
    name: string
    value: Array<string>
}

// interface Props {
//     role: string
// }

export const IdentityPage = () => {
    const auth = useContext(AuthContext)
    const {request, loading} = useHttp()
    const settings: Array<settings> = [
        {name: "Profile settings", value: ["username", "email", "lastname", "firstname"]},
        {name: "Password settings", value: ["password", "repeat Password"]}
    ]
    const groups: Array<IGroup> = [
        {name: 'group anme', courseName: "course 1"},
        {name: 'group 2', courseName: "course 2"}
    ]


    const teachersGroup = () => {
        return groups && groups.map(g => (
            <Link to={`/${g.courseName}`} key={`${g.name}-${g.courseName}`} className="module p-3 border">
                <p className="text-primary m-0 font-weight-bold text-lg-left ">{g.name}</p>
                <span className="text-primary">{g.courseName}</span>
            </Link>
        ))
    }

    const submitData = async (event: any, form: any) => {
        event.preventDefault()
        // const response = await request('/teacher/confirm', "POST", form)
    }

    const confirmTeacherAccount = async () => {
        // const response = await request('/teacher/confirm', "POST")
    }

    const settingsCreate = () => {
        let flag = ''
        return settings.map(({value, name}, index) => {
            if (index === 1) {
                flag = 'mb-3'
            }
            return (
                <div className={`card shadow ${flag}`} key={`${name}-${index}`}>
                    <div className="card-header py-3">
                        <p className="text-primary m-0 font-weight-bold">{name}</p>
                    </div>
                    <IdentityForm loading={loading} submit={submitData} formNames={value}/>
                </div>
            )
        })
    }

    return (
        <main className="page">
            <div className="container">
                <h3 className="text-dark mb-4">Profile</h3>
                <div className="row mb-3">
                    <div className="col-lg-4">
                        <div className="card mb-3">
                            <IdentityPicture/>
                        </div>
                        <div>
                            <div className="card mb-3">
                                <div className="card-body text-center shadow justify-content-between">
                                    {auth.role === 'teacher' ? teachersGroup() :
                                        <button disabled={loading} className="btn btn-info"
                                                onClick={confirmTeacherAccount}>Confirm
                                            teacher account</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col">
                                {settingsCreate()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
