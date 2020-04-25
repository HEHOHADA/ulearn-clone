import React from 'react'
import {IdentityForm} from "../../components/identity/IdentityForm";


interface settings {
    name: string
    value: Array<string>
}

export const IdentityPage = () => {

    const settings: Array<settings> = [
        {name: "Profile settings", value: ["username", "email", "lastname", "firstname"]},
        {name: "Password settings", value: ["password", "repeat Password"]}
    ]


    const settingsCreate = () => {
        let flag = ''
        return settings.map(({value, name}, index) => {
            if (index === 1) {
                flag = 'mb-3'
            }
            return (<div className={`card shadow ${flag}`} key={`${name}-${index}`}>
                <div className="card-header py-3">
                    <p className="text-primary m-0 font-weight-bold">{name}</p>
                </div>
                <IdentityForm formNames={value}/>
            </div>)
        })
    }

    return (
        <main className="page">
            <div className="container">
                <h3 className="text-dark mb-4">Profile</h3>
                <div className="row mb-3">
                    <div className="col-lg-4">
                        <div className="card mb-3">
                            <div className="card-body text-center shadow"><img className="rounded-circle mb-3 mt-4"
                                                                               width="160"
                                                                               height="160"/>
                                <div className="mb-3">
                                    <button className="btn btn-primary btn-sm" type="button">Change Photo</button>
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
