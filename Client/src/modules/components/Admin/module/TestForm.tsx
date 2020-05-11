import React, {FC, useState} from "react";
import {IAnswer, IQuestion} from "../../../shared/interface";
import trash from "../../../shared/svgs/icons8-trash.svg"

export class Question implements IQuestion {
    answers: Array<Answer> = [];
    points: number = 0;
    question: string = "";
}

class Answer implements IAnswer {
    answerText: string = "";
    isCorrect: boolean = false;
}

interface Props {
    init: Question
}

const QuestionForm = (props: Props) => {
    const {init} = props
    const [question, setQuestion] = useState(init)
    const [testText, setText] = useState("");
    const addNewAnswer = (questionText: string) => {
        setText("")
        const answer = new Answer();
        answer.answerText = questionText;
        question.answers.push(answer);
        setQuestion({...question})
    }
    const deleteAnswer = (deletedAnswer: Answer) => {
        question.answers = question.answers.filter(answer => answer !== deletedAnswer);
        setQuestion({...question})
    }
    const setCorrect = (question: Question, answer: Answer, event?: any) => {
        answer.isCorrect = !answer.isCorrect;
        setQuestion({...question})
    }

    return (
        <div>
            <div><textarea disabled={true} className="form-control">{question.question}</textarea></div>
            <br/>
            <div className="input-group mb-3">
                <input type="text" className="form-control" value={testText}
                       onChange={(event: any) => setText(event.target.value)}/>
                <button className={"btn btn-light"} onClick={() => addNewAnswer(testText)}>Добавить вариант ответа
                </button>
            </div>
            {
                question.answers.map((answer, index) => {
                        return (

                            <div className="input-group mb-3">
                                {index + 1}.
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <input key={Math.random()} type={"checkbox"}
                                               checked={answer.isCorrect}
                                               onChange={(event?: any) => setCorrect(question, answer, event)}/></div>
                                </div>
                                <input type="text" className="form-control" key={Math.random()}
                                       value={answer.answerText} disabled={true}/>
                                <button className={"btn btn-light"} onClick={() => deleteAnswer(answer)}><img src={trash}/>
                                </button>
                            </div>)
                    }
                )
            }
        </div>
    )
}

interface questProps {
    test: Array<Question>,
    setTest: any
}

export const TestForm = (props: questProps) => {
    const submit = (event: any) => {
        event.preventDefault()
    }
    const {test, setTest} = props
    const [text, setText] = useState("")
    const addQuestion = (text: string) => {
        setText("")
        const question = new Question();
        question.question = text
        setTest([...test, {...question}])
    }
    const deleteQuestion = (deletedQuestion: Question) => {
        const newQuestions = test.filter(question => question !== deletedQuestion)
        console.log(newQuestions)
        setTest([...newQuestions])
    }
    return (
        <div>
            <div className="input-group mb-3">
                <input type="text" className="form-control" value={text}
                       onChange={(event: any) => setText(event.target.value)}/>
                <button className={"btn btn-light"} onClick={() => addQuestion(text)}>Добавить вопрос</button>
            </div>

            {
                test.map((question, index) => {
                    return (
                        <div>
                            {index + 1}.
                            <button className={"btn btn-light"} onClick={() => deleteQuestion(question)}><img
                                src={trash}/>
                            </button>
                            <QuestionForm init={question}/>
                        </div>

                    )
                })
            }
        </div>
    )
}
