import React, {useState} from "react"
import {SelectInput} from "../../../shared/utils/SelectInput"
import {Question, TestForm} from "./TestForm"
import {VideoElement} from "../../../shared/utils/VideoElement"


import {CodeEditor} from "../../../shared/utils/CodeEditor"

const options = ["video", "code", "test"]

enum Options {
    Video = "video",
    Code = "code",
    Test = "test"
}

export const ThemeForm = () => {

    const onSelect = (selectedOption: string) => {
        setSelectedItem(selectedOption)
    }

    const [selectedItem, setSelectedItem] = useState(Options.Video.toString())

    const [videoHref, setVideoHref] = useState("")

    const [test, setTest] = useState<Array<Question>>([])
    const [code, setCode] = useState('')

    const submit = (event: any) => {
        event.preventDefault()
        console.log(code)
        console.log('here', test, videoHref)
    }

    const props = {
        onChange: (code: any) => setCode(code)
    }

    return (
        <div className="m-3">
            <h2 className="header-standard p-4">Создать модуль</h2>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
                    <SelectInput onSelect={onSelect} data={options} label={"Тип темы"} name={"sad"}
                                 value={Options.Video.toString()}/>
                    <form
                        onKeyPress={(e) => {
                            selectedItem !== Options.Code &&
                            e.key === 'Enter' && e.preventDefault()
                        }}
                        onKeyUp={(e) => {
                            selectedItem === Options.Code &&
                            e.key === 'Enter' && e.preventDefault()
                        }}
                        onSubmit={submit}>
                        {
                            selectedItem === Options.Code ?
                                <CodeEditor code={code} {...props}/>
                                : selectedItem === Options.Video ?
                                <VideoElement value={videoHref} onChange={setVideoHref}/> :
                                <TestForm setTest={setTest} test={test}/>
                        }
                        <button className={"btn btn-block btn-primary"} type={"submit"}>Создать модуль</button>
                    </form>
                </div>
            </div>
        </div>

    )
}
