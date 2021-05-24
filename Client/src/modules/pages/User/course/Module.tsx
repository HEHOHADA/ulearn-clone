import React from 'react'
import { Link, useHistory } from 'react-router-dom'

interface Props {
  onChooseTheme: (data: { theme?: any; module?: any; course?: any }) => void
  course?: any
  module?: any
  theme?: any
  loading?: boolean
}

type typeTasks = 'codeTasks' | 'videoTasks' | 'testTasks'
export const Module = (props: Props) => {
  const { onChooseTheme, course, module } = props
  const history = useHistory()
  const onClickBackHandler = () => {
    onChooseTheme({ module: null })
  }

  const onChooseThemeHandler = (theme: any) => {
    onChooseTheme({ course: course, module: module, theme: theme })
  }

  const renderModules = (type: typeTasks) => {
    return (
      module &&
      (module[type] as any).map((m: any) => (
        <li key={`${m.id}-${m.name}`} className="list-group-item module">
          <Link
            to={`/${m.id}-${type.slice(0, type.length - 1)}`}
            className="btn btn-link"
            onClick={() => onChooseThemeHandler(m)}
          >
            <div>{m.name}</div>
          </Link>
          <span>{m.points}</span>
        </li>
      ))
    )
  }

  return (
    <div className="col-md-4 col-xs-12">
      <header className="header-standard header-line">
        <button type="button" className="btn btn-link" onClick={onClickBackHandler}>
          Назад
        </button>
        <h3>Header</h3>
      </header>
      <div>
        {renderModules('testTasks')}
        {renderModules('codeTasks')}
        {renderModules('videoTasks')}
      </div>
    </div>
  )
}
