import React from 'react'
import {useTwitch} from '../hooks/useTwitchProvider'
import StreamInfo from './stream-info'

const Live = () => {
  const {liveStreams} = useTwitch()

  return (
    <>
      <h1>Live</h1>
      <StreamInfo streamData={liveStreams} />
    </>
  )
}

export default Live