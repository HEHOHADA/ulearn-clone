import React, {useEffect, useState} from 'react'
import {CheckboxInput} from "../../../shared/utils/CheckboxInput"
import {IAnswer, IQuestion} from "../../../shared/interface"

interface Props {
    question: string
    number: number
    answers: Array<IAnswer>
    change: (question: IQuestion) => void
    isSubmitting: boolean
}

export const TestItem = (props: Props) => {

    const {question, answers, isSubmitting, change} = props

    const initialClasses = answers.reduce(function (result: Map<string, string>, item: IAnswer) {
        result.set(item.text, '')
        return result
    }, new Map<string, string>())

    const [classes, setClasses] = useState<Map<string, string>>(initialClasses)

    const [point, setPoint] = useState(1)

    const [answer, setAnswers] = useState<Array<IAnswer> | null>(null)

    const changeHandler = (event: any) => {
        let newSelection = event.target.value
        const ans = answers.find(a => a.text === newSelection)
        const newArray = answer?.filter(a => a !== ans)
        if (newArray && newArray?.length !== answer?.length) {
            if (newArray) {
                setAnswers([...newArray])
            } else {
                setAnswers(null)
            }
        } else {

            const newResult = answer ? [...answer, ans!] : [ans!]
            setAnswers(newResult)
            if (!ans!.isRight) {
                setPoint(0)
            }
        }

    }

    useEffect(() => {
        if (answer) {
            change({text: question, points: point, answers: answer!})
        } else {
            change({text: question, points: 0, answers: answer!})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [answer, isSubmitting])

    useEffect(() => {
        if (isSubmitting)
            validate()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitting])


    const validate = () => {
        let classe: Map<string, string> = new Map()
        answer && answer.forEach((a) => {
            const inputClass = a.isRight ? "alert-success" : 'alert-danger'
            classe.set(a.text, inputClass)
        })
        setClasses(classe)
    }

    return (
        <div className="input-group mb-3">
            <CheckboxInput classes={classes} name={question} options={answers}
                           onChange={changeHandler}/>
        </div>
    )
}
