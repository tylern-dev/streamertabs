import React from 'react'
import StreamInfo from './stream-info'
import {useTwitch} from '../hooks/useTwitchProvider'
const OfflineStreams = () => {
    const {offlineStreams} = useTwitch()
    console.log(offlineStreams)
    return(
      <>
      <h1>Offline</h1>
      <StreamInfo streamData={offlineStreams} />
      </>
    )
}

export default OfflineStreams