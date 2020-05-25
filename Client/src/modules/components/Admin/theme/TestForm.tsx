import React, {useState} from "react"
import {IAnswer, IQuestion} from "../../../shared/interface"
import trash from "../../../shared/svgs/icons8-trash.svg"
import {QuestionForm} from "./QuestionForm"

export class Question implements IQuestion {
    answers: Array<Answer> = []
    points: number = 0
    text: string = ""
}

export class Answer implements IAnswer {
    text: string = ""
    isCorrect: boolean = false
}


interface questProps {
    questions: Array<Question>,
    setTest: any
}

export const TestForm = (props: questProps) => {

    // const submit = (event: any) => {
    //     event.preventDefault()
    // }

    const {questions, setTest} = props

    const [text, setText] = useState("")

    const [points, setPoints] = useState(0)

    const addQuestion = (text: string,points:number) => {
        setText("")
        setPoints(0)
        if (questions.some(q => q.text === text)) {
            return
        }
        const question = new Question()
        question.text = text
        question.points=points
        setTest([...questions, {...question}])
    }

    const changeQuestion = (question: Question) => {
        const newQuestions = questions.filter(q => q.text !== question.text)

        setTest([...newQuestions, question])
    }

    const deleteQuestion = (deletedQuestion: Question) => {
        const newQuestions = questions.filter(question => question !== deletedQuestion)
        setTest([...newQuestions])
    }

    return (
        <div>
            <div className="input-group mb-3">
                <input type="text" className="form-control" value={text}
                       /*onKeyUp={(e) => {

                           e.key === 'Enter' && text.trim() && addQuestion(text) && e.preventDefault()
                       }}*/

                       onChange={(event: any) => setText(event.target.value)}/>
                <input type="number" className="form-control" value={points}
                       /*onKeyUp={(e) => {

                           e.key === 'Enter' && text.trim() && addQuestion(text) && e.preventDefault()
                       }}*/

                       onChange={(event: any) => setPoints(parseInt(event.target.value))}/>
                <button
                    className={"btn btn-light"} onClick={(event) => {
                    text.trim()
                    addQuestion(text,points)
                    event.preventDefault()
                }}>Добавить вопрос
                </button>
            </div>

            {
                questions.map((question, index) => {
                    return (
                        <div key={`${index}-${question.text}`}>
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
