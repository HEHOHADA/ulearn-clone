import React, {useState} from 'react'
import {CodeEditor} from "../../../shared/utils/CodeEditor"
import {useHttp} from "../../../hooks/http.hook";
import {codeTaskRequest} from "../../../shared/request";

interface Props {
    name: string
    text?: string
    initialCode?: string
}

export const CodeThema = (props: Props) => {
    const {name, text, initialCode = ''} = props
    const [code, setCode] = useState(initialCode)
    const propsCode = {
        onChange: (code: any) => setCode(code)
    }
    const {request} = useHttp()

    const onSubmit = async (event: any) => {
        event.preventDefault()
        try {
            const response = await request(`${codeTaskRequest}/confirm`, 'POST', {code: code})
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <h2 className="text-center m-5">{name}</h2>
            <p>{text}</p>
            <form onSubmit={(event) => {
            }}>
                <CodeEditor code={code} {...propsCode}/>
                <button className="btn btn-primary btn-block" type="submit"
                > Отправить
                </button>
            </form>
        </div>
    )
}
