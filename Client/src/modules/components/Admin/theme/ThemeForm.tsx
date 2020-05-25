import React, {FC, useState} from "react"
import {SelectInput} from "../../../shared/utils/SelectInput"
import {Question, TestForm} from "./TestForm"
import {VideoElement} from "../../../shared/utils/VideoElement"


import {CodeEditor} from "../../../shared/utils/CodeEditor"

const options = ["video", "code", "test"]

export enum Options {
    Video = "video",
    Code = "code",
    Test = "test"
}

interface IProps {
    initialValues?: any,
    onSubmit: (event: any, name: string, videoHref: string, test: Array<Question>, code: string, description: string, selectedItem?: string) => void
    title?: string
    loading: boolean
}

export const ThemeForm: FC<IProps> = (props: IProps) => {

    const {onSubmit} = props
    const onSelect = (selectedOption: string) => {
        setSelectedItem(selectedOption)
    }

    const [selectedItem, setSelectedItem] = useState(Options.Video.toString())

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [videoHref, setVideoHref] = useState("")

    const [questions, setQuestions] = useState<Array<Question>>([])
    const [code, setCode] = useState('')


    const props1 = {
        onChange: (code: any) => setCode(code)
    }

    return (
        <div className="m-3">
            <h2 className="header-standard p-4">Создать таск</h2>
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
                        onSubmit={(event: any) => onSubmit(event, name, videoHref, questions, code, description, selectedItem)}>
                        <label htmlFor={"name"}>Название таска:</label>
                        <input id={"name"} className="form-control item" value={name}
                               onChange={(event: any) => setName(event.target.value)}/>
                        <label htmlFor={"desc"}>Описание таска:</label>
                        <input id={"desc"} className="form-control item" value={description}
                               onChange={(event: any) => setDescription(event.target.value)}/>
                        <br/>
                        {
                            selectedItem === Options.Code ?
                                <CodeEditor code={code} {...props1}/>
                                : selectedItem === Options.Video ?
                                <VideoElement value={videoHref} onChange={setVideoHref}/> :
                                <TestForm setTest={setQuestions} questions={questions}/>
                        }
                        <button className={"btn btn-block btn-primary"} type={"submit"}>Создать модуль</button>
                    </form>
                </div>
            </div>
        </div>

    )
}
