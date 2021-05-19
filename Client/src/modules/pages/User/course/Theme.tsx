import React from 'react'

import {CodeTheme} from '../../../components/User/ThemaTypes/CodeTheme'
import {VideoThema} from "../../../components/User/ThemaTypes/VideoThema"
import {TestThema} from '../../../components/User/ThemaTypes/TestThema'
import {Loader} from "../../../shared/utils/Loader";

interface Props {
    theme?: any
    nextThema: any
    loading: boolean
}

export const Theme = (props: Props) => {
    const {theme, loading} = props
    if (loading) {
        return <Loader/>
    }
    console.log(theme)
    return (
        <div>
            {theme && theme.questions &&
            <TestThema id={theme.id} test={theme.questions} receivedPoints={theme.receivedPoints}
                       points={theme.points}/>}
            {theme && theme.videoHref && <VideoThema url={theme.videoHref} name={"video"}/>}
            {theme && theme.initialCode && <CodeTheme
                sended={!!theme.code}
                id={theme.id}
                description={theme.description}
                name={theme.name}
                initialCode={theme.code ?? theme.initialCode}
                receivedPoints={theme.receivedPoints}
                points={theme.points}/>}
        </div>
    )
}
