import React, {useState} from "react"
import {SelectInput} from "../../../shared/utils/SelectInput"
import {Question, TestForm} from "./TestForm"
import {VideoElement} from "../../../shared/utils/VideoElement"

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

    const submit = (event: any) => {
        event.preventDefault()

        console.log('here', test, videoHref)
    }
    return (
        <div>

            <SelectInput onSelect={onSelect} data={options} label={"Тип темы"} name={"sad"}
                         value={Options.Video.toString()}/>
            <form onSubmit={submit}>
                {
                    selectedItem === Options.Code ?
                        <div><textarea className="form-control item"/></div>
                        : selectedItem === Options.Video ? <VideoElement value={videoHref} onChange={setVideoHref}/> :
                        <TestForm setTest={setTest} test={test}/>
                }
                <button className={"form-control item"} type={"submit"} value={"Создать модуль"}/>
            </form>
        </div>

    )
}
