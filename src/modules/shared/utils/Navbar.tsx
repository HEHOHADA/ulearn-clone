import React from 'react'
import {Link} from "react-router-dom";
import {ILink} from "../interface";




interface Props {

}


export const Navbar = (props: any) => {

    // const history = useHistory()

    const navbarHandler = () => {
        const links: ILink[] = [{name: "home", link: "/"}]

        return (
            <ul className="nav navbar-nav ml-auto">
                {links.map(m => (
                    <li className="nav-item" key={`${m.name}-NB-${m.link}`} role="presentation"><Link className="nav-link"
                                                                       to={m.link}>{m.name}</Link></li>
                ))}
            </ul>)
    }


    return (
        <nav className="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
            <div className="container"><Link className="navbar-brand logo" to="/">Ulearn Clone</Link>
                <button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span
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
