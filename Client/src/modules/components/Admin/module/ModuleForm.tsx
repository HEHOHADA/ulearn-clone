import React, {FC, useCallback, useEffect, useState} from 'react'
import {useForm} from "../../../hooks/form.hook";
import {useParams} from "react-router-dom";

export const defaultModuleValue = {
    name: ""
}

interface IProps {
    initialValues?: IVisibleModule,
    onSubmit: (event: any, form: IVisibleModule) => void
    title?: string
    loading: boolean
}

export interface IVisibleModule {
    name: string
}

export const ModuleForm: FC<IProps> = (props: IProps) => {
    const {initialValues = defaultModuleValue, onSubmit, title} = props


    const {form, generateInputs, setForm} = useForm<IVisibleModule>(initialValues)
    return (
        <form
            onSubmit={(event) => onSubmit(event, form)}
        >
            {generateInputs()}
            <button
                //disabled={loading}
                className="btn btn-primary btn-block" type="submit">{title}
            </button>
        </form>
    )
}
