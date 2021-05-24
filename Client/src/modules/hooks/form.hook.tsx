import React, { useCallback, useMemo, useState } from 'react'
import { FormInput } from '../components/utils/FormInput'
import { getKeyValue } from '../components/utils/getKeyValue'
import { ObjectKeys } from '../shared/interface'

export const useForm = <T extends {}>(initialValues: T) => {
  const [form, setForm] = useState<T>(() => initialValues)

  const keys = useMemo(() => Object.keys(initialValues) as Array<keyof T>, [initialValues])
  const [errors, setErrors] = useState(() =>
    keys.reduce(function (result: ObjectKeys, item: string) {
      result[item] = ''
      return result
    }, {})
  )

  const generateInputs = (condition?: (key: string) => string, array: Array<keyof T> = keys) =>
    array.map((key, index) => {
      let type = 'text'
      if (condition) type = condition(key)
      return (
        <div key={`${key}-${index}`}>
          {errors[key] && (
            <div className="alert alert-danger" role="alert">
              <strong>{errors[key] || 'Введите правильное значение'}</strong>
            </div>
          )}

          <FormInput
            onChange={changeHandler}
            name={key}
            type={type}
            formValue={getKeyValue<T, any>(key)(form)}
          />
        </div>
      )
    })

  const validation = (validate: (values: any) => {}) => {
    const newErrors = validate(form)
    setErrors({ ...newErrors })
    return Object.values(newErrors).every((v) => !v)
  }

  const changeHandler = useCallback(async (event: any) => {
    const { name, value, type } = event.target
    const changed = type === 'number' ? parseInt(value || '') : value
    setForm((form) => ({ ...form, [name]: changed }))
  }, [])

  const clearForm = (defaultValues: T) => {
    setForm({ ...defaultValues })
  }

  return {
    form,
    changeHandler,
    generateInputs,
    setForm,
    clearForm,
    validation,
    errors
  }
}
