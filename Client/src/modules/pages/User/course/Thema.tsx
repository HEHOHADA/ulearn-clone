import React from 'react'

import {CodeThema} from "./ThemaTypes/CodeThema";
import {ITheme} from "../../../shared/interface";
import {VideoThema} from './ThemaTypes/VideoThema';

interface Props {
    id?: any
    nextThema: any
}

export const Thema = (props: Props) => {
    // const {id} = props
    // const {request, loading} = useHttp()
    //
    // let themaType = ''
    // useEffect(() => {
    //     //request to server body api
    // }, [])
    const array = {type: "video", href: "https://www.youtube.com/watch?v=0q7YZcf4WtI&t=5358s"}
    // const data:ITheme= {}

    return (
        <div>
            {array.type === 'video' && <VideoThema url={array.href} name={"video"}/>}
        </div>
    )
}
