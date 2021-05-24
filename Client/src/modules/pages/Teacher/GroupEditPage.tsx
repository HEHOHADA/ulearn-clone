import React from 'react'
import { GroupCreateForm } from '../../components/teacher/Group/GroupCreateForm'
import { useHttp } from '../../hooks/http.hook'
import { useHistory, useParams } from 'react-router-dom'
import { groupRequest } from '../../../shared/request'
import { useFetch } from '../../hooks/fetch.hook'
import { IGroup } from '../../shared/interface'

export default () => {
  const { request } = useHttp()
  const { id } = useParams()
  const history = useHistory()

  const { fetched, isBusy } = useFetch<IGroup>(`${groupRequest}/${id}`)

  const onSubmit = async (event: any, form: any) => {
    event.preventDefault()

    await request(`${groupRequest}/${id}`, 'PUT', { ...form })
    history.push('/groups')
  }

  return (
    <main className="page">
      <div className="container pt-5">
        {!isBusy && <GroupCreateForm initialValues={fetched} onSubmit={onSubmit} />}
      </div>
    </main>
  )
}
