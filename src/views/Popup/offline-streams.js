import React from 'react'
import StreamInfo from './stream-info'
import {useTwitch} from '../hooks/useTwitchProvider'
import StreamSection from '../../components/stream-section'

const OfflineStreams = () => {
    const {offlineStreams} = useTwitch()
    return(
      <StreamSection section="Offline">
        <StreamInfo streamData={offlineStreams} />
      </StreamSection>
    )
}

export default OfflineStreams