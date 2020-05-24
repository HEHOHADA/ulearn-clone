import React, {useCallback, useEffect} from 'react'
import {IGroup} from "../../../shared/interface";
import {useForm} from "../../../hooks/form.hook";
import {TagField} from "../../../shared/utils/TagField";
import {FormInput} from "../../../shared/utils/FormInput";
import {SelectInput} from "../../../shared/utils/SelectInput";
import {useHttp} from "../../../hooks/http.hook";
import {courseRequest} from "../../../shared/request";

interface Props {
    initialValues?: IGroup
    onSubmit: (event: any, form: any) => void
}

export const defaultGroupFormValues = {
    courseId: 0,
    name: '',
    userGroups: []
}


export const GroupCreateForm = (props: Props) => {

    const {request, loading} = useHttp()
    let courseNameArray: Array<string> = []
    let courses: any = [{name: '', id: 1}]

    const fetchCourse = useCallback(async () => {
        try {
            courses = await request(courseRequest, 'GET')
            if (courses) {
                courses.forEach((c: any) => {
                    courseNameArray.push(c.name)
                })
            }
        } catch (e) {
            console.log(e)
        }
    }, [])

    useEffect(() => {
        fetchCourse()
    }, [])

    const {initialValues = defaultGroupFormValues, onSubmit} = props

    const {form, changeHandler, setForm} = useForm<IGroup>(initialValues)

    const selectedTags = (userGroups: Array<string>) => {
        setForm({...form, userGroups})
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
                optionName={courseNameArray}
                name={'courseName'}
                onSelect={(selectedItem: any) => setForm({...form, courseId: selectedItem})}
                value={form.courseId}
                data={courses.map((m: any) => m.id)}
                label={'chose course'}/>
            <TagField selectedTags={selectedTags} tags={form.userGroups ? form.userGroups : []}/>
            <button
                disabled={loading}
                className="btn btn-primary btn-block mt-3" type="submit">Send
            </button>
        </form>

    )
}
