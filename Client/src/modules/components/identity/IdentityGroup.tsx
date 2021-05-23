import React from 'react'
import {Link} from 'react-router-dom'

export const IdentityGroups = (props: any) => {
    const {fetched} = props


    return (
        <>
            {
                fetched.map((g: any) => (
                    <Link to={`/group/${g.id}`} key={`${g.name}-${g.courseId}`} className="module p-3 border">
                        <p className="text-primary m-0 font-weight-bold text-lg-left ">{g.name}</p>
                        <span className="text-primary">{g.course}</span>
                    </Link>
                ))
            }
        </>
    )

}
