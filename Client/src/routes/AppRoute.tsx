import React, {FC, Suspense} from 'react'
import {Route} from "react-router-dom"
import {RouteProps} from 'react-router'
import { Loader } from '../modules/components/utils/Loader'

export const AppRoute: FC<any | RouteProps> = ({component: Component, layout: Layout, ...rest}) => (
    <Route {...rest} render={props => {
        return (
            <Layout>
                <Suspense fallback={<Loader />}>
                    <Component {...props}/>
                </Suspense>
            </Layout>
        )
    }}
    />
)
