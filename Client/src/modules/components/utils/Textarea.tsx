import React from 'react'

interface IProps {
  name: string
  formValue: string
  onChange: (event: any) => void
}

export const Textarea = (props: IProps) => {
  const { name, formValue, onChange } = props
  return (
    <div className="form-group">
      <textarea
        className="md-textarea form-control"
        value={formValue}
        name={name}
        onChange={onChange}
        rows={3}
      />
    </div>
  )
}
