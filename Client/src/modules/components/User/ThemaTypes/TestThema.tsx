import React, {useEffect, useState} from 'react'
import {IQuestion} from "../../../shared/interface"
import {TestItem} from '../Test/TestItem'
import {testTaskRequest} from "../../../../shared/request"
import {useHttp} from "../../../hooks/http.hook"

interface Props {
    test: Array<IQuestion>
    id: number
    points: number
    receivedPoints: number
}

export const TestThema = (props: Props) => {

    const {test, id, points, receivedPoints} = props
    const [form, setForm] = useState<Array<IQuestion>>()
    const {request} = useHttp()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const selectedChange = (question: IQuestion) => {
        const newForm = form?.filter(f => f.text !== question.text)
        if (newForm !== form) {
            if (newForm) {
                setForm([...newForm])
            } else {
                setForm(undefined)
            }
        }
        const newResult = newForm ? [...newForm, question] : [question]
        setForm(newResult)
    }

    useEffect(() => {
        setIsSubmitting(false)
    }, [isSubmitting])

    const submitForm = async (event: any) => {
        event.preventDefault()
        try {
            await request(`${testTaskRequest}result/confirm`, 'POST', {questions: form, testTaskId: id})
        } catch (e) {
            console.log(e)
        }
    }


    const testGenerator = () => {
        return test.map((t, i) => {
            return (
                <div key={`${i}-${t.answers}`}>
                    <h4 className="header-line m-2">{i + 1}.<strong> {t.text}</strong></h4>
                    <TestItem id={t.id!} isSubmitting={isSubmitting} change={selectedChange} question={t.text} number={i}
                              answers={t.answers}/>
                </div>
            )
        })
    }

    return (
        <div>
            <div className="d-inline-flex">
                <h1 className="header-standard ">
                    <div>Test</div>
                </h1>
                <span className="text-monospace center m-3">{receivedPoints}/{points}</span>
            </div>

            <form onSubmit={async (event) => {
                setIsSubmitting(true)
                await submitForm(event)
            }}>
                {testGenerator()}
                <button className="btn btn-primary" disabled={isSubmitting}>Проверить
                </button>
            </form>

        </div>
    )
}
