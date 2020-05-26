import React, {useState} from 'react'
import {CodeEditor} from "../../../shared/utils/CodeEditor"
import {useHttp} from "../../../hooks/http.hook";
import {codeTaskRequest} from "../../../shared/request";

interface Props {
    name: string
    initialCode?: string
    description?: string
    id: number
    points: number
    receivedPoints: number
}

export const CodeTheme = (props: Props) => {
    const {receivedPoints,points,name, initialCode = '', description = '', id} = props
    const [code, setCode] = useState(initialCode)
    const propsCode = {
        onChange: (code: any) => setCode(code)
    }
    const {request} = useHttp()

    const onSubmit = async (event: any) => {
        event.preventDefault()
        try {
         await request(`${codeTaskRequest}result/confirm`, 'POST', {
                codeTaskId: id,
                code: code
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <h2 className="text-center m-5">{name}</h2>
            <span className="text-monospace center m-3">{receivedPoints}/{points}</span>
            <p>{description}</p>
            <form onSubmit={onSubmit}>
                <CodeEditor code={code} {...propsCode}/>
                <button className="btn btn-primary btn-block" type="submit"
                > Отправить
                </button>
            </form>
        </div>
    )
}
