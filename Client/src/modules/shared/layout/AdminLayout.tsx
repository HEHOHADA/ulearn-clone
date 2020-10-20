import React from 'react'
import { NavbarAdmin } from '../../components/Admin/NavbarAdmin'


export default (props: any) => {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <NavbarAdmin/>
                    <div className="col-md-9 col-lg-10 content-container">
                        { props.children }
                    </div>
                </div>
            </div>
        </>
    )
}
