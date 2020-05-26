import React from 'react'
import {Link} from "react-router-dom"
import {Footer} from "../../shared/interface"
import './Footer.module.css'

export const FooterLinks = () => {

    const links: Footer[] = [{
        name: "Get started",
        link: [{link: "/", name: "Home"}, {link: "/subscription", name: "Subscription"}]
    }, {
        name: "Usage",
        link: [{link: "/chat", name: "Chat"}, {link: 'account', name: "Account"}]
    }]


    const footerHandler = (footer: Footer) => (
        <div key={`${footer.link}-down-${footer.name}`} className="col-sm-4">
            <h5>{footer.name}</h5>
            <ul>
                {footer.link.map(m => (
                    <li key={`${m.name}-footer-${m.link}`}><Link to={m.link}>{m.name}</Link></li>
                ))}
            </ul>
        </div>
    )


    return (
        <footer className="page-footer dark fle">
            <div className="container">
                <div className="row">
                    {links.map(m => footerHandler(m))}
                </div>
            </div>
            <div className="footer-copyright">
                <p>ULEARN PROJECT</p>
            </div>
        </footer>
    )
}
