import React from 'react'
import {ILink} from "../../shared/interface";
import {Link, useHistory} from "react-router-dom";

export const NavbarAdmin = () => {

    const history = useHistory()

    const logoutHandler = () => {
        history.push('/')
    }

    const navbarHandler = () => {
        const links: ILink[] = [{name: "Dashboard", link: "/admin/"},{name:"Subscription",link:"/admin/subscription"},{name:"Course",link:"/admin/course"}]

        return (
            <ul className="navbar-nav">
                {links.map(m => (
                    <li className="nav-item" key={`${m.name}-NB-${m.link}`}><Link className="nav-link"
                                                                                  to={m.link}><i
                        className="fas fa-tachometer-alt"/><span>{m.name}</span></Link></li>

                ))}
                <li className="nav-item">
                    <button className="btn btn-primary" onClick={logoutHandler}>Выйти</button>
                </li>
            </ul>)
    }

    return (
        <div className="col-md-3 col-lg-2 navbar-container bg-primary">
            <nav className="navbar navbar-expand-md navbar-light">
                <Link className="navbar-brand" to="/admin/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbar">
                    {navbarHandler()}

                </div>
            </nav>
        </div>
    )
}
