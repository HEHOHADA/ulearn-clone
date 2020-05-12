import React from 'react'

import {CodeThema} from "./ThemaTypes/CodeThema";

interface Props {
    id?: any
    onChooseThema:any
}

export const Thema = (props: Props) => {
    // const {id} = props
    // const {request, loading} = useHttp()
    //
    // let themaType = ''
    // useEffect(() => {
    //     //request to server body api
    // }, [])

    return (
        <div className="container">
            <CodeThema/>
        </div>
    )
}
