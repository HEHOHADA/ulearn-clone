import {ITheme, IQuestion} from "../../../shared/interface";
import React, {useReducer, useState} from "react";
import ReactPlayer from "react-player";
import {SelectInput} from "../../../shared/utils/SelectInput";
import {Question, TestForm} from "./TestForm";

interface Props {
    initialValues?: ITheme
}

const options = Array("video", "code", "test")

enum Options {
    Video = "video",
    Code = "code",
    Test = "test"
}

const getVideoElement = (value: string, onChange: (newValue: string) => void) => {
    const changeHandler = (event: any) => {
        onChange(event.target.value)
    }

    return (
        <div>

            <input onChange={changeHandler} className="form-control item" value={value} required={true}
                   placeholder={"Введите ссылку"}
                   pattern={"^(http://|https://)\\S+"}/>
            <br/>
            <ReactPlayer url={value}/>

        </div>

    )
}
export const ThemeForm = () => {
    const onSelect = (selectedOption: string) => {
        setSelected(selectedOption);
    }

    const [selectedItem, setSelected] = useState(Options.Video.toString());
    const [videoHref, setVideoHref] = useState("")
    const [test,setTest]= useState<Array<Question>>([])
    const submit = (event: any) => {
        event.preventDefault()

        console.log(test, videoHref)
    }
    return (
        <div>

            <SelectInput onSelect={onSelect} data={options} label={"Тип темы"} name={"sad"}
                         value={Options.Video.toString()}/>
            <form onSubmit={submit}>

                {
                    selectedItem === Options.Code ?
                        <div><textarea className="form-control item"></textarea></div>
                        : selectedItem === Options.Video ? getVideoElement(videoHref, setVideoHref) :
                        <TestForm  setTest={setTest} test={test}/>
                }
                <input className={"form-control item"} type={"submit"} value={"Создать модуль"}/>
            </form>


        </div>

    )
}
