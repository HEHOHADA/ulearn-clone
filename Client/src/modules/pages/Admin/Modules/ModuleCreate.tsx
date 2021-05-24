import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useHttp } from '../../../hooks/http.hook'
import { moduleRequest } from '../../../../shared/request'
import { IVisibleModule, ModuleForm } from '../../../components/Admin/module/ModuleForm'

export default () => {
  const { request } = useHttp()

  const history = useHistory()
  const { courseId } = useParams()
  const submit = async (event: any, form: IVisibleModule) => {
    event.preventDefault()
    await request(moduleRequest, 'POST', { ...form, courseId: parseInt(courseId!) })
    history.push(`/admin/course/${courseId}/module`)
  }
  return <ModuleForm onSubmit={submit} title={'Module Create'} />
}
