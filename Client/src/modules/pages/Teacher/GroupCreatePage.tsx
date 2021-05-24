import React from 'react'
import { GroupCreateForm } from '../../components/teacher/Group/GroupCreateForm'
import { useHttp } from '../../hooks/http.hook'
import { groupRequest } from '../../../shared/request'
import { IGroup } from '../../shared/interface'
import { useHistory } from 'react-router-dom'

export default () => {
  const { request } = useHttp()
  const history = useHistory()

  const onSubmit = async (event: any, form: IGroup) => {
    event.preventDefault()
    form.courseId = parseInt(form.courseId)
    const response = await request(groupRequest, 'POST', { ...form })

    console.log(response)
    history.push('/groups')
  }

  return (
    <main className="page">
      <div className="container pt-5">
        <GroupCreateForm onSubmit={onSubmit} />
      </div>
    </main>
  )
}
