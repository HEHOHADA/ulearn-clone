import React from 'react'
import {Modules} from "./Modules";

interface Props {
    id: string
    isActive: boolean
    onClick: () => void
    progress: {
        current: number
        max: number
    }
    title: string
}

export const Course = (props: Props) => {
    return (
        <>
            <Modules/>
        </>
    )
}
