import React from 'react'
import {Navbar} from "../../components/Navbar"
import {FooterLinks} from "../../components/footer/FooterLinks"
import classes from "./index.module.css"

export const MainLayout = (props: any) => {
    return (
        <>
            <div className={classes.MainLayout}>
                <Navbar/>
                {props.children}
            </div>
            <FooterLinks/>
        </>
    )
}
