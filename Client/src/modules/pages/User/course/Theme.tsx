import React from 'react'

import { CodeTheme } from '../../../components/User/ThemaTypes/CodeTheme'
import { VideoThema } from '../../../components/User/ThemaTypes/VideoThema'
import { TestThema } from '../../../components/User/ThemaTypes/TestThema'

interface Props {
  theme: any
  nextThema: any
  loading: boolean
}

export const Theme = (props: Props) => {
  const { theme } = props
  console.log(theme)
  return (
    <div>
      {theme.questions && (
        <TestThema
          id={theme.id}
          test={theme.questions}
          receivedPoints={theme.receivedPoints}
          points={theme.points}
        />
      )}
      {theme.videoHref && <VideoThema url={theme.videoHref} name={'video'} />}
      {theme.initialCode && (
        <CodeTheme
          id={theme.id}
          description={theme.description}
          name={theme.name}
          initialCode={theme.initialCode}
          receivedPoints={theme.receivedPoints}
          points={theme.points}
        />
      )}
    </div>
  )
}
