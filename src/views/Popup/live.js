import React from 'react'
import styled from 'styled-components'
import {useTwitch} from '../hooks/useTwitchProvider'
import StreamInfo from './stream-info'
import StreamSection from '../../components/stream-section'

const Live = () => {
  const {liveStreams} = useTwitch()

  return (
    <>
     <StreamSection section="Live" count={liveStreams.length}>
        <StreamInfo streamData={liveStreams} />
     </StreamSection>
    </>
  )
}

export default Live