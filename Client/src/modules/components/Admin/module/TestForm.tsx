import React, {useState} from "react"
import {IAnswer, IQuestion} from "../../../shared/interface"
import trash from "../../../shared/svgs/icons8-trash.svg"
import {QuestionForm} from "./QuestionForm"

export class Question implements IQuestion {
    answers: Array<Answer> = []
    points: number = 0
    question: string = ""
}

export class Answer implements IAnswer {
    answerText: string = ""
    isCorrect: boolean = false
}


interface questProps {
    test: Array<Question>,
    setTest: any
}

export const TestForm = (props: questProps) => {

    // const submit = (event: any) => {
    //     event.preventDefault()
    // }

    const {test, setTest} = props

    const [text, setText] = useState("")


    const addQuestion = (text: string) => {
        setText("")
        if (test.some(q => q.question === text)) {
            return
        }
        const question = new Question()
        question.question = text
        setTest([...test, {...question}])
    }

    const changeQuestion = (question: Question) => {
        const newQuestions = test.filter(q => q.question !== question.question)
        setTest([...newQuestions, question])
    }

    const deleteQuestion = (deletedQuestion: Question) => {
        const newQuestions = test.filter(question => question !== deletedQuestion)
        setTest([...newQuestions])
    }

    return (
        <div>
            <div className="input-group mb-3">
                <input type="text" className="form-control" value={text}
                       onKeyUp={(e) => {

                           e.key === 'Enter' && text.trim() && addQuestion(text) && e.preventDefault()
                       }}

                       onChange={(event: any) => setText(event.target.value)}/>
                <button
                    className={"btn btn-light"} onClick={(event) => {
                    text.trim()
                    addQuestion(text)
                    event.preventDefault()
                }}>Добавить вопрос
                </button>
            </div>

            {
                test.map((question, index) => {
                    return (
                        <div key={`${index}-${question.question}`}>
                            {index + 1}.
                            <button className={"btn btn-light"} onClick={() => deleteQuestion(question)}><img alt="/"
                                                                                                              src={trash}/>
                            </button>
                            <QuestionForm changeQuestion={changeQuestion} init={question}/>
                        </div>

                    )
                })
            }
        </div>
    )
}
