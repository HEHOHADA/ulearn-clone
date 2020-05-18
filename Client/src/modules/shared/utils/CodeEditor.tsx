import React from 'react'
import AceEditor from "react-ace"

import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/theme-monokai"

interface Props {
    code: string
    onChangeHandler: (value: string) => void
}

export const CodeEditor = (props: Props) => {

    const {code, onChangeHandler} = props

    return (
        <div className="border border-primary rounded mb-3">
            <AceEditor
                className="w-auto"
                placeholder="Placeholder Text"
                mode="javascript"
                theme="monokai"
                name="UNIQUE_ID_OF_DIV"
                onChange={code => onChangeHandler(code)}
                fontSize={14}
                value={code}
            />
        </div>
    )
}
