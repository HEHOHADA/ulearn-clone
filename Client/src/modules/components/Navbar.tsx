import React, {useContext, useState} from 'react'
import {NavLink, useHistory} from "react-router-dom";
import {ILink} from "../shared/interface";
import {AuthContext} from "../context/AuthContext";


export const Navbar = (props: any) => {

    const history = useHistory()
    const auth = useContext(AuthContext)
    const [classes, setClasses] = useState([''])
    const onLogoutHandler = () => {
        auth.logout()
        history.push('/')
    }
    const navbarHandler = () => {
        let links: ILink[] = []
        if (!auth.isAuth) {
            links = [{name: "home", link: "/"}, {name: "login", link: "/login"}, {
                name: "register",
                link: "/register"
            }]
        } else {
            links = [{name: "home", link: "/"}, {name: "account", link: "/account"}]
        }
        if (auth.role === 'Admin') {
            links.push({name: "admin", link: '/admin'})
        }
        if (auth.role === 'Admin' || auth.role === 'Teacher') {
            links.push({name: 'groups', link: '/group'})
        }
        return (
            <ul className="nav navbar-nav ml-auto">
                {links.map(m => (
                    <li className="nav-item" key={`${m.name}-NB-${m.link}`} role="presentation"><NavLink
                        exact
                        className="nav-link"
                        to={m.link}>{m.name}</NavLink></li>
                ))}
                {auth.isAuth && <button className="nav-link"
                                        onClick={onLogoutHandler}>LOGOUT
                </button>}
            </ul>)
    }

    const showNavbar = () => {
        if (classes.find(c => c === 'show')) {
            setClasses([''])
        } else setClasses(['show'])
    }


    return (
        <nav className="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
            <div className="container"><NavLink className="navbar-brand logo" to="/">Ulearn Clone</NavLink>
                <button
                    aria-controls="navcol-1" aria-expanded="false" aria-label="Toggle navigation"
                    data-toggle="collapse"
                    className="navbar-toggler"
                    data-target="#navcol-1"
                    onClick={showNavbar}><span
                    className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"/>
                </button>
                <div className={`collapse navbar-collapse ${classes.join('')}`}
                     id="navcol-1">
                    {navbarHandler()}
                </div>
            </div>
        </nav>
    )
}
