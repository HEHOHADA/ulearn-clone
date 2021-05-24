import React from 'react'
import { useForm } from '../../../hooks/form.hook'
import { FormInput } from '../../../components/utils/FormInput'
import { Textarea } from '../../../components/utils/Textarea'

interface Props {
  initialValues?: {
    points: number
    text: string
  }
  onSubmit: (event: any, form: any) => void
  maxPoints: number
}

export const defaultReviewForm = {
  points: 0,
  text: ''
}

export const ReviewCode = (props: Props) => {
  const { initialValues = defaultReviewForm, onSubmit, maxPoints } = props
  const { form, changeHandler } = useForm(initialValues)

  return (
    <form onSubmit={(event: any) => onSubmit(event, form)}>
      <div className="d-flex">
        <FormInput
          onChange={changeHandler}
          name={'points'}
          formValue={form.points}
          type={'number'}
        />
        <span className="mt-4 p-2">/{maxPoints}</span>
      </div>
      <Textarea onChange={changeHandler} name={'text'} formValue={form.text} />
      <button className="btn btn-primary btn-block mb-2" type="submit">
        Send
      </button>
    </form>
  )
}
