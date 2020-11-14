import React from 'react'
import {TWITCH_TV} from '../../consts'
import { useFavorites } from '../hooks/useFavoritesProvider'
import { useTwitch } from '../hooks/useTwitchProvider'
import StreamInfo from './stream-info'

const Favorites = () => {
  const {liveStreams} = useTwitch()
  const { favoriteStreams, clearAllFavorites } = useFavorites()

  const liveFavorites = liveStreams.filter((ls) => favoriteStreams.includes(ls.id))

  const handleOpenAllStreams = () => {
    liveFavorites.forEach((favorite) => {
      chrome.tabs.create({
        url: `${TWITCH_TV}${favorite.login}`
      })
    })
  }

  return(
    <>
      <h1>Favorite section</h1>
      {liveFavorites.length > 0 &&
        <>
          <button onClick={() => handleOpenAllStreams() }>Open all favorite streams</button>
          <button onClick={() => clearAllFavorites()}>Clear all favorites</button>
        </>
      }
      <StreamInfo streamData={liveFavorites} />
    </>

  )
}

export default Favorites