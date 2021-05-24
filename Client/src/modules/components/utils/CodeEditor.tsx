import React from 'react'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'

interface Props {
  code: string
}

export const CodeEditor = (props: Props) => {
  const { code, ...rest } = props

  return (
    <div className="border border-primary rounded mb-3">
      <AceEditor
        className="w-auto"
        placeholder="Placeholder Text"
        mode="javascript"
        theme="monokai"
        name={`${new Date()}`}
        fontSize={14}
        value={code}
        setOptions={{ useWorker: false }}
        {...rest}
      />
    </div>
  )
}
