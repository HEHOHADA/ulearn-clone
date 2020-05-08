import React, {FC} from 'react'
import {Route} from "react-router-dom";
import {RouteProps} from "react-router";

// interface Props {
//     component: React.FC
//     layout: any
// }


export const AppRoute: FC<any | RouteProps> = ({component: Component, layout: Layout, ...rest}) => (
    <Route {...rest} render={props => {
        return (
            <Layout>
                <Component {...props}/>
            </Layout>
        )
    }}
    />
)
