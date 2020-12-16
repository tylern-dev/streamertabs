import React from 'react'
import { useTwitch } from '../hooks/useTwitchProvider'
import StreamInfo from './stream-info'
import StreamSection from '../../components/stream-section'

const Live = () => {
  const { liveStreams } = useTwitch()
  chrome.browserAction.setBadgeText({ text: liveStreams.length.toString() })
  return (
    <>
      <StreamSection section="Live" count={liveStreams.length}>
        <StreamInfo streamData={liveStreams} />
      </StreamSection>
    </>
  )
}

export default Live
