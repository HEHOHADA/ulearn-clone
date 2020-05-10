import React, {useEffect} from 'react'
import {useHttp} from "../../../hooks/http.hook";
import {useForm} from "../../../hooks/form.hook";
import {ThemaVideo} from "./ThemaTypes/ThemaVideo";
import {CodeThema} from "./ThemaTypes/CodeThema";

interface Props {
    id?: string
}

export const Thema = (props: Props) => {
    // const {request, loading} = useHttp()
    //
    // let themaType = ''
    // const {form, changeHandler, generateInputs} = useForm('')
    // useEffect(() => {
    //     //request to server body api
    // }, [])

    return (
        <div className="container">
            <CodeThema/>
        </div>
    )
}
