import React, { useEffect, useState } from 'react'
import { useHttp } from '../../../hooks/http.hook'
import { useHistory, useParams } from 'react-router-dom'
import { useFetch } from '../../../hooks/fetch.hook'
import { IModule } from '../../../shared/interface'
import {
  codeTaskRequest,
  moduleRequest,
  testTaskRequest,
  videoTaskRequest
} from '../../../../shared/request'
import { VideoElement } from '../../../components/utils/VideoElement'
import { CodeEditor } from '../../../components/utils/CodeEditor'
import { TestForm } from '../../../components/Admin/theme/TestForm'
import { Options } from '../../../components/Admin/theme/ThemeForm'

export default () => {
  const { request } = useHttp()
  const { moduleId, courseId } = useParams()
  const { fetched, isBusy } = useFetch<IModule>(`${moduleRequest}/${moduleId}`)
  useEffect(() => {
    if (!isBusy) {
      setModule(fetched)
    }
    // eslint-disable-next-line
  }, [isBusy])
  const [module, setModule] = useState<IModule>()

  const history = useHistory()
  const onDelete = async (id: number, option: Options) => {
    const newModule = { ...module! }
    if (option === Options.Video) {
      await request(`${videoTaskRequest}/${id}`, 'DELETE')
      newModule.videoTasks = newModule.videoTasks.filter((x) => x.id !== id)
    }
    if (option === Options.Test) {
      await request(`${testTaskRequest}/${id}`, 'DELETE')
      newModule.testTasks = newModule.testTasks.filter((x) => x.id !== id)
    }
    if (option === Options.Code) {
      await request(`${codeTaskRequest}/${id}`, 'DELETE')
      newModule.codeTasks = newModule.codeTasks.filter((x) => x.id !== id)
    }

    setModule(newModule)
  }
  const onCreateModule = () => {
    history.push(`/admin/course/${courseId}/module/${moduleId}/theme/create`)
  }
  return (
    <>
      !isBusy &&{' '}
      <div>
        {module?.videoTasks.map((video, index) => {
          return (
            <div className="col-md-5 col-lg-4" key={`${video.name}-${video.videoHref}`}>
              <div className="clean-pricing-item">
                <div className="heading">
                  <h3>{video.name}</h3>
                </div>
                <div className="heading">
                  <h3>{video.description}</h3>
                </div>
                <VideoElement value={video.videoHref} />
                <button
                  onClick={() => onDelete(video.id!, Options.Video)}
                  className="btn btn-outline-primary btn-block"
                  type="button"
                >
                  {'Удалить'}
                </button>
              </div>
            </div>
          )
        })}
        {module?.codeTasks.map((codeTask, index) => {
          return (
            <div className="col-md-5 col-lg-4" key={`${codeTask.name}-${codeTask.points}`}>
              <div className="clean-pricing-item">
                <div className="heading">
                  <h3>{codeTask.name}</h3>
                </div>
                <div className="heading">
                  <h3>{codeTask.description}</h3>
                </div>

                <CodeEditor code={codeTask.initialCode} />
                <div className="price">
                  <h4>
                    <small>Поинты </small>
                    {codeTask.points}
                  </h4>
                </div>
                <button
                  onClick={() => onDelete(codeTask.id!, Options.Code)}
                  className="btn btn-outline-primary btn-block"
                  type="button"
                >
                  {'Удалить'}
                </button>
              </div>
            </div>
          )
        })}
        {module?.testTasks.map((testTask, index) => {
          return (
            <div className="col-md-5 col-lg-4" key={`${testTask.name}-${testTask.points}`}>
              <div className="clean-pricing-item">
                <div className="heading">
                  <h3>{testTask.name}</h3>
                </div>
                <div className="heading">
                  <h3>{testTask.description}</h3>
                </div>
                <TestForm questions={testTask.questions} setTest={() => {}} />
                <div className="price">
                  <h4>
                    <small>Поинты </small>
                    {testTask.points}
                  </h4>
                </div>
                <button
                  onClick={() => onDelete(testTask.id!, Options.Test)}
                  className="btn btn-outline-primary btn-block"
                  type="button"
                >
                  {'Удалить'}
                </button>
              </div>
            </div>
          )
        })}
        <button
          className="btn btn-outline-primary btn-block"
          type={'button'}
          onClick={onCreateModule}
        >
          {'Создать тему'}
        </button>
      </div>
    </>
  )
}
