import React from 'react'
import ReactPlayer from "react-player"

interface Props {
    url: string
    name: string
}

export const VideoThema = (props: Props) => {
    const {url, name} = props
    return (
        <div className="container">
            <h2 className="header-standard p-3">{name}</h2>
            <ReactPlayer url={url}/>
        </div>
    )
}
