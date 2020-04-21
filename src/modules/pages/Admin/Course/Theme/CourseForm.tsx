import React, {useState} from 'react'


export const defaultThemeValue = {
    name: "",
    subscriptionType: "",
    description: ""
}

// interface Props {
//     initialValues?:
// }

export const ThemeForm = (props:any ) => {

    const {initialValues = defaultThemeValue} = props
    const [form, setForm] = useState(initialValues)

    const changeHandler = (event: any) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    // const onSelectHandler = ({description}: any) => {
    //     setForm({...form, description})
    // }

    // const submit = (event: any) => {
    //     event.preventDefault()
    //
    //     console.log(form)
    // }

    return (
        <div>e</div>
            // <form onSubmit={submit}>
            //     <FormInput onChange={changeHandler} name={"name"} formValue={form.name}/>
            //     <SelectInput label={"Subscription type"} onSelect={changeHandler}
            //                  options={[{value: "1", text: "1"}]}
            //                  value={form.subscriptionType}/>
            //     <Textarea value={form.description} onChange={onSelectHandler}/>
            //
            //     <button
            //         className="btn btn-primary btn-block" type="submit">Create
            //     </button>
            // </form>
    )
}
