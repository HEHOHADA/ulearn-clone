import React from 'react'
import {useForm} from "../../../../hooks/form.hook";
import {Textarea} from "../../../../shared/utils/Textarea";

export const CodeThema = () => {
    const initialValues = {
        code: ''
    }

    const {form, changeHandler} = useForm(initialValues)

    return (
        <div>
            <h2 className="text-center m-5">Название темы</h2>
            <p>текст задания</p>
            <form onSubmit={() => {
            }}>
                <Textarea formValue={form.code} name={'code'} onChange={changeHandler}/>
                <button className="btn btn-primary btn-block" type="submit"
                > Отправить
                </button>
            </form>
        </div>
    )
}
