import React from 'react'

import {CodeThema} from '../../../components/User/ThemaTypes/CodeThema'
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
    // const {request, loading} = useHttp()
    //
    // let themaType = ''
    // useEffect(() => {
    //     //request to server body api
    // }, [])
    // const data: ITheme = {video: "https://www.youtube.com/watch?v=VnG7ej56lWw", name: ''}
    //const data: ITheme = {name: 'name', code: 'const c=(a,b)=>a+b'}
    // const data: ITheme = {
    //     name: 'name',
    //     test: [{
    //         question: '1 вопрос',
    //         answers: [{answerText: '1 ответ', isCorrect: false}, {answerText: "2 ответ", isCorrect: true}],
    //         points: 5
    //     }, {
    //         question: '2 вопрос',
    //         answers: [{answerText: '1 ответ', isCorrect: false}, {answerText: "2 ответ", isCorrect: true}],
    //         points: 5
    //     }]
    // }
    if (loading) {
        return <Loader/>
    }

    return (
        <div>
            {theme && theme.questions && <TestThema test={theme.questions}/>}
            {theme && theme.videoHref && <VideoThema url={theme.videoHref} name={"video"}/>}
            {theme && theme.initialCode && <CodeThema name={theme.name} initialCode={theme.initialCode}/>}
        </div>
    )
}
