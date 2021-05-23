import React, { useCallback, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ILink } from '../shared/interface'

export const Navbar = (props: any) => {
    const {isAuth, role, logout} = props
    const [classes, setClasses] = useState(() => [''])
    const memoLinks = useMemo(() => {
        let links: ILink[]
        if (!isAuth) {
            links = [{name: 'login', link: '/login'}, {
                name: 'register',
                link: '/register'
            }]
        } else {
            links = [{name: 'home', link: '/'}, {name: 'account', link: '/account'}]
        }
        if (role === 'Admin') {
            links.push({name: 'admin', link: '/admin'})
        }
        if (role === 'Admin' || role === 'Teacher') {
            links.push({name: 'groups', link: '/groups'})
        }
        return links
    }, [isAuth, role])
    const navbarHandler = useCallback(() => {
        return (
            <ul className="nav navbar-nav ml-auto">
                { memoLinks.map(m => (
                    <li className="nav-item" key={ `${ m.name }-NB-${ m.link }` } role="presentation"><NavLink
                        exact
                        className="nav-link"
                        to={ m.link }>{ m.name }</NavLink></li>
                )) }
                { isAuth && <button className="nav-link"
                                    onClick={ logout }>LOGOUT
                </button> }
            </ul>)
    }, [isAuth, logout, memoLinks])

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
                    className="navbar-toggler"
                    onClick={ showNavbar }><span
                    className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"/>
                </button>
                <div className={ `collapse navbar-collapse ${ classes.join('') }` }
                     id="navcol-1">
                    { navbarHandler() }
                </div>
            </div>
        </nav>
    )
}
