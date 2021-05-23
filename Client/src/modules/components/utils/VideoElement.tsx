import ReactPlayer from "react-player"
import React from "react"


interface Props {
    value: string
    onChange?: (value: string) => void
}

export const VideoElement = (props: Props) => {

    const {onChange, value} = props

    const changeHandler = (event: any) => {
        onChange!(event.target.value)
    }

    return (
        <div>
            <input onChange={changeHandler} className="form-control item" value={value} required={true}
                   placeholder={"Введите ссылку"}/>
            <br/>
            {value && <ReactPlayer url={value}/>}

        </div>

    )
}
