import React, { useMemo } from 'react'

interface Props {
  onChange: (event: any) => void
  name: string
  formValue: any
  type?: string
  onFocus?: any
}

export const FormInput = (props: Props) => {
  const { onFocus, onChange, name, formValue, type = 'text' } = props
  const label = useMemo(() => name.charAt(0).toUpperCase() + name.slice(1), [name])
  const htmlFor = useMemo(() => `${name}-${label}-${type}`, [name, type, label])

  return (
    <div className="form-group">
      <label htmlFor={htmlFor}>{label}</label>
      <input
        required
        id={htmlFor}
        onFocus={onFocus && onFocus}
        onChange={onChange}
        value={formValue || ''}
        name={name}
        placeholder={label}
        className="form-control"
        type={type}
      />
    </div>
  )
}
