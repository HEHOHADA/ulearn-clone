import React from 'react'

interface Props {
    selected:boolean
    label:string
    onChange:()=>void
}
export const CheckboxInput = ({ label, selected,onChange }:Props) => (
    <div>
        <label>{label}</label>
        <input type="checkbox" onChange={onChange} checked={selected} />
    </div>
)
