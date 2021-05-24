import React, { FC, useCallback, useMemo } from 'react'
import { ISubscription } from '../../../shared/interface'
import { useForm } from '../../../hooks/form.hook'
import { SelectInput } from '../../utils/SelectInput'

type IProps = {
  initialValues?: IVisibleCourse
  onSubmit: (event: any, form: IVisibleCourse) => void
  title?: string
  subscriptions?: any
  course?: any
}

export type IVisibleCourse = {
  name: string
  description: string
  subscriptionId: number
}

const subscriptionNames = (subscriptions: Array<ISubscription>) => {
  return subscriptions.map((s) => `${s.name} lvl:${s.level}`)
}

export const CourseForm: FC<IProps> = (props: IProps) => {
  const { onSubmit, title, subscriptions } = props
  const defaultValues = useMemo(
    () => ({
      name: '',
      description: '',
      subscriptionId: subscriptions[0].id
    }),
    [subscriptions]
  )
  const { initialValues = defaultValues } = props

  const { form, generateInputs, setForm } = useForm<IVisibleCourse>(initialValues)
  return (
    <form onSubmit={(event) => onSubmit(event, form)}>
      {generateInputs(undefined, ['name', 'description'])}
      <SelectInput
        optionName={useMemo(() => subscriptionNames(subscriptions), [subscriptions])}
        name={'courseName'}
        onSelect={useCallback(
          (selectedItem: any) => {
            setForm((f) => ({ ...f, subscriptionId: selectedItem }))
          },
          [setForm]
        )}
        value={form.subscriptionId}
        data={useMemo(() => subscriptions.map((x: any) => x.id), [subscriptions])}
        label={'chose course'}
      />
      <button className="btn btn-primary btn-block" type="submit">
        {title}
      </button>
    </form>
  )
}
