import React, {useState} from 'react'
import {CodeEditor} from "../../../shared/utils/CodeEditor"

interface Props {
    name: string
    text?: string
    initialCode?: string
}

export const CodeThema = (props: Props) => {
    const {name, text, initialCode = ''} = props
    const [code, setCode] = useState(initialCode)

    return (
        <div>
            <h2 className="text-center m-5">{name}</h2>
            <p>{text}</p>
            <form onSubmit={() => {
            }}>
                <CodeEditor code={code} onChangeHandler={setCode}/>
                <button className="btn btn-primary btn-block" type="submit"
                > Отправить
                </button>
            </form>
        </div>
    )
}
