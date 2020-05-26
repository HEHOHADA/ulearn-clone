import React from 'react'
import {ICourse, IGroup} from "../../../shared/interface"
import {useForm} from "../../../hooks/form.hook"
import {TagField} from "../../../shared/utils/TagField"
import {FormInput} from "../../../shared/utils/FormInput"
import {SelectInput} from "../../../shared/utils/SelectInput"
import {courseRequest} from "../../../shared/request"
import {useFetch} from "../../../hooks/fetch.hook";

interface Props {
    initialValues?: IGroup
    onSubmit: (event: any, form: any) => void
}

export const defaultGroupFormValues = {
    courseId: 0,
    name: '',
    emails: []
}


export const GroupCreateForm = (props: Props) => {

    const {fetched = []} = useFetch<Array<ICourse>>(courseRequest)
    const {initialValues = defaultGroupFormValues, onSubmit} = props
    const {form, changeHandler, setForm} = useForm<IGroup>(initialValues)
    const selectedTags = (userGroups: Array<string>) => {
        setForm({...form, emails: userGroups})
    }

    return (
        <form
            onKeyPress={(e) => {
                e.key === 'Enter' && e.preventDefault()
            }}
            onSubmit={(event) => onSubmit(event, form)}
            className="form-group">
            <FormInput onChange={changeHandler} name={'name'} formValue={form.name}/>
            <SelectInput
                optionName={fetched.map((c: any) => c.name)}
                name={'courseName'}
                onSelect={(selectedItem: any) => setForm({...form, courseId: selectedItem})}
                value={form.courseId}
                data={fetched.map((m: any) => m.id)}
                label={'chose course'}/>
            <TagField selectedTags={selectedTags} tags={form.emails ? form.emails : []}/>
            <button
                className="btn btn-primary btn-block mt-3" type="submit">Send
            </button>
        </form>

    )
}
