import React, { useEffect, useState } from 'react'
import trash from '../../../shared/svgs/icons8-trash.svg'
import { Question } from './TestForm'
import { IAnswer } from '../../../shared/interface'

class Answer implements IAnswer {
  text: string = ''
  isRight: boolean = false
}

interface Props {
  init: Question
  changeQuestion: (question: Question) => void
}

export const QuestionForm = (props: Props) => {
  const { init, changeQuestion } = props

  const [question, setQuestion] = useState(init)

  const [testText, setText] = useState('')

  useEffect(() => {
    changeQuestion(question)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question])

  const addNewAnswer = (questionText: string) => {
    setText('')
    const answer = new Answer()
    answer.text = questionText
    const answers = question.answers.slice()
    console.log('ВОТ ТУТ', question)
    answers.push(answer)
    setQuestion({ ...question, answers })
  }

  const deleteAnswer = (deletedAnswer: Answer) => {
    question.answers = question.answers.filter((answer) => answer !== deletedAnswer)
    setQuestion({ ...question })
  }

  const setCorrect = (question: Question, answer: Answer, event?: any) => {
    answer.isRight = !answer.isRight
    setQuestion({ ...question })
  }

  return (
    <div>
      <div>
        <textarea value={question.text} disabled={true} className="form-control" />
      </div>
      <label htmlFor={'points'}>Поинты:</label>
      <div>
        <input id="points" value={question.points} disabled={true} className="form-control" />
      </div>
      <br />
      <div className="input-group mb-3">
        <input
          autoFocus
          onKeyPress={(event: any) =>
            event.key === 'Enter' &&
            testText.trim() &&
            addNewAnswer(testText) &&
            event.stopPropagation()
          }
          type="text"
          className="form-control"
          value={testText}
          onChange={(event: any) => setText(event.target.value)}
        />

        <button
          type={'button'}
          className={'btn btn-light'}
          onClick={() => testText.trim() && addNewAnswer(testText)}
        >
          Добавить вариант ответа
        </button>
      </div>
      {question.answers.map((answer, index) => {
        return (
          <div className="input-group mb-3" key={`${index}-${answer.text}`}>
            {index + 1}.
            <div className="input-group-prepend ml-2">
              <div className="input-group-text">
                <input
                  type={'checkbox'}
                  checked={answer.isRight}
                  onChange={(event?: any) => setCorrect(question, answer, event)}
                />
              </div>
            </div>
            <input type="text" className="form-control" value={answer.text} disabled={true} />
            <button className={'btn btn-light'} onClick={() => deleteAnswer(answer)}>
              <img alt="/" src={trash} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
