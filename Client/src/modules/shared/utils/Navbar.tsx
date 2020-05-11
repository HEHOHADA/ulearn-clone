import React, {useContext, useState} from 'react'
import {NavLink} from "react-router-dom";
import {ILink} from "../interface";
import {AuthContext} from "../../context/AuthContext";


interface Props {

}


export const Navbar = (props: any) => {

    // const history = useHistory()
    const auth = useContext(AuthContext)
    const [navbarOpen, setNavbarOpen] = useState(false)

    const navbarHandler = () => {
        let links: ILink[] = []
        if (!auth.isAuth) {
            links = [{name: "home", link: "/"}, {name: "login", link: "/login"}, {
                name: "register",
                link: "/register"
            }]
        } else {
            links = [{name: "home", link: "/"}, {name: "account", link: "/account"}, {name: "LOGOUT", link: "/logout"}]
        }

        return (
            <ul className="nav navbar-nav ml-auto">
                {links.map(m => (
                    <li className="nav-item" key={`${m.name}-NB-${m.link}`} role="presentation"><NavLink
                        exact
                        className="nav-link"
                        to={m.link}>{m.name}</NavLink></li>
                ))}
            </ul>)
    }


    return (
        <nav className="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
            <div className="container"><NavLink className="navbar-brand logo" to="/">Ulearn Clone</NavLink>
                <button
                    aria-controls="navcol-1" aria-expanded="false" aria-label="Toggle navigation"
                    data-toggle="collapse"
                    className="navbar-toggler"
                    data-target="#navcol-1"
                    onClick={() => setNavbarOpen(!navbarOpen)}><span
                    className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse"
                     id="navcol-1">
                    {navbarHandler()}
                </div>
            </div>
        </nav>
    )
}
