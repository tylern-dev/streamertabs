import React from 'react'
import { useFavorites } from '../hooks/useFavoritesProvider'
import {useTwitch} from '../hooks/useTwitchProvider'
import StreamInfo from './stream-info'

const Live = () => {
  const {liveStreams} = useTwitch()
  const { favoriteStreams } = useFavorites()
  console.log(liveStreams)
  console.log(favoriteStreams)
  // const nonFavoriteStreams =
  return (
    <>
    <h1>Live</h1>
    <StreamInfo streamData={liveStreams} />
    </>
  )
}

export default Live