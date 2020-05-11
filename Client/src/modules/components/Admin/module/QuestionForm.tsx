import React, {FC, useState} from "react";
import {IAnswer, ITest} from "../../../shared/interface";

class Test implements ITest {
    answers: Array<Answer> = [];
    points: number = 0;
    question: string = "ss";
}

class Answer implements IAnswer {
    answerText: string = "ss";
    isCorrect: boolean = false;

}

interface Props {
    init: Test
}

const TestForm = (props: Props) => {
    const {init} = props
    const [test, setTest] = useState(init)
    const addNewAnsw = () => {
        test.answers.push(new Answer())
        setTest(test)
    }
    return (
        <form>
            <button onClick={addNewAnsw}>add answ</button>
            {
                test.answers.map(answer => <input key={Math.random()} type={"checkbox"}
                                                  onChange={() => answer.isCorrect = !answer.isCorrect}/>)
            }
        </form>
    )
}
export const QuestionForm = () => {
    const [question, setQuestion] = useState<Array<Test>>([])
    const addTest = () => {
        const test = new Test();
        question.push(test);
        setQuestion(question)
    }
    return (
        <form>
            <button onClick={() => addTest()}>+</button>
            {
                question.map(test => {
                    return (
                        <TestForm init={test}/>
                    )
                })
            }
        </form>
    )
}
